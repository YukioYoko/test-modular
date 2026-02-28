export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma';
import RecomendacionMenu from '@/components/recomendacion/RecomendacionMenu';
import MenuCategoriasComponent from './MenuCategoriasComponent';
import { Categories } from '@/components/categories/categories';
import { getCategorias } from './action';

export default async function MenuPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ comanda?: string, token?: string, cat?: string }> 
}) {
  
  const params = await searchParams;
  const token = params.token;
  const categoriaId = params.cat ? parseInt(params.cat) : 0; // Por defecto 0 (Todo)
  
  let idComanda: number | null = params.comanda ? parseInt(params.comanda) : null;
  let esSoloLectura = true;

  // 1. LÓGICA DE VALIDACIÓN (Comprobación de token y estado)
  if (idComanda && !isNaN(idComanda) && token) {
    const comandaBD = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda }
    });

    if (comandaBD && comandaBD.token === token) {
      esSoloLectura = comandaBD.estado === 'Cerrada';
      if( esSoloLectura ) idComanda = null;
    } else {
      idComanda = null;
      esSoloLectura = true;
    }
  }

  const categoriasBD = await getCategorias();

  // 2. Consulta de productos (Corregido a tabla 'productos')
  const productosRaw = await prisma.producto.findMany({
    where: { 
      eliminado: false,
      activo: true,
      ...(categoriaId !== 0 ? { id_categoria: categoriaId } : {})
    },
    include: {
      aditamentos: { include: { aditamento: true } },
      imagen: { take: 1, select: { url: true } }, // Nombre corregido
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
      
      {!idComanda && (
        <div className="bg-amber-500 text-white text-center py-2 text-[10px] font-black uppercase tracking-widest sticky top-20 z-50">
          Modo Catálogo • Escanea el código de tu mesa para pedir
        </div>
      )}

      <main className="p-4 space-y-6">
          <Categories categorias={categoriasBD} />
          
          {/* LÓGICA SOLICITADA: Solo aparece en 'Todo' (categoriaId 0) */}
          {categoriaId === 0 && <RecomendacionMenu />}
        
          <div className="mt-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 px-2 uppercase tracking-tighter italic">
              {categoriaId !== 0 
                ? categoriasBD.find((c: any) => c.id_categoria === categoriaId)?.nombre 
                : 'Nuestro Menú'}
            </h2>

            <MenuCategoriasComponent 
              productos={productos} 
              idComanda={idComanda ?? 0} 
              esSoloLectura={esSoloLectura} 
            />
          </div>
      </main>
    </div>
  );
}