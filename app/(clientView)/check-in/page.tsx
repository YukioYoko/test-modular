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

  if (!idMesa || !token) {
    console.error("Acceso inválido: Parámetros faltantes o malformados");
    redirect('/acceso-denegado');
  }

  // Declaramos la variable fuera para que sea accesible tras el bloque try/catch
  let comandaActiva = null;
  let errorOcurrido = false;

  try {
    // 2. Verificación de Comanda Activa
    comandaActiva = await prisma.comandas.findFirst({
      where: {
        id_mesa: idMesa,
        token: token,
        estado: 'Abierta'
      },
      select: {
        id_comanda: true,
        token: true
      }
    });
  } catch (error) {
    console.error("Database error durante check-in:", error);
    errorOcurrido = true;
  }

  // 3. Manejo de Redirecciones (FUERA del bloque try/catch)
  
  // Si hubo un error de base de datos, redirigimos a una página de error genérica
  if (errorOcurrido) {
    redirect('/error-sistema');
  }

  if (comandaActiva) {
    // Usamos URLSearchParams para construir una URL segura y limpia
    const destination = new URLSearchParams({
      comanda: comandaActiva.id_comanda.toString(),
      token: comandaActiva.token || ''
    });

    redirect(`/menu?${destination.toString()}`);
  } else {
    // Si la comanda no existe, está cerrada o el token es inválido
    redirect('/acceso-denegado');
  }
}