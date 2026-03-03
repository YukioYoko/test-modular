"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartButton } from "@/components/cart/cartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { OrderSuccessModal } from "@/components/ui/OrderSuccessModal";
import { AprioriModal } from "@/components/products/SugerenciaApriori";
import { useCarrito } from "@/hooks/useCarrito"; // Importamos el Hook basado en Cookies

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

 
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Usamos el Hook centralizado. Toda la lógica de Carrito, Cookies, 
  // Socket.io y Apriori ya vive dentro de useCarrito.
  const {
    carrito,
    setCarrito,
    agregarAlCarritoBase,
    agregarRapido,
    actualizarCantidad,
    enviarPedido,
    eliminarProducto,
    isPending,
    showSuccess,
    setShowSuccess,
    sugerenciasData,
    setSugerenciasData
  } = useCarrito(idComanda, token, esSoloLectura);

  return (
    <>
      {/* Grid de productos: Espaciado dinámico si el carrito es visible */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${esSoloLectura ? 'pb-10' : 'pb-32'}`}>
        {productos.map((prod) => (
          <ProductCard
            key={prod.id_producto}
            producto={prod}
            onSelect={() => setSelectedProduct(prod)}
            onQuickAdd={(e) => !esSoloLectura && agregarRapido(prod, e)}
            mostrarBotonAdd={!esSoloLectura} 
          />
        ))}
      </div>

      {/* MODAL DE DETALLE */}
      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          // Pasamos el modo lectura al modal para que esconda el botón "Agregar"
          esSoloLectura={esSoloLectura} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(itemArmado) => {
            // Se sincroniza automáticamente con Cookies y estado local
            agregarAlCarritoBase(itemArmado);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* COMPONENTES TRANSACCIONALES (Solo si no es lectura) */}
      {!esSoloLectura && (
        <>
          {/* Modal de sugerencias Apriori (Sincronizado con Cookies) */}
          {sugerenciasData && (
            <AprioriModal 
              productoBaseNombre={sugerenciasData.nombre}
              sugerencias={sugerenciasData.productos}
              onAdd={(p: any) => {
                agregarAlCarritoBase({ 
                  prod: p.id_producto, 
                  nombre: p.nombre, 
                  price: p.precio, 
                  imagen: p.imagenUrl, 
                  cantidad: 1, 
                  aditamentos: [], 
                  nota: ""
                });
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

          {/* Botón flotante del carrito (Lee el estado sincronizado) */}
          <CartButton
            items={carrito}
            onRemoveItem={eliminarProducto}
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