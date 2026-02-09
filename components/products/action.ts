// components/products/action.ts
'use server'
import { prisma } from '@/lib/prisma';
import { Producto } from '@prisma/client'; // <--- Importamos el tipo generado

export async function getSugerenciasApriori(productoId: number) {
  try {
    if (!productoId || isNaN(productoId)) return [];

    const comandasConProducto = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_comanda: true },
      take: 100,
    });

    const idsComandas = comandasConProducto.map((o: any) => o.id_comanda);

    // SOLUCIÓN: Definimos el tipo explícitamente como un array de Producto
    let sugerenciasFinales: Producto[] = [];

    if (idsComandas.length > 0) {
      const productosAsociados = await (prisma as any).detalleComanda.groupBy({
        by: ['id_producto'],
        where: {
          id_comanda: { in: idsComandas },
          id_producto: { not: productoId }
        },
        _count: { id_producto: true },
        orderBy: { _count: { id_producto: 'desc' } },
        take: 2
      });

      const idsSugeridos = productosAsociados.map((p: any) => p.id_producto);

      if (idsSugeridos.length > 0) {
        sugerenciasFinales = await prisma.producto.findMany({
          where: { id_producto: { in: idsSugeridos }, estado: true }
        });
      }
    }

    if (sugerenciasFinales.length === 0) {
      sugerenciasFinales = await prisma.producto.findMany({
        where: { 
          id_producto: { not: productoId },
          estado: true 
        },
        take: 2
      });
    }

    return sugerenciasFinales.map(p => ({
      ...p,
      precio: Number(p.precio),
    }));

  } catch (error) {
    console.error("Error crítico en Minería Apriori:", error);
    return [];
  }
}