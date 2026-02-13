export const dynamic = 'force-dynamic';
import { getPedidosCocina } from './action';
import CocinaClient from './CocinaClient';

export default async function CocinaPage() {
  const pedidos = await getPedidosCocina();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">COCINA</h1>
      </header>

      <CocinaClient pedidosIniciales={pedidos} />
    </div>
  );
}