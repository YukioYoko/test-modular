"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

// Definimos la interfaz para recibir 'isOpen'
interface NavBarProps {
  isOpen: boolean;
  closeNav: () => void;
}

export const AdminNavBar = ({ isOpen, closeNav }: NavBarProps) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Personal", href: "/personal" },
     { name: "Ventas", href: "/ventas" },
    { name: "Platillos", href: "/products" },
    { name: "Aditamentos", href: "/aditamentos" },
     { name: "Mesas", href: "/mesas" },
  ];


  return (
    <nav
      onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      className={`fixed top-0 left-0 w-[70%] max-w-75 h-screen bg-green-grad rounded-b-xl text-white z-20 transition-transform duration-300 p-10 flex flex-col gap-8 shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-black mt-12 ">OPCIONES</h2>
      <div className="h-0.5 bg-white w-full text-center"></div>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        if (link.href !== '/cuenta'){
          return (
          <Link
            key={link.name}
            href={link.href}
            onClick={closeNav}
            className={`flex items-center text-center gap-4 p-3 rounded-2xl transition-all ${
              isActive
                ? "bg-orange-50 text-green-600"
                : "text-white hover:bg-slate-50 hover:text-green-600"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              {link.name}
            </span>
            {isActive && <div className="w-2 h-2 bg-green-600 rounded-full" />}
          </Link>
        );
        }
        else{
          return (
          <Link
            key={link.name}
            href={link.href}
            onClick={closeNav}
            className={`fixed left-0 bottom-0 text-center pb-10 w-full items-center gap-4 p-3 rounded-t-xl transition-all ${
              isActive
                ? "bg-orange-50 text-green-600"
                : "text-orange-500 bg-white hover:bg-green-800 hover:text-white"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              {link.name}
            </span>
            {isActive && <div className="w-2 h-2 bg-(--mint-green) rounded-full" />}
          </Link>
        );
        }
        
      })}
    </nav>
  );
};
