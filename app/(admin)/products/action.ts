'use client';
import { useState, useEffect, useTransition } from 'react';
import { getProductosAdmin, getAditamentosDisponibles, upsertProducto } from './action';

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [aditamentosList, setAditamentosList] = useState<any[]>([]); // Aditamentos globales
  const [modalAbierto, setModalAbierto] = useState(false);
  const [prodEdit, setProdEdit] = useState<any>(null);
  
  // Estados para el formulario dinámico
  const [urlsImagenes, setUrlsImagenes] = useState<string[]>(['']);
  const [aditamentosSeleccionados, setAditamentosSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    refreshData();
    getAditamentosDisponibles().then(setAditamentosList);
  }, []);

  const refreshData = async () => {
    const data = await getProductosAdmin();
    setProductos(data);
  };

  // Cargar datos al editar
  useEffect(() => {
    if (prodEdit) {
      setUrlsImagenes(prodEdit.imagen.map((img: any) => img.url));
      // Extraemos solo los IDs de la relación actual
      setAditamentosSeleccionados(prodEdit.aditamentos.map((a: any) => a.id_aditamento));
    } else {
      setUrlsImagenes(['']);
      setAditamentosSeleccionados([]);
    }
  }, [prodEdit]);

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
      imagenes: urlsImagenes.filter(u => u !== ''),
      aditamentosIds: aditamentosSeleccionados
    };

    const res = await upsertProducto(data);
    if (res.success) {
      setModalAbierto(false);
      refreshData();
    }
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      <h1 className="text-4xl font-black text-(--militar-green) mb-10 uppercase tracking-tighter">Gestión de Productos</h1>
      
      <button 
        onClick={() => { setProdEdit(null); setModalAbierto(true); }}
        className="mb-8 bg-(--militar-green) text-white px-8 py-4 rounded-3xl font-black shadow-xl"
      >
        + NUEVO PLATILLO
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map(p => (
          <div key={p.id_producto} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-(--mint-green)">
            <img src={p.imagen[0]?.url} className="w-full h-40 object-cover rounded-3xl mb-4 bg-slate-100" />
            <h2 className="font-black text-(--militar-green) uppercase truncate">{p.nombre}</h2>
            <p className="text-(--dark-green) font-black text-xl mb-4">${Number(p.precio).toFixed(2)}</p>
            <button 
              onClick={() => { setProdEdit(p); setModalAbierto(true); }}
              className="w-full bg-(--light-green) py-3 rounded-2xl text-(--militar-green) font-bold text-xs hover:bg-(--mint-green)"
            >
              CONFIGURAR
            </button>
          </div>
        ))}
      </div>

      {/* MODAL EXTENDIDO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* BLOQUE 1: DATOS E IMÁGENES */}
              <div className="space-y-6">
                <h3 className="text-xl font-black text-(--militar-green) border-b-4 border-(--light-green) pb-2">INFORMACIÓN GENERAL</h3>
                <input name="nombre" defaultValue={prodEdit?.nombre} placeholder="Nombre del plato" required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                <div className="flex gap-4">
                  <input name="precio" type="number" step="0.01" defaultValue={Number(prodEdit?.precio || 0)} placeholder="Precio" className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                  <input name="categoria" defaultValue={prodEdit?.categoria} placeholder="Categoría" className="flex-1 bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                </div>
                
                <label className="text-[10px] font-black text-(--dark-green) uppercase block ml-2">URLs de Imágenes</label>
                {urlsImagenes.map((url, i) => (
                  <input 
                    key={i} 
                    value={url} 
                    onChange={(e) => {
                      const n = [...urlsImagenes]; n[i] = e.target.value; setUrlsImagenes(n);
                    }}
                    placeholder="URL de imagen"
                    className="w-full bg-(--light-green) p-4 rounded-xl border-none text-xs"
                  />
                ))}
                <button type="button" onClick={() => setUrlsImagenes([...urlsImagenes, ''])} className="text-(--militar-green) text-[10px] font-black underline">+ AÑADIR OTRA FOTO</button>
              </div>

              {/* BLOQUE 2: ADITAMENTOS (RELACIÓN) */}
              <div className="space-y-6">
                <h3 className="text-xl font-black text-(--militar-green) border-b-4 border-(--light-green) pb-2">ADITAMENTOS DISPONIBLES</h3>
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2">
                  {aditamentosList.map((adi) => (
                    <button
                      key={adi.id_aditamento}
                      type="button"
                      onClick={() => toggleAditamento(adi.id_aditamento)}
                      className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                        aditamentosSeleccionados.includes(adi.id_aditamento)
                        ? 'bg-(--militar-green) border-(--militar-green) text-white'
                        : 'bg-white border-(--light-green) text-(--militar-green)'
                      }`}
                    >
                      <span className="font-bold text-sm">{adi.nombre}</span>
                      <span className="text-[10px] font-black opacity-60">
                        {aditamentosSeleccionados.includes(adi.id_aditamento) ? '✓ SELECCIONADO' : `+$${adi.precio}`}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-(--dark-green) italic">
                  * Estos aditamentos aparecerán como opciones extra al tomar la orden desde la tablet del mesero.
                </p>
              </div>

              <div className="col-span-full flex gap-4 pt-10">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-5 font-black text-(--militar-green) uppercase">Cerrar</button>
                <button type="submit" className="flex-1 py-5 bg-(--militar-green) text-white rounded-3xl font-black shadow-xl uppercase">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}