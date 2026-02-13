'use server'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

export async function iniciarSesionPrueba() {
  // 1. Definimos una mesa de prueba (asegúrate de que exista en tu tabla Mesa)
  const ID_MESA_PRUEBA = 1; 

  try {
    // 2. Generamos un token único aleatorio
    const token = crypto.randomBytes(16).toString('hex');

    // 3. Creamos la comanda en la base de datos
    const nuevaComanda = await prisma.comandas.create({
      data: {
        id_mesa: ID_MESA_PRUEBA,
        token: token,
        estado: 'Abierta',
        fecha_hora: new Date(),
        pagado: false,
        total: 0,
        sub_total: 0,
        impuestos: 0
      }
    });

    // 4. Redirigimos al menú normal con las credenciales creadas
    // Esto reutiliza toda tu lógica de seguridad de /menu
    redirect(`/menu?comanda=${nuevaComanda.id_comanda}&token=${token}`);

  } catch (error) {
    console.error("Error al crear comanda de prueba:", error);
    return { error: "No se pudo iniciar el modo prueba." };
  }
}