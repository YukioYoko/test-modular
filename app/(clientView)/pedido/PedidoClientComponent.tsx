//import { supabase } from '@/lib/supabase';
//import { useRouter } from 'next/navigation';
'use client';
'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';


export default function PedidoClientComponent({ productos, total }: { productos: any[], total: number }) {
  //const router = useRouter();
  
  useEffect(() => {
    const socket = io("http://localhost:3001");
    
  })

  
const STATUS_COLORS: { [key: string]: string } = {
  "En espera": "bg-amber-100 text-amber-700 border-amber-200",
  "En preparacion": "bg-blue-100 text-blue-700 border-blue-200",
  "Servido": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Cancelado": "bg-red-100 text-red-700 border-red-200"
};
 return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {productos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">Aún no has pedido nada...</p>
          </div>
        ) : (
          productos.map((item) => (
            <div key={item.id_detalle} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">{item.cantidad}x</span>
                    <h3 className="font-bold text-slate-800">{item.nombre}</h3>
                  </div>
                  
                  {/* Listado de Aditamentos */}
                  {item.aditamentos.length > 0 && (
                    <p className="text-xs text-slate-500 italic mb-2">
                      + {item.aditamentos.join(', ')}
                    </p>
                  )}
                </div>
                <p className="font-black text-slate-900">${item.precioTotal.toFixed(2)}</p>
              </div>

              {item.notas && (
                <div className="bg-slate-50 p-2 rounded-lg mb-3">
                  <p className="text-[11px] text-slate-500">
                    <span className="font-bold uppercase mr-1">Nota:</span> {item.notas}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[item.status] || "bg-gray-100"}`}>
                  {item.status.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {item.categoria}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen de Total */}
      {productos.length > 0 && (
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Subtotal actual</p>
            <p className="text-2xl font-black">${total.toFixed(2)}</p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
            Ver Cuenta
          </button>
        </div>
      )}
    </div>
  );
}


/*   useEffect(() => {
    const channel = supabase
      .channel('estatus-cliente')
      .on(
        'postgres_changes',
        { event: 'UPDATE', table: 'detalle_comanda' },
        () => {
          router.refresh(); // Actualiza el estatus visualmente
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]); */