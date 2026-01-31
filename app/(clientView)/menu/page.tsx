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

  const navLinks = [
    { name: "Menú", href: "/menu" },
     { name: "Entradas", href: "/entradas" },
    { name: "Platillos", href: "/platillos" },
     { name: "Postres", href: "/postres" },
    { name: "Bebidas", href: "/bebidas" },
    { name: "Mi Pedido", href: "/pedido" },
    { name: "Pedir Cuenta", href: "/cuenta" },
  ];

  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!valido || valido.token !== token) redirect('/login');

  // 2. Obtención de productos con sus aditamentos permitidos
const productosRaw = await prisma.producto.findMany({
  include: {
    aditamentos: {
      include: {
        aditamento: true // Traemos el nombre y precio del aditamento
      }
    }
  },
  orderBy: { categoria: 'asc' }
});

const productos = productosRaw.map(p => ({
  ...p,
  precio: Number(p.precio),
  // Simplificamos la estructura para el cliente
  opcionesAditamentos: p.aditamentos.map(a => ({
    id: a.aditamento.id_aditamento,
    nombre: a.aditamento.nombre,
    precio: a.aditamento.precio
  }))
}));

  return (
    <div className="min-h-screen bg-(--notWhite) pb-20">
      <main className="p-4">
        <div className='flex mb-6 gap-3 w-full place-content-left'>

          {navLinks.map( (link) => {
            if(link.href !== '/cuenta' && link.href !== '/pedido'){
              return (
                 <div
                  key={link.name}
                  className='bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer'
                 >
                  <h3 className='font-(family-name:--satoshi) font-bold text-center px-2'>{link.name}</h3>
                 </div>
              );
            }
          }
        ) }
        

        </div>
        <RecomendacionMenu/>
        <MenuCategoriasComponent productos={productos} idComanda={idComanda} />
      </main>
    </div>
  );
}