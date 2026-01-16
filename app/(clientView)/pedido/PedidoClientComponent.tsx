'use client';
import { useState } from 'react';

export default function MenuClientComponent({ productos }: { productos: any[]}) {

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
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                {prod.tiempo_prep}
              </span>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                {prod.status}
              </span>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                {prod.cantidad}
              </span>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                {prod.notas_especiales}
              </span>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}