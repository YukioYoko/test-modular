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

  if (loading) return <div className="p-4 animate-pulse">Generando menús inteligentes...</div>;
  if (!data || !data.menus) return null;

  return (
    <div className="space-y-12 pb-10">
      {data.menus.map((menu: any, idx: number) => (
        <section key={idx} className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-orange-500">◈</span> {menu.titulo}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menu.productos.map((prod: any) => (
              <ProductCard 
                key={prod.id_producto} 
                producto={prod} 
                onSelect={() => {}} // Obligatorio por TS
                onQuickAdd={() => {}} // Obligatorio por TS
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}