"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import { sendOrder } from "./action";
import { useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { CartButton } from "@/components/cart/cartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { OrderSuccessModal } from "@/components/ui/OrderSuccessModal";
import { AprioriModal } from "@/components/products/SugerenciaApriori";
import { getSugerenciasApriori } from "@/components/products/action";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({
  productos,
  idComanda,
  esSoloLectura = false
}: {
  productos: any[];
  idComanda: number;
  esSoloLectura?: boolean;
}) {
  const params = useSearchParams();
  const token = params.get("token");
  const [isPending, startTransition] = useTransition();

  const [carrito, setCarrito] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[]; } | null>(null);

  const socketRef = useRef<Socket | null>(null);

  // Solo inicializamos el socket si el usuario puede realizar pedidos
  useEffect(() => {
    if (!esSoloLectura) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      return () => { socketRef.current?.disconnect(); };
    }
  }, [esSoloLectura]);

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

  const actualizarCantidad = (index: number, action: "add" | "remove") => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      
      // Creamos una COPIA del objeto para no mutar la referencia original
      const item = { ...nuevoCarrito[index] };

      if (action === "add") {
        item.cantidad += 1;
      } else if (action === "remove" && item.cantidad > 1) {
        item.cantidad -= 1;
      }

      // Reemplazamos el item en el nuevo array con la copia modificada
      nuevoCarrito[index] = item;

      return nuevoCarrito;
    });
  };

  
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
    const recomendados = await getSugerenciasApriori(prod.id_producto);
    if (recomendados?.length > 0) {
      setSugerenciasData({ nombre: prod.nombre, productos: recomendados });
    }
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

  return (
    <>
      {/* Grid de productos: Ajustamos el padding inferior dependiendo de si hay carrito o no */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${esSoloLectura ? 'pb-10' : 'pb-32'}`}>
        {productos.map((prod) => (
          <ProductCard
            key={prod.id_producto}
            producto={prod}
            // Permitimos abrir el modal siempre (modo lectura o escritura)
            onSelect={() => setSelectedProduct(prod)}
            // Bloqueamos el botón rápido si es solo lectura
            onQuickAdd={(e) => !esSoloLectura && agregarRapido(prod, e)}
            mostrarBotonAdd={!esSoloLectura} 
          />
        ))}
      </div>

      {/* MODAL DE DETALLE: Visible para todos, pero con lógica interna de bloqueo */}
      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          esSoloLectura={esSoloLectura}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={async (itemArmado) => {
            // Esta función solo se ejecuta si el usuario NO está en modo lectura
            agregarAlCarritoBase(itemArmado);
            setSelectedProduct(null);
            setTimeout(async () => {
              const recomendados = await getSugerenciasApriori(itemArmado.prod);
              if (recomendados?.length > 0) {
                setSugerenciasData({ nombre: itemArmado.nombre, productos: recomendados });
              }
            }, 150);
          }}
        />
      )}

      {/* COMPONENTES TRANSACCIONALES: Solo se renderizan si el usuario puede pedir */}
      {!esSoloLectura && (
        <>
          {sugerenciasData && (
            <AprioriModal 
              productoBaseNombre={sugerenciasData.nombre}
              sugerencias={sugerenciasData.productos}
              onAdd={(p: any) => {
                setCarrito(prev => [...prev, { prod: p.id_producto, nombre: p.nombre, price: p.precio, imagen: p.imagenUrl, cantidad: 1, aditamentos: [], nota: ""}]);
              }}
              onSelectProduct={(prod: any) => {
                setSugerenciasData(null);
                setSelectedProduct(prod);
              }}
              onClose={() => setSugerenciasData(null)}
            />
          )}

          {showSuccess && <OrderSuccessModal onClose={() => setShowSuccess(false)} />}

          <CartButton
            items={carrito}
            onRemoveItem={(i) => setCarrito((c) => c.filter((_, idx) => idx !== i))}
            onUpdateQuantity={actualizarCantidad}
            onSubmit={enviarPedido}
            isPending={isPending}
          />
        </>
      )}
    </>
  );
}
