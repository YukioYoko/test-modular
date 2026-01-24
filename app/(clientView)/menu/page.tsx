// app/menu/page.tsx
export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RecomendacionMenu from '@/components/recomendacion/RecomendacionMenu';
import MenuCategoriasComponent from './MenuCategoriasComponent';

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!valido || valido.token !== token) redirect('/login');

  // 2. Obtención de categorías únicas usando groupBy
// 1. Obtenemos las categorías únicas
const categoriasRaw = await prisma.producto.groupBy({
  by: ['categoria'],
  orderBy: { categoria: 'asc' },
});

// 2. Obtenemos todos los productos (seleccionando solo los campos necesarios)
const productosRaw = await prisma.producto.findMany({
  select: {
    id_producto: true,
    nombre: true,
    precio: true,
    categoria: true,
    descripcion: true,
    tiempo_prep: true,
    // En lugar de include, anidamos la relación dentro del select
    imagen: {
      select: {
        url: true, // Cambia 'url' por el nombre real de tu columna de imagen
        alt: true
      }
    }
  },
  orderBy: { 
    nombre: 'asc' 
  }
});

// 3. Creamos el objeto final agrupado
const menuEstructurado = categoriasRaw.map(catObj => {
  return {
    nombreCategoria: catObj.categoria,
    productos: productosRaw.filter(prod => prod.categoria === catObj.categoria)
  };
});

  return (
    <div className="min-h-screen bg-orange-grad pb-20">
      <main className="p-4">
        <RecomendacionMenu />
        
        {/* Agregué el return en el map y el atributo key */}
        {listaCategorias.map((cat) => (
          <MenuCategoriasComponent 
            key={cat} 
            categoria={cat} 
            idComanda={idComanda} 
          />
        ))}
        
      </main>
    </div>
  );
}