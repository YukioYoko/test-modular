// app/check-in/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';


export default async function CheckInPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ mesa?: string, token?: string }> 
}) {
  // Esperamos los parámetros antes de usarlos
  const params = await searchParams;
  
  const idMesa = params.mesa ? parseInt(params.mesa) : null;
  const token = params.token || null;

  // Validación de seguridad: si no hay datos en la URL, redirigir
  if (!idMesa || !token) {
    redirect('/acceso-denegado');
  }

  // 1. Validamos que la mesa esté ocupada y el token coincida
  const comandaActiva = await prisma.comandas.findFirst({
    where: {
      id_mesa: idMesa,
      tocken: token, // Usamos 'tocken' como está en tu DB
      estado: 'Abierta'
    }
  });

  if (comandaActiva) {
    redirect(`/menu?comanda=${comandaActiva.id_comanda}&token=${token}`);
  } else {
    redirect('/acceso-denegado');
  }
}