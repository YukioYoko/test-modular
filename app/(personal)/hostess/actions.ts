'use server'
import "dotenv/config";
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// Centralizamos la URL base
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Obtiene la fecha y hora oficial de Guadalajara desde la API de clima.
 */
async function getFechaOficialAPI() {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const ciudad = "Guadalajara";
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ciudad}&aqi=no`,
      { next: { revalidate: 900 } }
    );
    const data = await res.json();
    // Convertimos el formato "YYYY-MM-DD HH:mm" a un objeto Date de JS
    const fechaString = data.location.localtime.replace(" ", "T");
    return new Date(fechaString);
  } catch (error) {
    console.error("Error obteniendo fecha de API, usando hora servidor:", error);
    return new Date(); // Fallback
  }
}

export async function getMesas() {
  return await prisma.mesa.findMany({
    orderBy: { numero_mesa: 'asc' }
  });
}

export async function gestionarMesas(idsMesas: number[], operacion: 'activar' | 'juntar') {
  try {
    const sessionToken = crypto.randomUUID();
    const idReferencia = idsMesas[0];
    
    // Obtenemos la fecha de la API antes de entrar a la transacción
    const fechaApertura = await getFechaOficialAPI();

    const resultado = await prisma.$transaction(async (tx) => {
      const veri = await tx.comandas.findFirst({
        where: {
          id_mesa: idReferencia,
          estado: 'Abierta'
        }
      })
      
      if (veri) return veri.token;

      // 1. Actualizar mesas
      await tx.mesa.updateMany({
        where: { id_mesa: { in: idsMesas } },
        data: {
          estado: 'Ocupada',
          junta_id_mesa: operacion === 'juntar' ? idReferencia : null
        }
      });

      // 2. Crear comanda única con la fecha de la API
      const comanda = await tx.comandas.create({
        data: {
          id_mesa: idReferencia,
          id_mesero: 1, // Idealmente obtener del auth
          estado: 'Abierta',
          token: sessionToken,
          fecha_hora: fechaApertura, // <--- FECHA DE LA API
          total: 0,
          sub_total: 0,
          impuestos: 0,
          pagado: false
        }
      });

      return comanda;
    });
    
    revalidatePath('/hostess');

    if (typeof (resultado) === 'string') {
      return { 
        success: true, 
        url: `${BASE_URL}/check-in?mesa=${idReferencia}&token=${resultado}` 
      };
    }
    
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
    console.error("Error al liberar mesa:", error);
    return { success: false, error: "Error al liberar mesa", url:""};
  }
}