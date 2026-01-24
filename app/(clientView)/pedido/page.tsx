// app/pedido/page.tsx
export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PedidoClientComponent from './PedidoClientComponent';

export default async function PedidoPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  if (!idComanda || !token) redirect('/login');

  // 1. Validación de seguridad y obtención de datos en una sola consulta
  const comanda = await prisma.comandas.findFirst({
    where: { 
      id_comanda: idComanda,
      token: token,
      estado: 'Abierta'
    },
    include: {
      detalles: {
        include: {
          producto: true,
          aditamentos: {
            include: { aditamento: true }
          }
        }
      }
    }
  });

  if (!comanda) redirect('/acceso-denegado');

  // 2. Transformación de datos para el cliente
  const productos = comanda.detalles.map(d => {
    const precioAditamentos = d.aditamentos.reduce((acc, a) => acc + (a.aditamento.precio || 0), 0);
    const precioUnitarioTotal = Number(d.producto.precio) + precioAditamentos;

    return {
      id_detalle: d.id_detalle,
      nombre: d.producto.nombre,
      cantidad: d.cantidad,
      precioTotal: precioUnitarioTotal * d.cantidad,
      status: d.status,
      notas: d.notas_especiales,
      categoria: d.producto.categoria,
      // Mapeamos los nombres de los aditamentos para mostrarlos
      aditamentos: d.aditamentos.map(a => a.aditamento.nombre)
    };
  });

  const totalComanda = productos.reduce((acc, p) => acc + p.precioTotal, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <header className="bg-white px-6 py-6 shadow-sm sticky top-0 border-b border-slate-100">
        <h1 className="text-2xl font-black text-slate-900">Mi Pedido</h1>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-slate-500 font-medium">Mesa #{comanda.id_mesa}</p>
          <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            {comanda.estado}
          </span>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto">
        <PedidoClientComponent productos={productos} total={totalComanda} />
      </main>
    </div>
  );
}