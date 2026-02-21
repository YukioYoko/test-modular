"use server"
import { prisma } from "@/lib/prisma";

export async function getRecomendacionIA() {
  const baseUrl = process.env.NEXT_PUBLIC_IA_API_URL || "http://127.0.0.1:8000";
  
  try {
    const res = await fetch(`${baseUrl}/recomendar-menu`, { cache: 'no-store' });
    const data = await res.json();
    
    if (!data.success) return null;

    const menusFinales = await Promise.all(data.menus.map(async (menu: any) => {
      const ids = menu.items;
      
      // Buscamos el producto específico por su ID único
      const buscar = (id: number) => {
        if (!id || id === 0) return null;
        return prisma.producto.findFirst({
          where: { id_producto: id, activo: true },
          include: { 
            imagen: { select: { url: true } } // Relación correcta
          }
        });
      };

      // Ejecutamos las búsquedas en paralelo para mayor velocidad
      const prodsRaw = await Promise.all([
        buscar(ids.entrada_cat),
        buscar(ids.ensalada_cat),
        buscar(ids.pasta_cat),
        buscar(ids.plato_fuerte_cat),
        buscar(ids.bebida_cat),
        buscar(ids.postre_cat)
      ]);

      return {
        titulo: menu.nombre,
        productos: prodsRaw.filter(Boolean).map(p => ({
          ...p,
          precio: Number(p?.precio), // Evita errores con tipos Decimal
          // Mapeo de imagen corregido para evitar el error de undefined
          imagenUrl: p?.imagen?.[0]?.url || "/ramen-placeholder.png"
        }))
      };
    }));

    return { 
      menus: menusFinales, 
      clima: data.clima_info 
    };
  } catch (e) {
    console.error("Error en getRecomendacionIA:", e);
    return null;
  }
}