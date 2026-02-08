// app/menu/page.tsx
export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RecomendacionMenu from '@/components/recomendacion/RecomendacionMenu';
import MenuCategoriasComponent from './MenuCategoriasComponent';
import { Categories } from '@/components/categories/categories';

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!valido || valido.token !== token) redirect('/login');

  // 2. Obtención de productos con su primera imagen
  const productosRaw = await prisma.producto.findMany({
    where: { 
      eliminado: false,
      activo: true // Solo mostrar lo que está a la venta
    },
    include: {
      aditamentos: {
        include: {
          aditamento: true 
        }
      },
      // INCLUIMOS LA RELACIÓN DE IMÁGENES
      imagen: {
        take: 1, // Optimizamos para traer solo una imagen de la DB
        select: { url: true }
      }
    },
    orderBy: { categoria: 'asc' }
  });

  // 3. Formateo de datos
  const productos = productosRaw.map(p => ({
    ...p,
    precio: Number(p.precio),
    // Extraemos la URL de la primera imagen o un placeholder si no tiene
    imagenUrl: p.imagen[0]?.url || '/placeholder-food.png', 
    opcionesAditamentos: p.aditamentos.map(a => ({
      id: a.aditamento.id_aditamento,
      nombre: a.aditamento.nombre,
      precio: a.aditamento.precio
    }))
  }));

  return (
    <div className="min-h-screen bg-(--notWhite)] pb-20">
      <main className="p-4 space-y-6">
          <Categories />
          <RecomendacionMenu/>
        
          <div className="mt-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">Menú</h2>
            {/* Ahora enviamos los productos con la propiedad 'imagenUrl' ya lista */}
            <MenuCategoriasComponent productos={productos} idComanda={idComanda} />
          </div>
      </main>
    </div>
  );
}