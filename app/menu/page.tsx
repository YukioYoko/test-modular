// app/menu/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MenuClientComponent from './MenuClientComponent';

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ comanda: string , token?: string}> }) {
  
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  const valido = await prisma.comandas.findFirst({
    where:{id_comanda: idComanda}
  });

  if(!valido || valido.tocken !== token) redirect('/login')
  // Obtenemos los productos de la base de datos
  const productos = await prisma.producto.findMany({
    orderBy: { categoria: 'asc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Estilo App */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-black text-orange-600">MENÚ DIGITAL</h1>
        <p className="text-xs text-gray-500">Ordenando para la Comanda #{idComanda}</p>
      </header>

      <main className="p-4">
        {/* Pasamos los productos a un componente de cliente para manejar el carrito */}
        <MenuClientComponent productos={productos} idComanda={idComanda} />
      </main>
    </div>
  );
}