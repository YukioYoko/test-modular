// app/check-in/page.tsx
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function CheckInPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ mesa?: string, token?: string }> 
}) {
  const params = await searchParams;
  const idMesa = params.mesa ? parseInt(params.mesa) : null;
  const token = params.token || null;

  if (!idMesa || !token) redirect('/acceso-denegado');

  const comandaActiva = await prisma.comandas.findFirst({
    where: {
      id_mesa: idMesa,
      token: token, 
      estado: 'Abierta'
    }
  });

  if (comandaActiva) {
    redirect(`/menu?comanda=${comandaActiva.id_comanda}&token=${token}`);
  } else {
    redirect('/acceso-denegado');
  }
}