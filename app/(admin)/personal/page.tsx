'use client';
import { useState, useTransition, useEffect } from 'react';
import { upsertPersonal, eliminarPersonal, getPersonal } from './action';

export default function PersonalPage() {
  const [personal, setPersonal] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [isPending, startTransition] = useTransition();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<any>(null);

  // Carga inicial de datos
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const data = await getPersonal();
    setPersonal(data);
  };

  // Filtrado en tiempo real por Nombre (usuario) o ID
  const personalFiltrado = personal.filter(p => 
    p.usuario.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.id.toString().includes(busqueda)
  );

  const handleEliminar = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.')) {
      startTransition(async () => {
        await eliminarPersonal(id);
        await refreshData();
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
        await refreshData();
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <div className="p-4 md:p-10 bg-(--light-green) min-h-screen font-sans">
      
      {/* SECCIÓN SUPERIOR: Título y Búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-(--militar-green) tracking-tighter uppercase">Personal</h1>
          <p className="text-(--dark-green) font-bold text-sm">Panel de control de colaboradores</p>
        </div>

        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
            <span>🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nombre o ID..."
            className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white border-none shadow-sm focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-medium transition-all"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* BOTÓN AGREGAR */}
      <div className="mb-8">
        <button 
          onClick={() => { setUsuarioEdit(null); setModalAbierto(true); }}
          className="bg-(--militar-green) text-white px-8 py-4 rounded-[1.5rem] font-black flex items-center gap-3 hover:bg-(--darker-green) active:scale-95 transition-all shadow-xl shadow-(--militar-green)/20"
        >
          <span className="text-xl">+</span> AGREGAR NUEVO
        </button>
      </div>

      {/* TABLA DE REGISTROS */}
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-(--mint-green) transition-opacity duration-300" style={{ opacity: isPending ? 0.6 : 1 }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-(--mint-green)/20 text-(--militar-green) text-[10px] uppercase font-black tracking-widest border-b border-(--light-green)">
              <tr>
                <th className="p-6">ID</th>
                <th className="p-6">Colaborador</th>
                <th className="p-6 text-center">Rol de Acceso</th>
                <th className="p-6 text-right">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--light-green)">
              {personalFiltrado.length > 0 ? (
                personalFiltrado.map((p) => (
                  <tr key={p.id} className="hover:bg-(--light-green)/30 transition-colors group">
                    <td className="p-6 font-mono text-xs text-(--dark-green) font-bold">#{p.id}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-(--mint-green) rounded-2xl flex items-center justify-center text-(--militar-green) font-black uppercase shadow-inner">
                          {p.usuario[0]}
                        </div>
                        <span className="font-black text-(--militar-green) text-lg">{p.usuario}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        p.rol === 'Admin' 
                        ? 'bg-red-100 text-red-600 border border-red-200' 
                        : 'bg-(--light-green) text-(--militar-green) border border-(--mint-green)'
                      }`}>
                        {p.rol}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      {p.rol !== 'Admin' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setUsuarioEdit(p); setModalAbierto(true); }}
                            className="bg-(--light-green) p-3 rounded-xl hover:bg-(--dark-mint-green) text-(--militar-green) transition-all"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleEliminar(p.id)}
                            className="bg-red-50 p-3 rounded-xl hover:bg-red-500 hover:text-white text-red-500 transition-all"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic px-4">Protegido</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-(--dark-green) font-bold italic">
                    No se encontraron resultados para "{busqueda}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA AGREGAR/EDITAR */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-(--militar-green) tracking-tighter">
                {usuarioEdit ? 'ACTUALIZAR DATOS' : 'REGISTRO NUEVO'}
              </h2>
              <p className="text-(--dark-green) text-sm font-bold">Completa la información del colaborador</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2 tracking-widest">Nombre de Usuario</label>
                <input 
                  name="usuario" 
                  defaultValue={usuarioEdit?.usuario} 
                  required 
                  placeholder="Ej: juan_perez"
                  className="w-full bg-(--light-green) border-none p-5 rounded-2xl focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-bold" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2 tracking-widest">Puesto Operativo</label>
                <select 
                  name="rol" 
                  defaultValue={usuarioEdit?.rol || 'Mesero'} 
                  className="w-full bg-(--light-green) border-none p-5 rounded-2xl focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-black"
                >
                  <option value="Cocinero">🧑‍🍳 COCINERO</option>
                  <option value="Mesero">🤵 MESERO</option>
                  <option value="Hostess">📋 HOSTESS</option>
                  <option value="Cajero">💰 CAJERO</option>
                </select>
                <p className="text-[9px] text-(--dark-green) font-bold italic ml-2">* No se permite asignar rol Administrador por seguridad.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-(--dark-green) uppercase ml-2 tracking-widest">Clave de Acceso</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder={usuarioEdit ? "Opcional (cambiar contraseña)" : "Crear contraseña"} 
                  required={!usuarioEdit} 
                  className="w-full bg-(--light-green) border-none p-5 rounded-2xl focus:ring-4 focus:ring-(--mint-green) text-(--militar-green) font-bold" 
                />
              </div>

              <div className="flex gap-4 mt-10 pt-4">
                <button 
                  type="button" 
                  onClick={() => setModalAbierto(false)} 
                  className="flex-1 py-5 font-black text-(--militar-green) hover:bg-(--light-green) rounded-2xl transition-all uppercase text-xs"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="flex-1 py-5 font-black bg-(--militar-green) text-white rounded-2xl shadow-xl hover:bg-(--darker-green) disabled:opacity-50 transition-all uppercase text-xs"
                >
                  {isPending ? 'Procesando...' : 'Confirmar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}