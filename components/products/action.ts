'use server'
import { prisma } from '@/lib/prisma';

// Definimos interfaces para que TypeScript no arroje error de "any" en el build
interface MetricaSugerencia {
  id_producto: number;
  confianza: number;
}

export async function getSugerenciasApriori(productoId: number) {
  try {
    // 1. Validación de entrada
    if (!productoId || isNaN(productoId)) return [];

    // --- PASO 1: Calcular Soporte del Producto Base (A) ---
    const totalComandasConA = await (prisma as any).detalleComanda.count({
      where: { id_producto: productoId }
    });

    // Si nadie lo ha comprado nunca, usamos el respaldo (fallback)
    if (totalComandasConA === 0) return await getFallback(productoId);

    // --- PASO 2: Encontrar Co-ocurrencias (A + B) ---
    const comandasConA = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_comanda: true },
      take: 200, 
    });
    
    const idsComandas = comandasConA.map((c: any) => c.id_comanda);

    // --- PASO 3: Aplicar Algoritmo Apriori ---
    const coOcurrencias = await (prisma as any).detalleComanda.groupBy({
      by: ['id_producto'],
      where: {
        id_comanda: { in: idsComandas },
        id_producto: { not: productoId }
      },
      _count: { id_producto: true },
      orderBy: { _count: { id_producto: 'desc' } },
      take: 10
    });

    // Mapeo con tipos explícitos para evitar error de "implicitly any"
    const sugerenciasConMetricas: MetricaSugerencia[] = coOcurrencias.map((item: any) => {
      const frecuenciaJuntos = item._count.id_producto;
      // Confianza = (A ∩ B) / A
      const confianzaCalculada = (frecuenciaJuntos / totalComandasConA);
      
      return {
        id_producto: item.id_producto,
        confianza: confianzaCalculada
      };
    });

    // Filtramos por confianza mínima (10%) y obtenemos solo los IDs
    const mejoresIds = sugerenciasConMetricas
      .filter((s: MetricaSugerencia) => s.confianza >= 0.10)
      .map((s: MetricaSugerencia) => s.id_producto);

    // --- PASO 4: Obtener datos finales de los productos ---
    let sugerenciasFinales: any[] = [];
    
    if (mejoresIds.length > 0) {
      sugerenciasFinales = await prisma.producto.findMany({
        where: { 
          id_producto: { in: mejoresIds }, 
          activo: true // Asegúrate que en tu DB se llame 'activo' o 'estado'
        },
        include: {
          imagen: true
        },
        take: 4
      });
    }

    // Si el algoritmo no dio resultados suficientes, fallback
    if (sugerenciasFinales.length === 0) {
      return await getFallback(productoId);
    }

    // Convertimos precios de Decimal a Number para el cliente (Next.js)
    return sugerenciasFinales.map(p => ({
      ...p,
      precio: Number(p.precio)
    }));

  } catch (error) {
    console.error("Error en Algoritmo Apriori:", error);
    return [];
  }
}

// Función de respaldo robusta
async function getFallback(productoId: number) {
  const randoms = await prisma.producto.findMany({
    where: { 
      id_producto: { not: productoId }, 
      activo: true 
    },
    include: {
      imagen: true
    },
    take: 4
  });
  
  return randoms.map(p => ({ 
    ...p, 
    precio: Number(p.precio) 
  }));
}