'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AprioriModal } from '@/components/products/SugerenciaApriori';
import { getSugerenciasApriori } from '@/components/products/action';

export default function ProductoDetalleClient({ producto, urlRetorno }: any) {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [agregado, setAgregado] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{nombre: string, productos: any[]} | null>(null);

  const handleAgregar = async () => {
    const item = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      price: producto.precio,
      cantidad: 1,
      nota,
      aditamentos: aditamentosSel
    };

    // Guardar en LocalStorage
    const actual = JSON.parse(localStorage.getItem('carrito') || '[]');
    localStorage.setItem('carrito', JSON.stringify([...actual, item]));
    
    setAgregado(true);

    // MINERÍA DE DATOS: Buscar sugerencias
    const res = await getSugerenciasApriori(producto.id_producto);
    if (res && res.length > 0) {
        setSugerenciasData({ nombre: producto.nombre, productos: res });
    } else {
        // Si no hay sugerencias, solo damos feedback visual
        setTimeout(() => setAgregado(false), 2000);
    }
  };

  const agregarSugerencia = (prodSug: any) => {
    const item = { prod: prodSug.id_producto, nombre: prodSug.nombre, price: prodSug.precio, cantidad: 1, nota: "", aditamentos: [] };
    const actual = JSON.parse(localStorage.getItem('carrito') || '[]');
    localStorage.setItem('carrito', JSON.stringify([...actual, item]));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link href={urlRetorno} className="p-2 hover:bg-slate-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-bold text-slate-800">Personalizar</h1>
      </div>

      <main className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-2">{producto.nombre}</h2>
          <p className="text-slate-500 mb-6">{producto.descripcion}</p>

          {/* Sección de aditamentos... (mapeo de aditamentos) */}
          
          <button 
            onClick={handleAgregar}
            className={`w-full py-5 rounded-2xl font-black shadow-lg transition-all ${
              agregado ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'
            }`}
          >
            {agregado ? '✓ AÑADIDO' : `AÑADIR POR $${producto.precio}`}
          </button>
        </div>
      </main>

      {/* MODAL DE MINERÍA DE DATOS */}
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