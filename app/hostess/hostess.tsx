'use client';

import { useState } from 'react';
import { activarMesas, desactivarMesas, juntarMesas } from './actions';
import { QRCodeSVG } from 'qrcode.react';

export default function HostessClient({ mesasIniciales }: { mesasIniciales: any[] }) {
  // Ahora manejamos un array de IDs seleccionados
  const [mesasSeleccionadas, setMesasSeleccionadas] = useState<number[]>([]);
  const [urlGenerada, setUrlGenerada] = useState<string | null>(null);

  const toggleMesa = (id: number) => {
    setMesasSeleccionadas(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id) 
        : [...prev, id]
    );
  };

  const handleActivar = async () => {
    if (mesasSeleccionadas.length === 0) return;
    // Si solo hay una, usamos activar normal; si hay varias, usamos juntar
    const res = mesasSeleccionadas.length > 1 
      ? await juntarMesas(mesasSeleccionadas)
      : await activarMesas(mesasSeleccionadas[0]);
    
    if (res.success) {
      setUrlGenerada(res.url || null);
      setMesasSeleccionadas([]); 
      alert("Mesas activadas correctamente");
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleDesactivar = async () => {
    if (mesasSeleccionadas.length === 0) return;
    // Basta con mandar una mesa del conjunto para que el servidor libere el grupo
    const res = await desactivarMesas(mesasSeleccionadas[0]);
    
    if (res.success) {
      setMesasSeleccionadas([]);
      alert("Mesa(s) desactivada(s) correctamente");
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
            onClick={() => toggleMesa(mesa.id_mesa)}
            className={`
              relative p-6 rounded-2xl shadow-sm border-4 flex flex-col items-center justify-center 
              transition-all active:scale-95 touch-manipulation
              ${mesasSeleccionadas.includes(mesa.id_mesa) 
                ? 'border-blue-600 ring-4 ring-blue-200' 
                : mesa.estado === 'Libre' ? 'border-green-500 bg-green-50' 
                : 'border-red-500 bg-red-50'
              }
            `}
          >
            <span className="text-xs font-bold text-gray-400">MESA</span>
            <span className="text-3xl font-black text-gray-800">{mesa.numero_mesa}</span>
            <span className="mt-2 text-[10px] font-bold uppercase">{mesa.estado}</span>
            {/* Si la mesa está en un grupo, podrías mostrar el ID de junta aquí */}
            {mesa.junta_id_mesa && (
              <span className="absolute top-1 left-2 text-[8px] bg-blue-100 text-blue-600 px-1 rounded">
                G-{mesa.junta_id_mesa}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className='flex p-4 mt-6 space-x-6 items-center'>
        <button 
          onClick={handleDesactivar} 
          disabled={mesasSeleccionadas.length === 0} 
          className='bg-red-400 disabled:bg-gray-200 hover:bg-red-500 p-8 rounded-lg text-white font-bold'
        >
          Desactivar
        </button>

        <button 
          onClick={handleActivar} 
          disabled={mesasSeleccionadas.length < 2} 
          className='bg-yellow-400 disabled:bg-gray-200 hover:bg-yellow-500 p-8 rounded-lg text-white font-bold'
        >
          Juntar y Activar
        </button>
        
        <button 
          onClick={handleActivar} 
          disabled={mesasSeleccionadas.length !== 1}
          className={`p-8 rounded-lg transition-colors font-bold
            ${mesasSeleccionadas.length === 1 
              ? 'bg-green-400 hover:bg-green-500 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          Activar Individual
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