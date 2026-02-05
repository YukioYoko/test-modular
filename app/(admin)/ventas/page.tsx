'use client';
import { useState, useEffect, useMemo } from 'react';
import { getVentasFiltradas } from './action';

export default function VentasPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estados de filtros con la fecha de hoy por defecto
  const [filtros, setFiltros] = useState({
    busqueda: '',
    status: 'Todos',
    metodo: 'Todos',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setCargando(true);
    getVentasFiltradas(filtros).then(data => {
      setVentas(data);
      setCargando(false);
    });
  }, [filtros]);

  // Cálculo de totales rápidos para el dashboard
  const totalVendido = useMemo(() => {
    return ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);
  }, [ventas]);

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      {/* HEADER & RESUMEN */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) uppercase tracking-tighter">Historial de Ventas</h1>
          <p className="text-(--dark-green) font-bold opacity-60 uppercase text-xs tracking-widest">Reporte de ingresos y comandas</p>
        </div>
        
        <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-(--mint-green) flex flex-col items-end">
          <span className="text-[10px] font-black text-gray-400 uppercase">Total en este periodo</span>
          <span className="text-3xl font-black text-(--militar-green)">${totalVendido.toFixed(2)}</span>
        </div>
      </div>

      {/* BARRA DE FILTROS AVANZADA */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Buscar</label>
          <input 
            type="text"
            placeholder="Token o Transacción..."
            className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm"
            value={filtros.busqueda}
            onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Estado</label>
          <select 
            className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm appearance-none"
            value={filtros.status}
            onChange={(e) => setFiltros({...filtros, status: e.target.value})}
          >
            <option>Todos</option>
            <option>Cerrada</option>
            <option>Abierta</option>
            <option>Cancelada</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Método Pago</label>
          <select 
            className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm appearance-none"
            value={filtros.metodo}
            onChange={(e) => setFiltros({...filtros, metodo: e.target.value})}
          >
            <option>Todos</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Desde</label>
          <input 
            type="date"
            className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm"
            value={filtros.fechaInicio}
            onChange={(e) => setFiltros({...filtros, fechaInicio: e.target.value})}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Hasta</label>
          <input 
            type="date"
            className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm"
            value={filtros.fechaFin}
            onChange={(e) => setFiltros({...filtros, fechaFin: e.target.value})}
          />
        </div>
      </div>

      {/* TABLA DE COMANDAS */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green)">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-(--light-green)">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Fecha / Hora</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Detalles Origen</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Token ID</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Status</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase text-right">Monto Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--light-green)">
              {cargando ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-(--militar-green) animate-pulse">CARGANDO VENTAS...</td></tr>
              ) : ventas.map((v) => (
                <tr key={v.id_comanda} className="hover:bg-(--light-green)/30 transition-colors">
                  <td className="p-6">
                    <div className="text-sm font-bold text-(--militar-green)">
                      {new Date(v.fecha_hora).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400 uppercase">
                      {new Date(v.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-black text-(--militar-green) text-sm uppercase">Mesa {v.id_mesa}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Mesero: {v.id_mesero}</div>
                  </td>
                  <td className="p-6">
                    <span className="font-mono text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100 uppercase">
                      {v.token || 'S/N'}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                      v.estado === 'Pagada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {v.estado}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="text-xl font-black text-(--militar-green)">
                      ${Number(v.total).toFixed(2)}
                    </div>
                    <div className="text-[9px] font-black text-gray-300 uppercase">
                      {v.transaccion_id?.includes('Efectivo') ? '💵 Efectivo' : '💳 Tarjeta'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!cargando && ventas.length === 0 && (
          <div className="p-20 text-center">
            <div className="text-4xl mb-4">🏜️</div>
            <p className="font-black text-gray-300 uppercase tracking-widest">No hay registros para este filtro</p>
          </div>
        )}
      </div>
    </div>
  );
}