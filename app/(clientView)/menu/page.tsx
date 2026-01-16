// app/menu/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MenuClientComponent from './MenuClientComponent';

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
    orderBy: { categoria: 'asc' }
  });

  // 3. TRANSFORMACIÓN CRÍTICA: Convertir Decimal a Number
  const productos = productosRaw.map(p => ({
    ...p,
    precio: Number(p.precio) // Esto soluciona el error de "Decimal objects are not supported"
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-black text-orange-600">MENÚ DIGITAL</h1>
        <p className="text-xs text-gray-500">Ordenando para la Comanda #{idComanda}</p>
      </header>

      <main className="p-4">
        {/* Ahora los productos son objetos planos seguros para el Client Component */}
        <MenuClientComponent productos={productos} idComanda={idComanda} />
      </main>
    </div>
  );
}