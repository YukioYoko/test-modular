'use client';
import { useState, useTransition, useEffect } from 'react';
import { getProductosAdmin, upsertProducto } from './action';

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [prodEdit, setProdEdit] = useState<any>(null);
  const [urlsImagenes, setUrlsImagenes] = useState<string[]>(['']); // Estado para múltiples inputs de imagen

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const data = await getProductosAdmin();
    setProductos(data);
  };

  // Sincronizar imágenes al editar
  useEffect(() => {
    if (prodEdit) {
      setUrlsImagenes(prodEdit.imagen.map((img: any) => img.url));
    } else {
      setUrlsImagenes(['']);
    }
  }, [prodEdit]);

  const addImagenInput = () => setUrlsImagenes([...urlsImagenes, '']);
  
  const updateImagenUrl = (index: number, val: string) => {
    const nuevas = [...urlsImagenes];
    nuevas[index] = val;
    setUrlsImagenes(nuevas);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd),
      id_producto: prodEdit?.id_producto,
      imagenes: urlsImagenes.filter(url => url.trim() !== '') // Solo URLs no vacías
    };

    const res = await upsertProducto(data);
    if (res.success) {
      setModalAbierto(false);
      refreshData();
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-(--militar-green) uppercase tracking-tighter">Catálogo Menú</h1>
        <button 
          onClick={() => { setProdEdit(null); setModalAbierto(true); }}
          className="bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-lg"
        >
          + AGREGAR PRODUCTO
        </button>
      </div>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div key={p.id_producto} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-(--mint-green) flex flex-col">
            <div className="h-52 bg-slate-100 relative group">
              {/* Mostramos la primera imagen o un placeholder */}
              <img 
                src={p.imagen[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => { setProdEdit(p); setModalAbierto(true); }} className="bg-white p-3 rounded-xl shadow-xl hover:text-(--militar-green)">✏️</button>
                <button className="bg-white p-3 rounded-xl shadow-xl hover:text-red-500">🗑️</button>
              </div>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-black text-(--dark-green) bg-(--light-green) px-2 py-1 rounded uppercase mb-2 inline-block">
                {p.categoria}
              </span>
              <h3 className="text-xl font-black text-(--militar-green) leading-tight uppercase mb-1">{p.nombre}</h3>
              <p className="text-2xl font-black text-(--dark-green)">${Number(p.precio).toFixed(2)}</p>
              <p className="text-[10px] text-slate-400 mt-2">⏳ Prep: {p.tiempo_prep} min</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EXTENDIDO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black text-(--militar-green) mb-8 uppercase">Detalle del Producto</h2>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna Izquierda: Datos */}
              <div className="space-y-4">
                <input name="nombre" placeholder="Nombre" defaultValue={prodEdit?.nombre} required className="w-full bg-(--light-green) p-4 rounded-2xl border-none font-bold" />
                <div className="flex gap-2">
                  <input name="precio" type="number" step="0.01" placeholder="Precio" defaultValue={Number(prodEdit?.precio || 0)} required className="flex-1 bg-(--light-green) p-4 rounded-2xl border-none font-bold" />
                  <input name="tiempo_prep" type="number" placeholder="Minutos" defaultValue={prodEdit?.tiempo_prep} className="w-24 bg-(--light-green) p-4 rounded-2xl border-none font-bold" />
                </div>
                <input name="categoria" placeholder="Categoría (Ej: Bebidas)" defaultValue={prodEdit?.categoria} required className="w-full bg-(--light-green) p-4 rounded-2xl border-none font-bold" />
                <textarea name="descripcion" placeholder="Descripción corta" defaultValue={prodEdit?.descripcion} className="w-full bg-(--light-green) p-4 rounded-2xl border-none font-medium h-24" />
              </div>

              {/* Columna Derecha: Imágenes */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2">Galería de Imágenes (URLs)</label>
                <div className="space-y-2">
                  {urlsImagenes.map((url, index) => (
                    <input 
                      key={index}
                      value={url}
                      onChange={(e) => updateImagenUrl(index, e.target.value)}
                      placeholder={`URL imagen ${index + 1}`}
                      className="w-full bg-(--light-green) p-3 rounded-xl border-none text-xs font-mono"
                    />
                  ))}
                  <button 
                    type="button" 
                    onClick={addImagenInput}
                    className="text-(--militar-green) text-xs font-black p-2 hover:underline"
                  >
                    + AGREGAR OTRA URL
                  </button>
                </div>
              </div>

              <div className="col-span-full flex gap-4 pt-6">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-4 font-black text-(--militar-green)">CANCELAR</button>
                <button type="submit" className="flex-1 py-4 bg-(--militar-green) text-white rounded-2xl font-black shadow-lg">GUARDAR PRODUCTO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}