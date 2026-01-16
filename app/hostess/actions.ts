// app/hostess/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'


export async function getMesas() {
  // Consultamos todas las mesas en la base de datos
  const mesas = await prisma.mesa.findMany({
    orderBy: {
      numero_mesa: 'asc' // Ordenadas por número onClick={juntarMesas()} onClick={desactivarMesa()}
    }
  });
  return mesas;
}

export async function juntarMesas(idsMesas: number[]) {
  try {
    const sessionToken = crypto.randomUUID();
    
    // Usamos el primer ID como referencia para el junta_id_mesa
    const juntaId = idsMesas[0];

    // 1. Actualizar todas las mesas del grupo
    await prisma.mesa.updateMany({
      where: { id_mesa: { in: idsMesas } },
      data: {
        estado: 'Ocupada',
        junta_id_mesa: juntaId // Todas comparten el mismo ID de grupo
      }
    });

    // 2. Crear UNA sola comanda para el grupo
    // Nota: Guardamos el juntaId en id_mesa de la comanda para identificar el grupo
    await prisma.comandas.create({
      data: {
        id_mesa: juntaId,
        id_mesero: 1,
        estado: 'Abierta',
        token: sessionToken,
        fecha_hora: new Date()
      }
    });

    revalidatePath('/hostess');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // El QR mandará a la mesa principal del grupo
    const qrUrl = `${baseUrl}/check-in?mesa=${juntaId}&token=${sessionToken}`;

    return { success: true, url: qrUrl };
  } catch (error) {
    return { success: false, error: "Error al juntar mesas" };
  }
}

export async function verificacion(idMesa: number) {
  try {
    // 1. Buscamos la mesa para ver si pertenece a un grupo
    const mesa = await prisma.mesa.findUnique({ where: { id_mesa: idMesa } });
    if (!mesa) throw new Error("Mesa no encontrada");

    if (mesa.estado !== 'Libre') return true ;
    else return false;
  } catch (error) {
    return false;
  }
}

export async function desactivarMesas(idMesa: number) {
  try {
    // 1. Buscamos la mesa para ver si pertenece a un grupo
    const mesa = await prisma.mesa.findUnique({ where: { id_mesa: idMesa } });
    if (!mesa) throw new Error("Mesa no encontrada");
    if(mesa.estado === "Libre") throw new Error("La mesa no esta ocupada");
    // Si tiene junta_id_mesa, liberamos a todas las que tengan ese ID
    const criteria = mesa.junta_id_mesa 
      ? { junta_id_mesa: mesa.junta_id_mesa } 
      : { id_mesa: idMesa };


    const comanda = await prisma.comandas.findFirst({ where: { id_mesa: idMesa } });
    // 2. Actualizamos la(s) comanda(s) relacionada(s)
    const idComandaReferencia = mesa.junta_id_mesa || idMesa;
    await prisma.comandas.updateMany({
      where: { id_mesa: idComandaReferencia, estado: 'Abierta' },
      data: { estado: 'Pagada', token: null}
    });

    // 3. Liberamos las mesas
    await prisma.mesa.updateMany({
      where: criteria,
      data: {
        estado: 'Libre',
        junta_id_mesa: null // Limpiamos el grupo
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    revalidatePath('/hostess');
    revalidatePath(`${baseUrl}/menu=${comanda?.id_comanda}&token=${comanda?.token}`);

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al desactivar" };
  }
}


export async function activarMesas(idMesa: number) {
  try {
    const table = await prisma.mesa.findUnique({
      where: { id_mesa: idMesa }
    });

    if (!table) throw new Error("La mesa no existe");
    
    if(table.estado === "Ocupada") throw new Error("La mesa ya esta ocupada");
    const sessionToken = crypto.randomUUID();
    

    // Actualizar estado de la mesa
    
    // Crear la comanda
    await prisma.comandas.create({
        data: {
            id_mesa: idMesa,   
            id_mesero: 1,
            estado: 'Abierta',    
            token: sessionToken,   
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
