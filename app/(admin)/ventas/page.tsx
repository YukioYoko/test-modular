'use client';
import { useState, useEffect, useMemo } from 'react';
import { getVentasFiltradas } from './action';

type SortConfig = { key: 'fecha_hora' | 'total'; direction: 'asc' | 'desc' } | null;

export default function VentasPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fecha_hora', direction: 'desc' });
  const itemsPorPagina = 50;

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

  // Lógica de Ordenamiento
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

  const requestSort = (key: 'fecha_hora' | 'total') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Generador de números de página (2 anteriores y 2 siguientes)
  const renderNumerosPagina = () => {
    const paginas = [];
    const inicio = Math.max(1, paginaActual - 2);
    const fin = Math.min(totalPaginas, paginaActual + 2);

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
      {/* ... (Header y Filtros se mantienen igual) ... */}

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green)">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-(--light-green)">
                <th 
                  className="p-6 text-[10px] font-black text-gray-400 uppercase cursor-pointer hover:text-(--militar-green) transition-colors"
                  onClick={() => requestSort('fecha_hora')}
                >
                  Fecha / Hora {sortConfig?.key === 'fecha_hora' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Detalles Origen</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Token ID</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Status</th>
                <th 
                  className="p-6 text-[10px] font-black text-gray-400 uppercase text-right cursor-pointer hover:text-(--militar-green) transition-colors"
                  onClick={() => requestSort('total')}
                >
                  Monto Total {sortConfig?.key === 'total' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--light-green)">
              {cargando ? (
                <tr><td colSpan={5} className="p-20 text-center font-bold text-(--militar-green) animate-pulse">CARGANDO VENTAS...</td></tr>
              ) : (
                ventasPaginadas.map((v) => (
                  <tr key={v.id_comanda} className="hover:bg-(--light-green)/30 transition-colors">
                    <td className="p-6 text-sm font-bold text-(--militar-green)">
                      {new Date(v.fecha_hora).toLocaleDateString()}
                      <div className="text-[10px] font-medium text-gray-400 uppercase">
                        {new Date(v.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="p-6 uppercase">
                      <div className="font-black text-(--militar-green) text-sm">Mesa {v.id_mesa}</div>
                      <div className="text-[10px] font-bold text-gray-400">Mesero: {v.id_mesero}</div>
                    </td>
                    <td className="p-6">
                      <span className="font-mono text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100">{v.token || 'S/N'}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${v.estado === 'Pagada' || v.estado === 'Cerrada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {v.estado}
                      </span>
                    </td>
                    <td className="p-6 text-right font-black text-(--militar-green) text-xl">
                      ${Number(v.total).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* CONTROLES DE PAGINACIÓN MEJORADOS */}
        {!cargando && ventas.length > 0 && (
          <div className="p-8 bg-gray-50/50 border-t border-(--light-green) flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Pagina {paginaActual} de {totalPaginas} — ({ventas.length} registros)
            </span>
            
            <div className="flex items-center gap-2">
              {/* Botón Inicio */}
              <button 
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual(1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green) hover:bg-(--light-green)"
                title="Primera página"
              >
                «
              </button>

              {/* Botón Anterior */}
              <button 
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual(prev => prev - 1)}
                className="px-4 h-10 rounded-xl font-black text-[10px] uppercase bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green)"
              >
                Ant.
              </button>

              {/* Números Dinámicos */}
              <div className="flex gap-2 mx-2">
                {renderNumerosPagina()}
              </div>

              {/* Botón Siguiente */}
              <button 
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual(prev => prev + 1)}
                className="px-4 h-10 rounded-xl font-black text-[10px] uppercase bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green)"
              >
                Sig.
              </button>

              {/* Botón Último */}
              <button 
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual(totalPaginas)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-(--mint-green) disabled:opacity-30 text-(--militar-green) hover:bg-(--light-green)"
                title="Última página"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}