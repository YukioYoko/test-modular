'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SugerenciasApriori } from '@/components';

export default function ProductoDetalleClient({ producto, urlRetorno }: any) {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [agregado, setAgregado] = useState(false);

  const toggleAditamento = (id: number) => {
    setAditamentosSel(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleAgregarAlCarrito = () => {
    // Aquí podrías usar un Contexto de React o LocalStorage para persistir el carrito
    const itemCarrito = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      cantidad: 1,
      nota,
      aditamentos: aditamentosSel
    };

    // Lógica para guardar (Ejemplo con localStorage para persistencia entre páginas)
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    localStorage.setItem('carrito', JSON.stringify([...carritoActual, itemCarrito]));
    
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link href={urlRetorno} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-bold text-slate-800">Personalizar Orden</h1>
      </div>

      <main className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-2">{producto.nombre}</h2>
          <h2 className="text-xl font-black text-slate-800 mb-2">{producto.descripcion}</h2>
          <p className="text-2xl font-black text-emerald-600 mb-4">${producto.precio.toFixed(2)}</p>
        <p className="text-l font-black text-slate-800 mb-2">{producto.pasos}</p>
          {/* Aditamentos */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase">Añadir extras:</h3>
            <div className="grid grid-cols-1 gap-2">
              {producto.aditamentos.map((adi: any) => (
                <button
                  key={adi.id}
                  onClick={() => toggleAditamento(adi.id)}
                  className={`flex justify-between p-4 rounded-2xl border transition-all ${
                    aditamentosSel.includes(adi.id) ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <span className="font-bold text-slate-700">{adi.nombre}</span>
                  <span className="text-orange-600 font-bold">+${adi.precio.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          <textarea 
            placeholder="Instrucciones especiales para cocina..."
            className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm mb-6 focus:ring-2 focus:ring-orange-500"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />

<SugerenciasApriori 
    productoId={producto.id_producto} 
    onQuickAdd={onAddToCart} // Reutiliza tu función de agregar
  />
  
          <button 
            onClick={handleAgregarAlCarrito}
            className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 ${
              agregado ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
            }`}
          >
            {agregado ? '¡AÑADIDO!' : 'AÑADIR AL CARRITO'}
          </button>
        </div>
      </main>
    </div>
  );
}