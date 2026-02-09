// components/products/AprioriModal.tsx
'use client';
import { ProductCard } from './ProductCard';

export function AprioriModal({ productoBaseNombre, sugerencias, onAdd, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] p-6 w-full max-w-sm shadow-2xl animate-in zoom-in duration-300">
        <div className="text-center mb-4">
          <span className="text-3xl">🤝</span>
          <h3 className="font-black text-slate-800 text-lg leading-tight mt-2">
            ¡Excelente elección!
          </h3>
          <p className="text-slate-500 text-sm">
            Muchos acompañan su <span className="font-bold text-orange-600">{productoBaseNombre}</span> con:
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {sugerencias.map((prod: any) => (
            <div key={prod.id_producto} className="border border-slate-100 rounded-2xl p-1">
               <ProductCard 
                  producto={prod} 
                  onQuickAdd={(e: any) => { onAdd(prod, e); onClose(); }} 
               />
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors"
        >
          No, gracias
        </button>
      </div>
    </div>
  );
}