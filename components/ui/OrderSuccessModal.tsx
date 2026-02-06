'use client';
import { useEffect, useState } from 'react';

export const OrderSuccessModal = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño timeout para asegurar que el navegador procese el estado inicial antes de animar
    const entryTimer = setTimeout(() => setIsVisible(true), 10);
    
    // Auto-cierre
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); 
    }, 3000);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(exitTimer);
    };
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
      
      <div className={`bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}`}>
        
        {/* Círculo con efecto POP y Check animado */}
        <div className={`w-24 h-24 bg-[var(--mint-green)] rounded-full flex items-center justify-center mb-6 transition-transform duration-700 delay-100 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}>
           <svg 
             className="w-12 h-12 text-[var(--militar-green)] drop-shadow-sm" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor" 
             strokeWidth="3"
             style={{ overflow: 'visible' }} // Permite que los bordes redondos no se corten
           >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7" 
                // TRUCO DE ANIMACIÓN:
                // 1. dasharray: define el largo del trazo (aprox 25px)
                // 2. dashoffset: si es 25 está oculto, si es 0 está visible.
                // 3. transition: anima el cambio
                strokeDasharray={30}
                strokeDashoffset={isVisible ? 0 : 30}
                className="transition-all duration-1000 ease-out delay-300"
              />
           </svg>
        </div>

        <h2 className="text-2xl font-black text-[var(--militar-green)] mb-2">
          ¡Orden Enviada!
        </h2>
        
        <p className="text-slate-500 font-medium mb-6">
          La cocina ha recibido tu pedido y comenzará a prepararlo de inmediato.
        </p>

        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-[var(--militar-green)] rounded-full transition-all duration-[3000ms] ease-linear ${isVisible ? 'w-full' : 'w-0'}`} />
        </div>
      </div>
    </div>
  );
};