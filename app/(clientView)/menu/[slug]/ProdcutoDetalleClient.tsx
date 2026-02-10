'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AprioriModal } from '@/components/products/SugerenciaApriori';
import { getSugerenciasApriori } from '@/components/products/action';

export default function ProductoDetalleClient({ producto, urlRetorno }: any) {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [agregado, setAgregado] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{nombre: string, productos: any[]} | null>(null);

  const toggleAditamento = (id: number) => {
    setAditamentosSel(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAgregar = async () => {
    const item = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      price: producto.precio,
      cantidad: 1,
      nota,
      aditamentos: aditamentosSel
    };

    const actual = JSON.parse(localStorage.getItem('carrito') || '[]');
    localStorage.setItem('carrito', JSON.stringify([...actual, item]));
    
    setAgregado(true);

    const res = await getSugerenciasApriori(producto.id_producto);
    if (res && res.length > 0) {
        setSugerenciasData({ nombre: producto.nombre, productos: res });
    } else {
        setTimeout(() => setAgregado(false), 2000);
    }
  };

  const agregarSugerencia = (prodSug: any) => {
    const item = { 
      prod: prodSug.id_producto, 
      nombre: prodSug.nombre, 
      price: Number(prodSug.precio), 
      cantidad: 1, 
      nota: "", 
      aditamentos: [] 
    };
    const actual = JSON.parse(localStorage.getItem('carrito') || '[]');
    localStorage.setItem('carrito', JSON.stringify([...actual, item]));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link href={urlRetorno} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-bold text-slate-800">Personalizar</h1>
      </div>

      <main className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{producto.categoria}</span>
          <h2 className="text-3xl font-black text-slate-800 mt-2 mb-2">{producto.nombre}</h2>
          <p className="text-slate-500 mb-6">{producto.descripcion}</p>

          {/* LISTA DE ADITAMENTOS */}
          {producto.aditamentos?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4">Añadir extras</h3>
              <div className="space-y-3">
                {producto.aditamentos.map((adi: any) => (
                  <button
                    key={adi.id}
                    onClick={() => toggleAditamento(adi.id)}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                      aditamentosSel.includes(adi.id) 
                      ? 'border-slate-900 bg-slate-900 text-white' 
                      : 'border-slate-100 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="font-bold">{adi.nombre}</span>
                    <span className="font-black text-sm">+ ${adi.precio}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">Instrucciones especiales</h3>
            <textarea 
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="¿Alguna alergia o preferencia?"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none min-h-25"
            />
          </div>
          
          <button 
            onClick={handleAgregar}
            className={`w-full py-5 rounded-2xl font-black shadow-lg transition-all active:scale-95 ${
              agregado ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'
            }`}
          >
            {agregado ? '✓ AÑADIDO AL CARRITO' : `AÑADIR POR $${producto.precio}`}
          </button>
        </div>
      </main>

      {/* MODAL APRIORI */}
      {sugerenciasData && (
        <AprioriModal 
          productoBaseNombre={sugerenciasData.nombre}
          sugerencias={sugerenciasData.productos}
          onAdd={agregarSugerencia}
          onClose={() => {
            setSugerenciasData(null);
            setAgregado(false);
          }}
        />
      )}
    </div>
  );
}