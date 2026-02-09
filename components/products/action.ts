// app/menu/aprioriAction.ts
'use server'
import { prisma } from '@/lib/prisma';

export async function getSugerenciasFrecuentes(productoId: number) {
  try {
    // 1. Buscamos las últimas 100 órdenes que contienen este producto
    const ordenesConProducto = await prisma.detalleOrden.findMany({
      where: { id_producto: productoId },
      select: { id_orden: true },
      take: 100,
    });

    const idsOrdenes = ordenesConProducto.map(o => o.id_orden);

    if (idsOrdenes.length === 0) return [];

    // 2. Buscamos qué otros productos están en esas mismas órdenes (excluyendo el actual)
    // Agrupamos por productoId para contar la frecuencia
    const productosAsociados = await prisma.detalleOrden.groupBy({
      by: ['id_producto'],
      where: {
        id_orden: { in: idsOrdenes },
        id_producto: { not: productoId }
      },
      _count: {
        id_producto: true
      },
      orderBy: {
        _count: {
          id_producto: 'desc'
        }
      },
      take: 3 // Sugerimos los 3 más frecuentes
    });

    // 3. Obtenemos los detalles de esos productos para el front
    const idsSugeridos = productosAsociados.map(p => p.id_producto);
    const sugerencias = await prisma.producto.findMany({
      where: { id_producto: { in: idsSugeridos } }
    });

    return sugerencias;
  } catch (error) {
    console.error("Error en Apriori:", error);
    return [];
  }
}