'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Procesa el pago, cierra la comanda y libera la mesa.
 * Ahora recibe opcionalmente el teléfono para generar el link directo.
 */
export async function confirmarPagoCaja(id_comanda: number, telefono?: string, metodo: string = 'Efectivo') {
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

      // 2. Liberar mesa (Corregido a 'mesas' según tu esquema Prisma)
      await tx.mesas.update({
        where: { id_mesa: comanda.id_mesa },
        data: { estado: 'Libre' }
      });

      return actualizada;
    });

    revalidatePath('/admin/ventas');
    revalidatePath('/hostess');
    
    // Generar el link con el teléfono si fue proporcionado
    const waLink = generarLinkWhatsApp(resultado, telefono);
    
    return { success: true, data: resultado, waLink };
  } catch (error: any) {
    console.error("Error en confirmarPagoCaja:", error.message);
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

/**
 * Crea el link de WhatsApp con formato profesional.
 */
function generarLinkWhatsApp(comanda: any, telefono?: string) {
  const logo = "🍴 *FOODLIFY - TICKET DIGITAL* 🍴";
  let msg = `${logo}%0A%0A`;
  msg += `*Mesa:* ${comanda.mesa?.numero_mesa || 'N/A'}%0A`;
  msg += `*Folio:* #${comanda.id_comanda}%0A`;
  msg += `--------------------------%0A`;
  
  comanda.detalles.forEach((d: any) => {
    const nombre = d.producto.nombre;
    const subtotal = (Number(d.producto.precio) * d.cantidad).toFixed(2);
    msg += `${d.cantidad}x ${nombre} - $${subtotal}%0A`;
  });
  
  msg += `--------------------------%0A`;
  msg += `*TOTAL PAGADO: $${Number(comanda.total).toFixed(2)}* ✅%0A%0A`;
  msg += `_¡Gracias por tu preferencia!_`;

  // Limpiar el teléfono (solo números)
  const numLimpio = telefono ? telefono.replace(/\D/g, '') : "";
  
  // Si hay teléfono, enviamos a wa.me/numero, si no, solo el texto
  if (numLimpio) {
    // Si el número no tiene código de país, asumimos México (52)
    const telFinal = numLimpio.length === 10 ? `52${numLimpio}` : numLimpio;
    return `https://wa.me/${telFinal}?text=${msg}`;
  }
  
  return `https://wa.me/?text=${msg}`;
}