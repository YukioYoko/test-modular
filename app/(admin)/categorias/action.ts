'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * CATEGORÍAS PADRE
 */
export async function getCategorias() {
  try {
    return await prisma.categoria.findMany({
      orderBy: { id_categoria: 'asc' }
    });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

export async function upsertCategoria({ nombre, id }: { nombre: string; id?: number }) {
  try {
    if (id) {
      await prisma.categoria.update({
        where: { id_categoria: id },
        data: { nombre }
      });
    } else {
      // Sincronizar secuencia para evitar errores de ID duplicado
      await prisma.$executeRaw`SELECT setval('categorias_id_categoria_seq', (SELECT MAX(id_categoria) FROM categorias))`;
      await prisma.categoria.create({
        data: { nombre }
      });
    }
    revalidatePath('/admin/categorias');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Error al guardar la categoría." };
  }
}

/**
 * SUBCATEGORÍAS
 */
export async function getSubCategorias() {
  try {
    return await prisma.subCategoria.findMany({
      include: { 
        categoria: true // Incluye los datos del padre
      },
      orderBy: { id_subcategoria: 'asc' }
    });
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    return [];
  }
}

export async function upsertSubCategoria({ nombre, id_categoria, id }: { nombre: string; id_categoria: number; id?: number }) {
  try {
    if (id) {
      await prisma.subCategoria.update({
        where: { id_subcategoria: id },
        data: { nombre, id_categoria }
      });
    } else {
      // Sincronizar secuencia
      await prisma.$executeRaw`SELECT setval('subcategorias_id_subcategoria_seq', (SELECT MAX(id_subcategoria) FROM subcategorias))`;
      await prisma.subCategoria.create({
        data: { nombre, id_categoria }
      });
    }
    revalidatePath('/admin/categorias');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Error al guardar la subcategoría." };
  }
}

export async function eliminarSubCategoria(id: number) {
  try {
    await prisma.subCategoria.delete({
      where: { id_subcategoria: id }
    });
    revalidatePath('/admin/categorias');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se puede eliminar: comprueba que no tenga productos asociados." };
  }
}