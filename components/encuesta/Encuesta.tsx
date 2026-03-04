"use client";
import { useState } from "react";
import { guardarEncuestaIA } from "./action";
import Link from 'next/link';

const CATEGORIAS_IA = [
  { id: "entradas", label: "Entradas", icon: "🥗" },
  { id: "fuertes", label: "Platos Fuertes", icon: "🍝" },
  { id: "postres", label: "Postres", icon: "🍰" },
  { id: "bebidas", label: "Bebidas", icon: "🍹" },
];

export const  SeccionEncuesta = ({ idComanda }: { idComanda: number }) => {
  const [enviado, setEnviado] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [recomendacionApp, setRecomendacionApp] = useState(0);
  const [comentarios, setComentarios] = useState("");

  const renderEstrellas = (actual: number, onSelect: (v: number) => void) => (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`text-2xl transition-all ${actual >= s ? "scale-110 grayscale-0" : "grayscale opacity-20"}`}
        >
          ⭐
        </button>
      ))}
    </div>
  );

  const enviar = async () => {
    const res = await guardarEncuestaIA({ idComanda, scores, recomendacionApp, comentarios, funcional: true });
    if (res.success) setEnviado(true);
  };

  if (enviado) return (
    <div className="p-8 bg-white rounded-[3rem] text-center shadow-xl border border-green-100">
      <p className="text-green-600 font-black uppercase tracking-tighter text-xl">¡Feedback recibido!</p>
      <p className="text-slate-400 text-xs font-bold mt-2">Tus respuestas ayudarán a mejorar mi IA.</p>
    </div>
  );

  return (
    <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-50/50 rounded-[3rem] p-8 border border-slate-100 shadow-inner">
        <h3 className="text-center font-black text-slate-400 uppercase text-[10px] tracking-[0.3em] mb-8">
          ¿Qué te parecieron las recomendaciones?
        </h3>

        {/* Mapeo de categorías */}
        <div className="space-y-6">
          {CATEGORIAS_IA.map((cat) => (
            <div key={cat.id} className="bg-white p-4 rounded-3xl shadow-sm">
              <p className="text-center text-[10px] font-black text-slate-500 uppercase mb-2 flex items-center justify-center gap-2">
                <span>{cat.icon}</span> {cat.label}
              </p>
              {renderEstrellas(scores[cat.id] || 0, (v) => setScores({ ...scores, [cat.id]: v }))}
            </div>
          ))}
        </div>

        {/* Recomendación General */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <p className="text-center text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">
            ¿Qué tanto recomendarías la App?
          </p>
          {renderEstrellas(recomendacionApp, setRecomendacionApp)}
        </div>

        {/* Comentarios */}
        <textarea
          placeholder="COMENTARIOS ADICIONALES (OPCIONAL)..."
          className="w-full mt-8 bg-white rounded-2xl p-4 text-[10px] font-black uppercase border-none focus:ring-2 focus:ring-green-400 min-h-[100px]"
          onChange={(e) => setComentarios(e.target.value)}
        />

        <button
          onClick={enviar}
          disabled={Object.keys(scores).length === 0 || recomendacionApp === 0}
          className="w-full mt-6 py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-20 transition-all hover:brightness-110"
        >
          Finalizar y Enviar
        </button>


          {enviado && (
 <Link 
            href="/menuPrueba" 
            
            className="block w-full py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.02] transition-all"
          >
            Hacer otra prueba
          </Link> 
          )}
       
      </div>
    </div>
  );
}