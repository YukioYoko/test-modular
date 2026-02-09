// components/products/action.ts
'use server'
import { prisma } from '@/lib/prisma';

export async function getSugerenciasApriori(productoId: number) {
  try {
    // 1. Validación básica
    if (!productoId || isNaN(productoId)) return [];

    // 2. ALGORITMO APRIORI (Búsqueda de asociaciones)
    // Buscamos las últimas 100 comandas donde apareció este producto
    // Nota: Asegúrate que el nombre sea 'detalleComanda' o 'detalleOrden' según tu DB
    const comandasConProducto = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_comanda: true },
      take: 100,
    });

    const idsComandas = comandasConProducto.map((o: any) => o.id_comanda);

    let sugerenciasFinales: any[] = [];

    if (idsComandas.length > 0) {
      // Buscamos qué otros productos estaban en esas mismas comandas
      const productosAsociados = await (prisma as any).detalleComanda.groupBy({
        by: ['id_producto'],
        where: {
          id_comanda: { in: idsComandas },
          id_producto: { not: productoId } // No sugerir el mismo producto
        },
        _count: { id_producto: true },
        orderBy: { _count: { id_producto: 'desc' } }, // El más frecuente primero
        take: 2 // Sugerimos los 2 mejores compañeros
      });

      const idsSugeridos = productosAsociados.map((p: any) => p.id_producto);

      if (idsSugeridos.length > 0) {
        sugerenciasFinales = await prisma.producto.findMany({
          where: { id_producto: { in: idsSugeridos }, estado: true }
        });
      }
    }

    // 3. FALLBACK (Respaldo por falta de historial)
    // Si el algoritmo no encontró nada (tienda nueva), sugerimos productos al azar
    if (sugerenciasFinales.length === 0) {
      sugerenciasFinales = await prisma.producto.findMany({
        where: { 
          id_producto: { not: productoId },
          estado: true 
        },
        take: 2
      });
    }

    // 4. LIMPIEZA DE DATOS (Decimal a Number)
    // Importante para que Next.js no de error al pasar datos del Server al Client
    return sugerenciasFinales.map(p => ({
      ...p,
      precio: Number(p.precio),
      // Si usas otros campos Decimal, conviértelos aquí
    }));

  } catch (error) {
    console.error("Error crítico en Minería Apriori:", error);
    // En caso de error de DB, devolvemos array vacío para no romper el Front-end
    return [];
  }
}