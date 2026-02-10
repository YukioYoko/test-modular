export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RecomendacionMenu from '@/components/recomendacion/RecomendacionMenu';
import MenuCategoriasComponent from './MenuCategoriasComponent';
import { Categories } from '@/components/categories/categories';
import { getCategorias } from './action';

export default async function MenuPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ comanda: string, token?: string, cat?: string }> 
}) {
  
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;
  const categoriaId = params.cat ? parseInt(params.cat) : null;

  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!valido || valido.token !== token) redirect('/login');

  // 2. Obtención de Categorías para el componente Categories
  const categoriasBD = await getCategorias();

  // 3. Obtención de productos filtrados (si existe categoría seleccionada)
  const productosRaw = await prisma.producto.findMany({
    where: { 
      eliminado: false,
      activo: true,
      // Si hay categoriaId (y no es 0), filtramos por ese ID
      ...(categoriaId && categoriaId !== 0 ? { id_categoria: categoriaId } : {})
    },
    include: {
      aditamentos: {
        include: {
          aditamento: true 
        }
      },
      imagen: {
        take: 1, 
        select: { url: true }
      },
      categoriaRel: true
    },
    orderBy: { id_producto: 'desc' }
  });

  // 4. Formateo de datos para el cliente
  const productos = productosRaw.map(p => ({
    ...p,
    precio: Number(p.precio),
    imagenUrl: p.imagen[0]?.url || '/placeholder-food.png', 
    opcionesAditamentos: p.aditamentos.map(a => ({
      id: a.aditamento.id_aditamento,
      nombre: a.aditamento.nombre,
      precio: Number(a.aditamento.precio)
    }))
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <main className="p-4 space-y-6">
          {/* Componente dinámico con categorías de la BD */}
          <Categories categorias={categoriasBD} />
          
          <RecomendacionMenu/>
        
          <div className="mt-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 px-2 uppercase tracking-tighter italic">
              {categoriaId && categoriaId !== 0 
                ? categoriasBD.find((c: { id_categoria: number; }) => c.id_categoria === categoriaId)?.nombre 
                : 'Menú completo'}
            </h2>

            {/* Listado de productos filtrados */}
            <MenuCategoriasComponent productos={productos} idComanda={idComanda} />
          </div>
      </main>
    </div>
  );
}