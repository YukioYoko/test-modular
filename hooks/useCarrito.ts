"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { sendOrder } from "@/app/(clientView)/menu/action"; 
import { getSugerenciasApriori } from "@/components/products/action";
import { useRouter } from "next/navigation"; // 1. Importación correcta

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const CART_COOKIE_NAME = "foodlify_cart";
const CART_EVENT_NAME = "foodlify_cart_updated";

export function useCarrito(idComanda: number, token: string | null, esSoloLectura: boolean) {
  // 2. Declara el router en la raíz del hook
  const router = useRouter(); 
  
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[] } | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // ... (tus funciones cargarCarritoDesdeCookie y actualizarCarritoYCookies se mantienen igual)
  const cargarCarritoDesdeCookie = () => {
    const saved = Cookies.get(CART_COOKIE_NAME);
    if (saved) {
      try { setCarrito(JSON.parse(saved)); } catch (e) { setCarrito([]); }
    } else { setCarrito([]); }
  };

  useEffect(() => {
    cargarCarritoDesdeCookie();
    const escucharCambios = () => cargarCarritoDesdeCookie();
    window.addEventListener(CART_EVENT_NAME, escucharCambios);
    
    if (!esSoloLectura) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      return () => {
        socketRef.current?.disconnect();
        window.removeEventListener(CART_EVENT_NAME, escucharCambios);
      };
    }
    return () => window.removeEventListener(CART_EVENT_NAME, escucharCambios);
  }, [esSoloLectura]);

  const actualizarCarritoYCookies = (nuevoCarrito: any[]) => {
    setCarrito(nuevoCarrito);
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(nuevoCarrito), { expires: 7 });
    window.dispatchEvent(new Event(CART_EVENT_NAME));
  };

  // ... (agregarAlCarritoBase, agregarRapido, actualizarCantidad, eliminarProducto se mantienen igual)

  const enviarPedido = () => {
    // 3. La redirección se ejecuta SOLO después de que la promesa de sendOrder termina satisfactoriamente
    startTransition(async () => {
      try {
        const result = await sendOrder(idComanda, carrito, token);
        
        if (result.success) {
          // Emitir al socket si existe
          if (socketRef.current) {
            socketRef.current.emit("new_order", { items: result.ordenCreada, fecha: new Date() });
          }

          // Limpiar datos locales
          actualizarCarritoYCookies([]); 
          setShowSuccess(true);

          // 4. Redirigir usando el router declarado arriba
          // Corregí la URL: añadí el '&' que faltaba entre idComanda y token
          router.push(`/cuenta?comanda=${idComanda}&token=${token}`);
        } else {
          console.error(result.error);
          alert("Error: " + result.error);
        }
      } catch (error) {
        console.error("Error en la transición:", error);
      }
    });
  };

  return {
    carrito,
    setCarrito: actualizarCarritoYCookies,
    agregarAlCarritoBase,
    agregarRapido,
    actualizarCantidad,
    eliminarProducto,
    enviarPedido,
    isPending,
    showSuccess,
    setShowSuccess,
    sugerenciasData,
    setSugerenciasData
  };
}