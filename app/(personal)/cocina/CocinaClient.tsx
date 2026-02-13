'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { actualizarEstatusPedido } from './action'; // Asegúrate de tener este server action
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

// --- Componente: Tiempo transcurrido desde el PEDIDO ---
function ElapsedTime({ fecha_pedido }: { fecha_pedido: string | null }) {
  const [mins, setMins] = useState<number | null>(null);

  useEffect(() => {
    const calcular = () => {
      if (!fecha_pedido) { setMins(null); return; }
      // Calculamos la diferencia basándonos en la hora del pedido individual
      const diff = Date.now() - new Date(fecha_pedido).getTime();
      setMins(Math.floor(diff / 60000));
    };
    calcular();
    const interval = setInterval(calcular, 30000);
    return () => clearInterval(interval);
  }, [fecha_pedido]);

  if (mins === null) return <span suppressHydrationWarning className="text-slate-400">Ahora</span>;

  const isUrgent = mins >= 15;
  const isWarning = mins >= 8 && mins < 15;

  const bgColor = isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-slate-100';
  const textColor = isUrgent ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-slate-600';
  const borderColor = isUrgent ? 'border-red-300' : isWarning ? 'border-amber-300' : 'border-slate-200';

  const label = mins < 1 ? '< 1 min' : `${mins} min`;

  return (
    <div suppressHydrationWarning className={`${bgColor} ${borderColor} border rounded-lg px-3 py-2 text-center transition-colors duration-500`}>
      <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5 font-bold">En Cocina</p>
      <p className={`text-lg font-black ${textColor} leading-none`}>
        {label}
      </p>
    </div>
  );
}

// --- Componente: Tarjeta de pedido individual ---
function PedidoCard({
  pedido,
  isPending,
  isNew,
  ordenLlegada,
  onCambiarEstatus,
}: {
  pedido: any;
  isPending: boolean;
  isNew: boolean;
  ordenLlegada: number;
  onCambiarEstatus: (id: number, estatus: string) => void;
}) {
  const enEspera = pedido.status === 'En espera';

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 transition-all duration-300 flex flex-col relative ${
        isNew ? 'ring-2 ring-yellow-400 shadow-yellow-200 scale-[1.02]' : ''
      } ${enEspera ? 'border-amber-400' : 'border-blue-500'}`}
    >
      <div className={`absolute -top-0 -left-0 w-10 h-10 flex items-center justify-center rounded-br-xl font-black text-white text-sm ${
        ordenLlegada === 1 ? 'bg-red-500' : ordenLlegada <= 3 ? 'bg-amber-500' : 'bg-slate-600'
      }`}>
        #{ordenLlegada}
      </div>

      <div className="p-4 flex-1 pt-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1 ml-6">
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black self-start uppercase italic tracking-tighter">
              Mesa {pedido.comanda?.id_mesa ?? '?'}
            </span>
          </div>
          {/* USAMOS pedido.date para el contador individual */}
          <ElapsedTime fecha_pedido={pedido.hora ?? null} />
        </div>

        <div className="mb-1">
          {pedido.cantidad > 1 && (
            <span className="inline-block bg-slate-100 text-slate-600 text-sm font-black px-2 py-0.5 rounded mr-2">
              x{pedido.cantidad}
            </span>
          )}
          <span className="text-xl font-black text-slate-800 leading-tight uppercase">
            {pedido.producto.nombre}
          </span>
        </div>

        {/* Aditamentos */}
        {pedido.aditamentos?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {pedido.aditamentos.map((a: any, i: number) => (
              <span key={i} className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-md uppercase italic">
                + {a.aditamento?.nombre}
              </span>
            ))}
          </div>
        )}

        {/* Notas con alerta visual */}
        {pedido.notas_especiales && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2 mt-3 rounded-r-lg">
            <p className="text-xs text-red-700 font-black uppercase leading-snug">
              ⚠️ {pedido.notas_especiales}
            </p>
          </div>
        )}
      </div>

      <div className="p-3 bg-slate-50">
        <button
          onClick={() => onCambiarEstatus(pedido.id_detalle, enEspera ? 'En preparacion' : 'Servido')}
          disabled={isPending}
          className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all active:scale-95 disabled:opacity-50 text-white ${
            enEspera ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {isPending ? 'Procesando...' : enEspera ? 'Empezar Cocina' : 'Platillo Listo ✓'}
        </button>
      </div>
    </div>
  );
}

// --- Componente Principal ---
export default function CocinaClient({ pedidosIniciales }: { pedidosIniciales: any[] }) {
  const [pedidos, setPedidos] = useState<any[]>(pedidosIniciales);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('nuevo_pedido_cocina', (data: any) => {
      const nuevosItems: any[] = data.items ?? [];
      setPedidos((prev) => {
        const idsExistentes = new Set(prev.map(p => p.id_detalle));
        const unicos = nuevosItems.filter(p => !idsExistentes.has(p.id_detalle));
        
        if (unicos.length > 0) {
          setNewIds(ids => {
            const next = new Set(ids);
            unicos.forEach(p => next.add(p.id_detalle));
            return next;
          });
          setTimeout(() => {
            setNewIds(ids => {
              const next = new Set(ids);
              unicos.forEach(p => next.delete(p.id_detalle));
              return next;
            });
          }, 5000);
        }
        return [...prev, ...unicos];
      });
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  useEffect(() => { setPedidos(pedidosIniciales); }, [pedidosIniciales]);

  const cambiarEstatus = useCallback(async (id: number, estatus: string) => {
    setPedidos(prev => {
      if (estatus === 'Servido') return prev.filter(p => p.id_detalle !== id);
      return prev.map(p => p.id_detalle === id ? { ...p, status: estatus } : p);
    });
    setPendingIds(prev => new Set(prev).add(id));
    socketRef.current?.emit('change_status', { id_detalle: id, estatus });
    await actualizarEstatusPedido(id, estatus);
    setPendingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // ORDENAMIENTO POR FECHA DEL PEDIDO (date)
  const ordenarPorFechaPedido = (a: any, b: any) => {
    return new Date(a.hora ?? 0).getTime() - new Date(b.hora ?? 0).getTime();
  };

  const enEspera = pedidos.filter(p => p.status === 'En espera').sort(ordenarPorFechaPedido);
  const enPreparacion = pedidos.filter(p => p.status === 'En preparacion').sort(ordenarPorFechaPedido);

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">Monitor de Cocina</h1>
        <div className="flex gap-4">
          <div className="bg-amber-100 px-6 py-2 rounded-2xl border border-amber-200">
            <p className="text-[10px] font-black text-amber-600 uppercase">Pendientes</p>
            <p className="text-2xl font-black text-amber-800">{enEspera.length}</p>
          </div>
          <div className="bg-blue-100 px-6 py-2 rounded-2xl border border-blue-200">
            <p className="text-[10px] font-black text-blue-600 uppercase">En Fuego</p>
            <p className="text-2xl font-black text-blue-800">{enPreparacion.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {enEspera.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-xs font-black text-amber-600 uppercase tracking-[0.3em] mb-6">
              <span className="w-3 h-3 bg-amber-500 rounded-full animate-ping" />
              Cola de espera ({enEspera.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enEspera.map((pedido, index) => (
                <PedidoCard key={pedido.id_detalle} pedido={pedido} isPending={pendingIds.has(pedido.id_detalle)} isNew={newIds.has(pedido.id_detalle)} ordenLlegada={index + 1} onCambiarEstatus={cambiarEstatus} />
              ))}
            </div>
          </section>
        )}

        {enPreparacion.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6">
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
              Cocinando ahora ({enPreparacion.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enPreparacion.map((pedido, index) => (
                <PedidoCard key={pedido.id_detalle} pedido={pedido} isPending={pendingIds.has(pedido.id_detalle)} isNew={newIds.has(pedido.id_detalle)} ordenLlegada={index + 1} onCambiarEstatus={cambiarEstatus} />
              ))}
            </div>
          </section>
        )}
      </div>

      {pedidos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 text-slate-300">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <p className="text-2xl font-black uppercase tracking-widest italic">Cocina Despejada</p>
        </div>
      )}
    </div>
  );
}