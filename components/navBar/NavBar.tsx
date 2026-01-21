"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

// Definimos la interfaz para recibir 'isOpen'
interface NavBarProps {
  isOpen: boolean;
}

export const NavBar = ({ isOpen }: NavBarProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const idComanda = params.get("comanda");
  const token = params.get("token");

  const navLinks = [
    { name: "Menú", href: "/menu" },
    { name: "Mi Pedido", href: "/pedido" },
    { name: "Cuenta", href: "/cuenta" },
  ];

  if (!idComanda || !token) return null;

  return (
    <nav
      onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      className={`fixed top-0 left-0 w-[70%] max-w-75 h-screen bg-white z-20 transition-transform duration-300 p-10 flex flex-col gap-8 shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-black text-slate-800 mb-4">OPCIONES</h2>

      {navLinks.map((link) => {
        const fullHref = `${link.href}?comanda=${idComanda}&token=${token}`;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={fullHref}
            className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-gray-500 hover:bg-slate-50"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              {link.name}
            </span>
            {isActive && <div className="w-2 h-2 bg-orange-600 rounded-full" />}
          </Link>
        );
      })}
    </nav>
  );
};
