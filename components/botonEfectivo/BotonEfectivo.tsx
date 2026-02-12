'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrarPagoEfectivo } from '../app/(clientView)/cuenta/action';

export default function BotonEfectivo({ idComanda, desglose }: { idComanda: number, desglose: any }) {
  const [loading, setLoading] = useState(false);
  const [showGratitude, setShowGratitude] = useState(false);
  const router = useRouter();

  const handlePago = async () => {
    setLoading(true);
    // Ejecuta la transacción atómica en la base de datos
    const res = await registrarPagoEfectivo(idComanda, desglose);
    setLoading(false);

    if (res.success) {
      setShowGratitude(true);
    } else {
      alert(res.message);
    }
  };

  const cerrarYAvanzar = () => {
    setShowGratitude(false);
    router.push('/hostess'); // Redirección solicitada
  };

  return (
    <>
      <button 
        onClick={handlePago}
        disabled={loading}
        className="w-full mb-4 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
      >
        {loading ? "Procesando..." : "Pagar en efectivo"}
      </button>

      {/* MODAL DE AGRADECIMIENTO */}
      {showGratitude && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter mb-2">
              ¡Gracias por visitarnos!
            </h2>
            
            <p className="text-slate-500 font-medium mb-8">
              Tu solicitud de pago ha sido registrada. Por favor, dirígete a la caja para finalizar tu transacción.
            </p>

            <button 
              onClick={cerrarYAvanzar}
              className="w-full py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </>
  );
}