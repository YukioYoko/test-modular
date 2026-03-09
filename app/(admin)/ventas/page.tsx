'use client';
import { useState, useEffect, useMemo } from 'react';
import { getVentasFiltradas } from './action';

// Definición de tipos para el ordenamiento
type SortConfig = { key: 'fecha_hora' | 'total'; direction: 'asc' | 'desc' } | null;

export default function VentasPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 50;
  
  // Estado para el ordenamiento dinámico
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fecha_hora', direction: 'desc' });

  // Tus filtros originales se mantienen intactos
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
      setPaginaActual(1);
      setCargando(false);
    });
  }, [filtros]);

  // Lógica de Ordenamiento antes de la paginación
  const ventasOrdenadas = useMemo(() => {
    if (!sortConfig) return ventas;
    return [...ventas].sort((a, b) => {
      const aValue = sortConfig.key === 'fecha_hora' ? new Date(a.fecha_hora).getTime() : Number(a.total);
      const bValue = sortConfig.key === 'fecha_hora' ? new Date(b.fecha_hora).getTime() : Number(b.total);
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [ventas, sortConfig]);

  // Lógica de Paginación
  const totalPaginas = Math.ceil(ventasOrdenadas.length / itemsPorPagina);
  const ventasPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    return ventasOrdenadas.slice(inicio, inicio + itemsPorPagina);
  }, [ventasOrdenadas, paginaActual]);

  // Función para cambiar el orden al hacer clic en el encabezado
  const requestSort = (key: 'fecha_hora' | 'total') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const totalVendido = useMemo(() => {
    return ventas.reduce((acc, v) => acc + Number(v.total || 0), 0);
  }, [ventas]);

  // Generador de números de página dinámicos (2 anteriores y 2 siguientes)
  const renderNumerosPagina = () => {
    const paginas = [];
    const rango = 2; // Cantidad de páginas a los lados de la actual
    const inicio = Math.max(1, paginaActual - rango);
    const fin = Math.min(totalPaginas, paginaActual + rango);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => setPaginaActual(i)}
          className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
            paginaActual === i 
            ? 'bg-(--militar-green) text-white shadow-lg scale-110' 
            : 'bg-white text-(--militar-green) border border-(--mint-green) hover:bg-(--light-green)'
          }`}
        >
          {i}
        </button>
      );
    }
    return paginas;
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      {/* HEADER & RESUMEN (Sin cambios) */}
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

      {/* BARRA DE FILTROS ORIGINAL (Sin cambios) */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Buscar</label>
          <input type="text" placeholder="Token o Transacción..." className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm" value={filtros.busqueda} onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})} />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Estado</label>
          <select className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm appearance-none" value={filtros.status} onChange={(e) => setFiltros({...filtros, status: e.target.value})}>
            <option>Todos</option><option>Cerrada</option><option>Abierta</option><option>Cancelada</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Método Pago</label>
          <select className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm appearance-none" value={filtros.metodo} onChange={(e) => setFiltros({...filtros, metodo: e.target.value})}>
            <option>Todos</option><option value="Efectivo">Efectivo</option><option value="Tarjeta">Tarjeta</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Desde</label>
          <input type="date" className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm" value={filtros.fechaInicio} onChange={(e) => setFiltros({...filtros, fechaInicio: e.target.value})} />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-(--militar-green) mb-2 ml-2 uppercase">Hasta</label>
          <input type="date" className="p-4 bg-(--light-green) rounded-2xl border-none font-bold text-sm" value={filtros.fechaFin} onChange={(e) => setFiltros({...filtros, fechaFin: e.target.value})} />
        </div>
      </div>

      {/* TABLA DE COMANDAS CON SORT INTERACTIVO */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green)">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-(--light-green)">
                <th 
                  className="p-6 text-[10px] font-black text-gray-400 uppercase cursor-pointer hover:text-(--militar-green) transition-colors select-none"
                  onClick={() => requestSort('fecha_hora')}
                >
                  Fecha / Hora {sortConfig?.key === 'fecha_hora' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Detalles Origen</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Token ID</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Status</th>
                <th 
                  className="p-6 text-[10px] font-black text-gray-400 uppercase text-right cursor-pointer hover:text-(--militar-green) transition-colors select-none"
                  onClick={() => requestSort('total')}
                >
                  Monto Total {sortConfig?.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--light-green)">
              {cargando ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-(--militar-green) animate-pulse uppercase tracking-widest">Cargando ventas...</td></tr>
              ) : (
                ventasPaginadas.map((v) => (
                  <tr key={v.id_comanda} className="hover:bg-(--light-green)/30 transition-colors">
                    <td className="p-6">
                      <div className="text-sm font-bold text-(--militar-green)">{new Date(v.fecha_hora).toLocaleDateString()}</div>
                      <div className="text-[10px] font-medium text-gray-400 uppercase">{new Date(v.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="p-6">
                      <div className="font-black text-(--militar-green) text-sm uppercase">Mesa {v.id_mesa}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Mesero: {v.id_mesero}</div>
                    </td>
                    <td className="p-6">
                      <span className="font-mono text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100 uppercase">{v.token || 'S/N'}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${v.estado === 'Pagada' || v.estado === 'Cerrada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {v.estado}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="text-xl font-black text-(--militar-green)">${Number(v.total).toFixed(2)}</div>
                      <div className="text-[9px] font-black text-gray-300 uppercase">{v.metodo_pago}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN AVANZADA */}
        {!cargando && ventas.length > 0 && (
          <div className="p-8 bg-gray-50/50 border-t border-(--light-green) flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Página {paginaActual} de {totalPaginas} — {ventas.length} registros
            </span>
            
            <div className="flex items-center gap-2">
              {/* Ir al Inicio */}
              <button disabled={paginaActual === 1} onClick={() => setPaginaActual(1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green) hover:bg-(--light-green)" title="Primera página">«</button>

              {/* Anterior */}
              <button disabled={paginaActual === 1} onClick={() => setPaginaActual(prev => prev - 1)} className="px-4 h-10 rounded-xl font-black text-[10px] uppercase bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green)">Ant.</button>

              {/* Números Dinámicos */}
              <div className="flex gap-2 mx-1">
                {renderNumerosPagina()}
              </div>

              {/* Siguiente */}
              <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(prev => prev + 1)} className="px-4 h-10 rounded-xl font-black text-[10px] uppercase bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green)">Sig.</button>

              {/* Ir al Final */}
              <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(totalPaginas)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green) hover:bg-(--light-green)" title="Última página">»</button>
            </div>
          </div>
        )}

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