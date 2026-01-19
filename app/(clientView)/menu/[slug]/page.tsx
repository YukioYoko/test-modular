import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ProductoDetalleClient from './ProductoDetalleClient';

export default async function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ comanda?: string; token?: string }>;
}) {
  const { id } = await params;
  const { comanda, token } = await searchParams;

  // Validación de sesión básica
  if (!comanda || !token) redirect('/login');

  // Consulta con Join de 3 niveles: Producto -> Receta -> Ingrediente
  const productoRaw = await prisma.producto.findUnique({
    where: { id_producto: parseInt(id) },
    include: {
      recetas: {
        include: {
          ingrediente: true,
        },
      },
      aditamentos: {
        include: {
          aditamento: true,
        },
      },
    },
  });

  if (!productoRaw) notFound();

  // Transformación para evitar el error de "Decimal objects are not supported"
  const productoFormateado = {
    id_producto: productoRaw.id_producto,
    nombre: productoRaw.nombre,
    precio: Number(productoRaw.precio),
    categoria: productoRaw.categoria,
    tiempo_prep: productoRaw.tiempo_prep,
    pasos: productoRaw.pasos,
    // Mapeo de la receta para mostrar ingredientes
    ingredientes: productoRaw.recetas.map((r) => ({
      nombre: r.ingrediente.nombre,
      cantidad: Number(r.cantidad),
      tipo: r.ingrediente.tipo,
    })),
    // Mapeo de aditamentos permitidos
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