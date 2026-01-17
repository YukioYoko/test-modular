'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// Centralizamos la URL base
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function getMesas() {
  return await prisma.mesa.findMany({
    orderBy: { numero_mesa: 'asc' }
  });
}

export async function gestionarMesas(idsMesas: number[], operacion: 'activar' | 'juntar') {
  try {
    const sessionToken = crypto.randomUUID();
    const idReferencia = idsMesas[0];

    const resultado = await prisma.$transaction(async (tx) => {
      const veri = await tx.comandas.findFirst({
        where:{
          id_mesa: idReferencia,
          estado: 'Abierta'
        }
      })
      if (veri) return veri.token
      // 1. Actualizar mesas
      await tx.mesa.updateMany({
        where: { id_mesa: { in: idsMesas } },
        data: {
          estado: 'Ocupada',
          junta_id_mesa: operacion === 'juntar' ? idReferencia : null
        }
      });

      // 2. Crear comanda única
      const comanda = await tx.comandas.create({
        data: {
          id_mesa: idReferencia,
          id_mesero: 1, // Idealmente obtener del auth
          estado: 'Abierta',
          token: sessionToken,
        }
      });

      return comanda;
    });
    
    if(typeof(resultado) === 'string' ) {
      revalidatePath('/hostess');
      return { 
      success: true, 
      url: `${BASE_URL}/check-in?mesa=${idReferencia}&token=${resultado}` 
    };
    }
    revalidatePath('/hostess');
    
    return { 
      success: true, 
      url: `${BASE_URL}/check-in?mesa=${idReferencia}&token=${sessionToken}` 
    };
  } catch (error) {
    console.error("Error en gestión de mesas:", error);
    return { success: false, error: "No se pudo procesar la solicitud", url: "" };
  }
}

export async function liberarMesas(idMesa: number) {
  try {
    const mesa = await prisma.mesa.findUnique({ where: { id_mesa: idMesa } });
    if (!mesa || mesa.estado === 'Libre') throw new Error("Mesa no válida");

    const idReferencia = mesa.junta_id_mesa || idMesa;

    await prisma.$transaction([
      // Finalizar comanda
      prisma.comandas.updateMany({
        where: { id_mesa: idReferencia, estado: 'Abierta' },
        data: { estado: 'Pagada', token: null }
      }),
      // Liberar todas las mesas del grupo o la mesa individual
      prisma.mesa.updateMany({
        where: mesa.junta_id_mesa 
          ? { junta_id_mesa: mesa.junta_id_mesa } 
          : { id_mesa: idMesa },
        data: { estado: 'Libre', junta_id_mesa: null }
      })
    ]);

    revalidatePath('/hostess');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al liberar mesa", url:""};
  }
}