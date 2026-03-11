'use client'
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

export default function SincronizadorCuenta({ idComanda }: { idComanda: number }) {
  const router = useRouter();

  useEffect(() => {
    // 1. Forzamos el transporte 'websocket' para evitar bloqueos de CORS en Render
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      transports: ["websocket"]
    });

    socket.on('connect', () => {
      console.log("✅ Escuchando pago de comanda:", idComanda);
    });

    socket.on('order_paid', (data: any) => {
      
      // 2. Usamos Number() para asegurar que la comparación sea entre tipos iguales
      // y validamos que el objeto traiga la propiedad que el servidor envía
      if (data && Number(data.id_comanda) === Number(idComanda)) {
        console.log("🚀 Pago confirmado. Redirigiendo...");
        
        // 3. Importante: usamos backticks y la ruta completa
        router.push(`/gracias/?idComanda=${idComanda}`);
      }
    });

    // 4. Manejo de errores para debug en producción
    socket.on('connect_error', (err) => {
      console.error("❌ Error de conexión al Socket:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [idComanda, router]);

  return null;
}