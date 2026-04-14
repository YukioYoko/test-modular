"use client";
import { useEffect, useState } from "react";
import { getRecomendacionIA } from "./action";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { useCarrito } from "@/hooks/useCarrito";
import { useSearchParams } from "next/navigation";

export default function RecomendacionMenu({
  idComanda,
  esSoloLectura = false,
}: {
  idComanda: number;
  esSoloLectura?: boolean;
}) {
  const params = useSearchParams();
  const token = params.get("token");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Opciones para probar el modelo de IA
  const opcionesTest = [
    { name: "Contexto Real", params: "" },
    {
      name: "2pm / Soleado",
      params: "test_hour=14&test_clima=0&test_dia=0&top_n=3",
    },
    {
      name: "4pm / Nublado",
      params: "test_hour=16&test_clima=1&test_dia=0&top_n=3",
    },
    {
      name: "8pm / Lluvia",
      params: "test_hour=20&test_clima=2&test_dia=0&top_n=3",
    },
  ];

  const { agregarAlCarritoBase, agregarRapido } = useCarrito(
    idComanda,
    token,
    esSoloLectura,
  );

  // Función para cargar los datos (reutilizable)
  const cargarMenu = async (queryStr: string = "") => {
    setLoading(true);
    try {
      const res = await getRecomendacionIA(queryStr);
      setData(res);
    } catch (error) {
      console.error("Error cargando IA:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    cargarMenu();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse font-black uppercase text-xs tracking-widest text-slate-400">
        Generando menú inteligente...
      </div>
    );

  return (
    <div className="space-y-12 pb-40">
      {/* ─── SELECTOR DE CONTEXTO (PARA TESIS/DEMO) ─── */}
      <section className="px-4 py-6 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-inner space-y-5">
        {/* Título de sección decorativo */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200"></div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
            Panel de Simulación (Tesis)
          </h3>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {opcionesTest.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => cargarMenu(opt.params)}
              className="
          px-6 py-2.5 
          bg-orange-500 
          text-white 
          rounded-full 
          text-xs font-extrabold uppercase tracking-wider
          shadow-md shadow-orange-500/20 
          hover:bg-orange-600 
          hover:shadow-lg hover:shadow-orange-600/30 
          hover:-translate-y-0.5
          active:translate-y-0 active:shadow-md
          transition-all duration-200 ease-in-out
          flex items-center gap-2
        "
            >
              {opt.params === "" && <span className="text-sm">🌐</span>}
              {opt.name}
            </button>
          ))}
        </div>
      </section>

      {/* ─── RECOMENDACIONES POR CATEGORÍA ─── */}
      <section className="space-y-8 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black flex items-center gap-2 italic uppercase tracking-tighter text-slate-800">
            <span className="text-orange-500">◈</span> Recomendado por IA
          </h2>
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-500 uppercase">
            Cluster: {data?.contexto?.cluster}
          </span>
        </div>

        {data?.recomendaciones &&
          Object.values(data.recomendaciones).map((cat: any, idx: number) => (
            <div
              key={idx}
              className="space-y-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100"
            >
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
              prod: item.prod || item.id_producto,
            };
            agregarAlCarritoBase(itemFormateado);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
