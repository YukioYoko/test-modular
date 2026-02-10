'use client';
import { useState, useEffect, useMemo } from 'react';
import { getAditamentos, upsertAditamento, deleteAditamento } from './action';
import AditamentoModal from '@/components/aditamentoModal/AditamentoModal';

export default function AditamentosAdminPage() {
  // --- ESTADOS ---
  const [aditamentos, setAditamentos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [confirmarBorrarId, setConfirmarBorrarId] = useState<number | null>(null);

  // --- CARGA DE DATOS ---
  const refresh = async () => {
    const res = await getAditamentos();
    setAditamentos(res);
  };

  useEffect(() => {
    refresh();
  }, []);

  // --- LÓGICA DE FILTRADO ---
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

  // --- MANEJADORES ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    const fd = new FormData(e.currentTarget);
    
    // Si estamos editando, adjuntamos el ID al FormData
    if (editItem) {
      fd.append('id_aditamento', editItem.id_aditamento.toString());
    }
    
    const res = await upsertAditamento(fd);
    setCargando(false);

    if (res.success) {
      setModalAbierto(false);
      refresh();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await deleteAditamento(id);
    if (res.success) {
      setConfirmarBorrarId(null);
      refresh();
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      
      {/* HEADER Y BUSCADOR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="w-full md:w-1/3">
          <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block mb-2">
            Búsqueda Rápida
          </label>
          <div className="relative group">
            <input 
              type="text"
              placeholder="Nombre, ID o Precio..."
              className="w-full bg-white p-4 pl-12 rounded-2xl border-none shadow-sm font-bold text-(--militar-green) outline-none focus:ring-2 focus:ring-(--mint-green) transition-all"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
          </div>
        </div>

        <div className="text-right w-full md:w-auto">
          <h1 className="text-3xl font-black text-(--militar-green) uppercase tracking-tighter italic">Gestión de Extras</h1>
          <button 
            onClick={() => { setEditItem(null); setModalAbierto(true); }}
            className="mt-2 w-full md:w-auto bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> NUEVO ADITAMENTO
          </button>
        </div>
      </div>

      {/* GRID DE ADITAMENTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtrados.length > 0 ? (
          filtrados.map((a) => (
            <div key={a.id_aditamento} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-(--mint-green) flex flex-col relative group hover:shadow-md transition-all">
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-white bg-(--militar-green) px-3 py-1 rounded-lg tracking-widest">
                  ID: {a.id_aditamento}
                </span>
                
                {/* BORRADO CON CONFIRMACIÓN */}
                {confirmarBorrarId === a.id_aditamento ? (
                  <div className="flex gap-1 animate-in slide-in-from-right-2 duration-200">
                    <button 
                      onClick={() => handleDelete(a.id_aditamento)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase hover:bg-red-600"
                    >
                      Borrar
                    </button>
                    <button 
                      onClick={() => setConfirmarBorrarId(null)} 
                      className="bg-slate-100 text-slate-500 px-2 py-1 rounded-lg text-[9px] font-black uppercase"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setConfirmarBorrarId(a.id_aditamento)} 
                    className="text-red-300 hover:text-red-500 transition-colors p-1"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                  </button>
                )}
              </div>

              <h3 className="text-lg font-black text-(--militar-green) uppercase leading-tight mb-1 truncate">
                {a.nombre}
              </h3>
              <p className="text-3xl font-black text-(--dark-green) mb-6 tracking-tighter">
                ${Number(a.precio).toFixed(2)}
              </p>
              
              <button 
                onClick={() => { setEditItem(a); setModalAbierto(true); }}
                className="w-full py-4 bg-(--light-green) text-(--militar-green) rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-(--mint-green) transition-colors active:scale-95"
              >
                Editar Parámetros
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-(--militar-green) font-black opacity-20 text-4xl uppercase italic tracking-tighter">No se encontraron resultados</p>
          </div>
        )}
      </div>

      {/* COMPONENTE MODAL */}
      <AditamentoModal 
        modalAbierto={modalAbierto}
        setModalAbierto={setModalAbierto}
        editItem={editItem}
        handleSave={handleSave}
        cargando={cargando}
      />
    </div>
  );
}