"use client";
import { useEffect, useState } from "react";
import { getRecomendacionIA } from "./action";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { CartButton } from "@/components/cart/cartButton";
import { OrderSuccessModal } from "@/components/ui/OrderSuccessModal";
import { AprioriModal } from "@/components/products/SugerenciaApriori";
import { useCarrito } from "@/hooks/useCarrito"; // Importamos tu nuevo Hook
import { useSearchParams } from "next/navigation";

export default function RecomendacionMenu({ 
  idComanda, 
  esSoloLectura = false 
}: { 
  idComanda: number; 
  esSoloLectura?: boolean; 
}) {
  const params = useSearchParams();
  const token = params.get("token");
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Usamos el Hook para traer toda la funcionalidad del carrito
  const {
    carrito, setCarrito, agregarAlCarritoBase, agregarRapido, 
    actualizarCantidad, enviarPedido, isPending, 
    showSuccess, setShowSuccess, sugerenciasData, setSugerenciasData
  } = useCarrito(idComanda, token, esSoloLectura);

  useEffect(() => {
    getRecomendacionIA().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando sugerencias de la IA...</div>;
  if (!data) return null;

  return (
    <div className="space-y-12 pb-40">
      {/* ─── Recomendaciones Contextuales (K-Means) ─── */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black px-6 flex items-center gap-2">
          <span className="text-orange-500">◈</span> Recomendado para ti
        </h2>

        {data.recomendaciones.map((cat: any, idx: number) => (
          <div key={idx} className="p-6 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 mx-4">
            <h3 className="text-lg font-bold mb-4">{cat.categoria}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cat.productos.map((prod: any) => (
                <ProductCard
                  key={prod.id_producto}
                  producto={prod}
                  onSelect={() => setSelectedProduct(prod)}
                  onQuickAdd={(e) => !esSoloLectura && agregarRapido(prod, e)}
                  mostrarBotonAdd={!esSoloLectura}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

         {data.menuVariado?.length > 0 && (
        <section className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-orange-500">◈</span> Descubre algo nuevo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.menuVariado.map((prod: any) => (
              <ProductCard
                key={prod.id_producto}
                  producto={prod}
                  onSelect={() => setSelectedProduct(prod)}
                  onQuickAdd={(e) => !esSoloLectura && agregarRapido(prod, e)}
                  mostrarBotonAdd={!esSoloLectura}
              />
            ))}
          </div>
        </section>
      )}


      {/* ─── Modales y Componentes de Carrito ─── */}
      {!esSoloLectura && (
        <>
          <CartButton
            items={carrito}
            onUpdateQuantity={actualizarCantidad}
            onRemoveItem={(i) => setCarrito(c => c.filter((_, idx) => idx !== i))}
            onSubmit={enviarPedido}
            isPending={isPending}
          />

          {sugerenciasData && (
            <AprioriModal 
              productoBaseNombre={sugerenciasData.nombre}
              sugerencias={sugerenciasData.productos}
              onAdd={(p: any) => agregarAlCarritoBase({ prod: p.id_producto, nombre: p.nombre, price: p.precio, imagen: p.imagenUrl, cantidad: 1, aditamentos: [], nota: ""})}
              onSelectProduct={(prod: any) => { setSugerenciasData(null); setSelectedProduct(prod); }}
              onClose={() => setSugerenciasData(null)}
            />
          )}

          {showSuccess && <OrderSuccessModal onClose={() => setShowSuccess(false)} />}
        </>
      )}

      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          esSoloLectura={esSoloLectura}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(item) => { agregarAlCarritoBase(item); setSelectedProduct(null); }}
        />
      )}
    </div>
  );
}