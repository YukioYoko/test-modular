"use server";

import { prisma } from "@/lib/prisma";
import { PayPalOrderStatus } from "@/src/interfaces";
import { revalidatePath } from "next/cache";

/**
 * Función auxiliar para obtener la fecha y hora oficial de la ciudad (Guadalajara)
 */
async function getFechaOficialAPI() {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const ciudad = "Guadalajara";
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ciudad}&aqi=no`,
      { next: { revalidate: 900 } }
    );
    const data = await res.json();
    // Convertimos el formato "YYYY-MM-DD HH:mm" a Date de JS
    const fechaString = data.location.localtime.replace(" ", "T");
    return new Date(fechaString);
  } catch (error) {
    console.error("Error obteniendo fecha de API, usando hora servidor:", error);
    return new Date(); // Fallback
  }
}

export async function registrarPagoEfectivo(
  idComanda: number,
  desglose: { sub_total: number; ivaTotal: number; total: number }
) {
  try {
    const comandaActual = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true },
    });

    if (!comandaActual) throw new Error("Comanda no encontrada");

    // OBTENER FECHA DE LA API
    const fechaOficial = await getFechaOficialAPI();

    await prisma.$transaction([
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: "Cerrada",
          pagado: true,
          fecha_pagado: fechaOficial, // <--- GUARDADO AQUÍ
          transaccion_id: `CASH-${Date.now()}`,
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
          metodo_pago: 'Efectivo',
        },
      }),
      prisma.mesa.update({
        where: { id_mesa: comandaActual.id_mesa },
        data: { estado: "Libre" },
      }),
    ]);

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

  if (!authToken) return { success: false, message: 'No se pudo obtener token de verificación' };

  const resp = await verifyPayPalPayment(transaccionId, authToken);

  if (!resp) return { success: false, message: 'Error al verificar el pago' };

  const { status } = resp;

  if (status !== 'COMPLETED') return { success: false, message: 'No se ha realizado el pago' };

  try {
    const comandaActual = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true },
    });

    if (!comandaActual) throw new Error("Comanda no encontrada");

    // OBTENER FECHA DE LA API
    const fechaOficial = await getFechaOficialAPI();

    await prisma.$transaction([
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: "Cerrada",
          pagado: true,
          fecha_pagado: fechaOficial, // <--- GUARDADO AQUÍ
          transaccion_id: transaccionId,
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
          metodo_pago: 'Tarjeta',
        },
      }),
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
    return { success: false, error: "No se pudo actualizar el registro del pago." };
  }
}

// --- HELPER FUNCTIONS PAYPAL ---

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oath2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, "utf-8").toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${base64Token}`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = { method: "POST", headers: myHeaders, body: urlencoded };

  try {
    const result = await fetch(oath2Url, requestOptions).then((response) => response.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PayPalOrderStatus | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = { method: 'GET', headers: myHeaders };

  try {
    const response = await fetch(paypalOrderUrl, requestOptions).then(r => r.json());
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};