'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { CartButton } from '@/components/cart/cartButton';
import { ProductCard } from '@/components/products/ProductCard'; // Importar Card
import { ProductDetailModal } from '@/components/products/ProductDetailModal'; // Importar Modal

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  
  // Estado para controlar qué producto se está viendo en detalle
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    return () => { socketRef.current?.disconnect(); };
  }, []);

  // Función 1: Agregar rápido (desde la tarjeta pequeña)
  const agregarRapido = (prod: any, e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCarrito((prev) => [
      ...prev, 
      { 
        prod: prod.id_producto, 
        nombre: prod.nombre, 
        price: prod.precio, 
        imagen: prod.imagen,
        cantidad: 1, 
        nota: "",
        aditamentos: [] 
      }
    ]);
  };

  // Función 2: Agregar desde el Modal de Detalle (Recibe el objeto ya armado)
  const agregarDesdeDetalle = (itemArmado: any) => {
    setCarrito((prev) => [...prev, itemArmado]);
    // Opcional: Cerrar modal automáticamente si prefieres
    // setSelectedProduct(null); 
  };

  const removerDelCarrito = (index: number) => {
      setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      if (result.success && result.ordenCreada) {
        socketRef.current?.emit("new_order", {
          items: result.ordenCreada, 
          fecha: new Date().toISOString()
        });
        alert("¡Pedido enviado a cocina!");
        setCarrito([]); 
      }
    });
  };

  return (
    <>
      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-2 gap-4 pb-32">
        {productos.map((prod) => (
          <ProductCard 
            key={prod.id_producto}
            producto={prod}
            onSelect={() => setSelectedProduct(prod)} // Abre el modal
            onQuickAdd={(e) => agregarRapido(prod, e)}
          />
        ))}
      </div>

      {/* MODAL DE DETALLE (Se renderiza solo si hay producto seleccionado) */}
      {selectedProduct && (
        <ProductDetailModal 
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)} // Cierra el modal
          onAddToCart={agregarDesdeDetalle} // Pasa la función lógica
        />
      )}

      {/* BOTÓN FLOTANTE DE CARRITO */}
      <CartButton 
        items={carrito} 
        onRemoveItem={removerDelCarrito}
        onSubmit={enviarPedido} 
        isPending={isPending} 
      />
    </>
  );
}