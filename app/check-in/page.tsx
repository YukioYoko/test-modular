// app/check-in/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// Definimos tipos para mayor claridad
interface PageProps {
  searchParams: Promise<{ mesa?: string; token?: string }>;
}

export default async function CheckInPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // 1. Validación de entrada robusta
  const idMesa = params.mesa ? parseInt(params.mesa) : null;
  const token = params.token || null;

  if (!idMesa || isNaN(idMesa) || !token) {
    console.error("Acceso inválido: Parámetros faltantes o malformados");
    redirect('/acceso-denegado');
  }

  try {
    // 2. Verificación de Comanda Activa
    // Buscamos la comanda que coincida con la mesa y el token de sesión único
    const comandaActiva = await prisma.comandas.findFirst({
      where: {
        id_mesa: idMesa,
        token: token,
        estado: 'Abierta'
      },
      select: {
        id_comanda: true,
        token: true
        // Solo traemos lo necesario para optimizar la consulta
      }
    });

    // 3. Redirección lógica
    if (comandaActiva) {
      // Usamos URLSearchParams para construir una URL segura y limpia
      const destination = new URLSearchParams({
        comanda: comandaActiva.id_comanda.toString(),
        token: comandaActiva.token || ''
      });
      
      redirect(`/menu?${destination.toString()}`);
    } else {
      // Si la comanda ya se cerró o el token expiró/es falso
      redirect('/acceso-denegado?reason=expired');
    }
    
  } catch (error) {
    console.error("Database error durante check-in:", error);
    redirect('/error-sistema');
  }
}