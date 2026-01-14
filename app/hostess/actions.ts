'use server'

import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache' // Importante para refrescar UI
import { Comandas } from '@/generated/prisma/client';

export async function getMesas() {
  // Consultamos todas las mesas en la base de datos
  const mesas = await prisma.mesa.findMany({
    orderBy: {
      numero_mesa: 'asc' // Ordenadas por número onClick={juntarMesas()} onClick={desactivarMesa()}
    }
  });
  return mesas;
}

export async function activarMesas(idMesa: number) {
  try {
    const table = await prisma.mesa.findUnique({
      where: { id_mesa: idMesa }
    });

    if (!table) throw new Error("La mesa no existe");

    const sessionToken = crypto.randomUUID();
    const date = new Date();

    // Actualizar estado de la mesa
    
    // Crear la comanda
    await prisma.comandas.create({
        data: {
            id_mesa: idMesa,   
            id_mesero: 1,
            estado: 'Abierta',    
            tocken: sessionToken,   
        }
    });

    await prisma.mesa.update({
      where: { id_mesa: idMesa },
      data: { estado: 'Ocupada' }
    });

    // Forzar a Next.js a refrescar la página del Hostess
    revalidatePath('/hostess');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const qrUrl = `${baseUrl}/check-in?mesa=${idMesa}&token=${sessionToken}`;

    return { 
      success: true, 
      token: sessionToken, 
      url: qrUrl 
    };

  } catch (error) {
    console.error("Error al activar mesa:", error);
    return { success: false, error: "No se pudo activar" };
  }
}

export async function desactivarMesas(idMesa: number) {
  try {
    // 1. Buscar la mesa
    const table = await prisma.mesa.findUnique({
      where: { id_mesa: idMesa }
    });

    if (!table) throw new Error("La mesa no existe");

    // 2. Buscar la comanda abierta para esa mesa
    const pedido = await prisma.comandas.findFirst({
      where: {
        id_mesa: idMesa,
        estado: 'Abierta'
      }
    });

    if (!pedido) throw new Error("No hay una comanda abierta para esta mesa");

    // 3. Actualizar la comanda usando su ID único
    await prisma.comandas.update({
      where: { 
        id_comanda: pedido.id_comanda // Usa el ID único aquí
      },
      data: {
        estado: 'Pagada',
        tocken: null
      }
    });

    // 4. Liberar la mesa
    await prisma.mesa.update({
      where: { id_mesa: idMesa },
      data: { 
        estado: 'Libre'
      }
    });
    
    revalidatePath('/hostess');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false , error};
  }
}