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
      className="bg-white p-4 rounded-[1.7rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 relative cursor-pointer active:scale-95 transition-transform h-full flex flex-col justify-between"
    >
      {/* 1. Botón de Agregar (Flotante Top Right) */}
      <button 
        onClick={onQuickAdd}
        className="absolute top-3 right-3 bg-(--mint-green) text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-[var(--militar-green)] transition-colors z-10"
      >
        <span className="font-bold text-xl leading-none pb-0.5">+</span>
      </button>

      {/* 2. Imagen del Producto (Centrada y libre, sin recorte circular) */}
      <div className="w-full flex justify-center mb-1 mt-4">
         {/* Usamos drop-shadow en la imagen para darle profundidad realista */}
         <div className="w-28 h-28 relative drop-shadow-xl hover:scale-105 transition-transform duration-300"> 
            <Image 
               src={producto.imagen || "/ramen-placeholder.png"} 
               alt={producto.nombre}
               fill
               className="object-contain" // Muestra el plato entero sin cortarlo
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
         </div>
      </div>

      {/* 3. Información (Alineada abajo e izquierda) */}
      <div className="w-full mt-2">
        <h3 className="font-black text-slate-800 text-lg leading-tight mb-1 text-left line-clamp-1">
          {producto.nombre}
        </h3>
        
        <div className="flex justify-between items-end">
             <p className="text-slate-900 font-medium text-lg">
               ${producto.precio.toFixed(2)}
             </p>
             
             {/* Rating */}
             <div className="flex items-center gap-1 mb-1">
                {/* Estrella SVG rellena con color variable si lo tienes, o un verde similar */}
                <svg className="w-5 h-5 text-[var(--dark-mint-green)] fill-current opacity-80" viewBox="0 0 24 24">
                   <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="text-sm text-slate-400 font-bold">4.5</span>
             </div>
        </div>
      </div>
    </div>
  );
};