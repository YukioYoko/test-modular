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
  
  // Estados de Formulario
  const [urlsImagenes, setUrlsImagenes] = useState<string[]>(['']);
  const [aditamentosSeleccionados, setAditamentosSeleccionados] = useState<number[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState(false);

  // ESTADOS DE FILTRADO
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [ordenarPor, setOrdenarPor] = useState('nombre'); // nombre, precio, tiempo

  const refreshData = async () => {
    const data = await getProductosAdmin();
    setProductos(data);
  };

  useEffect(() => {
    refreshData();
    getAditamentosDisponibles().then(setAditamentosList);
  }, []);

  // 1. Extraer categorías para el filtro
  const categoriasExistentes = useMemo(() => {
    const cats = productos.map(p => p.categoria);
    return Array.from(new Set(cats)).filter(Boolean).sort();
  }, [productos]);

  // 2. LÓGICA DE FILTRADO Y ORDENAMIENTO
  const productosFiltrados = useMemo(() => {
    return productos
      .filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCat = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
        return coincideNombre && coincideCat;
      })
      .sort((a, b) => {
        if (ordenarPor === 'precio') return Number(a.precio) - Number(b.precio);
        if (ordenarPor === 'tiempo') return (a.tiempo_prep || 0) - (b.tiempo_prep || 0);
        return a.nombre.localeCompare(b.nombre);
      });
  }, [productos, busqueda, filtroCategoria, ordenarPor]);

  // Sincronización de modal (igual que antes)
  useEffect(() => {
    if (prodEdit) {
      setUrlsImagenes(prodEdit.imagen.length > 0 ? prodEdit.imagen.map((img: any) => img.url) : ['']);
      setAditamentosSeleccionados(prodEdit.aditamentos.map((a: any) => a.id_aditamento));
      setNuevaCategoria(false);
    } else {
      setUrlsImagenes(['']);
      setAditamentosSeleccionados([]);
      setNuevaCategoria(categoriasExistentes.length === 0);
    }
  }, [prodEdit, categoriasExistentes]);

  const toggleAditamento = (id: number) => {
    setAditamentosSeleccionados(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd),
      id_producto: prodEdit?.id_producto,
      imagenes: urlsImagenes.filter(u => u.trim() !== ''),
      aditamentosIds: aditamentosSeleccionados,
      activo: prodEdit ? prodEdit.activo : true
    };

    const res = await upsertProducto(data);
    if (res.success) {
      setModalAbierto(false);
      refreshData();
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) uppercase tracking-tighter">Panel de Productos</h1>
          <p className="text-(--dark-green) font-bold opacity-70">Gestiona tu menú e inventario</p>
        </div>
        <button 
          onClick={() => { setProdEdit(null); setModalAbierto(true); }}
          className="bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-2xl">+</span> AGREGAR PRODUCTO
        </button>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-white p-6 rounded-4xl shadow-sm mb-10 flex flex-col xl:flex-row gap-6 items-center">
        {/* Búsqueda */}
        
        <div className="relative w-full xl:w-1/3">
        <label className="text-[10px] font-black text-(--militar-green) uppercase mb-1 ml-2">Busqueda por nombre</label>
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            className="w-full pl-12 pr-4 py-4 bg-(--light-green) rounded-2xl border-none font-bold"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div className="flex flex-col w-full xl:w-1/4">
          <label className="text-[10px] font-black text-(--militar-green) uppercase mb-1 ml-2">Filtrar Categoría</label>
          <select 
            className="w-full p-4 bg-(--light-green) rounded-2xl border-none font-bold appearance-none cursor-pointer"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">Todas las categorías</option>
            {categoriasExistentes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Ordenar */}
        <div className="flex flex-col w-full xl:w-1/4">
          <label className="text-[10px] font-black text-(--militar-green) uppercase mb-1 ml-2">Ordenar por</label>
          <select 
            className="w-full p-4 bg-(--light-green) rounded-2xl border-none font-bold appearance-none cursor-pointer"
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value)}
          >
            <option value="nombre">Nombre (A-Z)</option>
            <option value="precio">Precio (Menor a Mayor)</option>
            <option value="tiempo">Tiempo de Preparación</option>
          </select>
        </div>

        <div className="text-[10px] font-black text-(--dark-green) bg-(--light-green) px-4 py-2 rounded-full">
          {productosFiltrados.length} RESULTADOS
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productosFiltrados.map((p) => (
          <div key={p.id_producto} className={`bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green) flex flex-col transition-all ${!p.activo ? 'opacity-60 grayscale-[0.5]' : ''}`}>
            <div className="h-48 bg-slate-100 relative group">
              <img 
                src={p.imagen[0]?.url || 'https://via.placeholder.com/400x300?text=Sin+Imagen'} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                alt={p.nombre}
              />
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => { setProdEdit(p); setModalAbierto(true); }} className="bg-white p-4 rounded-2xl shadow-xl font-black text-(--militar-green)">EDITAR</button>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 ">
                <button 
                  onClick={() => { if(confirm('¿Eliminar?')) deleteProducto(p.id_producto).then(refreshData); }}
                  className="bg-white/90 p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-(--dark-green) bg-(--light-green) px-2 py-1 rounded uppercase">{p.categoria}</span>
                <span className="text-[10px] font-black opacity-40">⏱️ {p.tiempo_prep} min</span>
              </div>
              <h3 className="text-xl font-black text-(--militar-green) uppercase mb-1 truncate">{p.nombre}</h3>
              <p className="text-2xl font-black text-(--dark-green)">${Number(p.precio).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Mantén el modal que ya tienes) */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
           {/* El contenido del formulario es el mismo de la respuesta anterior */}
           <div className="bg-white w-full max-w-4xl rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
             <h2 className="text-3xl font-black text-(--militar-green) mb-8 uppercase tracking-tighter">{prodEdit ? 'Editar' : 'Nuevo'} Producto</h2>
             <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <input name="nombre" placeholder="Nombre" defaultValue={prodEdit?.nombre} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                  <div className="flex gap-4">
                    <input name="precio" type="number" step="0.01" placeholder="Precio" defaultValue={Number(prodEdit?.precio || 0)} required className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                    <input name="tiempo_prep" type="number" placeholder="Min" defaultValue={prodEdit?.tiempo_prep} className="w-24 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                  </div>
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
                        <input name="categoria" placeholder="Nueva categoría..." autoFocus className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                        <button type="button" onClick={() => setNuevaCategoria(false)} className="bg-red-100 px-4 rounded-2xl font-black text-xs text-red-600">X</button>
                      </div>
                    )}
                  </div>
                  <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2 block">Imágenes</label>
                  {urlsImagenes.map((url, i) => (
                    <input key={i} value={url} onChange={(e) => { const n = [...urlsImagenes]; n[i] = e.target.value; setUrlsImagenes(n); }} placeholder="URL" className="w-full bg-(--light-green) p-3 rounded-xl border-none text-xs mb-1" />
                  ))}
                  <button type="button" onClick={() => setUrlsImagenes([...urlsImagenes, ''])} className="text-(--militar-green) text-[10px] font-black uppercase underline">+ Otra</button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-(--militar-green) uppercase border-b-2 border-(--light-green) pb-2">Aditamentos</h3>
                  <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {aditamentosList.map(adi => (
                      <button key={adi.id_aditamento} type="button" onClick={() => toggleAditamento(adi.id_aditamento)}
                        className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${aditamentosSeleccionados.includes(adi.id_aditamento) ? 'bg-(--militar-green) border-(--militar-green) text-white' : 'bg-white border-(--light-green) text-(--militar-green)'}`}>
                        <span className="font-bold text-sm">{adi.nombre}</span>
                        <span className="text-[10px] font-black">${Number(adi.precio).toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-full flex gap-4 pt-6">
                  <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-5 font-black text-(--militar-green) uppercase">Cerrar</button>
                  <button type="submit" className="flex-1 py-5 bg-(--militar-green) text-white rounded-3xl font-black shadow-xl uppercase">Guardar</button>
                </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
}