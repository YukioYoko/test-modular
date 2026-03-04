'use client';
import { Suspense } from 'react'; // Paso 1: Importar Suspense
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SeccionEncuesta } from "@/components";

// Paso 2: Crear un sub-componente que use los searchParams
function ContenidoGracias() {
  const searchParams = useSearchParams();
  const idComanda = Number(searchParams.get('idComanda')) || 0;

  return (
    <>
      <p className="text-slate-500 font-bold text-sm mb-6 leading-relaxed uppercase tracking-widest opacity-70">
        Esperamos que hayas disfrutado tu experiencia en <span className="text-(--militar-green)">Foodlify</span>.
      </p>

      {/* Pasamos el ID recuperado de la URL al componente de feedback */}
      {idComanda > 0 && <SeccionEncuesta idComanda={idComanda} />}
    </>
  );
}

// Paso 3: Envolver el componente principal con Suspense
export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-(--light-green) flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl text-center border border-(--mint-green)/30 animate-in fade-in zoom-in duration-500">
        
        <div className="bg-(--mint-green)/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <span className="text-5xl animate-bounce">🍕</span>
        </div>

        <h1 className="text-4xl font-black text-(--militar-green) leading-tight italic uppercase tracking-tighter mb-4">
          ¡Gracias por tu visita!
        </h1>

        {/* El Suspense envuelve la parte que depende de la URL */}
        <Suspense fallback={<p className="text-xs font-black animate-pulse">Cargando evaluación...</p>}>
          <ContenidoGracias />
        </Suspense>

        <div className="space-y-4 mt-10">
          {/**
           * <Link 
            href="/menu" 
            className="block w-full py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.02] transition-all"
          >
            Volver al Menú Principal
          </Link> 
          */}
          
          
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-4">
            Foodlify Platform • Guadalajara, Jal.
          </p>
        </div>
      </div>
    </div>
  );
}