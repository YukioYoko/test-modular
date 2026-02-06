'use client';
import { useState } from 'react';
import Image from 'next/image';

interface DetailProps {
  producto: any;
  onClose: () => void;
  onAddToCart: (item: any) => void; // Recibe la función del padre
}

export const ProductDetailModal = ({ producto, onClose, onAddToCart }: DetailProps) => {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Manejo de checkboxes de aditamentos
  const toggleAditamento = (id: number) => {
    setAditamentosSel(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleConfirmar = () => {
    // 1. Construimos el objeto completo
    const itemParaCarrito = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      price: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      nota: nota,
      aditamentos: aditamentosSel // IDs de los extras
    };

    // 2. Ejecutamos la función del padre (MenuCategoriasComponent)
    onAddToCart(itemParaCarrito);
    
    // 3. Feedback visual y cerrar
    setIsAnimating(true);
    setTimeout(() => {
        onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* Backdrop oscuro (click para cerrar) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Tarjeta Modal (Expandida con margen de 20px aprox) */}
      {/* inset-5 equivale a 1.25rem (20px) de margen en todos los lados */}
      <div className="absolute inset-5 bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header con botón cerrar */}
        <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-100">
             <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
             </button>
             <h2 className="font-bold text-slate-700">Personalizar</h2>
             <div className="w-10"></div> {/* Espaciador para centrar título */}
        </div>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
             {/* Imagen Grande */}
             <div className="relative w-full h-48 mb-6 rounded-3xl overflow-hidden bg-slate-100">
                <Image 
                    src={producto.imagen || "/ramen-placeholder.png"} 
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                />
             </div>

             <h1 className="text-3xl font-black text-slate-800 mb-2">{producto.nombre}</h1>
             <p className="text-slate-500 mb-4 text-sm leading-relaxed">{producto.descripcion || "Sin descripción disponible."}</p>
             <p className="text-3xl font-black text-[var(--militar-green)] mb-6">${producto.precio.toFixed(2)}</p>

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
                            ? 'border-[var(--mint-green)] bg-[var(--notWhite)] ring-1 ring-[var(--mint-green)]' 
                            : 'border-slate-100 bg-white hover:bg-slate-50'
                        }`}
                        >
                        <span className="font-bold text-slate-700">{adi.nombre}</span>
                        <span className="text-[var(--militar-green)] font-bold">+${adi.precio}</span>
                        </button>
                    ))}
                    </div>
                </div>
             )}

             {/* Nota */}
             <div className="mb-4">
                 <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Instrucciones:</h3>
                 <textarea 
                    placeholder="Sin cebolla, salsa extra..."
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-sm focus:ring-2 focus:ring-[var(--mint-green)] outline-none resize-none h-24"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                />
             </div>
        </div>

        {/* Footer con Botón Acción */}
        <div className="p-5 border-t border-slate-100 bg-white">
            <button 
                onClick={handleConfirmar}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-lg text-lg flex justify-center items-center gap-2 transition-all active:scale-95 ${
                    isAnimating ? 'bg-green-500' : 'bg-(--militar-green)'
                }`}
            >
                {isAnimating ? (
                    <span>¡Agregado! ✓</span>
                ) : (
                    <span>Agregar al Carrito • ${(producto.precio + 0).toFixed(2)}</span> // Aquí podrías sumar el precio de los extras
                )}
            </button>
        </div>

      </div>
    </div>
  );
};