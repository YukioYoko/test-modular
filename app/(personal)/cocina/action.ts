// app/cocina/action.ts
'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPedidosCocina() {
  const pedidos = await prisma.detalleComanda.findMany({
    where: {
      status: { in: ['En espera', 'En preparacion'] },
      comanda: { estado: 'Abierta' }
    },
    include: {
      producto: true,
      aditamentos: { include: { aditamento: true } },
      comanda: { select: { id_mesa: true, fecha_hora: true, mesero: { select: { nombre: true } } } }
    },
    orderBy: { comanda: { fecha_hora: 'asc' } }
  });

  // Convertimos los objetos Decimal a números normales para que Next.js pueda serializarlos
  return pedidos.map(pedido => ({
    ...pedido,
    producto: {
      ...pedido.producto,
      precio: Number(pedido.producto.precio) // Convierte Decimal a Number
    },
    aditamentos: pedido.aditamentos.map(a => ({
      ...a,
      aditamento: {
        ...a.aditamento,
        precio: Number(a.aditamento.precio) // Convierte Decimal a Number
      }
    }))
  }));
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