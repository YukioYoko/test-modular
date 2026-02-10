'use client';
import { useState, useTransition, useEffect } from 'react';
import { upsertPersonal, eliminarPersonal, getPersonal } from './action';

// --- ICONOS PERSONALIZADOS ---
const IconEdit = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

const IconDelete = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

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
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Personal</h1>
          <p className="text-(--dark-green) font-bold text-sm italic opacity-70">Gestión de accesos y perfiles Foodlify</p>
        </div>

        <div className="relative w-full md:w-96 group">
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o ID..."
            className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white border-none shadow-sm focus:ring-4 focus:ring-(--mint-green) font-bold transition-all"
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
        </div>
      </div>

      <button 
        onClick={() => { setUsuarioEdit(null); setModalAbierto(true); }}
        className="mb-8 bg-(--militar-green) text-white px-10 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-(--militar-green)/20 uppercase tracking-widest text-xs"
      >
        + Agregar Colaborador
      </button>

      {/* TABLA */}
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-(--mint-green) transition-opacity duration-300" style={{ opacity: isPending ? 0.6 : 1 }}>
        <table className="w-full text-left border-collapse">
          <thead className="bg-(--mint-green)/20 text-[10px] uppercase font-black tracking-[0.2em] border-b border-(--light-green)">
            <tr>
              <th className="p-6">Ref</th>
              <th className="p-6">Colaborador / Info</th>
              <th className="p-6 text-center">Rol Asignado</th>
              <th className="p-6 text-center w-40">Gestión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--light-green)">
            {personalFiltrado.map((p) => (
              <tr key={p.id} className="hover:bg-(--light-green)/30 transition-colors group">
                <td className="p-6 font-mono text-[10px] font-black text-(--dark-green) opacity-40">#{p.id}</td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-black text-base uppercase tracking-tight">{p.usuario}</span>
                    <span className="text-[10px] font-bold text-(--dark-green) opacity-60 italic">{p.email}</span>
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border ${
                    p.rol === 'Admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-(--mint-green) text-(--militar-green) border-transparent'
                  }`}>
                    {p.rol}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    {p.rol !== 'Admin' ? (
                      <>
                        <button 
                          onClick={() => { setUsuarioEdit(p); setModalAbierto(true); }} 
                          className="p-3 bg-(--light-green) text-(--militar-green) rounded-xl hover:bg-(--militar-green) hover:text-white transition-all shadow-sm active:scale-90"
                          title="Editar Perfil"
                        >
                          <IconEdit />
                        </button>
                        <button 
                          onClick={() => handleEliminar(p.id)} 
                          className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                          title="Eliminar Colaborador"
                        >
                          <IconDelete />
                        </button>
                      </>
                    ) : (
                      <span className="text-[9px] font-black opacity-20 uppercase tracking-tighter">Root Account</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {personalFiltrado.length === 0 && (
          <div className="p-20 text-center opacity-20 font-black uppercase italic text-2xl tracking-tighter">
            Sin resultados para "{busqueda}"
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300 relative overflow-hidden">
            {/* Decoración lateral */}
            <div className="absolute top-0 right-0 w-2 h-full bg-(--militar-green)" />
            
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">
              {usuarioEdit ? 'Actualizar Perfil' : 'Registro de Personal'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-2 tracking-widest opacity-60">Nombre de Usuario</label>
                <input name="usuario" defaultValue={usuarioEdit?.usuario} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green)" placeholder="Ej. Juan Pérez" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-2 tracking-widest opacity-60">Email de Empresa</label>
                <input name="email" type="email" defaultValue={usuarioEdit?.email} required className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green)" placeholder="staff@foodlify.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase ml-2 tracking-widest opacity-60">Área / Rol</label>
                  <select name="rol" defaultValue={usuarioEdit?.rol || 'Mesero'} className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-black outline-none focus:ring-2 focus:ring-(--mint-green) appearance-none cursor-pointer">
                    <option value="cocina">Cocina</option>
                    <option value="Mesero">Mesero</option>
                    <option value="hostess">Hostess</option>
                    <option value="Cajero">Cajero</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase ml-2 tracking-widest opacity-60">Acceso</label>
                  <input name="password" type="password" placeholder={usuarioEdit ? "Nueva clave..." : "Contraseña"} required={!usuarioEdit} className="w-full bg-(--light-green) p-5 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green)" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 font-black uppercase text-[10px] tracking-widest text-(--militar-green) hover:opacity-50 transition-opacity">
                  Descartar
                </button>
                <button 
                  type="submit" 
                  disabled={isPending} 
                  className="flex-2 py-5 bg-(--militar-green) text-white rounded-3xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
                >
                  {isPending ? 'Procesando...' : 'Confirmar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}