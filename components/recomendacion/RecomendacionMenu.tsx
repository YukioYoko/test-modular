"use client";
import { useEffect, useState } from "react";
import { getRecomendacionIA } from "./action";
import { ProductCard } from "@/components/products/ProductCard";

export default function RecomendacionMenu() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecomendacionIA().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-100 rounded-2xl w-64" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-[2.2rem]" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-12 pb-10">

      {/* ─── Sección 1: Recomendado para ti (top por categoría) ─── */}
      {data.recomendaciones?.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2 px-6">
            <span className="text-orange-500">◈</span> Recomendado para ti
          </h2>

          {data.recomendaciones.map((cat: any, idx: number) => (
            <div key={idx} className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                {cat.categoria}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cat.productos.map((prod: any) => (
                  <ProductCard
                    key={prod.id_producto}
                    producto={prod}
                    onSelect={() => {}}
                    onQuickAdd={() => {}}
                    mostrarBotonAdd={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ─── Sección 2: Descubre algo nuevo (menú variado) ─── */}
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
                onSelect={() => {}}
                onQuickAdd={() => {}}
                mostrarBotonAdd={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}