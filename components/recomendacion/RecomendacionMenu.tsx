"use client";
import { useEffect, useState } from "react";
import { getRecomendacionIA } from "./action";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { CartButton } from "@/components/cart/cartButton"; // IMPORTANTE
import { useCarrito } from "@/hooks/useCarrito";
import { useSearchParams } from "next/navigation";

export default function RecomendacionMenu({ idComanda, esSoloLectura = false }: { idComanda: number; esSoloLectura?: boolean; }) {
  const params = useSearchParams();
  const token = params.get("token");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Extraer todas las funciones necesarias del Hook
  const {
    carrito,
    agregarAlCarritoBase,
    agregarRapido,
    actualizarCantidad,
    enviarPedido,
    eliminarProducto
  } = useCarrito(idComanda, token, esSoloLectura);

  useEffect(() => {
    getRecomendacionIA().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando menú inteligente...</div>;

  return (
    <div className="space-y-12 pb-40">
      <section className="space-y-6 px-4">
        <h2 className="text-2xl font-black flex items-center gap-2">Recomendado por IA</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data?.recomendaciones?.flatMap((c: any) => c.productos).map((prod: any) => (
            <ProductCard
              key={prod.id_producto}
              producto={prod}
              onSelect={() => setSelectedProduct(prod)}
              onQuickAdd={(e) => !esSoloLectura && agregarRapido(prod, )}
              mostrarBotonAdd={!esSoloLectura}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN VARIADA */}
      {data?.menuVariado?.length > 0 && (
        <section className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mx-4">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">Descubre algo nuevo</h2>
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

    

      {selectedProduct && (
        <ProductDetailModal
  producto={selectedProduct}
  esSoloLectura={esSoloLectura}
  onClose={() => setSelectedProduct(null)}
  onAddToCart={(item) => {
    // Forzamos que el objeto tenga la estructura que el carrito espera
    const itemFormateado = {
      ...item,
      prod: item.prod || item.id_producto // Aseguramos que use 'prod' como clave de ID
    };
    agregarAlCarritoBase(itemFormateado);
    setSelectedProduct(null);
  }}
/>
      )}
    </div>
  );
}