'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function upsertAditamento(formData: FormData) {
  const id_aditamento = formData.get('id_aditamento');
  const nombre = formData.get('nombre') as string;
  const precio = formData.get('precio') as string;

  try {
    const dataPayload = {
      nombre,
      precio: parseFloat(precio),
    };

    if (id_aditamento) {
      await prisma.aditamento.update({
        where: { id_aditamento: Number(id_aditamento) },
        data: dataPayload,
      });
    } else {
      await prisma.aditamento.create({
        data: dataPayload,
      });
    }

    revalidatePath('/admin/aditamentos');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al guardar el aditamento" };
  }
}

export async function getAditamentos() {
  try {
    const data = await prisma.aditamento.findMany({
      orderBy: { id_aditamento: 'desc' },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [];
  }
}

export async function deleteAditamento(id: number) {
  try {
    await prisma.aditamento.delete({
      where: { id_aditamento: id },
    });
    revalidatePath('/admin/aditamentos');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se puede eliminar porque está en uso en algún producto." };
  }
}