'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    const comanda = await prisma.comandas.findFirst({
      where: {
        id_comanda: idComanda,
        token: token,
        estado: 'Abierta' 
      }
    });

    if (!comanda) {
      return { error: "La comanda no es válida o ya está cerrada" };
    }

    // 2. Usar una Transacción de Prisma
    // No uses .map() con await directamente; Promise.all o $transaction es lo correcto.
    await prisma.$transaction(
      carrito.map((item) =>
        prisma.detalle_comanda.upsert({
          where: {
            id_comanda_id_producto: {
              id_comanda: idComanda,
              id_producto: item.prod,
            },
          },
          update: {
            cantidad: { increment: item.cantidad }, // Si el mesero agrega más después
          },
          create: {
            id_comanda: idComanda,
            id_producto: item.prod,
            cantidad: item.cantidad,
            notas_especiales: item.notas || "",
            status:"En preparacion"
          },
        })
      )
    );

    revalidatePath('/menu');
    return { success: true };

  } catch (e) {
    console.error("Error en sendOrder:", e);
    return { error: "Error interno al procesar el pedido" };
  }
}