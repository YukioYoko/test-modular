'use server'
import { prisma } from '@/lib/prisma';

export async function getSugerenciasApriori(productoId: number) {
  try {
    if (!productoId || isNaN(productoId)) return [];

    // --- PASO 1: Calcular Soporte del Producto Base (A) ---
    // Contamos en cuántas comandas totales aparece el producto seleccionado
    const totalComandasConA = await (prisma as any).detalleComanda.count({
      where: { id_producto: productoId }
    });

    // Si nadie lo ha comprado nunca, vamos directo al fallback
    if (totalComandasConA === 0) return await getFallback(productoId);

    // --- PASO 2: Encontrar Co-ocurrencias (A + B) ---
    // Obtenemos los IDs de las comandas donde está el Producto A
    const comandasConA = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_comanda: true },
      take: 200, // Limite para rendimiento
    });
    const idsComandas = comandasConA.map((c: any) => c.id_comanda);

    // --- PASO 3: Aplicar Métrica de Confianza (Algoritmo Apriori) ---
    // Buscamos productos que aparecen en esas mismas comandas
    const coOcurrencias = await (prisma as any).detalleComanda.groupBy({
      by: ['id_producto'],
      where: {
        id_comanda: { in: idsComandas },
        id_producto: { not: productoId }
      },
      _count: { id_producto: true },
      orderBy: { _count: { id_producto: 'desc' } },
      take: 10 // Candidatos
    });

    /**
     * REGLA DE ASOCIACIÓN: A => B
     * Confianza = (Comandas con A y B) / (Total comandas con A)
     */
    const sugerenciasConMetricas = coOcurrencias.map((item: any) => {
      const frecuenciaJuntos = item._count.id_producto;
      const confianza = (frecuenciaJuntos / totalComandasConA).toFixed(2);
      
      return {
        id_producto: item.id_producto,
        confianza: parseFloat(confianza)
      };
    });

    // Filtramos los que tengan una confianza mínima (ej. 10%)
    const mejoresIds = sugerenciasConMetricas
      .filter(s => s.confianza >= 0.10)
      .map(s => s.id_producto);

    // --- PASO 4: Obtener datos de los productos finales ---
    let sugerenciasFinales: any[] = [];
    
    if (mejoresIds.length > 0) {
      sugerenciasFinales = await prisma.producto.findMany({
        where: { id_producto: { in: mejoresIds }, activo: true },
        take: 4
      });
    }

    // Dentro de tu action.ts, justo antes del return:
console.log(`--- Análisis Apriori para Producto ${productoId} ---`);
sugerenciasConMetricas.forEach(s => {
    console.log(`Producto Sugerido: ${s.id_producto} | Confianza: ${(s.confianza * 100).toFixed(0)}%`);
});

    // Si el algoritmo no dio resultados suficientes, fallback
    if (sugerenciasFinales.length === 0) {
      return await getFallback(productoId);
    }

    return sugerenciasFinales.map(p => ({
      ...p,
      precio: Number(p.precio)
    }));

  } catch (error) {
    console.error("Error en Algoritmo Apriori:", error);
    return [];
  }
}

// Función de respaldo para cuando no hay datos históricos
async function getFallback(productoId: number) {
  const randoms = await prisma.producto.findMany({
    where: { id_producto: { not: productoId }, activo: true },
    take: 4
  });
  return randoms.map(p => ({ ...p, precio: Number(p.precio) }));
}