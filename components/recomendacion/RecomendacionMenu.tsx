"use client";
import { useEffect, useState } from "react";
import { getRecomendacionIA } from "./action";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { useCarrito } from "@/hooks/useCarrito";
import { useSearchParams } from "next/navigation";

export default function RecomendacionMenu({ idComanda, esSoloLectura = false }: { idComanda: number; esSoloLectura?: boolean; }) {
  const params = useSearchParams();
  const token = params.get("token");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const {
    agregarAlCarritoBase,
    agregarRapido,
  } = useCarrito(idComanda, token, esSoloLectura);

  useEffect(() => {
    getRecomendacionIA().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse font-black uppercase text-xs tracking-widest text-slate-400">Generando menú inteligente...</div>;

  return (
    <div className="space-y-12 pb-40">
      {/* ─── RECOMENDACIONES POR CATEGORÍA ─── */}
      <section className="space-y-8 px-4">
        <h2 className="text-2xl font-black flex items-center gap-2 italic uppercase tracking-tighter text-(--militar-green)">
          <span className="text-orange-500">◈</span> Recomendado por IA
        </h2>

        {/* Mapeamos cada categoría de la IA */}
        {data?.recomendaciones?.map((cat: any, idx: number) => (
          <div key={idx} className="space-y-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            {/* Título de la Categoría */}
            <h3 className="text-base font-black text-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50 pb-2">
              {cat.categoria}
            </h3>
            
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

      {/* ─── SECCIÓN VARIADA ─── */}
      {data?.menuVariado?.length > 0 && (
        <section className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mx-4 space-y-6">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2 italic uppercase tracking-tighter">
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

      {selectedProduct && (
        <ProductDetailModal
          producto={selectedProduct}
          esSoloLectura={esSoloLectura}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(item) => {
            const itemFormateado = {
              ...item,
              prod: item.prod || item.id_producto
            };
            agregarAlCarritoBase(itemFormateado);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}