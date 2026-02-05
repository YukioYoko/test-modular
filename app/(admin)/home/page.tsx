'use client';
import { useEffect, useState, useTransition } from 'react';
import { getDashboardStats } from './action';

export default function AdminHomePage() {
  const [stats, setStats] = useState<any>(null);
  const [filtro, setFiltro] = useState('Dia');
  const [isPending, startTransition] = useTransition();

  // Se ejecuta cada vez que 'filtro' cambia
  useEffect(() => {
    startTransition(async () => {
      const data = await getDashboardStats(filtro);
      setStats(data);
    });
  }, [filtro]);

  if (!stats) return (
    <div className="min-h-screen flex items-center justify-center bg-(--light-green)">
      <p className="animate-bounce text-(--militar-green) font-black tracking-widest">
        SINCRONIZANDO DATOS...
      </p>
    </div>
  );

  return (
    <div className={`p-4 md:p-8 bg-(--light-green) min-h-screen font-sans transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) tracking-tighter uppercase">Foodlify Admin</h1>
          <p className="text-(--dark-green) font-bold">Reporte de Ventas: {filtro}</p>
        </div>
        
        <div className="hidden md:block text-right">
          <div className="flex items-center gap-2 text-(--militar-green) font-bold bg-white/50 px-4 py-2 rounded-2xl">
            <div className={`w-2 h-2 rounded-full ${isPending ? 'bg-amber-500 animate-spin' : 'bg-emerald-500 animate-pulse'}`} /> 
            {isPending ? 'Actualizando...' : 'Sistema Live'}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD VENTAS DINÁMICAS */}
        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border-b-8 border-(--dark-mint-green) flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-(--dark-green) uppercase text-[10px] tracking-widest mb-2">Ingresos {filtro}</h2>
            <p className="text-5xl font-black text-(--militar-green) mb-6">
              ${stats.totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="flex bg-(--mint-green) p-1 rounded-2xl">
            {['Dia', 'Semana', 'Mes'].map((t) => (
              <button 
                key={t}
                onClick={() => setFiltro(t)}
                className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${
                  filtro === t 
                  ? 'bg-white text-(--militar-green) shadow-md scale-105' 
                  : 'text-(--militar-green)/50 hover:text-(--militar-green)'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

       

        {/* TOP CONSUMO */}
        <div className="bg-(--militar-green) p-7 rounded-[2.5rem] shadow-xl text-(--light-green)">
          <h2 className="font-bold opacity-60 uppercase text-[10px] tracking-widest mb-6">Más vendidos ({filtro})</h2>
          <div className="space-y-4">
            {stats.topProductos.map((prod: any, i: number) => (
              <div key={i} className="flex justify-between items-center group">
                <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">
                   {prod.nombre}
                </span>
                <span className="bg-(--darker-green) px-3 py-1 rounded-lg text-[10px] font-black">
                  {prod.cantidad}
                </span>
              </div>
            ))}
          </div>
        </div>

         {/* CARD PERSONAL (Usando 'usuario' e 'id') */}
        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border-b-8 border-(--dark-green)">
          <h2 className="font-bold text-(--dark-green) uppercase text-[10px] tracking-widest mb-6">Staff en Turno</h2>
          <div className="space-y-3">
            {stats.listaPersonal.map((persona: any) => (
              <div key={persona.id} className="flex items-center gap-4 bg-(--light-green)/50 p-3 rounded-2xl border border-(--mint-green)">
                <div className="w-10 h-10 bg-(--dark-green) rounded-full flex items-center justify-center text-white text-xs font-black">
                  {persona.usuario[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-black text-(--militar-green)">{persona.usuario}</p>
                  <p className="text-[9px] uppercase font-bold text-(--militar-green)/60">{persona.rol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      

      <footer className="mt-10 bg-white/40 p-6 rounded-[2.5rem] flex justify-between items-center text-(--militar-green) border border-white/60">
         <p className="text-xs font-bold opacity-70">Sincronizado con Neon Database</p>
         <p className="text-xs font-black">Actualizado: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
}