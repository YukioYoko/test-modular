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

  // 1. Validación de seguridad y estado
  const comandaBD = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!comandaBD || comandaBD.token !== token) redirect('/login');

  // Identificamos si la comanda ya fue pagada
  const esSoloLectura = comandaBD.estado === 'Cerrada';

  // 2. Obtención de Categorías
  const categoriasBD = await getCategorias();

  // 3. Obtención de productos
  const productosRaw = await prisma.producto.findMany({
    where: { 
      eliminado: false,
      activo: true,
      ...(categoriaId && categoriaId !== 0 ? { id_categoria: categoriaId } : {})
    },
    include: {
      aditamentos: { include: { aditamento: true } },
      imagen: { take: 1, select: { url: true } },
      categoriaRel: true
    },
    orderBy: { id_producto: 'desc' }
  });

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
      {/* Banner de aviso para el cliente */}
      {esSoloLectura && (
        <div className="bg-(--militar-green) text-white text-center py-2 text-[10px] font-black uppercase tracking-widest sticky top-0 z-50 shadow-md">
          Cuenta cerrada • Solo visualización
        </div>
      )}

      <main className={`p-4 space-y-6 ${esSoloLectura ? 'pointer-events-none select-none' : ''}`}>
          <Categories categorias={categoriasBD} />
          <RecomendacionMenu/>
        
          <div className="mt-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 px-2 uppercase tracking-tighter italic">
              {categoriaId && categoriaId !== 0 
                ? categoriasBD.find((c: any) => c.id_categoria === categoriaId)?.nombre 
                : 'Menú completo'}
            </h2>

            <MenuCategoriasComponent 
              productos={productos} 
              idComanda={idComanda} 
              esSoloLectura={esSoloLectura} 
            />
          </div>
      </main>
    </div>
  );
}