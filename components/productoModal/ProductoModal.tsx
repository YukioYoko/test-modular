'use client';
import { useState, useEffect, useMemo } from 'react';

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-black text-[#4a5d4e] uppercase ml-2 tracking-widest block mb-2">
    {children}
  </label>
);

interface ProductoModalProps {
  prodEdit: any;
  modalAbierto: boolean;
  setModalAbierto: (valor: boolean) => void;
  cargando: boolean;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  aditamentosList: any[];
  subcategoriasList: any[];
  categoriasExistentes: any[];
  aditamentosSeleccionados: number[];
  setAditamentosSeleccionados: (ids: number[]) => void;
  urlsExistentes: string[];
  setUrlsExistentes: (urls: string[]) => void;
}

export default function ProductoModal({
  prodEdit, modalAbierto, setModalAbierto, cargando, handleSave,
  aditamentosList, subcategoriasList, categoriasExistentes,
  aditamentosSeleccionados, setAditamentosSeleccionados, urlsExistentes, setUrlsExistentes
}: ProductoModalProps) {
  
  // --- ESTADOS LOCALES PARA MANEJO DE IMÁGENES ---
  const [nuevasImagenes, setNuevasImagenes] = useState<File[]>([]);
  const [previewsNuevas, setPreviewsNuevas] = useState<string[]>([]);
  
  const [catSel, setCatSel] = useState<string | number>("");
  const [subSel, setSubSel] = useState<string | number>("");

  useEffect(() => {
    if (modalAbierto) {
      setCatSel(prodEdit?.id_categoria || "");
      setTimeout(() => setSubSel(prodEdit?.id_subcategoria || ""), 50);
      // Limpiar estados de nuevas imágenes al abrir
      setNuevasImagenes([]);
      setPreviewsNuevas([]);
    }
  }, [modalAbierto, prodEdit]);

  const subFiltradas = useMemo(() => 
    subcategoriasList.filter(s => s.id_categoria === Number(catSel)), 
  [catSel, subcategoriasList]);

  // --- LÓGICA DE IMÁGENES ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNuevasImagenes(prev => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewsNuevas(prev => [...prev, ...newPreviews]);
    }
  };

  const eliminarImagenExistente = (url: string) => {
    setUrlsExistentes(urlsExistentes.filter(u => u !== url));
  };

  const eliminarNuevaImagen = (index: number) => {
    setNuevasImagenes(prev => prev.filter((_, i) => i !== index));
    setPreviewsNuevas(prev => prev.filter((_, i) => i !== index));
  };

  if (!modalAbierto) return null;

  return (
    <div className="fixed inset-0 bg-[#2d3a30]/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-6xl rounded-[3rem] p-10 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="mb-8">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#2d3a30]">
            {prodEdit ? 'Editar Platillo' : 'Nuevo Registro'}
          </h2>
        </div>

        <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
          {/* Inputs ocultos para enviar archivos al Server Action */}
          {nuevasImagenes.map((file, i) => (
            <input key={i} type="file" name="imagenesArchivos" className="hidden" readOnly 
                   ref={(el) => {
                     if (el && file) {
                       const dataTransfer = new DataTransfer();
                       dataTransfer.items.add(file);
                       el.files = dataTransfer.files;
                     }
                   }} 
            />
          ))}
          <input type="hidden" name="urlsExistentes" value={JSON.stringify(urlsExistentes)} />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 overflow-y-auto pr-4 custom-scrollbar">
            
            {/* COLUMNA 1: MULTIMEDIA MULTIPLE */}
            <div className="space-y-6">
              <div>
                <FormLabel>Galería de Imágenes</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {/* Previews Existentes (Cloudinary) */}
                  {urlsExistentes.map((url) => (
                    <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border">
                      <img src={url} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => eliminarImagenExistente(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-md">✕</button>
                    </div>
                  ))}
                  
                  {/* Previews Nuevas (Local) */}
                  {previewsNuevas.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[#b8cbc0]">
                      <img src={url} className="w-full h-full object-cover opacity-70" />
                      <button type="button" onClick={() => eliminarNuevaImagen(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-md">✕</button>
                    </div>
                  ))}

                  {/* Botón para agregar más */}
                  <label className="aspect-square rounded-2xl bg-[#f1f5f2] border-2 border-dashed border-[#b8cbc0] flex flex-col items-center justify-center cursor-pointer hover:bg-[#e6ebe7] transition-all">
                    <span className="text-2xl opacity-40">+</span>
                    <span className="text-[8px] font-black uppercase opacity-40">Añadir</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
              </div>
              <div>
                <FormLabel>Descripción Corta</FormLabel>
                <textarea name="descripcion" defaultValue={prodEdit?.descripcion} className="w-full bg-[#f1f5f2] p-5 rounded-3xl h-32 resize-none text-sm font-bold outline-none" placeholder="Detalles..." />
              </div>
            </div>

            {/* COLUMNA 2: CONFIGURACIÓN */}
            <div className="space-y-5">
              <div>
                <FormLabel>Nombre del Producto</FormLabel>
                <input name="nombre" defaultValue={prodEdit?.nombre} className="w-full bg-[#f1f5f2] p-5 rounded-2xl font-bold outline-none" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Precio ($)</FormLabel>
                  <input name="precio" type="number" step="0.01" defaultValue={prodEdit?.precio} className="w-full bg-[#f1f5f2] p-5 rounded-2xl font-bold outline-none" required />
                </div>
                <div>
                  <FormLabel>Min. Prep</FormLabel>
                  <input name="tiempo_prep" type="number" defaultValue={prodEdit?.tiempo_prep} className="w-full bg-[#f1f5f2] p-5 rounded-2xl font-bold outline-none" />
                </div>
              </div>

              <div>
                <FormLabel>Categoría Maestro</FormLabel>
                <select name="id_categoria" value={catSel} onChange={(e) => { setCatSel(e.target.value); setSubSel(""); }} className="w-full bg-[#f1f5f2] p-5 rounded-2xl font-bold outline-none cursor-pointer appearance-none">
                  <option value="">Seleccionar...</option>
                  {categoriasExistentes.map(c => <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>)}
                </select>
              </div>

              <div>
                <FormLabel>Subcategoría</FormLabel>
                <select name="id_subcategoria" value={subSel} onChange={(e) => setSubSel(e.target.value)} className="w-full bg-[#f1f5f2] p-5 rounded-2xl font-bold outline-none cursor-pointer appearance-none" disabled={!catSel}>
                  <option value="">{catSel ? "Seleccionar..." : "Primero elige categoría"}</option>
                  {subFiltradas.map(s => <option key={s.id_subcategoria} value={s.id_subcategoria}>{s.nombre}</option>)}
                </select>
              </div>
            </div>

            {/* COLUMNA 3: ADITAMENTOS */}
            <div className="flex flex-col h-full overflow-hidden bg-[#f1f5f2]/50 rounded-[2.5rem] p-6 border border-[#b8cbc0]/30">
              <FormLabel>Aditamentos Extras</FormLabel>
              <div className="overflow-y-auto space-y-2 flex-1 pr-2 custom-scrollbar mt-2">
                {aditamentosList.map(adi => {
                  const active = aditamentosSeleccionados.includes(adi.id_aditamento);
                  return (
                    <div key={adi.id_aditamento} onClick={() => {
                      const current = active ? aditamentosSeleccionados.filter(id => id !== adi.id_aditamento) : [...aditamentosSeleccionados, adi.id_aditamento];
                      setAditamentosSeleccionados(current);
                    }} className={`p-4 rounded-2xl cursor-pointer flex justify-between border-2 transition-all ${active ? 'bg-white border-[#2d3a30] shadow-sm' : 'bg-transparent border-transparent opacity-50'}`}>
                      <span className="text-[11px] font-black uppercase">{adi.nombre}</span>
                      <span className="text-[11px] font-bold text-[#4a5d4e]">+${Number(adi.precio).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-between items-center border-t border-[#f1f5f2] mt-6">
            <div className="flex gap-2 items-center ml-4">
              <input type="checkbox" name="activo" defaultChecked={prodEdit?.activo ?? true} className="w-5 h-5 accent-[#2d3a30]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2d3a30]">Producto Activo</span>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setModalAbierto(false)} className="text-[10px] font-black uppercase px-6 hover:opacity-50 transition-opacity">Cancelar</button>
              <button type="submit" disabled={cargando} className="bg-[#2d3a30] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs shadow-2xl active:scale-95 transition-all">
                {cargando ? 'Guardando...' : 'Confirmar Cambios'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}