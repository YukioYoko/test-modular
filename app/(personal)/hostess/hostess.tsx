'use client';

import { useState, useTransition } from 'react';
import { gestionarMesas, liberarMesas } from './actions';
import { QRCodeSVG } from 'qrcode.react';

interface Mesa {
  id_mesa: number;
  numero_mesa: number;
  estado: string;
  junta_id_mesa: number | null;
}

export default function HostessClient({ mesasIniciales }: { mesasIniciales: Mesa[] }) {
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [urlQR, setUrlQR] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggleMesa = (id: number) => {
    setSeleccionadas(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const ejecutarAccion = async (tipo: 'activar' | 'juntar' | 'liberar') => {
    startTransition(async () => {
      let res;
      if (tipo === 'liberar') {
        res = await liberarMesas(seleccionadas[0]);
      } else {
        res = await gestionarMesas(seleccionadas, tipo);
      }

      if (res.success) {
        if (res.url) setUrlQR(res.url);
        setSeleccionadas([]);
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Grid de Mesas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {mesasIniciales.map((mesa) => {
          const isSel = seleccionadas.includes(mesa.id_mesa);
          const isOcupada = mesa.estado !== 'Libre';
          
          return (
            <button
              key={mesa.id_mesa}
              onClick={() => toggleMesa(mesa.id_mesa)}
              className={`
                aspect-square p-4 rounded-3xl border-4 transition-all flex flex-col items-center justify-center relative
                ${isSel ? 'border-orange-500 bg-orange-50 scale-105 z-10 shadow-lg' : 
                  isOcupada ? 'border-slate-200 bg-slate-100 opacity-80' : 'border-emerald-500 bg-white shadow-sm'}
              `}
            >
              <span className={`text-3xl font-black ${isOcupada ? 'text-slate-400' : 'text-slate-800'}`}>
                {mesa.numero_mesa}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                {mesa.junta_id_mesa ? `Grupo ${mesa.junta_id_mesa}` : mesa.estado}
              </span>
              {isSel && <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1 shadow-md">✓</div>}
            </button>
          );
        })}
      </div>

      {/* Barra de Acciones Flotante o Fija */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 flex gap-4 items-center">
        <span className="px-4 text-sm font-bold text-slate-500 border-r mr-2">
          {seleccionadas.length} seleccionadas
        </span>
        
        <button 
          onClick={() => ejecutarAccion('liberar')}
          disabled={seleccionadas.length === 0 || isPending}
          className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold disabled:opacity-30 hover:bg-black transition-all"
        >
          Liberar
        </button>

        <button 
          onClick={() => ejecutarAccion(seleccionadas.length > 1 ? 'juntar' : 'activar')}
          disabled={seleccionadas.length === 0 || isPending}
          className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold disabled:opacity-30 hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all"
        >
          {seleccionadas.length > 1 ? 'Juntar y Abrir' : 'Abrir Comanda'}
        </button>
      </div>

      {/* Modal de QR */}
      {urlQR && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Mesa Lista</h3>
            <div className="bg-slate-50 p-6 rounded-2xl flex justify-center mb-6">
              <QRCodeSVG value={urlQR} size={200} />
            </div>
            <a href={urlQR} target='_blank' className='text-black'>{urlQR}</a>
            <button 
              onClick={() => setUrlQR(null)}
              className="w-full py-4 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
              Cerrar y Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}