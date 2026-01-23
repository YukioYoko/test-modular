'use client';
import { useEffect, useState, useTransition, useRef } from 'react';
import { actualizarEstatusPedido } from './action';
import { io, Socket } from 'socket.io-client';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
// import { useRouter } from 'next/navigation'; // Lo comentamos por ahora para probar

export default function CocinaClient({ pedidosIniciales }: { pedidosIniciales: any[] }) {
  // const router = useRouter(); // Desactivado temporalmente para evitar el conflicto
  const [isPending, startTransition] = useTransition();
  
  // Estado local de pedidos
  const [pedidos, setPedidos] = useState<any[]>(pedidosIniciales);
  const socketRef = useRef<Socket | null>(null);
  // EFECTO 1: Manejo del Socket (Conexión y Escucha)
  useEffect(() => {
    // 1. Conectamos DENTRO del efecto para que solo ocurra al montar el componente

    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("nuevo_pedido_cocina", (data:any) => {
      console.log("🔥 NUEVO PEDIDO RECIBIDO:", data);

      const nuevosPedidos = data.items;

      // 3. Actualizamos estado EVITANDO el router.refresh inmediato
      setPedidos((prev) => {
        const idsExistentes = new Set(prev.map(p => p.id_detalle));
        const unicos = nuevosPedidos.filter((p: any) => !idsExistentes.has(p.id_detalle));
        return [...prev, ...unicos];
      });
      
      // NOTA: No hacemos router.refresh() aquí inmediatamente para evitar que 
      // la BD sobreescriba nuestros datos temporales antes de estar lista.
    });

    // Limpieza: Desconectar al salir de la página
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
   
  // EFECTO 2: Sincronización con Base de Datos (Cuando carga la página)
  useEffect(() => {
    // Solo actualizamos si pedidosIniciales cambia (ej. al recargar la página manualmente)
    setPedidos(pedidosIniciales);
  }, [pedidosIniciales]);

  const cambiarEstatus = (id: number | string, estatus: string) => {
    socketRef.current = io(SOCKET_URL);

    startTransition(async () => {
      await actualizarEstatusPedido(id as number, estatus);
    });

    socketRef.current.emit("change_status", {
      
    })

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pedidos.map((pedido, index) => (
        <div 
          // Usamos index como fallback en key por si hay IDs temporales repetidos
          key={pedido.id_detalle || index} 
          className={`bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 transition-all ${
            pedido.status === 'En preparacion' ? 'border-blue-500' : 'border-amber-500 animate-pulse'
          }`}
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                {/* Fallback si no viene id_mesa */}
                MESA {pedido.comanda?.id_mesa || '?'} 
              </span>
              <span 
                className="text-[10px] font-mono text-slate-400"
                suppressHydrationWarning={true}  // 👈 AGREGA ESTA LÍNEA EXACTA
              >
                {pedido.comanda?.fecha_hora 
                  ? new Date(pedido.comanda.fecha_hora).toLocaleTimeString('es-MX', { // Recomendación: Fuerza el español
                      hour: '2-digit', 
                      minute: '2-digit', 
                      hour12: true 
                    })
                  : 'Ahora'}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-1">
              {pedido.cantidad}x {pedido.producto.nombre}
            </h3>

            {/* Aditamentos */}
            {pedido.aditamentos && pedido.aditamentos.length > 0 && (
              <div className="flex flex-wrap gap-1 my-3">
                {pedido.aditamentos.map((a: any, i: number) => (
                  <span key={i} className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    + {a.aditamento ? a.aditamento.nombre : 'Extra'}
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




/*   useEffect(() => {
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
}, [router]); */