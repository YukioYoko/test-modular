"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { sendOrder } from "@/app/(clientView)/menu/action"; 
import { getSugerenciasApriori } from "@/components/products/action";
import { useRouter } from "next/navigation";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const CART_COOKIE_NAME = "foodlify_cart";
const CART_EVENT_NAME = "foodlify_cart_updated"; // Nombre del evento de sincronización

export function useCarrito(idComanda: number, token: string | null, esSoloLectura: boolean) {
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[] } | null>(null);
  const socketRef = useRef<Socket | null>(null);
const router = useRouter();
  // 1. Función para cargar datos de la cookie al estado de React
  const cargarCarritoDesdeCookie = () => {
    const saved = Cookies.get(CART_COOKIE_NAME);
    if (saved) {
      try {
        setCarrito(JSON.parse(saved));
      } catch (e) {
        setCarrito([]);
      }
    } else {
      setCarrito([]);
    }
  };

  // 2. Efecto de sincronización y Socket
  useEffect(() => {
    cargarCarritoDesdeCookie();

    // Escuchador de eventos para actualizarse entre pestañas/componentes sin refrescar
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

  // 3. Función núcleo: Actualiza estado, cookie y EMITE el evento global
  const actualizarCarritoYCookies = (nuevoCarrito: any[]) => {
    setCarrito(nuevoCarrito);
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(nuevoCarrito), { expires: 7 });
    
    // Dispara el evento para que otros componentes se actualicen al instante
    window.dispatchEvent(new Event(CART_EVENT_NAME));
  };

  const agregarAlCarritoBase = (item: any) => {
    const index = carrito.findIndex(it => 
      it.prod === item.prod && 
      JSON.stringify(it.aditamentos?.sort()) === JSON.stringify(item.aditamentos?.sort()) &&
      it.nota === item.nota
    );

    let nuevo;
    if (index !== -1) {
      nuevo = carrito.map((it, i) => i === index ? { ...it, cantidad: it.cantidad + 1 } : it);
    } else {
      nuevo = [...carrito, item];
    }
    actualizarCarritoYCookies(nuevo);
  };

  const agregarRapido = async (prod: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nuevoItem = {
      prod: prod.id_producto,
      nombre: prod.nombre,
      price: prod.precio,
      imagen: prod.imagenUrl,
      cantidad: 1,
      nota: "",
      aditamentos: [],
    };
    agregarAlCarritoBase(nuevoItem);

    const recomendados = await getSugerenciasApriori(prod.id_producto);
    if (recomendados?.length > 0) setSugerenciasData({ nombre: prod.nombre, productos: recomendados });
  };

  const actualizarCantidad = (index: number, action: "add" | "remove") => {
    const nuevo = [...carrito];
    if (action === "add") nuevo[index].cantidad += 1;
    else if (action === "remove" && nuevo[index].cantidad > 1) nuevo[index].cantidad -= 1;
    actualizarCarritoYCookies(nuevo);
  };

  const eliminarProducto = (index: number) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    actualizarCarritoYCookies(nuevo);
  };

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      if (result.success) {
        if (socketRef.current) {
          socketRef.current.emit("new_order", { items: result.ordenCreada, fecha: new Date() });
        }
        actualizarCarritoYCookies([]); // Limpia cookies y notifica a todos
        setShowSuccess(true);
        router.push(`/cuenta?comanda=${idComanda}&token=${token}`);
      }
    });
  };

  return {
    carrito,
    setCarrito: actualizarCarritoYCookies, // Aseguramos que setCarrito también dispare el evento
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