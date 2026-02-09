// app/menu/aprioriAction.ts
'use server'
import { prisma } from '@/lib/prisma';
/*
export async function getSugerenciasApriori(productoId: number) {
  try {
    // Validamos que el ID sea correcto
    if (!productoId || isNaN(productoId)) return [];

    // Cambia 'detalleOrden' por el nombre exacto que tengas en tu prisma explorer
    const ordenesConProducto = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_orden: true },
      take: 100,
    });

    // SI NO HAY ÓRDENES, devolvemos array vacío de inmediato para evitar el NULL
    if (!ordenesConProducto || ordenesConProducto.length === 0) {
      return [];
    }

    const idsOrdenes = ordenesConProducto.map((o: any) => o.id_orden);

    const productosAsociados = await (prisma as any).detalleComanda.groupBy({
      by: ['id_producto'],
      where: {
        id_orden: { in: idsOrdenes },
        id_producto: { not: productoId }
      },
      _count: { id_producto: true },
      orderBy: { _count: { id_producto: 'desc' } },
      take: 3
    });

    if (!productosAsociados || productosAsociados.length === 0) return [];

    const idsSugeridos = productosAsociados.map((p: any) => p.id_producto);
    
    const sugerencias = await prisma.producto.findMany({
      where: { id_producto: { in: idsSugeridos } }
    });

    return sugerencias.map(p => ({
      ...p,
      precio: Number(p.precio)
    }));
  } catch (error) {
    console.error("Error en Apriori:", error);
    return []; // Siempre devolver array para que el .map() del front no falle
  }
}
  */
 export async function getSugerenciasApriori(productoId: number) {
  try {
    // COMENTA TODO TU ALGORITMO TEMPORALMENTE Y PON ESTO:
    const fallback = await prisma.producto.findMany({
      where: { id_producto: { not: productoId }, estado: true },
      take: 2
    });
    
    console.log("Sugerencias encontradas:", fallback.length); // Mira esto en tu terminal de VS Code
    
    return fallback.map(p => ({
      ...p,
      precio: Number(p.precio)
    }));
  } catch (e) {
    return [];
  }
}