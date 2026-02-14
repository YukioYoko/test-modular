"use client";
import { useState } from "react";
import Image from "next/image";

interface CartButtonProps {
  items: any[];
  onRemoveItem: (index: number) => void;
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

  // Calcular total acumulado
  const total = items.reduce((acc, item) => acc + (item.price * item.cantidad || 0), 0);

  return (
    <>
      {/* MODO EXPANDIDO (MODAL) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-xl bg-[var(--mint-green)] rounded-t-[2.5rem] p-6 shadow-2xl animate-slide-up h-[85vh] flex flex-col">
            
            {/* Header del Carrito */}
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center justify-center rounded-lg text-[var(--militar-green)]">
                {/* Icono Bolsa (SVG) */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--militar-green)]">Carrito</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-white/40 rounded-full hover:bg-white transition-colors"
              >
                {/* Icono Cerrar (SVG) */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--militar-green)] opacity-70"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Lista de Items */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 scrollbar-hide mb-4 pb-20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--militar-green)] opacity-50 gap-2">
                  <span className="text-4xl">🍽️</span>
                  <p className="font-bold">¡Tu carrito está vacío!</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.prod}-${index}`}
                    className="bg-white p-3 rounded-[1.5rem] flex gap-3 shadow-sm relative overflow-hidden group"
                  >
                    {/* Imagen */}
                    <div className="w-20 h-20 relative bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                      <Image
                        src={item.imagen || "/ramen-placeholder.png"}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      
                      {/* Fila Superior: Nombre y Botón Borrar */}
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 pr-6">
                          {item.nombre}
                        </h4>
                        
                        {/* Botón Borrar (SVG ROJO) - Posición absoluta para asegurar visibilidad */}
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1 transition-colors hover:bg-red-50 rounded-full"
                          title="Eliminar producto"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>

                      {/* Fila Inferior */}
                      <div className="flex justify-between items-end mt-2">
                        <p className="text-sm text-[var(--militar-green)] font-black">
                          ${(item.price * item.cantidad).toFixed(2)}
                        </p>

                        {/* Controles Cantidad */}
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-2 h-8">
                          <button 
                            onClick={() => onUpdateQuantity(index, 'remove')}
                            className="w-6 h-full flex items-center justify-center bg-white rounded-lg shadow-sm text-[var(--militar-green)] font-bold active:scale-90 transition-transform"
                          >
                            -
                          </button>
                          <span className="font-bold text-slate-800 text-xs w-4 text-center">
                            {item.cantidad}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(index, 'add')}
                            className="w-6 h-full flex items-center justify-center bg-[var(--militar-green)] text-white rounded-lg shadow-sm font-bold active:scale-90 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Fijo */}
            <div className="mt-auto bg-(--mint-green) pt-2">
              <div className="flex justify-between px-4 items-center mb-4">
                <span className="font-bold text-(--militar-green) opacity-70">Total</span>
                <span className="text-3xl font-black text-(--militar-green)">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onSubmit}
                disabled={isPending || items.length === 0}
                className={`w-full bg-white text-[var(--militar-green)] py-5 rounded-[1.5rem] font-black text-lg shadow-lg active:scale-95 transition-transform flex justify-between px-8 items-center ${items.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
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
            className="w-full bg-[var(--mint-green)] h-16 rounded-2xl shadow-xl flex items-center justify-between px-6 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="font-black text-[var(--militar-green)] text-sm tracking-widest uppercase">
              {items.length === 0
                ? "VER CARRITO"
                : `MI PEDIDO • ${items.length} ITEMS`}
            </span>
            <div className="bg-[var(--color-not-white)] p-2 rounded-xl text-[var(--militar-green)]">
                {/* Icono Bolsa (SVG) */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
          </button>
        </div>
      )}
    </>
  );
};