'use client';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendOrder } from './[id]/action'; // Asegúrate de que esta ruta sea correcta
import { useSearchParams, useRouter } from 'next/navigation';
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

// 1. Interfaz para que TypeScript reconozca las propiedades de cada producto
interface IProductoMenu {
  id_producto: number;
  nombre: string;
  precio: number;
  descripcion: string | null;
  categoria: string;
  imagen: string[];
  opcionesAditamentos: {
    id: number;
    nombre: string;
    precio: number;
  }[];
}

// 2. Aplicamos la interfaz en las Props para quitar el error de 'any'
export default function MenuClientComponent({ 
  cat, 
  productos, 
  idComanda 
}: {
  cat: string;
  productos: IProductoMenu[]; // Cambiado de any[] a IProductoMenu[]
  idComanda: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [isPending, startTransition] = useTransition();
  const [carrito, setCarrito] = useState<any[]>([]);
  
  const socketRef = useRef<Socket | null>(null);
  const [notasTemp, setNotasTemp] = useState<{ [key: number]: string }>({});
  const [aditamentosSeleccionados, setAditamentosSel] = useState<{ [key: number]: number[] }>({});

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
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

  const agregarAlCarrito = (prod: IProductoMenu) => {
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
    router.push(`/menu/${cat}/${id_producto}?comanda=${comanda}&token=${token}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-32 p-4">
      {productos.map((prod) => (
        <div 
          key={prod.id_producto} 
          onClick={() => verProducto(prod.id_producto)} 
          className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
               {/* Renderizamos la primera imagen si existe */}
              <img 
                src={prod.imagen[0] || "/placeholder.png"} 
                className="w-20 h-20 rounded-2xl object-cover"
                alt={prod.nombre} 
              />
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{prod.nombre}</h3>
                <p className="text-emerald-600 font-black">${prod.precio.toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // IMPORTANTE: evita navegar al detalle
                agregarAlCarrito(prod);
              }}
              className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100"
            >
              Agregar
            </button>
          </div>

          {prod.opcionesAditamentos && prod.opcionesAditamentos.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Personaliza:</p>
              <div className="flex flex-wrap gap-2">
                {prod.opcionesAditamentos.map((adi) => {
                  const estaSeleccionado = aditamentosSeleccionados[prod.id_producto]?.includes(adi.id);
                  return (
                    <button
                      key={adi.id}
                      onClick={(e) => {
                        e.stopPropagation(); // Evita navegar al detalle
                        toggleAditamento(prod.id_producto, adi.id);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        estaSeleccionado 
                        ? 'bg-orange-600 border-orange-600 text-white shadow-md' 
                        : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      + {adi.nombre} (${adi.precio.toFixed(2)})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <input 
            type="text" 
            onClick={(e) => e.stopPropagation()} // Evita navegar al detalle al hacer clic en el input
            placeholder="¿Instrucciones especiales?" 
            value={notasTemp[prod.id_producto] || ""}
            onChange={(e) => setNotasTemp({...notasTemp, [prod.id_producto]: e.target.value})}
            className="w-full bg-slate-50 border-none p-3 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 text-slate-700"
          />
        </div>
      ))}

      {/* Botón flotante para el carrito */}
      {carrito.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
           <button 
             onClick={() => {
               startTransition(async () => {
                 const result = await sendOrder(idComanda, carrito, token || "");
                 if (result.success) {
                   socketRef.current?.emit("new_order", { items: result.ordenCreada });
                   alert("¡Pedido enviado!");
                   setCarrito([]); 
                 }
               });
             }}
             disabled={isPending}
             className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-2xl flex justify-between items-center disabled:opacity-50"
           >
             <span>{isPending ? 'Enviando...' : `Pedir ${carrito.length} items`}</span>
             <span>🚀 Enviar</span>
           </button>
        </div>
      )}
    </div>
  );
}