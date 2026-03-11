'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { io, Socket } from 'socket.io-client';
import {  useRef } from "react";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export async function confirmarPagoCaja(id_comanda: number, telefono?: string, metodo: string = 'Efectivo') {
  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const comanda = await tx.comandas.findUnique({
        where: { id_comanda },
        include: { mesa: true, detalles: { include: { producto: true } } }
      });

      if (!comanda) throw new Error("Comanda no encontrada");
      if (comanda.pagado) throw new Error("Esta comanda ya ha sido liquidada");

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

      // Asegúrate que el modelo sea 'mesa' o 'mesas' según tu schema
      await tx.mesa.update({
        where: { id_mesa: comanda.id_mesa },
        data: { estado: 'Libre' }
      });

      return actualizada;
    });
    const socketRef = useRef<Socket | null>(null);
    socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current.emit("order_pay", { comanda: resultado });
    revalidatePath('/admin/ventas');
    revalidatePath('/hostess');
    //revalidatePath(`/menu?comanda=${resultado.id_comanda}&token=${resultado.token}`);
    //revalidatePath(`/cuenta?comanda=${resultado.id_comanda}&token=${resultado.token}`);
    // Generar el link con el nuevo formato seguro
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

function generarLinkWhatsApp(comanda: any, telefono?: string) {
  // Construimos el mensaje en texto plano primero
  const logo = "🍴 *FOODLIFY - TICKET DIGITAL* 🍴";
  let textoPlano = `${logo}\n\n`;
  textoPlano += `*Mesa:* ${comanda.mesa?.numero_mesa || 'N/A'}\n`;
  textoPlano += `*Folio:* #${comanda.id_comanda}\n`;
  textoPlano += `--------------------------\n`;
  
  if (comanda.detalles && comanda.detalles.length > 0) {
    comanda.detalles.forEach((d: any) => {
      const nombre = d.producto.nombre;
      const subtotal = (Number(d.producto.precio) * d.cantidad).toFixed(2);
      textoPlano += `${d.cantidad}x ${nombre} - $${subtotal}\n`;
    });
  } else {
    textoPlano += `(No hay detalles registrados)\n`;
  }
  
  textoPlano += `--------------------------\n`;
  textoPlano += `*TOTAL PAGADO: $${Number(comanda.total).toFixed(2)}* ✅\n\n`;
  textoPlano += `_¡Gracias por tu preferencia!_`;

  // CODIFICAMOS el mensaje para que sea seguro en una URL
  const mensajeCodificado = encodeURIComponent(textoPlano);

  const numLimpio = telefono ? telefono.replace(/\D/g, '') : "";
  
  if (numLimpio) {
    const telFinal = numLimpio.length === 10 ? `52${numLimpio}` : numLimpio;
    return `https://wa.me/${telFinal}?text=${mensajeCodificado}`;
  }
  
  return `https://wa.me/?text=${mensajeCodificado}`;
}