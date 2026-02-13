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
  searchParams: Promise<{ comanda?: string, token?: string, cat?: string }> 
}) {
  
  const params = await searchParams;
  const token = params.token;
  const categoriaId = params.cat ? parseInt(params.cat) : null;
  
  // Variables de control de estado
  let idComanda: number | null = params.comanda ? parseInt(params.comanda) : null;
  let esSoloLectura = true; // Por defecto nadie puede pedir si no hay comanda válida

  // 1. LÓGICA DE VALIDACIÓN OPCIONAL
  if (idComanda && !isNaN(idComanda) && token) {
    const comandaBD = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda }
    });

    // Si existe la comanda y el token es correcto, verificamos si puede pedir
    if (comandaBD && comandaBD.token === token) {
      // Si la comanda está abierta, habilitamos la escritura (esSoloLectura = false)
      esSoloLectura = comandaBD.estado === 'Cerrada';
      if( esSoloLectura ) idComanda = null;
    } else {
      // Si los datos son inválidos (token mal), reseteamos a modo catálogo
      idComanda = null;
      esSoloLectura = true;
    }
  } else {
    // Si no hay parámetros en la URL, entramos en modo catálogo puro
    idComanda = null;
    esSoloLectura = true;
  }

  // 2. Obtención de datos comunes (Categorías y Productos siempre visibles)
  const categoriasBD = await getCategorias();

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
    categoria: p.categoriaRel.nombre,
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

      <main className={`p-4 space-y-6 `}>
          <Categories categorias={categoriasBD} />
          
          {/* Las recomendaciones pueden ser visibles para todos para fomentar el antojo */}
          <RecomendacionMenu/>
        
          <div className="mt-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 px-2 uppercase tracking-tighter italic">
              {categoriaId && categoriaId !== 0 
                ? categoriasBD.find((c: any) => c.id_categoria === categoriaId)?.nombre 
                : 'Nuestro Menú'}
            </h2>

            {/* Pasamos el idComanda (que puede ser null) y el estado de lectura */}
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