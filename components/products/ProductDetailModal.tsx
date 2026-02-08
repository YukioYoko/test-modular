'use client';
import { useState } from 'react';
import Image from 'next/image';

interface DetailProps {
  producto: any;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

export const ProductDetailModal = ({ producto, onClose, onAddToCart }: DetailProps) => {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 1. Calculamos el precio total dinámicamente (Base + Extras)
  const precioExtras = aditamentosSel.reduce((acc, id) => {
    const aditamento = producto.opcionesAditamentos.find((a: any) => a.id === id);
    return acc + (aditamento?.precio || 0);
  }, 0);

  const total = producto.precio + precioExtras;

  const toggleAditamento = (id: number) => {
    setAditamentosSel(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleConfirmar = () => {
    const itemParaCarrito = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      price: total, // Guardamos el precio con extras calculados
      imagen: producto.imagenUrl, // <--- USAMOS LA URL DE CLOUDINARY
      cantidad: 1,
      nota: nota,
      aditamentos: aditamentosSel 
    };

    onAddToCart(itemParaCarrito);
    
    setIsAnimating(true);
    setTimeout(() => {
        onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-5 bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
             <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
             </button>
             <h2 className="font-bold text-slate-700">Personalizar</h2>
             <div className="w-10"></div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
             {/* Imagen de Cloudinary */}
             <div className="relative w-full h-56 mb-6 rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
                <Image 
                    src={producto.imagenUrl || "/ramen-placeholder.png"} 
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
             </div>

             <h1 className="text-3xl font-black text-slate-800 mb-2 uppercase">{producto.nombre}</h1>
             <p className="text-slate-500 mb-4 text-sm leading-relaxed">{producto.descripcion || "Sin descripción disponible."}</p>
             <p className="text-3xl font-black text-(--militar-green) mb-6">${producto.precio.toFixed(2)}</p>

             {/* Aditamentos */}
             {producto.opcionesAditamentos && producto.opcionesAditamentos.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Extras disponibles:</h3>
                    <div className="grid grid-cols-1 gap-3">
                    {producto.opcionesAditamentos.map((adi: any) => (
                        <button
                        key={adi.id}
                        onClick={() => toggleAditamento(adi.id)}
                        className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${
                            aditamentosSel.includes(adi.id) 
                            ? 'border-(--mint-green) bg-(--light-green) ring-1 ring-(--mint-green)' 
                            : 'border-slate-100 bg-white hover:bg-slate-50'
                        }`}
                        >
                        <span className="font-bold text-slate-700">{adi.nombre}</span>
                        <span className="text-(--militar-green) font-bold">+${adi.precio.toFixed(2)}</span>
                        </button>
                    ))}
                    </div>
                </div>
             )}

             {/* Instrucciones */}
             <div className="mb-4">
                 <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Instrucciones especiales:</h3>
                 <textarea 
                    placeholder="Ej: Sin cebolla, término medio..."
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm focus:ring-2 focus:ring-(--mint-green) outline-none resize-none h-24 font-medium"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                />
             </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-white">
            <button 
                onClick={handleConfirmar}
                disabled={isAnimating}
                className={`w-full py-5 rounded-2xl font-black text-white shadow-xl text-lg flex justify-center items-center gap-2 transition-all active:scale-95 ${
                    isAnimating ? 'bg-green-500' : 'bg-(--militar-green)'
                }`}
            >
                {isAnimating ? (
                    <span>¡Agregado al pedido! ✓</span>
                ) : (
                    <span>Agregar • ${total.toFixed(2)}</span>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};