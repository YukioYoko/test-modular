'use client'
import { useState } from 'react';
import { registrarPagoEfectivo } from '../app/(clientView)/cuenta/action';
import { useRouter } from 'next/navigation';

export default function BotonEfectivo({ idComanda, desglose }: { idComanda: number, desglose: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePago = async () => {
    if (!confirm("¿Confirmas que el pago se realizará en efectivo en caja?")) return;
    
    setLoading(true);
    const res = await registrarPagoEfectivo(idComanda, desglose);
    setLoading(false);

    if (res.success) {
      alert("Pedido finalizado. Por favor pasa a caja a liquidar.");
      router.push('/gracias'); // O a una página de agradecimiento
    } else {
      alert(res.message);
    }
  };

  return (
    <button 
      onClick={handlePago}
      disabled={loading}
      className="w-full mb-4 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
    >
      {loading ? "Procesando..." : "Pagar en efectivo"}
    </button>
  );
}