
'use client';

import { Suspense, useState } from 'react';
import { iniciarSesionPrueba } from './action';

function MenuPruebaContent() {
  const [isPending, setIsPending] = useState(false);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault(); // Detiene cualquier envío extra del navegador

    if (isPending) return; // Doble validación de seguridad

    setIsPending(true);

    try {
      const result = await iniciarSesionPrueba();
      
      // Si el action devolvió un error (y no redirigió)
      if (result?.error) {
        alert(result.error);
        setIsPending(false);
      }
    } catch (err) {
      // Solo capturamos errores reales, Next.js Redirect no debería caer aquí habitualmente
      console.error("Error en la sesión de prueba:", err);
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-[3rem] p-10 shadow-2xl text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-(--light-green) rounded-full flex items-center justify-center mx-auto mb-6">
        {isPending ? (
          <div className="w-10 h-10 border-4 border-(--militar-green) border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="text-4xl">🧪</span>
        )}
      </div>
      
      <h1 className="text-3xl font-black text-(--militar-green) italic uppercase tracking-tighter mb-4 leading-none">
        Foodlify <br/> <span className="text-slate-400">Beta Test</span>
      </h1>
      
      <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
        Estás por ingresar a una sesión de prueba masiva. <br/>
        <strong>Mesa asignada: 6</strong>
      </p>

      <form onSubmit={handleSumbit}>
        <button 
          type="submit"
          disabled={isPending}
          className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3
            ${isPending 
              ? 'bg-slate-400 cursor-not-allowed scale-95 opacity-70' 
              : 'bg-(--militar-green) text-white hover:scale-[1.05] active:scale-95'
            }`}
        >
          {isPending && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {isPending ? 'Generando...' : 'Generar Comanda y Entrar'}
        </button>
      </form>

      <p className="mt-6 text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-tight">
        {isPending 
          ? 'Conectando con el monitor de cocina...' 
          : 'Los pedidos realizados llegarán al monitor de cocina.'}
      </p>
    </div>
  );
}

export default function MenuPruebaPage() {
  return (
    <div className="min-h-screen bg-(--notWhite) flex items-center justify-center p-6">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-(--militar-green) border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-(--militar-green) text-xs uppercase tracking-widest">Iniciando Laboratorio...</p>
        </div>
      }>
        <MenuPruebaContent />
      </Suspense>
    </div>
  );
}