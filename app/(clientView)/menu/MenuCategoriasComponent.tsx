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
}: {
  productos: any[];
  idComanda: number;
}) {
  const params = useSearchParams();
  const token = params.get("token");
  const [isPending, startTransition] = useTransition();

  const [carrito, setCarrito] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{
    nombre: string;
    productos: any[];
  } | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
  const actualizarCantidad = (index: number, action: "add" | "remove") => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      const item = nuevoCarrito[index];

      if (action === "add") {
        item.cantidad += 1;
      } else if (action === "remove" && item.cantidad > 1) {
        item.cantidad -= 1;
      }

      return nuevoCarrito;
    });
  };

  const agregarAlCarritoBase = (item: any) => {
    setCarrito((prevCarrito) => {
      // 1. Buscamos si ya existe el producto con los mismos detalles
      const index = prevCarrito.findIndex(
        (it) =>
          it.prod === item.prod &&
          it.nota === item.nota &&
          // Comparamos los aditamentos convirtiéndolos a string (asumiendo que son IDs numéricos)
          JSON.stringify(it.aditamentos.sort()) ===
            JSON.stringify(item.aditamentos.sort()),
      );

      if (index !== -1) {
        // 2. Si existe, creamos un nuevo array y una copia del objeto modificado
        const nuevoCarrito = [...prevCarrito];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: nuevoCarrito[index].cantidad + 1,
        };
        return nuevoCarrito;
      }

      // 3. Si no existe, simplemente añadimos el nuevo item
      return [...prevCarrito, item];
    });
  };

  const agregarRapido = async (prod: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const nuevoItem = {
      prod: prod.id_producto,
      nombre: prod.nombre,
      price: prod.precio,
      imagen: prod.imagenUrl, // Corregido: Usar la URL procesada en el server
      cantidad: 1,
      nota: "",
      aditamentos: [],
    };

    agregarAlCarritoBase(nuevoItem);

    const recomendados = await getSugerenciasApriori(prod.id_producto);
    if (recomendados && recomendados.length > 0) {
      setSugerenciasData({
        nombre: prod.nombre,
        productos: recomendados,
      });
    }
  };

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      if (result.success) {
        socketRef.current?.emit("new_order", {
          items: result.ordenCreada,
          fecha: new Date(),
        });
        setCarrito([]);
        setShowSuccess(true);
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pb-32">
        {productos.map((prod) => (
          <ProductCard
            key={prod.id_producto}
            producto={prod}
            onSelect={() => setSelectedProduct(prod)}
            onQuickAdd={(e) => agregarRapido(prod, e)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={async (itemArmado) => {
            // USA LA FUNCIÓN QUE CORREGIMOS ARRIBA
            agregarAlCarritoBase(itemArmado);
            setSelectedProduct(null);
            setTimeout(async () => {
              const recomendados = await getSugerenciasApriori(itemArmado.prod);
              if (recomendados && recomendados.length > 0) {
                setSugerenciasData({
                  nombre: itemArmado.nombre,
                  productos: recomendados,
                });
              }
            }, 150);
          }}
        />
      )}

      {sugerenciasData && (
        <AprioriModal
          productoBaseNombre={sugerenciasData.nombre}
          sugerencias={sugerenciasData.productos}
          onAdd={(p: any) => {
            setCarrito((prev) => [
              ...prev,
              {
                prod: p.id_producto,
                nombre: p.nombre,
                price: p.precio,
                cantidad: 1,
                aditamentos: [],
                nota: "",
              },
            ]);
          }}
          onClose={() => setSugerenciasData(null)}
        />
      )}

      {showSuccess && (
        <OrderSuccessModal onClose={() => setShowSuccess(false)} />
      )}

      <CartButton
        items={carrito}
        onRemoveItem={(i) => setCarrito((c) => c.filter((_, idx) => idx !== i))}
        onUpdateQuantity={actualizarCantidad} // <-- PASAR LA FUNCIÓN AQUÍ
        onSubmit={enviarPedido}
        isPending={isPending}
      />
    </>
  );
}
