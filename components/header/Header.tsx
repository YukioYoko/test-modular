// components/header.tsx
"use client";
import { useSearchParams, usePathname } from "next/navigation";
import LogoutButton from "../logout/Logout";


export const Header = () => {
  const params = useSearchParams();
  const idComanda = params.get("comanda");
  const pathname = usePathname();
  const isMenu = pathname.startsWith("/menu");


  return (
    <header className="sticky top-0 z-30 bg-(--notWhite)">
      <div className="flex p-4 justify-center items-center relative">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black text-(--dark-mint-green) font-(family-name:--tanker) tracking-wide">
            Foodlify
          </h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-2">
             Mesa {idComanda}
          </p>
        </div>
      </div>
      
      {!isMenu && (
        <div className="fixed right-0 top-0 justify-end align-middle mr-4">
          <LogoutButton />
        </div>
      )}
      

    </header>
  );
};

