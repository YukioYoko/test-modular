'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Prefetch: Precarga la página de login para que la transición sea inmediata
    router.prefetch('/login');

    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // 2. Redirección: Pequeño delay extra para que se aprecie el desvanecimiento 
      // de la LoadingScreen antes de cambiar de ruta
      setTimeout(() => {
        router.push('/login');
      }, 500); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-slate-900 min-h-screen"> 
      <LoadingScreen isLoading={isLoading} />
      
      {/* Mantenemos el main con el mismo color de fondo que la carga 
        para evitar destellos blancos durante el desvanecimiento
      */}
      <main className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'} flex items-center justify-center min-h-screen bg-slate-900`}>
         <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Preparando acceso...</h1>
            <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
         </div>
      </main>
    </div>
  );
}