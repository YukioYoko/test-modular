'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPedidosCocina() {
  return await prisma.detalleComanda.findMany({
    where: {
      status: { in: ['En espera', 'En preparacion'] },
      comanda: { estado: 'Abierta' }
    },
    include: {
      producto: true,
      aditamentos: { include: { aditamento: true } },
      comanda: { select: { id_mesa: true, fecha_hora: true } }
    },
    orderBy: { comanda: { fecha_hora: 'asc' } }
  });
}

export async function actualizarEstatusPedido(idDetalle: number, nuevoEstatus: string) {
  try {
    await prisma.detalleComanda.update({
      where: { id_detalle: idDetalle },
      data: { status: nuevoEstatus }
    });
    revalidatePath('/cocina');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}