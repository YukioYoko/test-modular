'use client'
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

export default function SincronizadorCuenta({ idComanda }: { idComanda: number }) {
  const router = useRouter();

  useEffect(() => {
    // Asegúrate de que esta URL sea la de tu servicio en Render
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

    socket.on('connect', () => {
      console.log("Conectado al socket para comanda:", idComanda);
    });

    socket.on('order_paid', (data: any) => {
      console.log("Evento recibido en cliente:", data);
      
      // Comparamos usando == para evitar problemas de string vs number
      if (data.id_comanda == idComanda) {
        console.log("Redirigiendo...");
        // Forzamos la redirección con backticks
        router.push(`/gracias/${idComanda}`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [idComanda, router]);

  return null;
}