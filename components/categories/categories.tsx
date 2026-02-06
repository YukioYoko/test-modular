"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  
  // Obtenemos los datos necesarios de la URL
  const idComanda = params.get("comanda");
  const token = params.get("token");

  const navLinks = [
    { name: "Todo", href: "/menu" }, // Cambié "Menú" por "Todo" que es más común en filtros
    { name: "Entradas", href: "/" },
    { name: "Platillos", href: "/" },
    { name: "Postres", href: "/" },
    { name: "Bebidas", href: "/" },
    { name: "Caliente", href: "/" },
    { name: "Frias", href: "/" },
  ];

  // Si no hay sesión válida, no mostramos nada
  if (!idComanda || !token) return null;

  return (
    <div className=" top-0 z-10 bg-app py-4 pl-4 border-b border-slate-100/50 backdrop-blur-sm">
      <nav className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {navLinks.map((link) => {
          const fullHref = `${link.href}?comanda=${idComanda}&token=${token}`;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={fullHref}
              className={`
                flex-shrink-0 snap-start px-5 py-2.5 rounded-full text-sm font-bold transition-all border
                ${
                  isActive
                    ? "bg-(--mint-green) text-(--militar-green) border-none shadow-md shadow-(--mint-green)/30"
                    : "bg-white text-slate-600 border-slate-200 hover:border-(--mint-green)"
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}
        {/* Espacio extra al final para que el último item no quede pegado al borde */}
        <div className="w-4 flex-shrink-0" />
      </nav>
    </div>
  );
};