'use client';
import Image from 'next/image';

interface ProductCardProps {
  producto: any;
  onSelect: () => void;
  onQuickAdd: (e: React.MouseEvent) => void;
}

export const ProductCard = ({ producto, onSelect, onQuickAdd }: ProductCardProps) => {
  return (
    <div
      onClick={onSelect}
      className="group bg-white rounded-[2.2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 relative cursor-pointer active:scale-95 transition-all duration-300 h-full flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1"
    >
      {/* 1. Botón de Agregar (Flotante Top Right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onQuickAdd(e);
        }}
        className="absolute top-4 right-4 bg-(--mint-green) text-white rounded-2xl w-10 h-10 flex items-center justify-center shadow-lg hover:bg-(--militar-green) transition-colors z-10 active:scale-90"
      >
        <span className="font-black text-2xl leading-none">+</span>
      </button>

      {/* 2. Imagen del Producto */}
      <div className="w-full h-44 relative overflow-hidden">
        <Image
          src={producto.imagenUrl || "/ramen-placeholder.png"}
          alt={producto.nombre}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* 3. Información */}
      <div className="w-full mt-auto p-5">
        <span className="text-[10px] font-black text-(--militar-green) uppercase tracking-widest opacity-60 mb-1 block">
          {producto.categoria}
        </span>
        <h3 className="font-black text-slate-800 text-base leading-tight mb-2 text-left line-clamp-2 min-h-10">
          {producto.nombre}
        </h3>

        <div className="flex justify-between items-center">
             <p className="text-(--militar-green) font-black text-xl">
                ${Number(producto.precio).toFixed(2)}
             </p>

             {/* Rating o Tiempo */}
             <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                   <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="text-[11px] text-slate-500 font-black">4.8</span>
             </div>
        </div>
      </div>
    </div>
  );
};