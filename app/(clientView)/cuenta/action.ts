'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function registrarPagoExitoso(idComanda: number, transaccionId: string, desglose: any) {
  try {
    // 1. Buscamos la comanda para saber qué mesa liberar
    const comandaActual = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true }
    });

    if (!comandaActual) throw new Error("Comanda no encontrada");

    // 2. Transacción atómica: Todo ocurre o nada ocurre
    await prisma.$transaction([
      // Marcar comanda como pagada y guardar montos
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: 'Cerrada',
          pagado: true,
          fecha_pagado: new Date(),
          transaccion_id: transaccionId,
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
        }
      }),
      // Liberar la mesa para la hostess
      prisma.mesa.update({
        where: { id_mesa: comandaActual.id_mesa },
        data: { estado: 'Libre' }
      })
    ]);

    revalidatePath('/cuenta');
    revalidatePath('/hostess'); 
    return { success: true };
  } catch (error) {
    console.error("Error en DB:", error);
    return { success: false, error: "No se pudo actualizar el registro del pago." };
  }
}