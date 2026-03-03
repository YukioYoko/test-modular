'use server'
import { prisma } from '@/lib/prisma';

export async function getSugerenciasApriori(productoId: number) {
  try {
    if (!productoId || isNaN(productoId)) return [];

    // 1. Obtener el producto actual para conocer su categoría
    const productoBase = await prisma.producto.findFirst({
      where: { id_producto: productoId },
      select: { id_categoria: true }
    });

    if (!productoBase) return [];
    const idCategoriaBase = productoBase.id_categoria;

    // 2. Calcular soporte y encontrar comandas relacionadas
    const totalComandasConA = await (prisma as any).detalleComanda.count({
      where: { id_producto: productoId }
    });

    if (totalComandasConA === 0) return await getFallbackExcluyendoCategoria(productoId, idCategoriaBase);

    const comandasConA = await (prisma as any).detalleComanda.findMany({
      where: { id_producto: productoId },
      select: { id_comanda: true },
      take: 300, 
    });
    const idsComandas = comandasConA.map((c: any) => c.id_comanda);

    // 3. Agrupar co-ocurrencias (A + B)
    const coOcurrencias = await (prisma as any).detalleComanda.groupBy({
      by: ['id_producto'],
      where: {
        id_comanda: { in: idsComandas },
        id_producto: { not: productoId }
      },
      _count: { id_producto: true },
      orderBy: { _count: { id_producto: 'desc' } }
    });

    // 4. Obtener info de productos candidatos
    const candidatosIds = coOcurrencias.map((item: any) => item.id_producto);
    const productosCandidatos = await prisma.producto.findMany({
      where: { id_producto: { in: candidatosIds }, activo: true },
      include: { imagen: true }
    });

    // 5. Lógica de Selección: Uno por categoría, EXCLUYENDO la categoría base
    const categoriasObjetivo = [1, 2, 3, 4, 5, 6].filter(cat => cat !== idCategoriaBase);
    const mejorPorCategoria = new Map();

    coOcurrencias.forEach((occ: any) => {
      const infoProd = productosCandidatos.find(p => p.id_producto === occ.id_producto);
      
      // Verificamos que sea una categoría permitida y que no la hayamos agregado ya
      if (infoProd && categoriasObjetivo.includes(infoProd.id_categoria)) {
        if (!mejorPorCategoria.has(infoProd.id_categoria)) {
          mejorPorCategoria.set(infoProd.id_categoria, {
            ...infoProd,
            precio: Number(infoProd.precio),
            imagenUrl: infoProd.imagen?.[0]?.url || "/ramen-placeholder.png"
          });
        }
      }
    });

    const sugerenciasFinales = Array.from(mejorPorCategoria.values());

    // Si no logramos llenar las 5 categorías restantes, usamos el fallback
    if (sugerenciasFinales.length < categoriasObjetivo.length) {
      return await getFallbackExcluyendoCategoria(productoId, idCategoriaBase);
    }

    return sugerenciasFinales;

  } catch (error) {
    console.error("❌ Error en Apriori Cruzado:", error);
    return [];
  }
}

async function getFallbackExcluyendoCategoria(productoId: number, idCatExcluir: number) {
  const categorias = [1, 2, 3, 4, 5, 6].filter(c => c !== idCatExcluir);
  
  const productos = await Promise.all(
    categorias.map(catId => 
      prisma.producto.findFirst({
        where: { 
          id_categoria: catId, 
          activo: true, 
          id_producto: { not: productoId } 
        },
        include: { imagen: true }
      })
    )
  );

  return productos.filter(Boolean).map(p => ({
    ...p,
    precio: Number(p?.precio),
    imagenUrl: p?.imagen?.[0]?.url || "/ramen-placeholder.png"
  }));
}