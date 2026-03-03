"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Categories = ({ categorias }: { categorias: any[] }) => {
  const params = useSearchParams();
  const idComanda = params.get("comanda") || "";
  const token = params.get("token") || "";
  const categoriaSeleccionada = params.get("cat") || "0";

  const todasLasCategorias = [
    { id_categoria: 0, nombre: "Todo" },
    ...categorias
  ];

  return (
    <div className="top-0 z-10 bg-transparent py-4 pl-4 border-b border-slate-100/50 backdrop-blur-sm">
      <nav className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {todasLasCategorias.map((cat) => {
          // Construcción de URL limpia
          const url = new URLSearchParams();
          if (idComanda) url.set("comanda", idComanda);
          if (token) url.set("token", token);
          if (cat.id_categoria !== 0) url.set("cat", cat.id_categoria.toString());

          const isActive = categoriaSeleccionada === cat.id_categoria.toString();

          return (
            <Link
              key={cat.id_categoria}
              href={`/menu?${url.toString()}`}
              className={`
                shrink-0 snap-start px-6 py-2.5 rounded-full text-sm font-black transition-all border uppercase tracking-widest
                ${isActive
                    ? "bg-[#D1FFD7] text-[#1A3C2F] border-none shadow-lg scale-105"
                    : "bg-white text-slate-500 border-slate-200"
                }
              `}
            >
              {cat.nombre}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};