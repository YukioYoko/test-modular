"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Definimos la interfaz para los datos que vienen de la BD
interface Categoria {
  id_categoria: number;
  nombre: string;
}

export const Categories = ({ categorias }: { categorias: Categoria[] }) => {
  const params = useSearchParams();
  
  // Extraemos datos de la sesión para persistirlos en los enlaces
  const idComanda = params.get("comanda");
  const token = params.get("token");
  
  // Obtenemos la categoría seleccionada de la URL (si no hay, por defecto es 0/Todo)
  const categoriaSeleccionada = params.get("cat") || "0";

  if (!idComanda || !token) return null;

  // Agregamos la opción "Todo" al inicio del array
  const todasLasCategorias = [
    { id_categoria: 0, nombre: "Todo" },
    ...categorias
  ];

  return (
    <div className="top-0 z-10 bg-transparent py-4 pl-4 border-b border-slate-100/50 backdrop-blur-sm">
      <nav className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {todasLasCategorias.map((cat) => {
          // Construimos la URL manteniendo la sesión y añadiendo el filtro de categoría
          const catParam = cat.id_categoria !== 0 ? `&cat=${cat.id_categoria}` : "";
          const fullHref = `/menu?comanda=${idComanda}&token=${token}${catParam}`;
          
          // Comparamos el ID para el estilo activo
          const isActive = categoriaSeleccionada === cat.id_categoria.toString();

          return (
            <Link
              key={cat.id_categoria}
              href={fullHref}
              className={`
                shrink-0 snap-start px-6 py-2.5 rounded-full text-sm font-black transition-all border uppercase tracking-widest
                ${
                  isActive
                    ? "bg-(--mint-green) text-(--militar-green) border-none shadow-lg shadow-(--mint-green)/40 scale-105"
                    : "bg-white text-slate-500 border-slate-200 hover:border-(--mint-green) hover:text-(--militar-green)"
                }
              `}
            >
              {cat.nombre}
            </Link>
          );
        })}
        {/* Padding final para scroll suave */}
        <div className="w-6 shrink-0" />
      </nav>
    </div>
  );
};