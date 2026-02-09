'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { getSugerenciasApriori } from './apriori'; // <-- Importar la nueva acción
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { CartButton } from '@/components/cart/cartButton';
import { ProductCard } from '@/components/products/ProductCard'; 
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { OrderSuccessModal } from '@/components/ui/OrderSuccessModal';
import { AprioriModal } from '@/components/products/SugerenciaApriori'; // <-- Nuevo Componente

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  
  // ESTADOS
  const [carrito, setCarrito] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Estado para las sugerencias de Minería de Datos (Apriori)
  const [sugerenciasData, setSugerenciasData] = useState<{nombre: string, productos: any[]} | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    return () => { socketRef.current?.disconnect(); };
  }, []);

  // AGREGAR RÁPIDO + LÓGICA APRIORI
  const agregarRapido = async (prod: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    
    // 1. Agregar al carrito inmediatamente
    const nuevoItem = { 
      prod: prod.id_producto, 
      nombre: prod.nombre, 
      price: prod.precio, 
      imagen: prod.imagen,
      cantidad: 1, 
      nota: "",
      aditamentos: [] 
    };
    
    setCarrito((prev) => [...prev, nuevoItem]);

    // 2. Ejecutar Minería de Datos: ¿Qué suelen llevar con esto?
    // Solo buscamos sugerencias si NO estamos añadiendo una sugerencia (para evitar bucles)
    if (!sugerenciasData) {
        const recomendados = await getSugerenciasApriori(prod.id_producto);
        if (recomendados && recomendados.length > 0) {
          setSugerenciasData({
            nombre: prod.nombre,
            productos: recomendados
          });
        }
    }
  };

  const agregarDesdeDetalle = (itemArmado: any) => {
    setCarrito((prev) => [...prev, itemArmado]);
    setSelectedProduct(null);
    // Opcional: También podrías disparar Apriori aquí
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

        setCarrito([]); 
        setShowSuccess(true); 
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

      {/* MODAL APRIORI (MINERÍA DE DATOS) */}
      {sugerenciasData && (
        <AprioriModal 
            productoBaseNombre={sugerenciasData.nombre}
            sugerencias={sugerenciasData.productos}
            onAdd={(prod: any) => agregarRapido(prod)} // Permite encadenar ventas
            onClose={() => setSugerenciasData(null)}
        />
      )}

      {/* MODAL DE ÉXITO */}
      {showSuccess && (
        <OrderSuccessModal onClose={() => setShowSuccess(false)} />
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