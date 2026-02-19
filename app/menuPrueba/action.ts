'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // Importante para el bloqueo
import crypto from 'crypto';

export async function iniciarSesionPrueba() {
  const ID_MESA_PRUEBA = 6; 
  const ID_MESERO_ASIGNADO = 1; 
  
  const cookieStore = await cookies();
  
  // 1. Verificar si ya hay una creación en curso para este usuario
  if (cookieStore.get('creando_comanda')) {
    return { error: "Ya se está generando tu comanda, por favor espera un momento." };
  }

  // 2. Poner el "candado" (expira en 15 segundos por seguridad)
  cookieStore.set('creando_comanda', 'true', { maxAge: 15 });

  let redirectPath = '';

  try {
    const token = crypto.randomUUID();

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

    redirectPath = `/menu?comanda=${nuevaComanda.id_comanda}&token=${token}`;
    
    // 3. Si tuvo éxito, borramos el candado justo antes de redirigir
    cookieStore.delete('creando_comanda');

  } catch (error) {
    // Si hubo un error, borramos el candado para que el usuario pueda reintentar
    cookieStore.delete('creando_comanda');
    console.error("Error al crear comanda de prueba:", error);
    return { error: "No se pudo iniciar el modo prueba. Reintenta en unos segundos." };
  }

  // Redirigimos fuera del catch
  if (redirectPath) {
    redirect(redirectPath);
  }
}