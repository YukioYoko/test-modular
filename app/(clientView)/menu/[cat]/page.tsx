import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import MenuClientComponent from './MenuClientComponent';

export default async function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ cat: string }>;
  searchParams: Promise<{ comanda?: string; token?: string }>;
}) {
  const { cat } = await params;
  const { comanda, token } = await searchParams;
  
  if (!comanda || !token) redirect('/login');

  // CORRECCIÓN 1: Agregar 'include' para traer aditamentos e imágenes
  const productosRaw = await prisma.producto.findMany({
    where: {
      categoria: decodeURIComponent(cat), // Decodificar por si tiene espacios
    },
    include: {
      aditamentos: {
        include: {
          aditamento: true
        }
      },
      imagen: true
    },
    orderBy: { nombre: 'asc' }
  });

  if (!productosRaw || productosRaw.length === 0) notFound();

  // CORRECCIÓN 2: Usar .map() porque productosRaw es un ARRAY
  const productosFormateados = productosRaw.map((p) => ({
    id_producto: p.id_producto,
    nombre: p.nombre,
    precio: Number(p.precio),
    descripcion: p.descripcion,
    categoria: p.categoria,
    tiempo_prep: p.tiempo_prep,
    pasos: p.pasos,
    // Aplanar imágenes
    imagen: p.imagen.map(img => img.url),
    // Mapeo de aditamentos permitidos
    opcionesAditamentos: p.aditamentos.map((a) => ({
      id: a.aditamento.id_aditamento,
      nombre: a.aditamento.nombre,
      precio: Number(a.aditamento.precio),
    })),
  }));

  return (
    <MenuClientComponent 
      cat = {cat}
      productos={productosFormateados} 
      idComanda={parseInt(comanda)} // Pasar el ID real de la comanda
    />
  );
}