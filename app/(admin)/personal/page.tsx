'use client';
import { useState, useTransition, useEffect } from 'react';
import { upsertPersonal, eliminarPersonal, getPersonal } from './action';

export default function PersonalPage() {
  const [personal, setPersonal] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [isPending, startTransition] = useTransition();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<any>(null);

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const data = await getPersonal();
    setPersonal(data);
  };

  const personalFiltrado = personal.filter(p => 
    p.usuario.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.id.toString().includes(busqueda) ||
    p.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id: number) => {
    if (confirm('¿Seguro que deseas eliminar este colaborador?')) {
      startTransition(async () => {
        const res = await eliminarPersonal(id);
        if (res.success) refreshData();
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      const res = await upsertPersonal({ ...data, id: usuarioEdit?.id });
      if (res.success) {
        setModalAbierto(false);
        refreshData();
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans text-(--militar-green)">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Personal</h1>
          <p className="text-(--dark-green) font-bold text-sm italic">Gestión de accesos y perfiles</p>
        </div>

        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o ID..."
            className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white border-none shadow-sm focus:ring-4 focus:ring-(--mint-green) font-bold"
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span className="absolute left-4 top-4.5 opacity-30">🔍</span>
        </div>
      </div>

      <button 
        onClick={() => { setUsuarioEdit(null); setModalAbierto(true); }}
        className="mb-8 bg-(--militar-green) text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-(--militar-green)/20"
      >
        + AGREGAR COLABORADOR
      </button>

      {/* TABLA */}
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-(--mint-green)" style={{ opacity: isPending ? 0.7 : 1 }}>
        <table className="w-full text-left border-collapse">
          <thead className="bg-(--mint-green)/20 text-[10px] uppercase font-black tracking-widest border-b border-(--light-green)">
            <tr>
              <th className="p-6">ID</th>
              <th className="p-6">Colaborador / Email</th>
              <th className="p-6 text-center">Rol</th>
              <th className="p-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--light-green)">
            {personalFiltrado.map((p) => (
              <tr key={p.id} className="hover:bg-(--light-green)/30 transition-colors">
                <td className="p-6 font-mono text-xs font-bold text-(--dark-green)">#{p.id}</td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-black text-lg leading-none">{p.usuario}</span>
                    <span className="text-xs font-bold text-(--dark-green) opacity-60">{p.email}</span>
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                    p.rol === 'Admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-(--mint-green) text-(--militar-green) border-transparent'
                  }`}>
                    {p.rol}
                  </span>
                </td>
                <td className="p-6 text-right">
                  {p.rol !== 'Admin' ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setUsuarioEdit(p); setModalAbierto(true); }} className="p-3 bg-(--light-green) rounded-xl hover:bg-(--mint-green)">✏️</button>
                      <button onClick={() => handleEliminar(p.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors">🗑️</button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black opacity-30 italic">Protegido</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">
              {usuarioEdit ? 'Editar Perfil' : 'Nuevo Colaborador'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase ml-2 mb-1 block">Usuario</label>
                <input name="usuario" defaultValue={usuarioEdit?.usuario} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase ml-2 mb-1 block">Email Corporativo</label>
                <input name="email" type="email" defaultValue={usuarioEdit?.email} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase ml-2 mb-1 block">Rol</label>
                  <select name="rol" defaultValue={usuarioEdit?.rol || 'Mesero'} className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-black">
                    <option value="cocina">Cocina</option>
                    <option value="Mesero">Mesero</option>
                    <option value="hostess">Hostess</option>
                    <option value="Cajero">Cajero</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase ml-2 mb-1 block">Contraseña</label>
                  <input name="password" type="password" placeholder={usuarioEdit ? "Cambiar..." : "****"} required={!usuarioEdit} className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 font-black uppercase text-xs">Cancelar</button>
                <button type="submit" disabled={isPending} className="flex-1 py-5 bg-(--militar-green) text-white rounded-2xl font-black shadow-lg hover:bg-(--darker-green)">
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