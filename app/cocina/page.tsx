import { getPedidosCocina } from './actions';
import CocinaClient from './CocinaClient';

export default async function CocinaPage() {
  const pedidos = await getPedidosCocina();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">COCINA</h1>
          <p className="text-slate-500 font-bold">{pedidos.length} PLATOS PENDIENTES</p>
        </div>
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600 uppercase">En Espera</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600 uppercase">Cocinando</span>
            </div>
        </div>
      </header>

      <CocinaClient pedidosIniciales={pedidos} />
    </div>
  );
}