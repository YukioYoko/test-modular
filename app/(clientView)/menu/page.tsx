// app/menu/page.tsx
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RecomendacionMenu from "@/components/recomendacion/RecomendacionMenu";
import MenuCategoriasComponent from "./MenuCategoriasComponent";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ comanda: string; token?: string }>;
}) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  
  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda },
  });

  if (!valido || valido.token !== token) redirect("/login");

  // 2. Obtención de categorías únicas usando groupBy
  // 1. Obtenemos las categorías únicas
  const categoriasRaw = await prisma.producto.groupBy({
    by: ["categoria"],
    orderBy: { categoria: "asc" },
  });

 // 1. Obtención de productos con sus relaciones
const productosRaw = await prisma.producto.findMany({
  select: {
    id_producto: true,
    nombre: true,
    precio: true, // Decimal de Prisma
    categoria: true,
    descripcion: true,
    tiempo_prep: true,
    pasos: true,
    imagen: {
      select: { url: true }
    }
  },
  orderBy: { nombre: 'asc' }
});

// 2. CONVERSIÓN A OBJETOS PLANOS (Soluciona el error de Decimal)
const productosPlano = productosRaw.map(p => ({
  ...p,
  precio: Number(p.precio), // Conversión crítica para Next.js
  imagen: p.imagen.map(img => img.url) // Aplanamos las imágenes a un array de strings
}));

// 3. Agrupación por categorías usando el array formateado
const menuEstructurado = categoriasRaw.map(catObj => {
  return {
    nombreCategoria: catObj.categoria,
    // IMPORTANTE: Usamos productosPlano aquí
    productos: productosPlano
      .filter(prod => prod.categoria === catObj.categoria)
      .slice(0, 3)
  };
});

  return (
    <div className="min-h-screen bg-orange-grad pb-20">
      <main className="p-4">
        <RecomendacionMenu />
        <div className="bg-blue-400 w-full ">
          {menuEstructurado.map((cat) => (
            <MenuCategoriasComponent
              key={cat.nombreCategoria}
              cat={cat}
              idComanda={idComanda}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
