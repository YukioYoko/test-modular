'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

export async function iniciarSesionPrueba() {
  const ID_MESA_PRUEBA = 99; 
  const ID_MESERO_ASIGNADO = 1; 

  try {
    const token = crypto.randomBytes(16).toString('hex');

    const nuevaComanda = await (prisma as any).comandas.create({
      data: {
        id_mesa: ID_MESA_PRUEBA,
        id_mesero: ID_MESERO_ASIGNADO,
        token: token,
        estado: 'Abierta',
        fecha_hora: new Date(),
        pagado: false,
        total: 0,
        sub_total: 0,
        impuestos: 0
      }
    });

    // El redirect debe estar FUERA del bloque try/catch o manejado específicamente
    // porque Next.js lanza un error especial para redirigir.
    var redirectPath = `/menu?comanda=${nuevaComanda.id_comanda}&token=${token}`;
    
  } catch (error) {
    console.error("Error al crear comanda de prueba:", error);
    return { error: "No se pudo iniciar el modo prueba. Verifica IDs en DB." };
  }

  // Redirigimos aquí, fuera del catch
  redirect(redirectPath);
}