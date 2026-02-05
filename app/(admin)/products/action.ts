'use server'

import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/index-browser';
import { revalidatePath } from 'next/cache'

/**
 * Obtiene todos los productos que no han sido eliminados lógicamente.
 * Se limpian los datos (Decimal -> Number) para evitar errores de serialización.
 */
export async function getProductosAdmin() {
  try {
    const productos = await prisma.producto.findMany({
      where: { eliminado: false },
      include: {
        imagen: true,
        aditamentos: {
          include: {
            aditamento: true
          }
        }
      },
      orderBy: { id_producto: 'asc' }
    });

    // Serialización para evitar el error "Plain Object": 
    // Convierte Decimals a Strings/Numbers y Fechas a Strings ISO.
    return JSON.parse(JSON.stringify(productos));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

/**
 * Obtiene la lista global de aditamentos disponibles en el sistema.
 */
export async function getAditamentosDisponibles() {
  try {
    const aditamentos = await prisma.aditamento.findMany({
      orderBy: { nombre: 'asc' }
    });
    return JSON.parse(JSON.stringify(aditamentos));
  } catch (error) {
    console.error("Error al obtener aditamentos:", error);
    return [];
  }
}

/**
 * Crea o actualiza un producto junto con sus imágenes y relaciones de aditamentos.
 */
export async function upsertProducto(data: any) {
  const { 
    id_producto, 
    nombre, 
    precio, 
    categoria, 
    descripcion, 
    tiempo_prep, 
    imagenes, 
    aditamentosIds,
    activo 
  } = data;

  const dataPayload = {
    nombre,
    precio: parseFloat(precio),
    categoria,
    descripcion,
    tiempo_prep: parseInt(tiempo_prep || 0),
    activo: activo !== undefined ? activo : true,
  };

  try {
    await prisma.$transaction(async (tx) => {
      let producto: { id_producto: number; nombre: string; precio: Decimal; categoria: string; descripcion: string | null; tiempo_prep: number; pasos: string | null; eliminado: boolean; activo: boolean; };

      if (id_producto) {
        // 1. Actualizar Producto
        producto = await tx.producto.update({
          where: { id_producto: Number(id_producto) },
          data: dataPayload
        });

        // 2. Actualizar Imágenes (Borrar y Reemplazar)
        await tx.productoImagen.deleteMany({ where: { id_producto: producto.id_producto } });
        if (imagenes && imagenes.length > 0) {
          await tx.productoImagen.createMany({
            data: imagenes.map((url: string) => ({ url, id_producto: producto.id_producto }))
          });
        }

        // 3. Actualizar Aditamentos (Borrar y Reemplazar)
        await tx.productoAditamentos.deleteMany({ where: { id_producto: producto.id_producto } });
        if (aditamentosIds && aditamentosIds.length > 0) {
          await tx.productoAditamentos.createMany({
            data: aditamentosIds.map((idA: any) => ({
              id_producto: producto.id_producto,
              id_aditamento: Number(idA)
            }))
          });
        }
      } else {
        // Crear Producto Nuevo con relaciones anidadas
        await tx.producto.create({
          data: {
            ...dataPayload,
            imagen: {
              create: imagenes.map((url: string) => ({ url }))
            },
            aditamentos: {
              create: aditamentosIds.map((idA: any) => ({
                id_aditamento: Number(idA)
              }))
            }
          }
        });
      }
    });

    revalidatePath('/admin/productos');
    return { success: true };
  } catch (error) {
    console.error("Error en upsertProducto:", error);
    return { success: false, error: "Error interno al guardar." };
  }
}

/**
 * Borrado Lógico (Soft Delete): No elimina de la DB, solo marca como eliminado.
 */
export async function deleteProducto(id: number) {
  try {
    await prisma.producto.update({
      where: { id_producto: Number(id) },
      data: { 
        eliminado: true,
        activo: false 
      }
    });
    revalidatePath('/admin/productos');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar." };
  }
}

/**
 * Cambia la disponibilidad (activo/inactivo) sin borrar el producto.
 */
export async function toggleStatusProducto(id: number, currentStatus: boolean) {
  try {
    await prisma.producto.update({
      where: { id_producto: Number(id) },
      data: { activo: !currentStatus }
    });
    revalidatePath('/admin/productos');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}