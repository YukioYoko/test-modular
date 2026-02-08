'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function upsertProducto(formData: FormData) {
  const id_producto = formData.get('id_producto');
  const nombre = formData.get('nombre') as string;
  const precio = formData.get('precio') as string;
  const categoria = formData.get('categoria') as string;
  const tiempo_prep = formData.get('tiempo_prep') as string;
  
  // --- 1. CAPTURAR LA DESCRIPCIÓN ---
  const descripcion = formData.get('descripcion') as string;
  
  const aditamentosIds = JSON.parse(formData.get('aditamentosIds') as string || "[]");
  const imagenesArchivos = formData.getAll('imagenesArchivos') as File[];
  const urlsExistentes = JSON.parse(formData.get('urlsExistentes') as string || "[]");

  try {
    const nuevasUrls = await Promise.all(
      imagenesArchivos
        .filter(file => file && file.size > 0 && file.name !== 'undefined')
        .map(file => uploadToCloudinary(file))
    );

    const todasLasImagenes = [...urlsExistentes, ...nuevasUrls];

    // --- 2. INCLUIRLA EN EL PAYLOAD ---
    const dataPayload = {
      nombre,
      descripcion, // <--- Se agrega aquí para que Prisma la vea
      precio: parseFloat(precio),
      categoria,
      tiempo_prep: parseInt(tiempo_prep || '0'),
      activo: true,
      eliminado: false
    };

    await prisma.$transaction(async (tx) => {
      let prodId: number;

      if (id_producto) {
        prodId = Number(id_producto);
        await tx.producto.update({ where: { id_producto: prodId }, data: dataPayload });
        await tx.productoImagen.deleteMany({ where: { id_producto: prodId } });
      } else {
        const nuevo = await tx.producto.create({ data: dataPayload });
        prodId = nuevo.id_producto;
      }

      if (todasLasImagenes.length > 0) {
        await tx.productoImagen.createMany({
          data: todasLasImagenes.map(url => ({ url, id_producto: prodId }))
        });
      }

      await tx.productoAditamentos.deleteMany({ where: { id_producto: prodId } });
      if (aditamentosIds.length > 0) {
        await tx.productoAditamentos.createMany({
          data: aditamentosIds.map((idA: any) => ({
            id_producto: prodId,
            id_aditamento: Number(idA)
          }))
        });
      }
    });

    revalidatePath('/admin/productos');
    return { success: true };
  } catch (error) {
    console.error("Error en upsert:", error);
    return { success: false, error: "Error al procesar el producto." };
  }
}

export async function getProductosAdmin() {
  try {
    const productos = await prisma.producto.findMany({
      where: { eliminado: false },
      include: {
        imagen: true,
        aditamentos: { include: { aditamento: true } }
      },
      orderBy: { id_producto: 'desc' }
    });
    return JSON.parse(JSON.stringify(productos));
  } catch (error) {
    return [];
  }
}

export async function getAditamentosDisponibles() {
  const aditamentos = await prisma.aditamento.findMany({ orderBy: { nombre: 'asc' } });
  return JSON.parse(JSON.stringify(aditamentos));
}

export async function deleteProducto(id: number) {
  await prisma.producto.update({
    where: { id_producto: id },
    data: { eliminado: true, activo: false }
  });
  revalidatePath('/admin/productos');
  return { success: true };
}