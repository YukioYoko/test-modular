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

  // 2. Obtención de productos
  const productosRaw = await prisma.producto.findMany({
    include: {
      aditamentos: {
        include: {
          aditamento: true 
        }
      }
    },
    orderBy: { categoria: 'asc' }
  });

  const productos = productosRaw.map(p => ({
    ...p,
    precio: Number(p.precio),
    opcionesAditamentos: p.aditamentos.map(a => ({
      id: a.aditamento.id_aditamento,
      nombre: a.aditamento.nombre,
      precio: a.aditamento.precio
    }))
  }));

  return (
    <div className="min-h-screen bg-[var(--notWhite)] pb-20">
      <main className="p-4 space-y-6">
          {/* Categorías (Slider Horizontal) */}
          <Categories />
          
          {/* Recomendaciones (Banner grande) */}
          <RecomendacionMenu/>
        
          {/* Lista de Productos (Grid 2 columnas) */}
          <div className="mt-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">Menú</h2>
            <MenuCategoriasComponent productos={productos} idComanda={idComanda} />
          </div>
      </main>
    </div>
  );
}