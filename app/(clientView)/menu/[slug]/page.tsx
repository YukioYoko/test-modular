import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ProductoDetalleClient from './ProdcutoDetalleClient';

export default async function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ producto: string | ""; comanda?: string; token?: string }>;
}) {
  const { id } = await params;
  const { comanda, token } = await searchParams;
  
  if (!comanda || !token ) redirect('/login');

  // AGREGAMOS categoriaRel (o como se llame en tu schema) al include
  const productoRaw = await prisma.producto.findUnique({
    where: { id_producto: parseInt(id) }, // Usamos el ID de la URL
    include: {
      categoriaRel: true, // <--- REVISA QUE SE LLAME ASÍ EN TU SCHEMA
      aditamentos: {
        include: {
          aditamento: true,
        },
      },
    },
  });

  if (!productoRaw) notFound();

  const productoFormateado = {
    id_producto: productoRaw.id_producto,
    nombre: productoRaw.nombre,
    precio: Number(productoRaw.precio),
    descripcion: productoRaw.descripcion,
    // Accedemos a la relación incluida. Si es null, ponemos un fallback.
    categoria: productoRaw.categoriaRel?.nombre || "Sin categoría",
    tiempo_prep: productoRaw.tiempo_prep,
    pasos: productoRaw.pasos,
    aditamentos: productoRaw.aditamentos.map((a) => ({
      id: a.aditamento.id_aditamento,
      nombre: a.aditamento.nombre,
      precio: Number(a.aditamento.precio),
    })),
  };

  return (
    <ProductoDetalleClient 
      producto={productoFormateado} 
      urlRetorno={`/menu?comanda=${comanda}&token=${token}`} 
    />
  );
}