'use client';
import { useState, useEffect } from 'react';
import { 
  getProductosAdmin, 
  getAditamentosDisponibles, 
  getSubcategoriasDisponibles,
  upsertProducto, 
  deleteProducto 
} from './action';
import { getCategorias } from '../categorias/action';
import ProductoModal from '@/components/productoModal/ProductoModal';

export const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block mb-2">
    {children}
  </label>
);

export const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props} 
    className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green) transition-all" 
  />
);

export const FormSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select 
    {...props} 
    className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green) appearance-none cursor-pointer" 
  />
);

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [aditamentosList, setAditamentosList] = useState<any[]>([]);
  const [subcategoriasList, setSubcategoriasList] = useState<any[]>([]);
  const [categoriasList, setCategoriasList] = useState<any[]>([]);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [prodEdit, setProdEdit] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [confirmarBorradoId, setConfirmarBorradoId] = useState<number | null>(null);

  const [aditamentosSeleccionados, setAditamentosSeleccionados] = useState<number[]>([]);
  const [urlsExistentes, setUrlsExistentes] = useState<string[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState(false);

  const refreshData = async () => {
    const [prods, adis, subs, cats] = await Promise.all([
      getProductosAdmin(),
      getAditamentosDisponibles(),
      getSubcategoriasDisponibles(),
      getCategorias()
    ]);
    setProductos(prods);
    setAditamentosList(adis);
    setSubcategoriasList(subs);
    setCategoriasList(cats);
  };

  useEffect(() => { refreshData(); }, []);

  useEffect(() => {
    if (prodEdit) {
      setAditamentosSeleccionados(prodEdit.aditamentos.map((a: any) => a.id_aditamento));
      setUrlsExistentes(prodEdit.imagen.map((i: any) => i.url));
    } else {
      setAditamentosSeleccionados([]);
      setUrlsExistentes([]);
    }
    setNuevaCategoria(false);
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
    } else { 
      alert(res.error); 
    }
  };

  const handleSoftDelete = async (id: number) => {
    const res = await deleteProducto(id);
    if (res.success) {
      setConfirmarBorradoId(null);
      refreshData();
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans text-(--militar-green)">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Catálogo Master</h1>
          <p className="text-(--dark-green) font-bold opacity-70">Foodlify Platform Control</p>
        </div>
        <button 
          onClick={() => { setProdEdit(null); setModalAbierto(true); }}
          className="bg-(--militar-green) text-white px-8 py-4 rounded-3xl font-black hover:scale-105 transition-all shadow-xl flex items-center gap-2"
        >
          <span className="text-2xl">+</span> NUEVO PLATILLO
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div key={p.id_producto} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green) flex flex-col transition-all relative group">
            <div className="absolute top-4 left-4 z-20">
              {confirmarBorradoId === p.id_producto ? (
                <div className="bg-red-600 rounded-2xl p-2 flex gap-2 shadow-xl animate-in fade-in slide-in-from-left-2">
                  <button onClick={() => handleSoftDelete(p.id_producto)} className="bg-white text-red-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase hover:bg-red-50">Confirmar</button>
                  <button onClick={() => setConfirmarBorradoId(null)} className="text-white px-2 py-1 text-[10px] font-black uppercase">X</button>
                </div>
              ) : (
                <button 
                  onClick={() => setConfirmarBorradoId(p.id_producto)}
                  className="bg-white/90 backdrop-blur-sm text-red-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:scale-110"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                </button>
              )}
            </div>

            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <img src={p.imagen[0]?.url || '/placeholder.png'} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.nombre} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => { setProdEdit(p); setModalAbierto(true); }} className="bg-white text-(--militar-green) px-6 py-2 rounded-xl font-black shadow-lg uppercase text-xs tracking-widest">Ver Detalles</button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-white uppercase bg-(--militar-green) px-2 py-1 rounded-md tracking-tighter">
                  {p.categoriaRel?.nombre || 'S/C'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">
                  {p.subcategoria?.nombre}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase mb-1 truncate tracking-tight">{p.nombre}</h3>
              <p className="text-2xl font-black text-(--dark-green)">${Number(p.precio).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <ProductoModal 
        {...{prodEdit, modalAbierto, setModalAbierto, cargando, handleSave, aditamentosList, subcategoriasList, categoriasExistentes: categoriasList, aditamentosSeleccionados, setAditamentosSeleccionados, urlsExistentes, setUrlsExistentes}}
      />
    </div>
  );
}