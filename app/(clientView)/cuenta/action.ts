'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function registrarPagoExitoso(idComanda: number, transaccionId: string, desglose: any) {
  try {
    // Buscamos la comanda para obtener el ID de la mesa antes de cerrar
    const comanda = await prisma.comandas.findUnique({
      where: { id_comanda: idComanda },
      select: { id_mesa: true }
    });

    if (!comanda) throw new Error("Comanda no encontrada");

    // Ejecutamos ambas actualizaciones en una transacción
    await prisma.$transaction([
      prisma.comandas.update({
        where: { id_comanda: idComanda },
        data: {
          estado: 'Cerrada',
          token: null,
          pagado: true,
          fecha_pagado: new Date(),
          transaccion_id: transaccionId,
          sub_total: desglose.sub_total,
          impuestos: desglose.ivaTotal,
          total: desglose.total,
        }
      }),
      prisma.mesa.update({
        where: { id_mesa: comanda.id_mesa },
        data: { estado: 'Libre' } // Liberamos la mesa para nuevos clientes
      })
    ]);

    revalidatePath('/cuenta');
    revalidatePath('/hostess'); // Actualiza la vista del hostess
    return { success: true };
  } catch (error) {
    console.error("Error en registrarPagoExitoso:", error);
    return { success: false, error: "Error al actualizar la base de datos" };
  }
}