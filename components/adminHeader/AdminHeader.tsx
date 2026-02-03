// components/navBar/navBar.tsx
"use client";

import { useState } from "react";
import { AdminNavBar } from "../adminNavBar/AdminNavBar";

export const AdminHeader = () => {
  
  const [nav, setNav] = useState(false);

  // Función para manejar el cambio
  const handleNav = () => setNav(!nav);
  

  return (
    <header className="flex bg-(--notWhite) p-4 sticky top-0 z-10 justify-center items-center">
      {/* BOTÓN CON TOGGLE CORRECTO */}
      <button onClick={handleNav} className="z-20">
        <img
          src={!nav ? "/menu.svg" : "/close.svg"}
          className="h-10 w-10 left-10 fixed top-4 bg-(--mint-green)"
        />
      </button> 

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-(--dark-green) font-(family-name:--tanker)">Foodlify</h1>
        {/* <p className="text-xs text-(--color-lightGray)">
          Ordenando para la Comanda #{idComanda}
        </p> */}
      </div>

      {/* 2. EL MENÚ LATERAL (Overlay) */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/80 z-10 duration-300 ${nav ? "block" : "hidden"}`}
        
      >
        {/* Sintaxis correcta para pasar la prop */}
        <AdminNavBar isOpen={nav} closeNav={() => setNav(false)} />
      </div>
    </header>
  );
};
