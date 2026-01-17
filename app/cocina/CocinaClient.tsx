'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTransition } from 'react';
import { actualizarEstatusPedido } from './action';

export default function CocinaClient({ pedidosIniciales }: { pedidosIniciales: any[] }) {
  const router = useRouter();

  useEffect(() => {
  const channel = supabase
    .channel('cambios-cocina')
    .on(
      'postgres_changes' as any, // Forzamos el tipo si TS da problemas
      { 
        event: '*', 
        schema: 'public', 
        table: 'detalle_comanda' 
      },
      (payload) => {
        console.log('Cambio detectado:', payload);
        // router.refresh() pide a Next.js que vuelva a ejecutar getPedidosCocina()
        startTransition(() => {
          router.refresh();
        });
      }
    )
    .subscribe((status) => {
      console.log("Estado de suscripción:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, [router]);
   
  const [isPending, startTransition] = useTransition();

  const cambiarEstatus = (id: number, estatus: string) => {
    startTransition(async () => {
      await actualizarEstatusPedido(id, estatus);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pedidosIniciales.map((pedido) => (
        <div key={pedido.id_detalle} 
          className={`bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 transition-all ${
            pedido.status === 'En preparacion' ? 'border-blue-500' : 'border-amber-500 animate-pulse'
          }`}
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                MESA {pedido.comanda.id_mesa}
              </span>
              <span 
                className="text-[10px] font-mono text-slate-400" 
                suppressHydrationWarning // <--- Esto silencia el error de diferencia servidor/cliente
              >
                {new Date(pedido.comanda.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-1">
              {pedido.cantidad}x {pedido.producto.nombre}
            </h3>

            {/* Aditamentos Destacados */}
            {pedido.aditamentos.length > 0 && (
              <div className="flex flex-wrap gap-1 my-3">
                {pedido.aditamentos.map((a: any) => (
                  <span key={a.aditamento.id_aditamento} className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    + {a.aditamento.nombre}
                  </span>
                ))}
              </div>
            )}

            {/* Notas Especiales */}
            {pedido.notas_especiales && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 my-3">
                <p className="text-xs text-red-700 font-bold uppercase italic">
                  ⚠️ {pedido.notas_especiales}
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-4 flex gap-2">
            {pedido.status === 'En espera' ? (
              <button 
                onClick={() => cambiarEstatus(pedido.id_detalle, 'En preparacion')}
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
              >
                EMPEZAR
              </button>
            ) : (
              <button 
                onClick={() => cambiarEstatus(pedido.id_detalle, 'Servido')}
                disabled={isPending}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                LISTO ✅
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}