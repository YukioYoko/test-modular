"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

// 1. Interfaces fuera para que sean reutilizables
export interface IProductoPlano {
  id_producto: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string | null;
  tiempo_prep: number;
  pasos: string | null;
  imagen: string[]; 
}

export interface IMenuCategoria {
  nombreCategoria: string;
  productos: IProductoPlano[];
}

// Definimos la interfaz de las Props del componente
interface MenuCategoriasProps {
  cat: IMenuCategoria; // Aquí quitamos el 'any'
  idComanda: number;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({
  cat
}: MenuCategoriasProps) { // <--- Aplicamos la interfaz aquí
  const router = useRouter();
  const params = useSearchParams();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const verProducto = () => {
    const comanda = params.get("comanda") || "";
    const currentToken = params.get("token") || "";
    router.push(
      `/menu/${cat.nombreCategoria}?comanda=${comanda}&token=${currentToken}`
    );
  };

  return (
    <div className="max-w-1/3 mx-auto space-y-6 pb-32">
      {/* Título de la categoría */}
      <h2 className="text-2xl font-bold text-slate-800 px-5">
        {cat.nombreCategoria}
      </h2>
      <div 
      
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-transform"
          onClick={() => verProducto()}
        >
      {cat.productos.map((prod) => (
        <div 
          key={prod.id_producto}
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <img 
              src={prod.imagen[0] || "/placeholder.png"} 
              alt={prod.nombre} 
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-800">{prod.nombre}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{prod.descripcion}</p>
              <p className="text-orange-600 font-bold mt-1">
                ${prod.precio.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}