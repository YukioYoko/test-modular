'use client';
import { useState } from 'react';
import { sendOrder } from './action';
import { useSearchParams } from 'next/navigation';

export default function MenuClientComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const params = useSearchParams();
  const token = params.get('token');
  const [carrito, setCarrito] = useState<any[]>([]);
  
  // Estado para manejar los textos de los inputs por cada producto
  const [notasTemp, setNotasTemp] = useState<{ [key: number]: string }>({});

  const manejarCambioNota = (id: number, texto: string) => {
    setNotasTemp({ ...notasTemp, [id]: texto });
  };

  const agregarAlCarrito = (idProd: number) => {
    const notaActual = notasTemp[idProd] || ""; // Obtenemos la nota de este ID específico

    setCarrito((prev) => {
      const existe = prev.find(item => item.prod === idProd && item.nota === notaActual);

      if (existe) {
        return prev.map(item =>
          (item.prod === idProd && item.nota === notaActual)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { prod: idProd, cantidad: 1, nota: notaActual }];
    });

    // Opcional: Limpiar el input después de agregar
    setNotasTemp({ ...notasTemp, [idProd]: "" });
  };

  const enviarPedido = async () => {
    if (!token) return alert("Falta el token de seguridad");
    
    // El Server Action corregido anteriormente esperaba (id, token, carrito)
    const res = await sendOrder(idComanda, carrito, token);
    
    if (res.success) {
      alert("¡Pedido enviado a cocina!");
      setCarrito([]);
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="pb-24">
      <div className="space-y-4">
        {productos.map((prod) => (
          <div key={prod.id_producto} className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{prod.nombre}</h3>
                <p className="text-sm text-green-600 font-bold">${Number(prod.precio).toFixed(2)}</p>
                 <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">

                {prod.categoria}

              </span>
              </div>
              <button 
                onClick={() => agregarAlCarrito(prod.id_producto)}
                className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-90"
              >
                <span className="text-2xl font-bold">+</span>
              </button>
            </div>

            {/* Input vinculado al estado temporal */}
            <input 
              type="text" 
              placeholder="¿Alguna nota? (ej. Sin cebolla)" 
              value={notasTemp[prod.id_producto] || ""}
              onChange={(e) => manejarCambioNota(prod.id_producto, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm focus:ring-2 focus:ring-orange-200 outline-none placeholder:text-gray-600 text-black"
            />
          </div>
        ))}
      </div>

      {/* Botón de envío */}
      {carrito.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-md">
          <button onClick={enviarPedido} className="bg-green-600 text-white w-full py-4 rounded-2xl font-black shadow-2xl flex justify-between px-8">
            <span>PEDIR ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})</span>
            <span>ENVIAR A COCINA</span>
          </button>
        </div>
      )}
    </div>
  );
}