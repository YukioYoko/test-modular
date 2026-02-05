'use server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache'

export async function getPersonal() {
  // Usamos el modelo Usuario según tu esquema
  return await prisma.usuario.findMany({
    orderBy: { id: 'asc' }
  });
}

export async function upsertPersonal(formData: any) {
  const { id, usuario, email, rol, password } = formData;
  const hashedPassword = await bcrypt.hash(password, 10)

  if (rol === 'Admin') {
    return { success: false, error: "No tienes permisos para asignar el rol de Administrador." };
  }

  try {
    
    if (id) {
      // Actualización
      await prisma.usuario.update({
        where: { id: Number(id) },
        data: { 
          usuario, 
          email,
          rol, 
          ...(hashedPassword && { hashedPassword }) 
        }
      });
    } else {
      // Creación: El email es obligatorio en tu esquema
      await prisma.usuario.create({
        data: { 
          usuario, 
          email,
          rol, 
          password: hashedPassword,
        }
      });
    }
    revalidatePath('/admin/personal');
    return { success: true };
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      return { success: false, error: "El usuario o email ya existen." };
    }
    return { success: false, error: "Error al procesar la solicitud" };
  }
}

export async function eliminarPersonal(id: number) {
  try {
    await prisma.usuario.delete({ where: { id } });
    revalidatePath('/admin/personal');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el usuario." };
  }
}