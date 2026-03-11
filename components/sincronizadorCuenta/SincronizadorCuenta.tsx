'use client' // Importante: Este sí es de cliente

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function SincronizadorCuenta({ idComanda }: { idComanda: number }) {
  const router = useRouter();

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('order_paid', (data: any) => {
      // Validamos que el pago sea de ESTA comanda
      if (Number(data.id_comanda) === idComanda) {
        // Usamos backticks para la ruta dinámica
        router.push(`/gracias/${idComanda}`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [idComanda, router]);

  return null; // No muestra nada en la UI
}