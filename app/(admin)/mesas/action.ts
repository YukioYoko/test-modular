'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMesasAdmin() {
  return await prisma.mesa.findMany({
    orderBy: { numero_mesa: 'asc' }
  });
}

export async function upsertMesa(formData: any) {
  const { id_mesa, numero_mesa, capacidad } = formData;
  const num = parseInt(numero_mesa);
  const cap = parseInt(capacidad);

  try {
    if (id_mesa) {
      await prisma.mesa.update({
        where: { id_mesa: Number(id_mesa) },
        data: { numero_mesa: num, capacidad: cap }
      });
    } else {
      await prisma.mesa.create({
        data: { numero_mesa: num, capacidad: cap, estado: 'Libre' }
      });
    }
    revalidatePath('/admin/mesas');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error: El número de mesa ya existe o los datos son inválidos." };
  }
}

export async function eliminarMesa(id_mesa: number) {
  try {
    await prisma.mesa.delete({ where: { id_mesa } });
    revalidatePath('/admin/mesas');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se puede eliminar una mesa con historial de comandas." };
  }
}