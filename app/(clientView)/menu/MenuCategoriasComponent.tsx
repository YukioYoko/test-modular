'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";

// 1. URL de tu servidor en Railway (usa una variable de entorno en Vercel)
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuCategoriasComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  
  // 2. Referencia para mantener el socket activo sin reconectar en cada render
  const socketRef = useRef<Socket | null>(null);

  // EFECTO: Conexión única al montar el componente
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Cliente conectado al Socket de Foodlify");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const [notasTemp, setNotasTemp] = useState<{ [key: number]: string }>({});
  const [aditamentosSeleccionados, setAditamentosSel] = useState<{ [key: number]: number[] }>({});

  const toggleAditamento = (idProd: number, idAdi: number) => {
    setAditamentosSel(prev => {
      const actuales = prev[idProd] || [];
      const nuevos = actuales.includes(idAdi) 
        ? actuales.filter(id => id !== idAdi) 
        : [...actuales, idAdi];
      return { ...prev, [idProd]: nuevos };
    });
  };

  const agregarAlCarrito = (prod: any) => {
    const notaActual = notasTemp[prod.id_producto] || "";
    const aditamentosActuales = aditamentosSeleccionados[prod.id_producto] || [];

    setCarrito((prev) => [
      ...prev, 
      { 
        prod: prod.id_producto, 
        nombre: prod.nombre, 
        cantidad: 1, 
        nota: notaActual,
        aditamentos: aditamentosActuales 
      }
    ]);
    
    setNotasTemp(prev => ({ ...prev, [prod.id_producto]: "" }));
    setAditamentosSel(prev => ({ ...prev, [prod.id_producto]: [] }));
  };

  const verProducto = (id_producto: number) => {
    const comanda = params.get('comanda') || "";
    const currentToken = params.get('token') || "";
    // Usamos template strings para evitar errores de URLSearchParams
    router.push(`/menu/${id_producto}?comanda=${comanda}&token=${currentToken}`);
  }

  const enviarPedido = () => {
    startTransition(async () => {
      const result = await sendOrder(idComanda, carrito, token);
      
      if (result.success && result.ordenCreada) {
        // 3. Emitimos el evento usando la referencia del socket
        socketRef.current?.emit("new_order", {
          items: result.ordenCreada, 
          fecha: new Date().toISOString()
        });

        alert("¡Pedido enviado a cocina!");
        setCarrito([]); 
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-32">
      {productos.map((prod) => (
        <div key={prod.id_producto} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div onClick={() => verProducto(prod.id_producto)} className="cursor-pointer">
              <h3 className="font-bold text-slate-800 text-lg">{prod.nombre}</h3>
              <p className="text-emerald-600 font-black">${prod.precio.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold active:scale-95 transition-all shadow-lg"
            >
              Agregar
            </button>
          </div>

          {prod.opcionesAditamentos?.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Personaliza:</p>
              <div className="flex flex-wrap gap-2">
                {prod.opcionesAditamentos.map((adi: any) => {
                  const estaSel = aditamentosSeleccionados[prod.id_producto]?.includes(adi.id);
                  return (
                    <button
                      key={adi.id}
                      onClick={() => toggleAditamento(prod.id_producto, adi.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        estaSel ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      + {adi.nombre}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <input 
            type="text" 
            placeholder="¿Instrucciones especiales?" 
            value={notasTemp[prod.id_producto] || ""}
            onChange={(e) => setNotasTemp({...notasTemp, [prod.id_producto]: e.target.value})}
            className="w-full bg-slate-50 border-none p-3 rounded-xl text-sm"
          />
        </div>
      ))}
      
      {carrito.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30">
            <button 
              onClick={enviarPedido}
              disabled={isPending}
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-2xl flex justify-between items-center disabled:opacity-50"
            >
              <span>{isPending ? 'Enviando...' : `Pedir ${carrito.length} items`}</span>
              <span className="bg-orange-600 px-3 py-1 rounded-lg text-sm">🚀 ENVIAR</span>
            </button>
        </div>
      )}
    </div>
  );
}