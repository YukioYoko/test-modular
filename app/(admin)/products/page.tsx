'use client';
import { useState, useEffect, useMemo } from 'react';
import { 
  getProductosAdmin, 
  getAditamentosDisponibles, 
  getSubcategoriasDisponibles,
  upsertProducto, 
  deleteProducto 
} from './action';
import { getCategorias } from '../categorias/action';
import ProductoModal from '@/components/productoModal/ProductoModal';

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

  // --- ESTADOS DE FILTRADO Y BÚSQUEDA ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroCat, setFiltroCat] = useState("");
  const [filtroSub, setFiltroSub] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("nombre-asc");

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
  }, [prodEdit]);

  // --- LÓGICA DE FILTRADO DINÁMICO ---
  const productosFiltrados = useMemo(() => {
    let result = [...productos];

    // 1. Filtro por Búsqueda (Nombre)
    if (searchQuery) {
      result = result.filter(p => p.nombre.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 2. Filtro por Categoría
    if (filtroCat) {
      result = result.filter(p => p.id_categoria === Number(filtroCat));
    }

    // 3. Filtro por Subcategoría
    if (filtroSub) {
      result = result.filter(p => p.id_subcategoria === Number(filtroSub));
    }

    // 4. Ordenamiento
    result.sort((a, b) => {
      switch (ordenarPor) {
        case 'nombre-asc': return a.nombre.localeCompare(b.nombre);
        case 'precio-asc': return a.precio - b.precio;
        case 'precio-desc': return b.precio - a.precio;
        case 'categoria': return (a.categoriaRel?.nombre || "").localeCompare(b.categoriaRel?.nombre || "");
        default: return 0;
      }
    });

    return result;
  }, [productos, searchQuery, filtroCat, filtroSub, ordenarPor]);

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
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans text-(--militar-green)">
      
      {/* HEADER CON BUSCADOR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Catálogo Master</h1>
          <p className="text-(--dark-green) font-bold opacity-70">Foodlify Platform Control</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-center">
          {/* BARRA DE BÚSQUEDA */}
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="BUSCAR PLATILLO..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border-2 border-(--mint-green) p-4 pl-12 rounded-2xl font-black uppercase text-[10px] tracking-widest outline-none focus:bg-white transition-all shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          <button 
            onClick={() => { setProdEdit(null); setModalAbierto(true); }}
            className="bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="text-xl">+</span> NUEVO
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* PANEL LATERAL DE FILTROS */}
        <aside className="w-full lg:w-64 space-y-8 bg-white/30 p-6 rounded-[2.5rem] border border-(--mint-green)/30 h-fit sticky top-10">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 block">Filtrar por</label>
            <div className="space-y-4">
              <select 
                value={filtroCat} 
                onChange={(e) => { setFiltroCat(e.target.value); setFiltroSub(""); }}
                className="w-full bg-white p-4 rounded-xl font-black uppercase text-[9px] border-none shadow-sm cursor-pointer outline-none"
              >
                <option value="">TODAS LAS CATEGORÍAS</option>
                {categoriasList.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>)}
              </select>

              <select 
                value={filtroSub} 
                onChange={(e) => setFiltroSub(e.target.value)}
                disabled={!filtroCat}
                className="w-full bg-white p-4 rounded-xl font-black uppercase text-[9px] border-none shadow-sm cursor-pointer outline-none disabled:opacity-30"
              >
                <option value="">TODAS LAS SUBS</option>
                {subcategoriasList.filter(s => s.id_categoria === Number(filtroCat)).map(s => (
                  <option key={s.id_subcategoria} value={s.id_subcategoria}>{s.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4 block">Ordenar por</label>
            <div className="flex flex-col gap-2">
              {[
                { id: 'nombre-asc', label: 'Nombre A-Z' },
                { id: 'precio-asc', label: 'Precio: Menor' },
                { id: 'precio-desc', label: 'Precio: Mayor' },
                { id: 'categoria', label: 'Categoría' }
              ].map((opc) => (
                <button 
                  key={opc.id}
                  onClick={() => setOrdenarPor(opc.id)}
                  className={`text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${ordenarPor === opc.id ? 'bg-(--militar-green) text-white' : 'hover:bg-white'}`}
                >
                  {opc.label}
                </button>
              ))}
            </div>
          </div>

          {(filtroCat || searchQuery || filtroSub) && (
            <button 
              onClick={() => { setFiltroCat(""); setFiltroSub(""); setSearchQuery(""); }}
              className="w-full py-3 text-[9px] font-black uppercase text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              Limpiar Filtros
            </button>
          )}
        </aside>

        {/* GRID DE PRODUCTOS */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {productosFiltrados.map((p) => (
              <div key={p.id_producto} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green) flex flex-col transition-all relative group hover:shadow-xl hover:-translate-y-1">
                {/* Botón Borrar */}
                <div className="absolute top-4 left-4 z-20">
                  {confirmarBorradoId === p.id_producto ? (
                    <div className="bg-red-600 rounded-2xl p-2 flex gap-2 shadow-xl animate-in zoom-in-95">
                      <button onClick={() => handleSoftDelete(p.id_producto)} className="bg-white text-red-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase">Confirmar</button>
                      <button onClick={() => setConfirmarBorradoId(null)} className="text-white px-2 py-1 text-[10px] font-black uppercase font-sans">✕</button>
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

                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  <img src={p.imagen[0]?.url || '/placeholder.png'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={p.nombre} />
                  <div className="absolute inset-0 bg-(--militar-green)/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => { setProdEdit(p); setModalAbierto(true); }} className="bg-white text-(--militar-green) px-6 py-3 rounded-xl font-black shadow-lg uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Editar Master</button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black text-white uppercase bg-(--militar-green) px-3 py-1.5 rounded-lg tracking-wider">
                      {p.categoriaRel?.nombre || 'S/C'}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">
                      {p.subcategoria?.nombre}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase mb-1 truncate tracking-tight italic">{p.nombre}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-2xl font-black text-(--dark-green)">${Number(p.precio).toFixed(2)}</p>
                    {p.tiempo_prep > 0 && (
                      <span className="text-[10px] font-bold opacity-40 flex items-center gap-1 italic">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {p.tiempo_prep} MIN
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {productosFiltrados.length === 0 && (
              <div className="col-span-full py-20 text-center opacity-20 flex flex-col items-center">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
                <p className="font-black uppercase italic tracking-widest">No se encontraron resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductoModal 
        {...{prodEdit, modalAbierto, setModalAbierto, cargando, handleSave, aditamentosList, subcategoriasList, categoriasExistentes: categoriasList, aditamentosSeleccionados, setAditamentosSeleccionados, urlsExistentes, setUrlsExistentes}}
      />
    </div>
  );
}