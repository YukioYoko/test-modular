'use client';
import { useState, useEffect, useMemo } from 'react';
import { getAditamentos, upsertAditamento, deleteAditamento } from './action';

export default function AditamentosAdminPage() {
  const [aditamentos, setAditamentos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [confirmarBorrarId, setConfirmarBorrarId] = useState<number | null>(null);

  const refresh = async () => {
    const res = await getAditamentos();
    setAditamentos(res);
  };

  useEffect(() => { refresh(); }, []);

  // Lógica de filtrado por Nombre, ID o Precio
  const filtrados = useMemo(() => {
    return aditamentos.filter(a => {
      const b = busqueda.toLowerCase();
      return (
        a.nombre.toLowerCase().includes(b) ||
        a.id_aditamento.toString().includes(b) ||
        a.precio.toString().includes(b)
      );
    });
  }, [aditamentos, busqueda]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    const fd = new FormData(e.currentTarget);
    if (editItem) fd.append('id_aditamento', editItem.id_aditamento.toString());
    
    const res = await upsertAditamento(fd);
    setCargando(false);
    if (res.success) {
      setModalAbierto(false);
      refresh();
    } else { alert(res.error); }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      {/* Header y Buscador */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="w-full md:w-1/3">
          <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block mb-2">Búsqueda (Nombre, ID, Precio)</label>
          <div className="relative">
             <input 
              type="text"
              placeholder="Escribe para filtrar..."
              className="w-full bg-white p-4 pl-12 rounded-2xl border-none shadow-sm font-bold text-(--militar-green) outline-none focus:ring-2 focus:ring-(--mint-green)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-3xl font-black text-(--militar-green) uppercase tracking-tighter">Aditamentos</h1>
          <button 
            onClick={() => { setEditItem(null); setModalAbierto(true); }}
            className="mt-2 bg-(--militar-green) text-white px-6 py-3 rounded-xl font-black hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <span>+</span> NUEVO EXTRA
          </button>
        </div>
      </div>

      {/* Grid de Aditamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtrados.map((a) => (
          <div key={a.id_aditamento} className="bg-white rounded-4xl p-6 shadow-sm border border-(--mint-green) flex flex-col relative group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-white bg-(--militar-green) px-2 py-1 rounded-md">ID: {a.id_aditamento}</span>
              
              {confirmarBorrarId === a.id_aditamento ? (
                <div className="flex gap-1 animate-in zoom-in duration-200">
                  <button onClick={() => deleteAditamento(a.id_aditamento).then(refresh)} className="bg-red-500 text-white p-2 rounded-lg text-[8px] font-bold">SÍ</button>
                  <button onClick={() => setConfirmarBorrarId(null)} className="bg-slate-100 p-2 rounded-lg text-[8px] font-bold">NO</button>
                </div>
              ) : (
                <button onClick={() => setConfirmarBorrarId(a.id_aditamento)} className="text-red-300 hover:text-red-500 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
              )}
            </div>

            <h3 className="text-lg font-black text-(--militar-green) uppercase leading-tight mb-2">{a.nombre}</h3>
            <p className="text-2xl font-black text-(--dark-green) mb-4">${Number(a.precio).toFixed(2)}</p>
            
            <button 
              onClick={() => { setEditItem(a); setModalAbierto(true); }}
              className="w-full py-3 bg-(--light-green) text-(--militar-green) rounded-xl font-black text-xs uppercase tracking-widest hover:bg-(--mint-green) transition-colors"
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <h2 className="text-2xl font-black text-(--militar-green) mb-6 uppercase">{editItem ? 'Editar' : 'Nuevo'} Aditamento</h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest">Nombre del Extra</label>
                <input name="nombre" defaultValue={editItem?.nombre} required className="w-full bg-(--light-green) p-4 rounded-xl border-none font-bold" placeholder="Ej: Queso Extra" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest">Precio Adicional ($)</label>
                <input name="precio" type="number" step="0.01" defaultValue={Number(editItem?.precio || 0)} required className="w-full bg-(--light-green) p-4 rounded-xl border-none font-bold" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-4 font-black text-(--militar-green) uppercase text-sm">Cerrar</button>
                <button 
                  type="submit" 
                  disabled={cargando}
                  className="flex-1 py-4 bg-(--militar-green) text-white rounded-2xl font-black shadow-lg uppercase text-sm disabled:opacity-50"
                >
                  {cargando ? '...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}