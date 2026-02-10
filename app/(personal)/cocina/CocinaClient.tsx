'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { actualizarEstatusPedido } from './action';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

// --- Componente: Tiempo transcurrido con color de urgencia ---
function ElapsedTime({ fecha_hora }: { fecha_hora: string | null }) {
  const [mins, setMins] = useState<number | null>(null);

  useEffect(() => {
    const calcular = () => {
      if (!fecha_hora) { setMins(null); return; }
      const diff = Date.now() - new Date(fecha_hora).getTime();
      setMins(Math.floor(diff / 60000));
    };
    calcular();
    const interval = setInterval(calcular, 30000);
    return () => clearInterval(interval);
  }, [fecha_hora]);

  if (mins === null) return <span suppressHydrationWarning>Ahora</span>;

  const color =
    mins >= 15 ? 'text-red-600 font-black' :
    mins >= 8  ? 'text-amber-600 font-bold' :
                 'text-slate-400 font-medium';

  const label = mins < 1 ? '< 1 min' : `${mins} min`;

  return (
    <span suppressHydrationWarning className={color}>
      ⏱ {label}
    </span>
  );
}

// --- Componente: Tarjeta de pedido ---
function PedidoCard({
  pedido,
  isPending,
  isNew,
  onCambiarEstatus,
}: {
  pedido: any;
  isPending: boolean;
  isNew: boolean;
  onCambiarEstatus: (id: number, estatus: string) => void;
}) {
  const enEspera = pedido.status === 'En espera';

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 transition-all duration-300 flex flex-col ${
        isNew ? 'ring-2 ring-yellow-400 shadow-yellow-200 scale-[1.02]' : ''
      } ${enEspera ? 'border-amber-400' : 'border-blue-500'}`}
    >
      <div className="p-4 flex-1">
        {/* Header: Mesa + Tiempo */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black self-start">
              MESA {pedido.comanda?.id_mesa ?? '?'}
            </span>
            {pedido.comanda?.mesero?.nombre && (
              <span className="text-xs text-slate-400 pl-1">
                {pedido.comanda.mesero.nombre}
              </span>
            )}
          </div>
          <div className="text-xs text-right">
            <ElapsedTime fecha_hora={pedido.comanda?.fecha_hora ?? null} />
          </div>
        </div>

        {/* Producto */}
        <div className="mb-1">
          {pedido.cantidad > 1 && (
            <span className="inline-block bg-slate-100 text-slate-600 text-sm font-black px-2 py-0.5 rounded mr-2">
              x{pedido.cantidad}
            </span>
          )}
          <span className="text-xl font-black text-slate-800 leading-tight">
            {pedido.producto.nombre}
          </span>
        </div>

        <span className="text-[11px] text-slate-400 uppercase tracking-wide">
          {pedido.producto.categoria}
        </span>

        {/* Aditamentos */}
        {pedido.aditamentos?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {pedido.aditamentos.map((a: any, i: number) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-700 text-[11px] font-bold px-2 py-0.5 rounded-md uppercase"
              >
                + {a.aditamento?.nombre ?? 'Extra'}
              </span>
            ))}
          </div>
        )}

        {/* Notas especiales */}
        {pedido.notas_especiales && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2 mt-3 rounded-r-lg">
            <p className="text-xs text-red-700 font-bold uppercase leading-snug">
              ⚠️ {pedido.notas_especiales}
            </p>
          </div>
        )}

        {/* Tiempo de preparación estimado */}
        {pedido.producto.tiempo_prep > 0 && (
          <p className="text-[11px] text-slate-400 mt-3">
            Prep. estimada: {pedido.producto.tiempo_prep} min
          </p>
        )}
      </div>

      {/* Botón de acción */}
      <div className="p-3 bg-slate-50">
        {enEspera ? (
          <button
            onClick={() => onCambiarEstatus(pedido.id_detalle, 'En preparacion')}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-sm tracking-wide hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {isPending ? '...' : 'EMPEZAR'}
          </button>
        ) : (
          <button
            onClick={() => onCambiarEstatus(pedido.id_detalle, 'Servido')}
            disabled={isPending}
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-black text-sm tracking-wide hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {isPending ? '...' : 'LISTO ✓'}
          </button>
        )}
      </div>
    </div>
  );
}

// --- Componente principal ---
export default function CocinaClient({
  pedidosIniciales,
}: {
  pedidosIniciales: any[];
}) {
  const [pedidos, setPedidos] = useState<any[]>(pedidosIniciales);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
  const socketRef = useRef<Socket | null>(null);

  // Conexión socket — solo una vez al montar
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('nuevo_pedido_cocina', (data: any) => {
      const nuevosPedidos: any[] = data.items ?? [];

      setPedidos((prev) => {
        const idsExistentes = new Set(prev.map((p) => p.id_detalle));
        const unicos = nuevosPedidos.filter((p) => !idsExistentes.has(p.id_detalle));

        if (unicos.length > 0) {
          // Resaltar tarjetas nuevas por 5 segundos
          setNewIds((ids) => {
            const next = new Set(ids);
            unicos.forEach((p) => next.add(p.id_detalle));
            return next;
          });
          setTimeout(() => {
            setNewIds((ids) => {
              const next = new Set(ids);
              unicos.forEach((p) => next.delete(p.id_detalle));
              return next;
            });
          }, 5000);
        }

        return [...prev, ...unicos];
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Sincronizar cuando el servidor recarga (navegación, refresh)
  useEffect(() => {
    setPedidos(pedidosIniciales);
  }, [pedidosIniciales]);

  const cambiarEstatus = useCallback(async (id: number, estatus: string) => {
    // 1. Update optimista inmediato
    setPedidos((prev) => {
      if (estatus === 'Servido') return prev.filter((p) => p.id_detalle !== id);
      return prev.map((p) => (p.id_detalle === id ? { ...p, status: estatus } : p));
    });

    setPendingIds((prev) => new Set(prev).add(id));

    // 2. Emitir por socket para notificar a otras pantallas
    socketRef.current?.emit('change_status', { id_detalle: id, estatus });

    // 3. Persistir en BD
    await actualizarEstatusPedido(id, estatus);

    setPendingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const enEspera = pedidos.filter((p) => p.status === 'En espera');
  const enPreparacion = pedidos.filter((p) => p.status === 'En preparacion');

  return (
    <div>
      {/* Contadores en tiempo real */}
      <div className="flex gap-3 mb-8">
        <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold">
          {enEspera.length} en espera
        </span>
        <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold">
          {enPreparacion.length} cocinando
        </span>
      </div>

      {/* Sección: En Espera */}
      {enEspera.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse inline-block" />
            En Espera ({enEspera.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {enEspera.map((pedido, index) => (
              <PedidoCard
                key={pedido.id_detalle ?? index}
                pedido={pedido}
                isPending={pendingIds.has(pedido.id_detalle)}
                isNew={newIds.has(pedido.id_detalle)}
                onCambiarEstatus={cambiarEstatus}
              />
            ))}
          </div>
        </section>
      )}

      {/* Sección: Cocinando */}
      {enPreparacion.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
            Cocinando ({enPreparacion.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {enPreparacion.map((pedido, index) => (
              <PedidoCard
                key={pedido.id_detalle ?? index}
                pedido={pedido}
                isPending={pendingIds.has(pedido.id_detalle)}
                isNew={newIds.has(pedido.id_detalle)}
                onCambiarEstatus={cambiarEstatus}
              />
            ))}
          </div>
        </section>
      )}

      {/* Estado vacío */}
      {pedidos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <span className="text-7xl mb-4">✓</span>
          <p className="text-2xl font-black">Todo listo</p>
          <p className="text-sm mt-1">No hay pedidos pendientes</p>
        </div>
      )}
    </div>
  );
}
