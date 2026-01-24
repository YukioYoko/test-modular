"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

// Definimos la interfaz para recibir 'isOpen'
interface NavBarProps {
  isOpen: boolean;
  closeNav: () => void;
}

export const NavBar = ({ isOpen, closeNav }: NavBarProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const idComanda = params.get("comanda");
  const token = params.get("token");

  const navLinks = [
    { name: "Menú", href: "/menu" },
     { name: "Entradas", href: "/menu/Entrada" },
    { name: "Platillos", href: "/menu/Platillo" },
     { name: "Postres", href: "/menu/Postre" },
    { name: "Bebidas", href: "/menu/Bebida" },
    { name: "Mi Pedido", href: "/pedido" },
    { name: "Pedir Cuenta", href: "/cuenta" },
  ];

  if (!idComanda || !token) return null;

  return (
    <nav
      onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      className={`fixed top-0 left-0 w-[70%] max-w-75 h-screen bg-orange-grad rounded-b-xl text-white z-20 transition-transform duration-300 p-10 flex flex-col gap-8 shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-black mt-12 ">OPCIONES</h2>
      <div className="h-0.5 bg-white w-full text-center"></div>
      {navLinks.map((link) => {
        const fullHref = `${link.href}?comanda=${idComanda}&token=${token}`;
        const isActive = pathname === link.href;

        if (link.href !== '/cuenta'){
          return (
          <Link
            key={link.name}
            href={fullHref}
            onClick={closeNav}
            className={`flex items-center text-center gap-4 p-3 rounded-2xl transition-all ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-white hover:bg-slate-50 hover:text-orange-600"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              {link.name}
            </span>
            {isActive && <div className="w-2 h-2 bg-orange-600 rounded-full" />}
          </Link>
        );
        }
        else{
          return (
          <Link
            key={link.name}
            href={fullHref}
            onClick={closeNav}
            className={`fixed left-0 bottom-0 text-center pb-10 w-full items-center gap-4 p-3 rounded-t-xl transition-all ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-orange-500 bg-white hover:bg-orange-800 hover:text-white"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              {link.name}
            </span>
            {isActive && <div className="w-2 h-2 bg-orange-600 rounded-full" />}
          </Link>
        );
        }
        
      })}
    </nav>
  );
};
