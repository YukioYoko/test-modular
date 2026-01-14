'use client';

import { useState } from 'react';
import { activarMesas, desactivarMesas } from './actions';
import { QRCodeSVG } from 'qrcode.react'; // Sugerencia: npm install qrcode.react

export default function HostessClient({ mesasIniciales }: { mesasIniciales: any[] }) {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null);
  const [urlGenerada, setUrlGenerada] = useState<string | null>(null);

  const handleActivar = async () => {
    if (!mesaSeleccionada) return;
    
    const res = await activarMesas(mesaSeleccionada);
    
    if (res.success) {
      setUrlGenerada(res.url || null);
      setMesaSeleccionada(null); // Limpiar selección
      alert("Mesa activada correctamente");
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleDesactivar = async () => {
    if (!mesaSeleccionada) return;
    
    const res = await desactivarMesas(mesaSeleccionada);
    
    if (res.success) {
      setMesaSeleccionada(null); // Limpiar selección
      alert("Mesa desactivada correctamente");
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mesasIniciales.map((mesa) => (
          <button
            key={mesa.id_mesa}
            onClick={() => setMesaSeleccionada(mesaSeleccionada === mesa.id_mesa ? null : mesa.id_mesa)}
            className={`
              relative p-6 rounded-2xl shadow-sm border-4 flex flex-col items-center justify-center 
              transition-all active:scale-95 touch-manipulation
              ${mesaSeleccionada === mesa.id_mesa 
                ? 'border-blue-600 ring-4 ring-blue-200' 
                : mesa.estado === 'Libre' ? 'border-green-500 bg-green-50' 
                : 'border-red-500 bg-red-50'
              }
            `}
          >
            {/* ... icono de check se mantiene igual ... */}
            <span className="text-xs font-bold text-gray-400">MESA</span>
            <span className="text-3xl font-black text-gray-800">{mesa.numero_mesa}</span>
            <span className="mt-2 text-[10px] font-bold uppercase">{mesa.estado}</span>
          </button>
        ))}
      </div>

      <div className='flex p-4 mt-6 space-x-6 items-center'>
        <button onClick={handleDesactivar} 
          disabled={!mesaSeleccionada } 
          className='bg-red-400 hover:bg-red-500 p-8 rounded-lg text-white font-bold'>Desactivar</button>
        <button className='bg-yellow-400 hover:bg-yellow-500 p-8 rounded-lg text-white font-bold'>Juntar</button>
        
        <button 
          onClick={handleActivar} 
          disabled={!mesaSeleccionada }
          className={`p-8 rounded-lg transition-colors font-bold
            ${mesaSeleccionada 
              ? 'bg-green-400 hover:bg-green-500 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          Activar Mesa Seleccionada
        </button>
      </div>

      {/* Visualización del QR generado */}
      {urlGenerada && (
        <div className="mt-8 p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center">
          <h3 className="font-bold mb-4 text-gray-700">QR para el Cliente:</h3>
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={urlGenerada} size={180} />
          </div>
          <p className="text-xs text-gray-500 break-all">{urlGenerada}</p>
          <button 
            onClick={() => setUrlGenerada(null)}
            className="mt-4 text-blue-600 font-bold"
          >
            Cerrar QR
          </button>
        </div>
      )}
    </div>
  );
}