'use client';
import { ProductCard } from './ProductCard';

export function AprioriModal({ productoBaseNombre, sugerencias, onAdd, onClose }: any) {
  return (
    // He subido el z-index a 200 por si acaso y oscurecido un poco el fondo
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md max-h-lg">
      {/* max-w-lg (512px) es mejor para un grid de 2 columnas que max-w-sm */}
      <div className="bg-white rounded-[32px] p-6 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
        
        <div className="text-center mb-6">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
             <span className="text-3xl">🤝</span>
          </div>
          <h3 className="font-black text-slate-800 text-xl leading-tight">
            ¡Excelente elección!
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Muchos acompañan su <span className="font-bold text-orange-600">{productoBaseNombre}</span> con:
          </p>
        </div>

        {/* CAMBIO CLAVE: Grid 2x2 con gaps ajustados */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {sugerencias.slice(0, 4).map((prod: any) => (
            <div key={prod.id_producto} className="border border-slate-100 rounded-2xl overflow-hidden hover:border-orange-200 transition-colors">
               <ProductCard 
                  producto={prod} 
                  onSelect={() => {}} 
                  onQuickAdd={(e: any) => { 
                    onAdd(prod, e); 
                    // No cerramos el modal inmediatamente si quieres que agregue más, 
                    // pero si prefieres cerrar al agregar uno, mantén onClose()
                    onClose(); 
                  }} 
               />
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-100 rounded-2xl text-slate-500 font-black hover:bg-slate-200 transition-all active:scale-95"
        >
          CONTINUAR CON MI ORDEN
        </button>
      </div>
    </div>
  );
}