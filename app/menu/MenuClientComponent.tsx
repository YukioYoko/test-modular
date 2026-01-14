'use client';
import { useState } from 'react';

export default function MenuClientComponent({ productos, idComanda }: { productos: any[], idComanda: number }) {
  const [carrito, setCarrito] = useState<any[]>([]);

  const agregarAlCarrito = (prod: any) => {
    setCarrito([...carrito, { ...prod, cantidad: 1 }]);
  };

  const enviarPedido = async () => {
    // Aquí llamarás a un Server Action para insertar en 'detalle_comanda'
    console.log("Enviando pedido de la comanda:", idComanda, carrito);
    alert("¡Pedido enviado a cocina!");
    setCarrito([]);
  };

  return (
    <div>
      <div className="space-y-4">
        {productos.map((prod) => (
          <div key={prod.id_producto} className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
            <div>
              <h3 className="font-bold text-gray-800">{prod.nombre}</h3>
              <p className="text-sm text-green-600 font-bold">${Number(prod.precio).toFixed(2)}</p>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                {prod.categoria}
              </span>
            </div>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
          </div>
        ))}
      </div>

      {/* Botón Flotante de Carrito */}
      {carrito.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-md">
          <button 
            onClick={enviarPedido}
            className="bg-green-600 text-white w-full py-4 rounded-2xl font-black shadow-2xl flex justify-between px-8 items-center"
          >
            <span>PEDIR ({carrito.length})</span>
            <span>ENVIAR A COCINA</span>
          </button>
        </div>
      )}
    </div>
  );
}