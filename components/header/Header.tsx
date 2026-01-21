// components/navBar/navBar.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { NavBar } from "../navBar/NavBar";

export const Header = () => {
  const params = useSearchParams();
  const idComanda = params.get("comanda");
  const [nav, setNav] = useState(false);

  // Función para manejar el cambio
  const handleNav = () => setNav(!nav);
  

  return (
    <header className="flex bg-white p-4 shadow-sm sticky top-0 z-10 justify-center items-center">
      {/* BOTÓN CON TOGGLE CORRECTO */}
      <button onClick={handleNav} className="z-20">
        <img
          src={!nav ? "/menu.svg" : "/close.svg"}
          alt="icon"
          className="h-10 w-10 left-10 fixed top-4"
        />
      </button>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-black text-orange-600">MENÚ DIGITAL</h1>
        <p className="text-xs text-gray-500">
          Ordenando para la Comanda #{idComanda}
        </p>
      </div>

      {/* 2. EL MENÚ LATERAL (Overlay) */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/80 z-10 duration-300 ${nav ? "block" : "hidden"}`}
        onClick={handleNav}
      >
        {/* Sintaxis correcta para pasar la prop */}
        <NavBar isOpen={nav} />
      </div>
    </header>
  );
};
