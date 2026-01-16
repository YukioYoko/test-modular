// app/menu/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PedidoClientComponent from './PedidoClientComponent';

export default async function PedidoPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  // 1. Validación de seguridad
  const valido = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda }
  });

  if (!valido || valido.token !== token) redirect('/login');

  // 2. Obtención de productos
  const productosRaw = await prisma.detalle_comanda.findMany({
    select:{
        id_producto: true,
        notas_especiales: true,
        cantidad: true,
        status: true,
        producto:{
            select:{
                precio: true,
                nombre: true,
                tiempo_prep: true,
                categoria: true,
            }
        }
    }

  });

  // 3. TRANSFORMACIÓN CRÍTICA: Convertir Decimal a Number
  const productos = productosRaw.map(p => ({
  id_producto: p.id_producto,
  notas_especiales: p.notas_especiales,
  cantidad: p.cantidad,
  status: p.status,
  nombre: p.producto.nombre,
  categoria: p.producto.categoria,
  tiempo_prep: p.producto.tiempo_prep,
  precio: Number(p.producto.precio) // Aquí convertimos el Decimal a número plano
}));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-black text-orange-600">Pedido de la orden {idComanda}</h1>
        <p className="text-xs text-gray-500">Ordenando para la Comanda #{idComanda}</p>
      </header>

      <main className="p-4">
        {/* Ahora los productos son objetos planos seguros para el Client Component */}
        <PedidoClientComponent productos={productos} />
      </main>
    </div>
  );
}