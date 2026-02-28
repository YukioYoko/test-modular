"use server"
import { prisma } from "@/lib/prisma";

// Tipo para los productos que vienen del modelo
interface ProductoIA {
  id_producto: number;
  score: number;
}

interface CategoriaRecomendacion {
  categoria: string;
  key: string;
  productos: ProductoIA[];
  fuente: string;
}

// Busca un producto en la BD y lo formatea para el ProductCard
async function buscarProducto(id: number, score?: number) {
  if (!id || id === 0) return null;

  const p = await prisma.producto.findFirst({
    where: { id_producto: id, activo: true },
    include: {
      imagen: { select: { url: true } },
      subcategoria: {
        include: {
          categoria: { select: { nombre: true } }
        }
      }
    }
  });

  if (!p) return null;

  return {
    ...p,
    precio: Number(p.precio),
    imagenUrl: p.imagen?.[0]?.url || "/ramen-placeholder.png",
    categoria: p.subcategoria?.categoria?.nombre || "",
    score: score ?? 0,
  };
}

export async function getRecomendacionIA() {
  const baseUrl = process.env.NEXT_PUBLIC_IA_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${baseUrl}/recomendar-menu`, { cache: 'no-store' });
    const data = await res.json();

    if (!data.success) return null;

    // ─── Procesar "recomendaciones" (top por categoría) ───
    const recomendaciones = await Promise.all(
      Object.values(data.recomendaciones as Record<string, CategoriaRecomendacion>).map(async (cat) => {
        const productosEnriquecidos = await Promise.all(
          cat.productos.map((p: ProductoIA) => buscarProducto(p.id_producto, p.score))
        );

        return {
          categoria: cat.categoria,
          productos: productosEnriquecidos.filter(Boolean),
        };
      })
    );

    // ─── Procesar "menu_variado" (descubre algo nuevo) ───
    const variadoProductos: any[] = [];
    for (const cat of Object.values(data.menu_variado as Record<string, CategoriaRecomendacion>)) {
      for (const p of cat.productos) {
        const prod = await buscarProducto(p.id_producto, p.score);
        if (prod) variadoProductos.push(prod);
      }
    }

    return {
      recomendaciones: recomendaciones.filter(r => r.productos.length > 0),
      menuVariado: variadoProductos,
      contexto: data.contexto,
    };
  } catch (e) {
    console.error("Error en getRecomendacionIA:", e);
    return null;
  }
}