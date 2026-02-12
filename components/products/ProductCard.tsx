'use client';
import Image from 'next/image';

interface ProductCardProps {
  producto: any;
  onSelect: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
  mostrarBotonAdd?: boolean; // Nueva prop
}

export const ProductCard = ({ producto, onSelect, onQuickAdd, mostrarBotonAdd = true }: ProductCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`group bg-white rounded-[2.2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 relative h-full flex flex-col overflow-hidden transition-all duration-300 ${mostrarBotonAdd ? 'cursor-pointer active:scale-95 hover:shadow-xl hover:-translate-y-1' : 'cursor-default opacity-90'}`}
    >
      {/* Solo mostramos el botón + si NO es solo lectura */}
      {mostrarBotonAdd && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(e);
          }}
          className="absolute top-4 right-4 bg-(--mint-green) text-white rounded-2xl w-10 h-10 flex items-center justify-center shadow-lg hover:bg-(--militar-green) z-10 active:scale-90"
        >
          <span className="font-black text-2xl">+</span>
        </button>
      )}

      <div className="w-full h-44 relative overflow-hidden">
        <Image src={producto.imagenUrl || "/ramen-placeholder.png"} alt={producto.nombre} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="p-5 mt-auto">
        <span className="text-[10px] font-black text-(--militar-green) uppercase tracking-widest opacity-60 mb-1 block">{producto.categoria}</span>
        <h3 className="font-black text-slate-800 text-base leading-tight mb-2 line-clamp-2 min-h-10">{producto.nombre}</h3>
        <p className="text-(--militar-green) font-black text-xl">${Number(producto.precio).toFixed(2)}</p>
      </div>
    </div>
  );
};