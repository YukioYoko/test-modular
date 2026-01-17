'use server'
// action.ts
import { prisma } from '@/lib/prisma';
//import { revalidatePath } from 'next/cache';

export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada" };

    await prisma.$transaction(async (tx) => {
  for (const item of carrito) {
    const nuevoDetalle = await tx.detalleComanda.create({
      data: {
        id_comanda: idComanda,
        id_producto: item.prod,
        cantidad: item.cantidad,
        notas_especiales: item.nota,
        status: "En espera"
      }
    });

    if (item.aditamentos?.length > 0) {
  await tx.comandaAditamentos.createMany({
    data: item.aditamentos.map((idAdi: number) => ({
      id_detalle: nuevoDetalle.id_detalle, // ¡IMPORTANTE! Debe ser el ID del detalle que acabas de crear
      id_aditamento: idAdi,
      // id_comanda: idComanda, // Generalmente esto no va aquí si ya está ligado al detalle
      confirmacion: true
    }))
  });
}
  }
});

    return { success: true };
  } catch (e) {
    return { error: "Error al guardar el pedido" };
  }
}