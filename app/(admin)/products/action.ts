'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary } from '@/lib/cloudinary'

/**
 * Obtiene todos los productos para la tabla del administrador
 */
export async function getProductosAdmin() {
  try {
    const prods = await prisma.producto.findMany({
      where: { eliminado: false },
      include: {
        categoriaRel: true, 
        subcategoria: true,
        imagen: true,
        aditamentos: { include: { aditamento: true } }
      },
      orderBy: { id_producto: 'desc' }
    });
    return prods.map(p => ({ ...p, precio: Number(p.precio) }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

/**
 * Crea o actualiza un producto de forma atómica (Transacción)
 */
export async function upsertProducto(formData: FormData) {
  try {
    const id_producto_raw = formData.get('id_producto');
    // Si no hay ID, es nulo o vacío, es un producto NUEVO
    const isNew = !id_producto_raw || id_producto_raw === "null" || id_producto_raw === "";
    
    const id_categoria = Number(formData.get('id_categoria'));
    const id_subcategoria = Number(formData.get('id_subcategoria'));
    const precio = parseFloat(formData.get('precio') as string || '0');
    const tiempo_prep = parseInt(formData.get('tiempo_prep') as string || '0');

    if (isNaN(id_categoria) || isNaN(id_subcategoria)) {
      throw new Error("Categoría y Subcategoría son obligatorias.");
    }

    // 1. Procesamiento de Imágenes
    const urlsExistentes = JSON.parse(formData.get('urlsExistentes') as string || "[]");
    const imagenesArchivos = formData.getAll('imagenesArchivos') as File[];

    const nuevasUrls = await Promise.all(
      imagenesArchivos
        .filter(file => file && file.size > 0 && file.name !== 'undefined')
        .map(file => uploadToCloudinary(file))
    );

    const todasLasImagenes = [...urlsExistentes, ...nuevasUrls];

    // 2. Datos base del producto
    const dataPayload = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      precio: precio,
      id_categoria: id_categoria,
      id_subcategoria: id_subcategoria,
      tiempo_prep: tiempo_prep,
      activo: formData.get('activo') === 'on' || formData.get('activo') === 'true',
      eliminado: false,
      pasos: formData.get('pasos') as string || ""
    };

    const aditamentosIds = JSON.parse(formData.get('aditamentosIds') as string || "[]");

    // 3. Ejecución de la transacción
    const resultado = await prisma.$transaction(async (tx) => {
      let prodId: number;

      if (!isNew) {
        // ACTUALIZAR PRODUCTO EXISTENTE
        prodId = Number(id_producto_raw);
        await tx.producto.update({
          where: { id_producto: prodId },
          data: dataPayload
        });
        
        // Limpiamos relaciones para re-crearlas (Sincronización)
        await tx.productoImagen.deleteMany({ where: { id_producto: prodId } });
        await tx.productoAditamentos.deleteMany({ where: { id_producto: prodId } });
      } else {
        // CREAR PRODUCTO TOTALMENTE NUEVO
        const nuevo = await tx.producto.create({
          data: dataPayload
        });
        prodId = nuevo.id_producto;
      }

      // 4. Guardar Imágenes (Se ejecuta tanto en nuevo como en update)
      if (todasLasImagenes.length > 0) {
        await tx.productoImagen.createMany({
          data: todasLasImagenes.map(url => ({ 
            url, 
            id_producto: prodId 
          }))
        });
      }

      // 5. Guardar Aditamentos (Se ejecuta tanto en nuevo como en update)
      if (aditamentosIds.length > 0) {
        await tx.productoAditamentos.createMany({
          data: aditamentosIds.map((idA: any) => ({
            id_producto: prodId,
            id_aditamento: Number(idA)
          }))
        });
      }

      return prodId;
    });

    revalidatePath('/admin/productos');
    return { success: true, id: resultado };

  } catch (error: any) {
    console.error("Error en upsertProducto:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Borrado lógico de producto
 */
export async function deleteProducto(id: number) {
  try {
    await prisma.producto.update({ 
      where: { id_producto: id }, 
      data: { eliminado: true } 
    });
    revalidatePath('/admin/productos');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el producto" };
  }
}

/**
 * Obtener catálogos para los selects del formulario
 */
export async function getAditamentosDisponibles() {
  const adis = await prisma.aditamento.findMany({ orderBy: { nombre: 'asc' } });
  return adis.map(a => ({ ...a, precio: Number(a.precio) }));
}

export async function getSubcategoriasDisponibles() {
  return await prisma.subCategoria.findMany({ 
    include: { categoria: true },
    orderBy: { nombre: 'asc' }
  });
}