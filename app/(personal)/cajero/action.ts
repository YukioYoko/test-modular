'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Procesa el pago, cierra la comanda y libera la mesa en una sola transacción.
 */
export async function confirmarPagoCaja(id_comanda: number, metodo: string = 'Efectivo') {
  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const comanda = await tx.comandas.findUnique({
        where: { id_comanda },
        include: { mesa: true, detalles: { include: { producto: true } } }
      });

      if (!comanda) throw new Error("Comanda no encontrada");
      if (comanda.pagado) throw new Error("Esta comanda ya ha sido liquidada");

      // 1. Marcar como pagado
      const actualizada = await tx.comandas.update({
        where: { id_comanda },
        data: {
          pagado: true,
          estado: 'Cerrada',
          fecha_pagado: new Date(),
          metodo_pago: metodo
        },
        include: { mesa: true, detalles: { include: { producto: true } } }
      });

      // 2. Liberar mesa
      await tx.mesa.update({
        where: { id_mesa: comanda.id_mesa },
        data: { estado: 'Libre' }
      });

      return actualizada;
    });

    revalidatePath('/admin/ventas');
    revalidatePath('/hostess');
    
    // Generar el link de WhatsApp automáticamente tras el éxito
    const waLink = generarLinkWhatsApp(resultado);
    
    return { success: true, data: resultado, waLink };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function buscarComandaParaCobro(id_comanda: number) {
  try {
    return await prisma.comandas.findUnique({
      where: { id_comanda },
      include: {
        mesa: true,
        detalles: { include: { producto: true } }
      }
    });
  } catch { return null; }
}

function generarLinkWhatsApp(comanda: any) {
  const logo = "🍴 *FOODLIFY - TICKET DIGITAL* 🍴";
  let msg = `${logo}%0A%0A`;
  msg += `*Mesa:* ${comanda.mesa.numero_mesa}%0A`;
  msg += `*Folio:* #${comanda.id_comanda}%0A`;
  msg += `--------------------------%0A`;
  
  comanda.detalles.forEach((d: any) => {
    msg += `${d.cantidad}x ${d.producto.nombre} - $${(Number(d.producto.precio) * d.cantidad).toFixed(2)}%0A`;
  });
  
  msg += `--------------------------%0A`;
  msg += `*TOTAL PAGADO: $${comanda.total.toFixed(2)}* ✅%0A%0A`;
  msg += `_¡Gracias por tu preferencia!_`;

  return `https://wa.me/?text=${msg}`;
}