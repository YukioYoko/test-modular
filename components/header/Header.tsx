"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link"; 
import LogoutButton from "../logout/Logout";

export const Header = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  
  const idComanda = params.get("comanda");
  const token = params.get("token"); 
  const isMenu = pathname.startsWith("/menu");
  const isCheck = pathname.startsWith("/cuenta");

  return (
    <header className="sticky top-0 z-30 bg-[var(--notWhite)] h-20 shadow-sm border-b border-slate-100/50">
      <div className="flex h-full p-4 justify-center items-center relative">
        
        {/* BOTÓN REGRESAR (Solo visible en /cuenta) */}
        {isCheck && (
          <Link 
            href={`/menu?comanda=${idComanda}&token=${token}`}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-[var(--militar-green)] transition-colors"
          >
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <span className="text-xs font-bold hidden sm:block">Menú</span>
          </Link>
        )}

        {/* LOGO CENTRAL */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black text-[var(--dark-mint-green)] font-tanker tracking-wide italic uppercase">
            Foodlify
          </h1>

          {idComanda && idComanda !== "null" ? (
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
               Mesa {idComanda}
            </p>
          ) : (
            isMenu && (
              <p className="text-[9px] text-[var(--militar-green)] font-bold uppercase tracking-tighter opacity-60 mt-1">
                Modo Catálogo
              </p>
            )
          )}
        </div>

        {/* LOGOUT */}
        {!isMenu && !isCheck && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LogoutButton />
          </div>
        )}

        {/* BOTÓN VER CUENTA (MEJORADO - MÁS VISIBLE) */}
        {isMenu && idComanda && idComanda !== "null" && (
          <Link 
            href={`/cuenta?comanda=${idComanda}&token=${token}`}
            className="absolute right-4 top-1/2 -translate-y-1/2 group"
          >
            <div className="flex items-center gap-2 bg-[var(--mint-green)] pl-4 pr-4 py-2 rounded-full shadow-sm border border-[var(--mint-green)] hover:bg-[var(--militar-green)] transition-all active:scale-95">
              {/* Icono de recibo */}
              {/* <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-[var(--militar-green)] group-hover:text-white"
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
                <path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>
              </svg> */}
              
              {/* Texto Explícito */}
              <div className="flex flex-col items-start leading-none">
                {/* <span className="text-[10px] font-bold text-[var(--militar-green)] opacity-70 group-hover:text-white/80">VER</span> */}
                <span className="text-xs font-black text-[var(--militar-green)] group-hover:text-white">CUENTA</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};