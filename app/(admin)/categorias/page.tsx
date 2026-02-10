"use client";
import { useState, useEffect, useTransition } from "react";
import {
  getCategorias,
  upsertCategoria,
  getSubCategorias,
  upsertSubCategoria,
  eliminarSubCategoria,
} from "./action";

// --- COMPONENTES DE ICONOS ---
const IconEdit = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconDelete = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function CategoriasAdminPage() {
  const [view, setView] = useState<"cat" | "sub">("cat");
  const [data, setData] = useState<any[]>([]);
  const [categoriasPadre, setCategoriasPadre] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEdit, setItemEdit] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  // Función de carga de datos limpia
  const loadData = async () => {
    // Siempre cargar las categorías padre para el select
    const cats = await getCategorias();
    setCategoriasPadre(cats);

    if (view === "cat") {
      setData(cats);
    } else {
      const subs = await getSubCategorias();
      setData(subs);
    }
  };

  // Efecto que limpia la lista antes de cargar la nueva vista
  useEffect(() => {
    setData([]); // Evita que se mezclen items de diferentes tablas
    loadData();
  }, [view]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const id_cat_select = Number(formData.get("id_categoria"));

    startTransition(async () => {
      let res;
      if (view === "cat") {
        res = await upsertCategoria({ nombre, id: itemEdit?.id_categoria });
      } else {
        res = await upsertSubCategoria({
          nombre,
          id_categoria: id_cat_select,
          id: itemEdit?.id_subcategoria,
        });
      }

      if (res.success) {
        setModalAbierto(false);
        setItemEdit(null);
        loadData();
      } else {
        alert(res.error);
      }
    });
  };

  const handleEliminarSub = async (id: number) => {
    if (!confirm("¿Eliminar subcategoría? Esto no se puede deshacer.")) return;
    const res = await eliminarSubCategoria(id);
    if (res.success) loadData();
    else alert(res.error);
  };

  return (
    <div className="p-10 bg-(--light-green) min-h-screen text-(--militar-green)">
      <div className="max-w-6xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Estructura Foodlify
            </h1>
            <div className="flex bg-white p-1 rounded-2xl mt-4 border border-(--mint-green) w-fit shadow-sm">
              <button
                onClick={() => setView("cat")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === "cat" ? "bg-(--militar-green) text-white shadow-md" : "opacity-40 hover:opacity-100"}`}
              >
                Categorías
              </button>
              <button
                onClick={() => setView("sub")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === "sub" ? "bg-(--militar-green) text-white shadow-md" : "opacity-40 hover:opacity-100"}`}
              >
                Subcategorías
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setItemEdit(null);
              setModalAbierto(true);
            }}
            className="bg-(--militar-green) text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            + NUEVA {view === "cat" ? "CATEGORÍA" : "SUBCATEGORÍA"}
          </button>
        </div>

        {/* TABLA DE DATOS */}
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-(--mint-green)">
          <table className="w-full text-left">
            <thead className="bg-(--mint-green)/20 text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="p-6">Nombre</th>
                {view === "sub" && <th className="p-6">Padre</th>}
                <th className="p-6 text-right pr-12">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--light-green)">
              {data.map((item, index) => {
                const key =
                  view === "cat"
                    ? item.id_categoria
                      ? `cat-${item.id_categoria}`
                      : `cat-temp-${index}`
                    : item.id_subcategoria
                      ? `sub-${item.id_subcategoria}`
                      : `sub-temp-${index}`;

                return (
                  <tr
                    key={key}
                    className="hover:bg-(--light-green)/20 transition-colors"
                  >
                    <td className="p-6 font-black uppercase italic text-lg tracking-tight">
                      {item.nombre}
                    </td>

                    {view === "sub" && (
                      <td className="p-6">
                        <span className="bg-(--light-green) px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-(--militar-green)/10">
                          {/* El ?. previene el error si la relación no existe */}
                          {item.categoria?.nombre || "General"}
                        </span>
                      </td>
                    )}

                    <td className="p-6">
                      <div className="flex justify-end gap-2 pr-6">
                        <button
                          onClick={() => {
                            setItemEdit(item);
                            setModalAbierto(true);
                          }}
                          className="p-3 bg-white border border-(--mint-green) rounded-xl hover:bg-(--militar-green) hover:text-white transition-all shadow-sm"
                        >
                          <IconEdit />
                        </button>

                        {view === "sub" && (
                          <button
                            onClick={() =>
                              handleEliminarSub(item.id_subcategoria)
                            }
                            className="p-3 bg-white border border-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <IconDelete />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="p-20 text-center opacity-20 font-black uppercase italic tracking-[0.2em]">
              Cargando...
            </div>
          )}
        </div>

        {/* MODAL */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-(--militar-green)/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-[3rem] w-full max-w-md shadow-2xl relative">
              <h2 className="text-2xl font-black uppercase italic mb-6">
                {itemEdit ? "Editar" : "Crear"}{" "}
                {view === "cat" ? "Categoría" : "Subcategoría"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Nombre del elemento
                  </label>
                  <input
                    name="nombre"
                    defaultValue={itemEdit?.nombre}
                    required
                    autoFocus
                    className="w-full bg-(--light-green) p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-(--mint-green)"
                  />
                </div>

                {view === "sub" && (
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                      Categoría a la que pertenece
                    </label>
                    <select
                      name="id_categoria"
                      defaultValue={itemEdit?.id_categoria}
                      required
                      className="w-full bg-(--light-green) p-4 rounded-2xl border-none font-black outline-none"
                    >
                      <option value="">Selecciona un padre...</option>
                      {categoriasPadre.map((c) => (
                        <option key={c.id_categoria} value={c.id_categoria}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      setItemEdit(null);
                    }}
                    className="flex-1 font-black uppercase text-[10px] opacity-40 hover:opacity-100 transition-all"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-2 py-4 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {isPending ? "Guardando..." : "Confirmar Cambios"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
