"use server"
import { prisma } from "@/lib/prisma";

export async function getRecomendacionIA() {
  const baseUrl = process.env.NEXT_PUBLIC_IA_API_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/recomendar-menu`, { cache: 'no-store' });
    const data = await res.json();
    if (!data.success) return null;

    const menusFinales = await Promise.all(data.menus.map(async (menu: any) => {
      const cats = menu.items;
      
      const buscar = (id: number) => prisma.producto.findFirst({
        where: { id_categoria: id, activo: true },
        include: { imagen: { select: { url: true } } }
      });

      const prodsRaw = await Promise.all([
        buscar(cats.entrada_cat), buscar(cats.ensalada_cat),
        buscar(cats.pasta_cat), buscar(cats.plato_fuerte_cat),
        buscar(cats.bebida_cat), buscar(cats.postre_cat)
      ]);

      return {
        titulo: menu.nombre,
        productos: prodsRaw.filter(Boolean).map(p => ({
          ...p,
          precio: Number(p?.precio), // Convierte Decimal a Number
          imagenUrl: p?.imagen?.[0]?.url || "/ramen-placeholder.png"
        }))
      };
    }));

    return { menus: menusFinales, clima: data.clima_info };
  } catch (e) {
    console.error(e);
    return null;
  }
}