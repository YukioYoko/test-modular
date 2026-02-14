"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; 

interface CartButtonProps {
  items: any[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, action: 'add' | 'remove') => void;
  onSubmit: () => void;
  isPending: boolean;
  // Props para la navegación a la cuenta
  idComanda: number;
  token: string | null;
}

export const CartButton = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onSubmit,
  isPending,
  idComanda,
  token
}: CartButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calcular total acumulado (Precio x Cantidad)
  const total = items.reduce((acc, item) => acc + (item.price * item.cantidad || 0), 0);

  return (
    <>
      {/* ==============================
          MODO EXPANDIDO (MODAL)
      ============================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
          {/* Clic fuera para cerrar */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-xl bg-[var(--mint-green)] rounded-t-[2.5rem] p-6 shadow-2xl animate-slide-up h-[85vh] flex flex-col">
            
            {/* --- HEADER DEL CARRITO --- */}
            <div className="flex justify-between items-center mb-6 px-1">
              
              <div className="flex items-center gap-3">
                 <h2 className="text-2xl font-black text-[var(--militar-green)] tracking-tight">Tu Pedido</h2>
              </div>

              <div className="flex items-center gap-2">
                 {/* BOTÓN: IR A LA CUENTA (Atajo) */}
                 <Link 
                    href={`/cuenta?comanda=${idComanda}&token=${token}`}
                    className="bg-white/40 px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white transition-colors active:scale-95"
                 >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--militar-green)]">
                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
                      <line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="10" y2="16"/>
                    </svg>
                    <span className="text-xs font-black text-[var(--militar-green)]">CUENTA</span>
                 </Link>

                 {/* BOTÓN: CERRAR */}
                 <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 bg-white/40 rounded-full hover:bg-white transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--militar-green)] opacity-70"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>
              </div>
            </div>

            {/* --- LISTA DE ITEMS (SCROLL) --- */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 scrollbar-hide mb-4 pb-20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--militar-green)] opacity-50 gap-2">
                  <span className="text-6xl">🍽️</span>
                  <p className="font-bold text-lg">¡Tu carrito está vacío!</p>
                  <button onClick={() => setIsOpen(false)} className="text-sm font-bold underline mt-2">
                    Regresar al menú
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.prod}-${index}`}
                    // Layout Flex Horizontal + Overflow Hidden para cortar elementos salidos
                    className="bg-white p-3 rounded-[1.5rem] flex gap-3 shadow-sm relative overflow-hidden group"
                  >
                    {/* IMAGEN DEL PRODUCTO */}
                    <div className="w-20 h-20 relative bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                      <Image
                        src={item.imagen || "/ramen-placeholder.png"}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* INFO Y CONTROLES */}
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      
                      {/* Fila Superior: Nombre y Botón Borrar */}
                      <div className="flex justify-between items-start gap-2 relative">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 pr-8">
                          {item.nombre}
                        </h4>
                        
                        {/* Botón Borrar (SVG) - Posición Absoluta para no estorbar */}
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="absolute -top-1 -right-1 p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-90"
                          title="Eliminar producto"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>

                      {/* Fila Inferior: Precio y Cantidad */}
                      <div className="flex justify-between items-end mt-2">
                        <p className="text-sm text-[var(--militar-green)] font-black">
                          ${(item.price * item.cantidad).toFixed(2)}
                        </p>

                        {/* Control de Cantidad (+ / -) */}
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-2 h-8">
                          <button 
                            onClick={() => onUpdateQuantity(index, 'remove')}
                            className="w-6 h-full flex items-center justify-center bg-white rounded-lg shadow-sm text-[var(--militar-green)] font-bold active:scale-90 transition-transform hover:bg-slate-50"
                          >
                            -
                          </button>
                          <span className="font-bold text-slate-800 text-xs w-4 text-center">
                            {item.cantidad}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(index, 'add')}
                            className="w-6 h-full flex items-center justify-center bg-[var(--militar-green)] text-white rounded-lg shadow-sm font-bold active:scale-90 transition-transform hover:opacity-90"
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

            {/* --- FOOTER (TOTAL Y BOTÓN ENVIAR) --- */}
            <div className="mt-auto bg-[var(--mint-green)] pt-2 border-t border-[var(--militar-green)]/10">
              <div className="flex justify-between px-4 items-center mb-4">
                <span className="font-bold text-[var(--militar-green)] opacity-70">Total estimado</span>
                <span className="text-3xl font-black text-[var(--militar-green)]">${total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={onSubmit}
                disabled={isPending || items.length === 0}
                className={`w-full bg-white text-[var(--militar-green)] py-5 rounded-[1.5rem] font-black text-lg shadow-lg active:scale-95 transition-transform flex justify-between px-8 items-center ${items.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}`}
              >
                <span>{isPending ? "Enviando..." : `Confirmar Orden`}</span>
                <div className="bg-[var(--mint-green)] p-1.5 rounded-full">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
                </div>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==============================
          BOTÓN FLOTANTE (CERRADO)
      ============================== */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30 animate-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[var(--mint-green)] h-16 rounded-2xl shadow-xl flex items-center justify-between px-6 transition-transform hover:scale-[1.02] active:scale-95 border border-white/20"
          >
            <span className="font-black text-[var(--militar-green)] text-sm tracking-widest uppercase">
              {items.length === 0
                ? "VER CARRITO"
                : `MI PEDIDO • ${items.length} ITEMS`}
            </span>
            <div className="bg-[var(--color-not-white)] p-2.5 rounded-xl text-[var(--militar-green)] shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
          </button>
        </div>
      )}
    </>
  );
};