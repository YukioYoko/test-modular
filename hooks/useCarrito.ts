"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { sendOrder } from "@/app/menu/action"; // Ajusta la ruta a tu server action
import { getSugerenciasApriori } from "@/components/products/action";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export function useCarrito(idComanda: number, token: string | null, esSoloLectura: boolean) {
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[] } | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Inicializar Socket.io
  useEffect(() => {
    if (!esSoloLectura) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      return () => { socketRef.current?.disconnect(); };
    }
  }, [esSoloLectura]);

  const agregarAlCarritoBase = (item: any) => {
    setCarrito((prevCarrito) => {
      const index = prevCarrito.findIndex(it => 
        it.prod === item.prod && 
        it.nota === item.nota && 
        JSON.stringify([...it.aditamentos].sort()) === JSON.stringify([...item.aditamentos].sort())
      );
      if (index !== -1) {
        return prevCarrito.map((it, i) => i === index ? { ...it, cantidad: it.cantidad + 1 } : it);
      }
      return [...prevCarrito, item];
    });
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

    // Lógica Apriori para sugerencias de complementos
    const recomendados = await getSugerenciasApriori(prod.id_producto);
    if (recomendados?.length > 0) {
      setSugerenciasData({ nombre: prod.nombre, productos: recomendados });
    }
  };

  const actualizarCantidad = (index: number, action: "add" | "remove") => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      const item = { ...nuevoCarrito[index] };
      if (action === "add") item.cantidad += 1;
      else if (action === "remove" && item.cantidad > 1) item.cantidad -= 1;
      nuevoCarrito[index] = item;
      return nuevoCarrito;
    });
  };

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      if (result.success) {
        socketRef.current?.emit("new_order", { items: result.ordenCreada, fecha: new Date() });
        setCarrito([]);
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
    enviarPedido,
    isPending,
    showSuccess,
    setShowSuccess,
    sugerenciasData,
    setSugerenciasData
  };
}