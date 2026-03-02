"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { sendOrder } from "@/app/(clientView)/menu/action"; 
import { getSugerenciasApriori } from "@/components/products/action";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const CART_COOKIE_NAME = "foodlify_cart";

export function useCarrito(idComanda: number, token: string | null, esSoloLectura: boolean) {
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[] } | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Cargar cookies al iniciar
  useEffect(() => {
    const saved = Cookies.get(CART_COOKIE_NAME);
    if (saved) setCarrito(JSON.parse(saved));
    
    if (!esSoloLectura) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      return () => { socketRef.current?.disconnect(); };
    }
  }, [esSoloLectura]);

  // Función núcleo para persistir cambios
  const actualizarCarritoYCookies = (nuevoCarrito: any[]) => {
    setCarrito(nuevoCarrito);
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(nuevoCarrito), { expires: 7 });
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
        socketRef.current?.emit("new_order", { items: result.ordenCreada, fecha: new Date() });
        actualizarCarritoYCookies([]); // Limpiar cookies al terminar
        setShowSuccess(true);
      }
    });
  };

  return {
    carrito,
    setCarrito,
    agregarAlCarritoBase,
    agregarRapido,
    actualizarCantidad,
    eliminarProducto, // Nueva función expuesta
    enviarPedido,
    isPending,
    showSuccess,
    setShowSuccess,
    sugerenciasData,
    setSugerenciasData
  };
}