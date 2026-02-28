'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';

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
    return new Date(); // Fallback si la API falla
  }
}

export async function iniciarSesionPrueba() {
  const ID_MESA_PRUEBA = 6; 
  const ID_MESERO_ASIGNADO = 1; 
  
  const cookieStore = await cookies();
  
  // 1. Verificar bloqueo por cookies para evitar duplicados
  if (cookieStore.get('creando_comanda')) {
    return { error: "Ya se está generando tu comanda, por favor espera un momento." };
  }

  // 2. Poner el "candado" (expira en 15 segundos)
  cookieStore.set('creando_comanda', 'true', { maxAge: 15 });

  let redirectPath = '';

  try {
    const token = crypto.randomUUID();
    
    // OBTENEMOS LA FECHA DE LA API
    const fechaApertura = await getFechaOficialAPI();

    const nuevaComanda = await (prisma as any).comandas.create({
      data: {
        id_mesa: ID_MESA_PRUEBA,
        id_mesero: ID_MESERO_ASIGNADO,
        token: token,
        estado: 'Abierta',
        fecha_hora: fechaApertura, // Usamos la fecha oficial
        pagado: false,
        total: 0,
        sub_total: 0,
        impuestos: 0
      }
    });

    redirectPath = `/menu?comanda=${nuevaComanda.id_comanda}&token=${token}`;
    
    // 3. Limpiar candado
    cookieStore.delete('creando_comanda');

  } catch (error) {
    cookieStore.delete('creando_comanda');
    console.error("Error al crear comanda de prueba:", error);
    return { error: "No se pudo iniciar el modo prueba. Reintenta en unos segundos." };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
}