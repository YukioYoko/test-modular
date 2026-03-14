'use client'
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export default function SincronizadorMesas() {
  const router = useRouter();

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"]
    });

    socket.on('connect', () => {
      console.log("✅ Hostess conectado al Socket para actualización de mesas");
    });

    // Escuchamos el evento de liberación de mesa
    socket.on('free_table', (data: any) => {
      console.log("🔄 Mesa liberada detectada:", data.id_mesa);
      
      // En Hostess queremos refrescar TODA la pantalla para que 
      // la mesa cambie de color (de Ocupada a Libre)
      router.refresh(); 
    });

    socket.on('connect_error', (err) => {
      console.error("❌ Error de conexión al Socket (Hostess):", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  return null;
}