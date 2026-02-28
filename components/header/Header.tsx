"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link"; // Importante para la navegación
import LogoutButton from "../logout/Logout";

export const Header = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  
  const idComanda = params.get("comanda");
  const token = params.get("token"); // Necesitamos el token para ver la cuenta
  const isMenu = pathname.startsWith("/menu");
   const isCheck = pathname.startsWith("/cuenta");

  return (
    <header className="sticky top-0 z-30 bg-(--notWhite) h-20 shadow-sm border-b border-slate-100/50">
      <div className="flex h-full p-4 justify-center items-center relative">
        {isCheck && (
          <Link 
            href={`/menu?comanda=${idComanda}&token=${token}`}
            className="absolute left-4 top-1/2 -translate-y-1/2 group flex flex-col items-center"
          >
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 group-hover:bg-(--color-dark-green) transition-colors">
              <span className="text-(--color-dark-green) hover:text-white">Regresar al menu</span>
            </div>
    
          </Link>
        )}


        {/* LOGO Y MESA CENTRAL */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black text-(--dark-mint-green) font-(family-name:--tanker) tracking-wide italic uppercase">
            Foodlify
          </h1>

          {idComanda && idComanda !== "null" ? (
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
               Mesa {idComanda}
            </p>
          ) : (
            isMenu && (
              <p className="text-[9px] text-(--militar-green) font-bold uppercase tracking-tighter opacity-60 mt-1">
                Modo Catálogo
              </p>
            )
          )}
        </div>

        {/* BOTÓN CERRAR SESIÓN (Solo fuera del menú: Staff/Admin) */}
        {!isMenu && !isCheck && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LogoutButton />
          </div>
        )}

        {/* BOTÓN VER CUENTA (Solo en el menú y si hay comanda activa) */}
        {isMenu && idComanda && idComanda !== "null" && (
          <Link 
            href={`/cuenta?comanda=${idComanda}&token=${token}`}
            className="absolute right-4 top-1/2 -translate-y-1/2 group flex flex-col items-center"
          >
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 group-hover:bg-slate-50 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-(--militar-green)"
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
                <path d="M16 8h-4"/>
                <path d="M16 12h-4"/>
                <path d="M8 12h.01"/>
                <path d="M8 8h.01"/>
              </svg>
            </div>
    
          </Link>
        )}
      </div>
    </header>
  );
};