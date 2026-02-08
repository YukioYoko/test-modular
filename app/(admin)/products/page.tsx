'use client';
import { useState, useEffect, useMemo } from 'react';
import { 
  getProductosAdmin, 
  getAditamentosDisponibles, 
  upsertProducto, 
  deleteProducto 
} from './action';

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [aditamentosList, setAditamentosList] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [prodEdit, setProdEdit] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  
  // Estados de Formulario
  const [aditamentosSeleccionados, setAditamentosSeleccionados] = useState<number[]>([]);
  const [urlsExistentes, setUrlsExistentes] = useState<string[]>([]);
  const [confirmarEliminarUrl, setConfirmarEliminarUrl] = useState<string | null>(null);
  const [nuevaCategoria, setNuevaCategoria] = useState(false);

  // Estados de Interfaz
  const [confirmarBorradoId, setConfirmarBorradoId] = useState<number | null>(null);

  const refreshData = async () => {
    const data = await getProductosAdmin();
    setProductos(data);
  };

  useEffect(() => {
    refreshData();
    getAditamentosDisponibles().then(setAditamentosList);
  }, []);

  const categoriasExistentes = useMemo(() => {
    const cats = productos.map(p => p.categoria);
    return Array.from(new Set(cats)).filter(Boolean).sort() as string[];
  }, [productos]);

  useEffect(() => {
    if (prodEdit) {
      setAditamentosSeleccionados(prodEdit.aditamentos.map((a: any) => a.id_aditamento));
      setUrlsExistentes(prodEdit.imagen.map((i: any) => i.url));
      setNuevaCategoria(false);
    } else {
      setAditamentosSeleccionados([]);
      setUrlsExistentes([]);
      setNuevaCategoria(false);
    }
  }, [prodEdit]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    const fd = new FormData(e.currentTarget);
    if (prodEdit) fd.append('id_producto', prodEdit.id_producto.toString());
    fd.append('aditamentosIds', JSON.stringify(aditamentosSeleccionados));
    fd.append('urlsExistentes', JSON.stringify(urlsExistentes));

    const res = await upsertProducto(fd);
    setCargando(false);
    if (res.success) {
      setModalAbierto(false);
      refreshData();
    } else { alert(res.error); }
  };

  const handleSoftDelete = async (id: number) => {
    const res = await deleteProducto(id);
    if (res.success) {
      setConfirmarBorradoId(null);
      refreshData();
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) uppercase tracking-tighter">Panel de Productos</h1>
          <p className="text-(--dark-green) font-bold opacity-70 italic">Foodlify Platform</p>
        </div>
        <button 
          onClick={() => { setProdEdit(null); setModalAbierto(true); }}
          className="bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-2xl">+</span> NUEVO PRODUCTO
        </button>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div key={p.id_producto} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green) flex flex-col transition-all relative group">
            
            {/* Botón de Borrado Lógico (Flotante en la card) */}
            <div className="absolute top-3 left-3 z-20">
              {confirmarBorradoId === p.id_producto ? (
                <div className="bg-red-600 rounded-2xl p-2 flex gap-2 shadow-xl animate-in fade-in slide-in-from-left-2">
                  <button onClick={() => handleSoftDelete(p.id_producto)} className="bg-white text-red-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase">Eliminar</button>
                  <button onClick={() => setConfirmarBorradoId(null)} className="text-white px-2 py-1 text-[10px] font-black uppercase">X</button>
                </div>
              ) : (
                <button 
                  onClick={() => setConfirmarBorradoId(p.id_producto)}
                  className="bg-white/90 backdrop-blur-sm text-red-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                </button>
              )}
            </div>

            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <img src={p.imagen[0]?.url || '/placeholder.png'} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.nombre} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => { setProdEdit(p); setModalAbierto(true); }} className="bg-white text-(--militar-green) px-6 py-2 rounded-xl font-black shadow-lg uppercase text-xs tracking-widest">Editar Detalles</button>
              </div>
            </div>

            <div className="p-6">
              <span className="text-[10px] font-black text-(--militar-green) uppercase bg-(--light-green) px-2 py-1 rounded-md mb-2 inline-block tracking-tighter">{p.categoria}</span>
              <h3 className="text-xl font-black text-(--militar-green) uppercase mb-1 truncate">{p.nombre}</h3>
              <p className="text-2xl font-black text-(--dark-green)">${Number(p.precio).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Producto */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[95vh] overflow-y-auto relative">
            
            <h2 className="text-3xl font-black text-(--militar-green) mb-8 uppercase tracking-tighter">{prodEdit ? 'Editar' : 'Nuevo'} Platillo</h2>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block">Nombre</label>
                    <input name="nombre" defaultValue={prodEdit?.nombre} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green)" />
                </div>

                {/* DESCRIPCIÓN */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block">Descripción</label>
                    <textarea 
                        name="descripcion" 
                        defaultValue={prodEdit?.descripcion} 
                        className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none h-28 resize-none"
                    />
                </div>

                {/* IMÁGENES CON ELIMINACIÓN INDIVIDUAL (Confirmación rápida) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 block tracking-widest">Fotos Guardadas</label>
                  <div className="grid grid-cols-3 gap-3">
                    {urlsExistentes.map((url, i) => (
                      <div key={i} className="relative aspect-square group">
                        <img src={url} className="w-full h-full object-cover rounded-2xl border-2 border-(--mint-green)" alt="actual" />
                        
                        {confirmarEliminarUrl === url ? (
                          <div className="absolute inset-0 bg-red-600/95 rounded-2xl flex flex-col items-center justify-center p-2 animate-in fade-in zoom-in duration-200">
                             <div className="flex gap-2">
                              <button type="button" onClick={() => { setUrlsExistentes(prev => prev.filter(u => u !== url)); setConfirmarEliminarUrl(null); }} className="bg-white text-red-600 p-2 rounded-lg shadow-md hover:scale-110">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                              </button>
                              <button type="button" onClick={() => setConfirmarEliminarUrl(null)} className="bg-black/20 text-white p-2 rounded-lg hover:scale-110">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6L6 18M6 6l12 12"/></svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button type="button" onClick={() => setConfirmarEliminarUrl(url)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg active:scale-90">
                            <span className="text-sm font-black">✕</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <label className="border-2 border-dashed border-(--mint-green) rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-(--light-green) transition-colors text-(--militar-green)">
                      <span className="text-2xl font-black">+</span>
                      <input type="file" name="imagenesArchivos" multiple accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 block mb-1">Precio ($)</label>
                    <input name="precio" type="number" step="0.01" defaultValue={Number(prodEdit?.precio || 0)} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                  </div>
                  <div className="w-24">
                    <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 block mb-1">Prep (m)</label>
                    <input name="tiempo_prep" type="number" defaultValue={prodEdit?.tiempo_prep} className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold text-center" />
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: Categoría y Aditamentos */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 block">Categoría</label>
                  {!nuevaCategoria ? (
                    <div className="flex gap-2">
                      <select name="categoria" defaultValue={prodEdit?.categoria} required className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold appearance-none">
                        <option value="" disabled>Seleccionar...</option>
                        {categoriasExistentes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <button type="button" onClick={() => setNuevaCategoria(true)} className="bg-(--mint-green) px-4 rounded-2xl font-black text-xs text-(--militar-green)">NUEVA</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input name="categoria" placeholder="Nombre..." autoFocus className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                      <button type="button" onClick={() => setNuevaCategoria(false)} className="bg-red-100 px-4 rounded-2xl font-black text-xs text-red-600">✕</button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-(--militar-green) uppercase border-b-2 border-(--light-green) pb-2 tracking-widest">Aditamentos Extras</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
                    {aditamentosList.map(adi => (
                      <button key={adi.id_aditamento} type="button" 
                        onClick={() => setAditamentosSeleccionados(prev => prev.includes(adi.id_aditamento) ? prev.filter(a => a !== adi.id_aditamento) : [...prev, adi.id_aditamento])}
                        className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${aditamentosSeleccionados.includes(adi.id_aditamento) ? 'bg-(--militar-green) border-(--militar-green) text-white shadow-md' : 'bg-white border-(--light-green) text-(--militar-green)'}`}>
                        <span className="font-bold text-sm">{adi.nombre}</span>
                        <span className="text-[10px] font-black">${Number(adi.precio).toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-full flex gap-4 pt-6 border-t-2 border-slate-50">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-5 font-black text-(--militar-green) uppercase tracking-widest">Cancelar</button>
                <button 
                  type="submit" 
                  disabled={cargando}
                  className="flex-1 py-5 bg-(--militar-green) text-white rounded-4xl font-black shadow-xl uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-all"
                >
                  {cargando ? 'Guardando...' : (prodEdit ? 'Actualizar Producto' : 'Crear Producto')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}