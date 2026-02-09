'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { useSearchParams } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { CartButton } from '@/components/cart/cartButton';
import { ProductCard } from '@/components/products/ProductCard'; 
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { OrderSuccessModal } from '@/components/ui/OrderSuccessModal';
import { AprioriModal } from '@/components/products/SugerenciaApriori';
import { getSugerenciasApriori } from '@/components/products/action';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  
  const [carrito, setCarrito] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sugerenciasData, setSugerenciasData] = useState<{nombre: string, productos: any[]} | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });
    return () => { socketRef.current?.disconnect(); };
  }, []);

  const agregarAlCarritoBase = (item: any) => {
    setCarrito((prev) => [...prev, item]);
  };

  const agregarRapido = async (prod: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    
    const nuevoItem = { 
      prod: prod.id_producto, 
      nombre: prod.nombre, 
      price: prod.precio, 
      imagen: prod.imagen,
      cantidad: 1, 
      nota: "",
      aditamentos: [] 
    };
    
    agregarAlCarritoBase(nuevoItem);

    // Disparar Apriori
    const recomendados = await getSugerenciasApriori(prod.id_producto);
    if (recomendados && recomendados.length > 0) {
      setSugerenciasData({
        nombre: prod.nombre,
        productos: recomendados
      });
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
          onAddToCart={(item) => {
            agregarAlCarritoBase(item);
            setSelectedProduct(null);
            // También disparamos sugerencias al cerrar el detalle
            getSugerenciasApriori(item.prod).then(res => {
                if(res.length > 0) setSugerenciasData({ nombre: item.nombre, productos: res });
            });
          }}
        />
      )}

      {sugerenciasData && (
        <AprioriModal 
            productoBaseNombre={sugerenciasData.nombre}
            sugerencias={sugerenciasData.productos}
            onAdd={(p: any) => {
                agregarAlCarritoBase({ prod: p.id_producto, nombre: p.nombre, price: p.precio, cantidad: 1, aditamentos: [], nota: "" });
            }}
            onClose={() => setSugerenciasData(null)}
        />
      )}

      {showSuccess && <OrderSuccessModal onClose={() => setShowSuccess(false)} />}

      <CartButton items={carrito} onRemoveItem={(i) => setCarrito(c => c.filter((_, idx) => idx !== i))} onSubmit={enviarPedido} isPending={isPending} />
    </>
  );
}