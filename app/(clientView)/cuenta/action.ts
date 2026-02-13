"use server";

import { prisma } from "@/lib/prisma";
import { PayPalOrderStatus } from "@/src/interfaces";
import { revalidatePath } from "next/cache";

// Agregar este nuevo Action en cuenta/action.ts
export async function registrarPagoEfectivo(
  idComanda: number,
  desglose: { sub_total: number; ivaTotal: number; total: number }
) {
  try {
    // 1. Obtener la mesa asociada a la comanda
    const comandaActual = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true },
    });

    if (!comandaActual) throw new Error("Comanda no encontrada");

    // 2. Transacción atómica: Cerrar comanda y liberar mesa
    await prisma.$transaction([
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: "Cerrada",
          pagado: true,
          fecha_pagado: new Date(),
          transaccion_id: `CASH-${Date.now()}`, // ID único para efectivo
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
          metodo_pago: 'Efectivo',
        },
      }),
      prisma.mesa.update({
        where: { id_mesa: comandaActual.id_mesa },
        data: { estado: "Libre" }, // Libera la mesa para la hostess
      }),
    ]);

    // Revalidar rutas afectadas para actualizar la UI globalmente
    revalidatePath("/cuenta");
    revalidatePath("/hostess");
    
    return { success: true };
  } catch (error) {
    console.error("Error en Pago Efectivo:", error);
    return { success: false, message: "No se pudo procesar el pago." };
  }
}

export async function registrarPagoExitoso(
  idComanda: number,
  transaccionId: string,
  desglose: any,
) {
  const authToken = await getPaypalBearerToken();

  if( !authToken ){
    return{
      success: false,
      message: 'No se pudo obtener token de verificacion'
    }
  }

  const resp = await verifyPayPalPayment(transaccionId, authToken);

  if( !resp ){
    return{
      success: false,
      message: 'Error al verificar el pago'
    }
  }

  const { status, purchase_units} = resp;
  //const { }

  if ( status !== 'COMPLETED'){
    return{
      success: false,
      message: 'No se ha realizado el pago'
    }
  }
  try {
    // 1. Buscamos la comanda para saber qué mesa liberar
    const comandaActual = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true },
    });

    if (!comandaActual) throw new Error("Comanda no encontrada");

    // 2. Transacción atómica: Todo ocurre o nada ocurre
    await prisma.$transaction([
      // Marcar comanda como pagada y guardar montos
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: "Cerrada",
          pagado: true,
          fecha_pagado: new Date(),
          transaccion_id: transaccionId,
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
          metodo_pago: 'Tarjeta',
        },
      }),
      // Liberar la mesa para la hostess
      prisma.mesa.update({
        where: { id_mesa: comandaActual.id_mesa },
        data: { estado: "Libre" },
      }),
    ]);

    revalidatePath("/cuenta");
    revalidatePath("/hostess");
    return { success: true };
  } catch (error) {
    console.error("Error en DB:", error);
    return {
      success: false,
      error: "No se pudo actualizar el registro del pago.",
    };
  }
}

const getPaypalBearerToken = async (): Promise<string|null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oath2Url = process.env.PAYPAL_OAUTH_URL ?? '';


  const base64Token = Buffer.from(
    `${ PAYPAL_CLIENT_ID }:${ PAYPAL_SECRET }`, 
    "utf-8"
  ).toString('base64')

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${base64Token}`,
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try{
    const result = await fetch(oath2Url, requestOptions).then((response) => response.json())
    
    return result.access_token;

  }catch(error){
    console.log(error);
    return null
  }

};

const verifyPayPalPayment = async( paypalTransactionId: string, bearerToken: string ): Promise<PayPalOrderStatus|null> =>{

const paypalOrderUrl = `${ process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

const myHeaders = new Headers();
  myHeaders.append(
  "Authorization",
  `Bearer ${ bearerToken }`,
);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

try{
  const response = await fetch(paypalOrderUrl, requestOptions).then( r => r.json());
  return response;
}catch (error){
  console.log(error);
  return null;
}


}
