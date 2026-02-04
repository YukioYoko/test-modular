'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function upsertPersonal(formData: any) {
  const { id, usuario, rol, password } = formData;

  // BLOQUEO DE SEGURIDAD: No permitir asignar 'Admin' desde esta acción
  if (rol === 'Admin') {
    return { success: false, error: "No tienes permisos para asignar el rol de Administrador." };
  }

  try {
    if (id) {
      await prisma.usuario.update({
        where: { id: Number(id) },
        data: { 
          usuario, 
          rol, 
          ...(password && { password }) 
        }
      });
    } else {
      await prisma.usuario.create({
        data: { usuario, rol, password }
      });
    }
    revalidatePath('/admin/personal');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al procesar la solicitud" };
  }
}