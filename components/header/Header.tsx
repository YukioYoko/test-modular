// components/header.tsx
"use client";
import { useSearchParams } from "next/navigation";

export const Header = () => {
  const params = useSearchParams();
  const idComanda = params.get("comanda");

  return (
    // Quitamos 'flex' y ponemos 'block' o 'flex-col' para que se apilen verticalmente (Logo arriba, Menu abajo)
    // Mantenemos 'sticky top-0' aquí para que TODO el encabezado (logo + menú) se quede fijo al bajar
    <header className="sticky top-0 z-30 bg-(--notWhite)">
      
      {/* PARTE 1: BARRA SUPERIOR (LOGO Y BOTONES) */}
      <div className="flex p-4 justify-center items-center relative">
        {/* Botón Lupa (Izquierda) */}
        {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
            <p className="text-xs">🔍</p>
        </div> */}

        {/* Logo Central */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black text-(--dark-mint-green) font-(family-name:--tanker) tracking-wide">
            Foodlify
          </h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-2">
             Mesa {idComanda}
          </p>
        </div>
      </div>

    </header>
  );
};