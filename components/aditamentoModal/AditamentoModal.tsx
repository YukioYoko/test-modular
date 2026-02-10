'use client';

// Reutilizamos los componentes de estilo de la página principal o los definimos aquí
const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-black text-(--militar-green) uppercase ml-2 tracking-widest block mb-1">
    {children}
  </label>
);

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props} 
    className="w-full bg-(--light-green) p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green) transition-all" 
  />
);

interface AditamentoModalProps {
  modalAbierto: boolean;
  setModalAbierto: (valor: boolean) => void;
  editItem: any;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cargando: boolean;
}

export default function AditamentoModal({
  modalAbierto,
  setModalAbierto,
  editItem,
  handleSave,
  cargando
}: AditamentoModalProps) {
  
  if (!modalAbierto) return null;

  return (
    <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        <h2 className="text-2xl font-black text-(--militar-green) mb-6 uppercase tracking-tighter italic">
          {editItem ? 'Editar' : 'Nuevo'} Aditamento
        </h2>
        
        <form onSubmit={handleSave} className="space-y-5">
          {/* CAMPO: NOMBRE */}
          <div>
            <FormLabel>Nombre del Extra</FormLabel>
            <FormInput 
              name="nombre" 
              defaultValue={editItem?.nombre} 
              required 
              placeholder="Ej: Queso Extra, Tocino..." 
            />
          </div>

          {/* CAMPO: PRECIO */}
          <div>
            <FormLabel>Precio Adicional ($)</FormLabel>
            <FormInput 
              name="precio" 
              type="number" 
              step="0.01" 
              defaultValue={Number(editItem?.precio || 0)} 
              required 
            />
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setModalAbierto(false)} 
              className="flex-1 py-4 font-black text-(--militar-green) uppercase text-sm hover:opacity-60 transition-opacity"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={cargando}
              className="flex-1 py-4 bg-(--militar-green) text-white rounded-2xl font-black shadow-lg uppercase text-sm disabled:opacity-50 active:scale-95 transition-all"
            >
              {cargando ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </form>

        {/* BOTÓN CERRAR X (OPCIONAL) */}
        <button 
          onClick={() => setModalAbierto(false)}
          className="absolute top-6 right-6 text-(--militar-green) opacity-30 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}