'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './action';
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";
import { URLSearchParams } from 'url';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function MenuClientComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  
  const socketRef = useRef<Socket | null>(null);
  // Estados temporales por producto
  const [notasTemp, setNotasTemp] = useState<{ [key: number]: string }>({});
  const [aditamentosSeleccionados, setAditamentosSel] = useState<{ [key: number]: number[] }>({});

   useEffect(() => {
      socketRef.current = io(SOCKET_URL),{
  reconnection: false,      // Detiene los intentos infinitos
  autoConnect: false,       // No se conecta solo al cargar
  transports: ['websocket'] // Evita el error de "polling"
}; 
      socketRef.current.on("connect", () => {
        console.log("✅ Cliente conectado al Socket de Foodlify");
      });
  
      return () => {
        socketRef.current?.disconnect();
      };
    }, []);
  
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
        aditamentos: aditamentosActuales // Guardamos los IDs de los extras
      }
    ]);
    
    // Limpiar selección temporal
    setNotasTemp(prev => ({ ...prev, [prod.id_producto]: "" }));
    setAditamentosSel(prev => ({ ...prev, [prod.id_producto]: [] }));
  };

  const verProducto = (id_producto: number) => {
    const comanda = params.get('comanda') || "";
    const token = params.get('token') || "";
    
    
    // Navegamos a una nueva página de detalle pasando todo
    router.push(`/menu/${id_producto.toString()}?comanda=${comanda}&token=${token}`);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-32">
      {productos.map((prod) => (
        <div key={prod.id_producto} onClick={() => verProducto(prod.id_producto)} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{prod.nombre}</h3>
              <p className="text-emerald-600 font-black">${prod.precio.toFixed(2)}</p>
            </div>
            <button 
              onClick={(e) => {e.stopPropagation();agregarAlCarrito(prod);}}
              className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-orange-100"
            >
              Agregar
            </button>
          </div>

          {/* Sección de Aditamentos (Pills) */}
          {prod.opcionesAditamentos.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Personaliza tu orden:</p>
              <div className="flex flex-wrap gap-2">
                {prod.opcionesAditamentos.map((adi: any) => {
                  const estaSeleccionado = aditamentosSeleccionados[prod.id_producto]?.includes(adi.id);
                  return (
                    <button
                      key={adi.id}
                      onClick={(e) => {e.stopPropagation();toggleAditamento(prod.id_producto, adi.id)}}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        estaSeleccionado 
                        ? 'bg-orange-600 border-orange-600 text-white shadow-md' 
                        : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      + {adi.nombre} (${adi.precio})
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
            className="w-full bg-slate-50 border-none p-3 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 text-slate-700"
          />
        </div>
      ))}
      
      {/* Botón enviar (igual que el anterior, manejando el carrito con aditamentos) */}
      {carrito.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
            <button 
              onClick={() => {
                startTransition(async () => {
                  // 1. Guardamos en BD y esperamos la respuesta CON los datos reales
                  const result = await sendOrder(idComanda, carrito, token);
                  
                  if (result.success && result.ordenCreada) { // Validamos que traiga la orden

                    // 2. Enviamos por Socket los DATOS REALES DE LA BD (no el carrito)
                    try {
                      socketRef.current?.emit("new_order", {
                        // Ya no enviamos "items: carrito", enviamos lo que regresó Prisma
                        items: result.ordenCreada, 
                        fecha: new Date().toISOString()
                      });
                    } catch(err) { console.log(err); }

                    alert("¡Pedido enviado!");
                    setCarrito([]); 
                  }
                });
              }}
              disabled={isPending}
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-2xl flex justify-between disabled:opacity-50"
            >
             <span>{isPending ? 'Procesando...' : `Pedir ${carrito.length} items`}</span>
              <span>🚀 Enviar</span>
           </button>
        </div>
     )}
    </div>
  );
}