'use client';
import { useState, useTransition, useEffect } from 'react';
import { getMesasAdmin, upsertMesa, eliminarMesa } from './action';

export default function MesasAdminPage() {
  const [mesas, setMesas] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [isPending, startTransition] = useTransition();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mesaEdit, setMesaEdit] = useState<any>(null);

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const data = await getMesasAdmin();
    setMesas(data);
  };

  const mesasFiltradas = mesas.filter(m => 
    m.numero_mesa.toString().includes(busqueda)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);

    startTransition(async () => {
      const res = await upsertMesa({ ...data, id_mesa: mesaEdit?.id_mesa });
      if (res.success) {
        setModalAbierto(false);
        refreshData();
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) tracking-tighter uppercase">Mesas</h1>
          <p className="text-(--dark-green) font-bold text-sm">Configuración del salón</p>
        </div>

        <div className="relative w-full md:w-80">
          <input 
            type="number" 
            placeholder="Buscar por número..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-none shadow-sm text-(--militar-green) font-bold"
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span className="absolute left-4 top-4 opacity-40">🪑</span>
        </div>
      </div>

      <button 
        onClick={() => { setMesaEdit(null); setModalAbierto(true); }}
        className="mb-8 bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black hover:bg-(--darker-green) transition-all shadow-xl shadow-(--militar-green)/20"
      >
        + AGREGAR MESA
      </button>

      {/* TABLA DE MESAS */}
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-(--mint-green)" style={{ opacity: isPending ? 0.6 : 1 }}>
        <table className="w-full text-left">
          <thead className="bg-(--mint-green)/20 text-(--militar-green) text-[10px] uppercase font-black tracking-widest border-b border-(--light-green)">
            <tr>
              <th className="p-6">Número</th>
              <th className="p-6">Capacidad</th>
              <th className="p-6 text-center">Estado Actual</th>
              <th className="p-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--light-green)">
            {mesasFiltradas.map((m) => (
              <tr key={m.id_mesa} className="hover:bg-(--light-green)/30 transition-colors">
                <td className="p-6">
                   <span className="text-2xl font-black text-(--militar-green)">Mesa {m.numero_mesa}</span>
                </td>
                <td className="p-6">
                  <span className="bg-(--mint-green) text-(--militar-green) px-3 py-1 rounded-lg font-bold text-sm">
                    👥 {m.capacidad} pers.
                  </span>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                    m.estado === 'Ocupada' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {m.estado}
                  </span>
                </td>
                <td className="p-6 text-right">
                  {/* Impedir edición si está ocupada */}
                  {m.estado !== 'Ocupada' ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setMesaEdit(m); setModalAbierto(true); }} className="bg-(--light-green) p-3 rounded-xl text-(--militar-green) hover:bg-(--dark-mint-green)">✏️</button>
                      <button onClick={() => { if(confirm('¿Eliminar mesa?')) startTransition(async () => { await eliminarMesa(m.id_mesa); refreshData(); })} } className="bg-red-50 p-3 rounded-xl text-red-500 hover:bg-red-500 hover:text-white">🗑️</button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-300 italic">En uso</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL MESAS */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl font-black text-(--militar-green) mb-8 uppercase tracking-tighter">
              {mesaEdit ? 'Editar Mesa' : 'Nueva Mesa'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2">Número de Mesa</label>
                <input name="numero_mesa" type="number" defaultValue={mesaEdit?.numero_mesa} required className="w-full bg-(--light-green) border-none p-5 rounded-2xl focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-black" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2">Capacidad (Personas)</label>
                <input name="capacidad" type="number" defaultValue={mesaEdit?.capacidad} required className="w-full bg-(--light-green) border-none p-5 rounded-2xl focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-black" />
              </div>

              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-5 font-black text-(--militar-green) uppercase text-xs">Cancelar</button>
                <button type="submit" disabled={isPending} className="flex-1 py-5 bg-(--militar-green) text-white rounded-2xl font-black shadow-lg hover:bg-(--darker-green) uppercase text-xs">
                  {isPending ? 'Guardando...' : 'Confirmar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}