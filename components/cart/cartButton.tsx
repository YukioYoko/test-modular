"use client";
import { useState } from "react";
import Image from "next/image";

interface CartButtonProps {
  items: any[];
  onRemoveItem: (index: number) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export const CartButton = ({ items, onRemoveItem, onSubmit, isPending }: CartButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calcular total
  const total = items.reduce((acc, item) => acc + (item.price || 0), 0);

  // 1. ELIMINAMOS EL RETURN NULL AQUÍ PARA QUE SIEMPRE SE RENDERICE

  return (
    <>
      {/* ==============================
          MODO EXPANDIDO (MODAL)
      ============================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-md bg-(--mint-green) rounded-t-[2.5rem] p-6 shadow-2xl animate-slide-up h-[80vh] flex flex-col">
            
            {/* Header del Carrito */}
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center justify-center rounded-lg text-(--militar-green)">
                <Image src="../../Cart.svg" alt="Cart" width={24} height={24} />
              </div>
              <h2 className="text-2xl font-bold text-(--militar-green)">Carrito</h2>
              <button onClick={() => setIsOpen(false)} className="p-1">
                <Image src="../../close.svg" alt="Cerrar" width={32} height={32} className="opacity-60" />
              </button>
            </div>

            {/* Lista de Items (Scrollable) */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 scrollbar-hide mb-4">
              {/* 2. AGREGAMOS UN ESTADO VACÍO VISUAL */}
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-(--militar-green) opacity-50 gap-2">
                   <span className="text-4xl">🍽️</span>
                   <p className="font-bold">A Comer!</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={`${item.prod}-${index}`} className="bg-white p-3 rounded-2xl flex items-center gap-4 shadow-sm relative">
                    <div className="w-16 h-16 relative bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.imagen || "/ramen-placeholder.png"} 
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 leading-tight">{item.nombre}</h4>
                      <p className="text-sm text-slate-500 font-bold">${item.price?.toFixed(2)}</p>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="bg-[#C44529] p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                       <Image src="../../trash.svg" alt="Borrar" width={24} height={24} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Botón de Acción Final */}
            <div className="mt-auto">
               <button
                onClick={onSubmit}
                // 3. DESHABILITAMOS EL BOTÓN SI ESTÁ VACÍO
                disabled={isPending || items.length === 0}
                className={`w-full bg-white text-(--militar-green) py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform flex justify-between px-6 items-center ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 <span>{isPending ? 'Enviando...' : `Confirmar Orden`}</span>
                 <span className="bg-(--militar-green) text-white text-xs px-2 py-1 rounded-md">
                    {items.length}
                 </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================
          BOTÓN FLOTANTE (CERRADO)
      ============================== */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-(--mint-green) h-16 rounded-2xl shadow-xl flex items-center justify-between px-6 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="font-bold text-(--militar-green) text-lg tracking-wide">
              {items.length === 0 ? "VER CARRITO" : `VER PEDIDO • ${items.length}`}
            </span>
            <div className=" p-2 rounded-lg">
                <Image src="../../Cart.svg" alt="Cart" width={32} height={32} />
            </div>
          </button>
        </div>
      )}
    </>
  );
};