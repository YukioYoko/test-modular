"use client";
import { useState } from "react";
import Image from "next/image";

interface CartButtonProps {
  items: any[];
  onRemoveItem: (index: number) => void;
  // Agregamos esta prop para manejar el cambio de cantidad
  onUpdateQuantity: (index: number, action: 'add' | 'remove') => void;
  onSubmit: () => void;
  isPending: boolean;
}

export const CartButton = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onSubmit,
  isPending,
}: CartButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calcular total acumulado multiplicando precio por cantidad
  const total = items.reduce((acc, item) => acc + (item.price * item.cantidad || 0), 0);

  return (
    <>
      {/* MODO EXPANDIDO (MODAL) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-xl bg-(--mint-green) rounded-t-[2.5rem] p-6 shadow-2xl animate-slide-up h-[80vh] flex flex-col">
            
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

            {/* Lista de Items */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 scrollbar-hide mb-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-(--militar-green) opacity-50 gap-2">
                  <span className="text-4xl">🍽️</span>
                  <p className="font-bold">A Comer!</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.prod}-${index}`}
                    className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm relative"
                  >
                    <div className="w-16 h-16 relative bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={item.imagen || "/ramen-placeholder.png"}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 leading-tight truncate w-50">
                        {item.nombre}
                      </h4>
                      <p className="text-sm text-(--militar-green) font-black">
                        ${(item.price * item.cantidad).toFixed(2)}
                      </p>
                    </div>

                    {/* CONTROL DE CANTIDAD */}
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1 gap-3 ">
                      <button 
                        onClick={() => onUpdateQuantity(index, 'remove')}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm font-black text-(--militar-green) active:scale-90 transition-transform"
                      >
                        -
                      </button>
                      <span className="font-black text-slate-800 text-sm w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(index, 'add')}
                        className="w-8 h-8 flex items-center justify-center bg-(--militar-green) text-white rounded-xl shadow-sm font-black active:scale-90 transition-transform"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(index)}
                      className="bg-red-200 p-3 rounded-xl hover:bg-red-400 transition-colors " 
                    >
                      <Image src="../../Trash.svg" alt="Cart" width={20} height={20}  />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Botón de Acción Final */}
            <div className="mt-auto space-y-4">
              <div className="flex justify-between px-4 items-center">
                <span className="font-bold text-(--militar-green) opacity-60">Total</span>
                <span className="text-2xl font-black text-(--militar-green)">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onSubmit}
                disabled={isPending || items.length === 0}
                className={`w-full bg-white text-(--militar-green) py-5 rounded-3xl font-black text-lg shadow-lg active:scale-95 transition-transform flex justify-between px-8 items-center ${items.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>{isPending ? "Enviando..." : `Confirmar Orden`}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE (CERRADO) */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-(--mint-green) h-16 rounded-2xl shadow-xl flex items-center justify-between px-6 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="font-black text-(--militar-green) text-sm tracking-widest uppercase">
              {items.length === 0
                ? "VER CARRITO"
                : `MI PEDIDO • ${items.length} ITEMS`}
            </span>
            <div className="bg-(--color-not-white) p-2 rounded-xl">
               <Image src="../../Cart.svg" alt="Cart" width={20} height={20}  />
            </div>
          </button>
        </div>
      )}
    </>
  );
};