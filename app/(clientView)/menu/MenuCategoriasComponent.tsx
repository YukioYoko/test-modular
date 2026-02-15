"use client";
import { useState, useTransition, useEffect, useRef } from "react";
import { sendOrder } from "./action";
import { useSearchParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { CartButton } from "@/components/cart/cartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { OrderSuccessModal } from "@/components/ui/OrderSuccessModal";
import { AprioriModal } from "@/components/products/SugerenciaApriori";
import { getSugerenciasApriori } from "@/components/products/action";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({
  productos,
  idComanda,
  esSoloLectura = false
}: {
  productos: any[];
  idComanda: number;
  esSoloLectura?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [isPending, startTransition] = useTransition();

  // Estados
  const [carrito, setCarrito] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{ nombre: string; productos: any[]; } | null>(null);

  const socketRef = useRef<Socket | null>(null);

  // 1. Conexión al Socket (Solo si NO es solo lectura)
  useEffect(() => {
    if (!esSoloLectura) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      
      socketRef.current.on("connect", () => {
        console.log("✅ Conectado al socket");
      });

      return () => { 
        socketRef.current?.disconnect(); 
      };
    }
  }, [esSoloLectura]);

  // 2. Lógica del Carrito
  const actualizarCantidad = (index: number, action: "add" | "remove") => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      const item = { ...nuevoCarrito[index] };
      
      if (action === "add") {
        item.cantidad += 1;
      } else if (action === "remove") {
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          // Si es 1 y bajamos, podríamos querer borrarlo o dejarlo en 1. 
          // Aquí lo dejamos en 1, el botón de borrar es aparte.
          return prev; 
        }
      }
      nuevoCarrito[index] = item;
      return nuevoCarrito;
    });
  };

  const agregarAlCarritoBase = (item: any) => {
    setCarrito((prevCarrito) => {
      // Buscamos si ya existe un producto igual (mismo ID, misma nota y mismos aditamentos)
      const index = prevCarrito.findIndex(it => 
        it.prod === item.prod && 
        it.nota === item.nota && 
        // Comparamos arrays de aditamentos ordenados para asegurar igualdad
        JSON.stringify([...(it.aditamentos || [])].sort()) === JSON.stringify([...(item.aditamentos || [])].sort())
      );

      if (index !== -1) {
        // Si existe, aumentamos cantidad
        return prevCarrito.map((it, i) => i === index ? { ...it, cantidad: it.cantidad + item.cantidad } : it);
      }
      // Si no existe, lo agregamos
      return [...prevCarrito, item];
    });
  };

  // 3. Manejadores de Agregar (Rápido y Detalle)
  const handleAgregarRapido = async (prod: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const nuevoItem = {
      prod: prod.id_producto,
      nombre: prod.nombre,
      price: prod.precio,
      imagen: prod.imagenUrl || prod.imagen, // Soporte para ambas propiedades si varían
      cantidad: 1,
      nota: "",
      aditamentos: [],
    };

    agregarAlCarritoBase(nuevoItem);

    // Buscar sugerencias Apriori
    try {
      const recomendados = await getSugerenciasApriori(prod.id_producto);
      if (recomendados && recomendados.length > 0) {
        setSugerenciasData({ nombre: prod.nombre, productos: recomendados });
      }
    } catch (error) {
      console.error("Error obteniendo sugerencias:", error);
    }
  };

  const handleAgregarDesdeDetalle = async (itemArmado: any) => {
    agregarAlCarritoBase(itemArmado);
    setSelectedProduct(null); // Cerramos el modal de detalle

    // Pequeño delay para que la transición del modal sea suave antes de mostrar sugerencias
    setTimeout(async () => {
      try {
        const recomendados = await getSugerenciasApriori(itemArmado.prod);
        if (recomendados && recomendados.length > 0) {
          setSugerenciasData({ nombre: itemArmado.nombre, productos: recomendados });
        }
      } catch (error) {
        console.error("Error obteniendo sugerencias:", error);
      }
    }, 300);
  };

  // 4. Enviar Pedido
  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      
      if (result.success && result.ordenCreada) {
        // Emitir al socket
        socketRef.current?.emit("new_order", { 
          items: result.ordenCreada, 
          fecha: new Date().toISOString() 
        });

        setCarrito([]);
        setShowSuccess(true);

        // Redirección a la cuenta después de 2.5s
        setTimeout(() => {
           router.push(`/cuenta?comanda=${idComanda}&token=${token}`);
        }, 2500);
      }
    });
  };

  return (
    <>
      {/* GRID DE PRODUCTOS */}
      {/* Ajustamos padding-bottom: Si es lectura (no hay carrito flotante), menos padding */}
      <div className={`grid grid-cols-2 gap-4 ${esSoloLectura ? 'pb-10' : 'pb-32'}`}>
        {productos.map((prod) => (
          <ProductCard
            key={prod.id_producto}
            producto={prod}
            // Siempre permitimos ver el detalle
            onSelect={() => setSelectedProduct(prod)}
            // Solo permitimos agregar rápido si NO es solo lectura
            onQuickAdd={(e) => !esSoloLectura && handleAgregarRapido(prod, e)}
            // Prop para ocultar visualmente el botón + si es necesario en ProductCard
            mostrarBotonAdd={!esSoloLectura} 
          />
        ))}
      </div>

      {/* MODAL DE DETALLE DEL PRODUCTO */}
      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          // Pasamos el modo lectura al modal para que esconda el botón "Agregar"
          esSoloLectura={esSoloLectura} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAgregarDesdeDetalle}
        />
      )}

      {/* COMPONENTES TRANSACCIONALES (Solo renderizar si NO es solo lectura) */}
      {!esSoloLectura && (
        <>
          {/* Modal de Sugerencias (Upselling) */}
          {sugerenciasData && (
            <AprioriModal 
              productoBaseNombre={sugerenciasData.nombre}
              sugerencias={sugerenciasData.productos}
              onAdd={(p: any) => {
                // Agregar sugerencia al carrito
                const itemSugerido = { 
                  prod: p.id_producto, 
                  nombre: p.nombre, 
                  price: p.precio, 
                  imagen: p.imagenUrl || p.imagen, 
                  cantidad: 1, 
                  aditamentos: [], 
                  nota: ""
                };
                agregarAlCarritoBase(itemSugerido);
              }}
              onSelectProduct={(prod: any) => {
                // Si quieren ver detalle de la sugerencia
                setSugerenciasData(null);
                setSelectedProduct(prod);
              }}
              onClose={() => setSugerenciasData(null)}
            />
          )}

          {/* Modal de Éxito */}
          {showSuccess && (
             <OrderSuccessModal onClose={() => setShowSuccess(false)} />
          )}

          {/* Botón Flotante del Carrito */}
          <CartButton
            items={carrito}
            onRemoveItem={(i) => setCarrito((c) => c.filter((_, idx) => idx !== i))}
            onUpdateQuantity={actualizarCantidad}
            onSubmit={enviarPedido}
            isPending={isPending}
            idComanda={idComanda}
            token={token}
          />
        </>
      )}
    </>
  );
}