'use client';
import { ProductCard } from './ProductCard';

export function AprioriModal({ productoBaseNombre, sugerencias, onAdd, onClose, onSelectProduct }: any) {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-4xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Encabezado */}
        <div className="text-center mb-4 shrink-0">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
             <span className="text-2xl">🤝</span>
          </div>
          <h3 className="font-black text-slate-800 text-lg leading-tight italic">
            ¡Excelente elección!
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Combinan bien con tu <span className="font-bold text-orange-600">{productoBaseNombre}</span>:
          </p>
        </div>

        {/* Contenedor de Sugerencias */}
        <div className="overflow-y-auto pr-1 mb-4 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3">
            {sugerencias.slice(0, 4).map((prod: any) => (
              <div key={prod.id_producto} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                 <ProductCard 
                    producto={prod} 
                    // CAMBIO: Llamamos a la función para abrir el modal de detalle
                    onSelect={() => onSelectProduct(prod)} 
                    onQuickAdd={(e: any) => { 
                      onAdd(prod, e); 
                      onClose(); 
                    }} 
                 />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-100 rounded-2xl text-slate-500 font-black hover:bg-slate-200 transition-all shrink-0 uppercase text-[10px] tracking-widest"
        >
          Continuar con mi orden
        </button>
      </div>
    </div>
  );
}