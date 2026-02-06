'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { CartButton } from '@/components/cart/cartButton';
import { ProductCard } from '@/components/products/ProductCard'; 
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { OrderSuccessModal } from '@/components/ui/OrderSuccessModal'; // <--- 1. IMPORTAR

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  
  // 2. NUEVO ESTADO PARA EL MODAL DE ÉXITO
  const [showSuccess, setShowSuccess] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    return () => { socketRef.current?.disconnect(); };
  }, []);

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

  const agregarDesdeDetalle = (itemArmado: any) => {
    setCarrito((prev) => [...prev, itemArmado]);
  };

  const removerDelCarrito = (index: number) => {
      setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      
      if (result.success && result.ordenCreada) {
        // Emitir socket
        socketRef.current?.emit("new_order", {
          items: result.ordenCreada, 
          fecha: new Date().toISOString()
        });

        // 3. CAMBIO: En lugar de alert, mostramos el modal y limpiamos
        setCarrito([]); // Limpiamos el carrito inmediatamente
        setShowSuccess(true); // Mostramos la animación
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
            onSelect={() => setSelectedProduct(prod)}
            onQuickAdd={(e) => agregarRapido(prod, e)}
          />
        ))}
      </div>

      {/* MODAL DE DETALLE DEL PRODUCTO */}
      {selectedProduct && (
        <ProductDetailModal 
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={agregarDesdeDetalle}
        />
      )}

      {/* 4. MODAL DE ÉXITO (Se muestra si showSuccess es true) */}
      {showSuccess && (
        <OrderSuccessModal onClose={() => setShowSuccess(false)} />
      )}

      {/* BOTÓN FLOTANTE DE CARRITO */}
      {/* Nota: Al limpiar el carrito en enviarPedido, el botón se actualizará a estado vacío automáticamente */}
      <CartButton 
        items={carrito} 
        onRemoveItem={removerDelCarrito}
        onSubmit={enviarPedido} 
        isPending={isPending} 
      />
    </>
  );
}