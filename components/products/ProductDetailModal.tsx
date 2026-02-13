'use client';
import { useState } from 'react';
import Image from 'next/image';

interface DetailProps {
  producto: any;
  onClose: () => void;
  onAddToCart: (item: any) => void;
  esSoloLectura?: boolean; // Prop para controlar el modo visualización
}

export const ProductDetailModal = ({ producto, onClose, onAddToCart, esSoloLectura = false }: DetailProps) => {
  const [nota, setNota] = useState("");
  const [aditamentosSel, setAditamentosSel] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculamos el precio total dinámicamente (Base + Extras)
  const precioExtras = aditamentosSel.reduce((acc, id) => {
    const aditamento = producto.opcionesAditamentos?.find((a: any) => a.id === id);
    return acc + (aditamento?.precio || 0);
  }, 0);

  const total = producto.precio + precioExtras;

  const toggleAditamento = (id: number) => {
    if (esSoloLectura) return; // Bloqueo de seguridad
    setAditamentosSel(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleConfirmar = () => {
    if (esSoloLectura) return;

    const itemParaCarrito = {
      prod: producto.id_producto,
      nombre: producto.nombre,
      price: total,
      imagen: producto.imagenUrl,
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
      {/* Overlay con desenfoque */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-5 bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-w-2xl mx-auto border border-white/20">
        
        {/* Header Fijo */}
        <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-100 shrink-0">
             <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
             </button>
             <h2 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
               {esSoloLectura ? "Detalles del Platillo" : "Personalizar Orden"}
             </h2>
             <div className="w-10"></div>
        </div>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
             {/* Imagen del Producto */}
             <div className="relative w-full h-64 mb-6 rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
                <Image 
                    src={producto.imagenUrl || "/ramen-placeholder.png"} 
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
             </div>

             <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">
                  {producto.nombre}
                </h1>
                <p className="text-3xl font-black text-(--militar-green) tracking-tighter">
                  ${producto.precio.toFixed(2)}
                </p>
             </div>

             <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-black text-white bg-(--militar-green) px-3 py-1 rounded-lg uppercase tracking-widest">
                  {producto.categoria || "Menú"}
                </span>
                {producto.tiempo_prep > 0 && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <span className="text-[10px] font-bold uppercase italic">{producto.tiempo_prep} min</span>
                  </div>
                )}
             </div>

             <p className="text-slate-500 mb-8 text-sm leading-relaxed font-medium italic">
               "{producto.descripcion || "Una selección maestra de nuestros chefs para tu paladar."}"
             </p>

             {/* ELEMENTOS INTERACTIVOS: Se ocultan en modo solo lectura */}
             {!esSoloLectura ? (
                <>
                  {/* Aditamentos / Extras */}
                  {producto.opcionesAditamentos && producto.opcionesAditamentos.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-[0.2em]">Añadir Extras</h3>
                        <div className="grid grid-cols-1 gap-3">
                        {producto.opcionesAditamentos.map((adi: any) => (
                            <button
                              key={adi.id}
                              onClick={() => toggleAditamento(adi.id)}
                              className={`flex justify-between items-center p-5 rounded-2xl border-2 transition-all ${
                                  aditamentosSel.includes(adi.id) 
                                  ? 'border-(--militar-green) bg-(--light-green)' 
                                  : 'border-slate-100 bg-white hover:border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${aditamentosSel.includes(adi.id) ? 'bg-(--militar-green) border-(--militar-green)' : 'border-slate-200'}`}>
                                  {aditamentosSel.includes(adi.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>}
                                </div>
                                <span className="font-bold text-slate-700">{adi.nombre}</span>
                              </div>
                              <span className="text-(--militar-green) font-black text-sm">+${adi.precio.toFixed(2)}</span>
                            </button>
                        ))}
                        </div>
                    </div>
                  )}

                  {/* Campo de Notas */}
                  <div className="mb-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em]">Notas Especiales</h3>
                      <textarea 
                        placeholder="Ej: Sin cebolla, término medio..."
                        className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-3xl text-sm focus:border-(--mint-green) focus:bg-white outline-none resize-none h-28 font-bold transition-all"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                    />
                  </div>
                </>
             ) : (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Modo Lectura
                  </p>
                </div>
             )}
        </div>

        {/* Footer / Botón de Acción */}
        <div className="p-6 border-t border-slate-100 bg-white shrink-0">
            {!esSoloLectura ? (
              <button 
                  onClick={handleConfirmar}
                  disabled={isAnimating}
                  className={`w-full py-5 rounded-[2rem] font-black text-white shadow-xl text-sm tracking-widest uppercase flex justify-center items-center gap-3 transition-all active:scale-95 ${
                      isAnimating ? 'bg-green-500' : 'bg-(--militar-green)'
                  }`}
              >
                  {isAnimating ? (
                      <><span>¡PEDIDO ACTUALIZADO!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></>
                  ) : (
                      <><span>Añadir a la orden</span><span className="opacity-30">•</span><span>${total.toFixed(2)}</span></>
                  )}
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="w-full py-5 rounded-[2rem] font-black text-slate-400 bg-slate-50 border border-slate-100 text-xs tracking-widest uppercase hover:bg-slate-100 transition-all"
              >
                Cerrar Visualización
              </button>
            )}
        </div>
      </div>
    </div>
  );
};