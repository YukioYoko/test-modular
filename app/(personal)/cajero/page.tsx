import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import CajaClient from './CajaClient';

// --- CONFIGURACIÓN PARA EVITAR ERRORES DE PRERENDER EN VERCEL ---
export const dynamic = 'force-dynamic';

export default function CajeroPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
          <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
            Iniciando Terminal de Cobro...
          </p>
        </div>
      }
    >
      <CajaClient />
    </Suspense>
  );
}