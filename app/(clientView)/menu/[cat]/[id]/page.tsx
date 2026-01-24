import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ProductoDetalleClient from './ProdcutoDetalleClient';

// app/(clientView)/menu/[cat]/[id]/page.tsx

export default async function ProductoPage({
  params,
  searchParams,
}: {
  // Debe incluir 'cat' porque está dentro de la carpeta [cat]
  params: Promise<{ cat: string; id: string }>; 
  searchParams: Promise<{ comanda?: string; token?: string }>;
}) {
  // Extraemos ambos para asegurar que Next.js mapee la ruta correctamente
  const { id, cat } = await params; 
  const { comanda, token } = await searchParams;
  // Validación de sesión básica
  if (!comanda || !token ) redirect('/login');

  // Consulta con Join de 3 niveles: Producto -> Receta -> Ingrediente
  const productoRaw = await prisma.producto.findUnique({
    where: { id_producto: parseInt(id) },
    include: {
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
    descripcion: productoRaw.descripcion,
    categoria: productoRaw.categoria,
    tiempo_prep: productoRaw.tiempo_prep,
    pasos: productoRaw.pasos,
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
      urlRetorno={`/menu/${cat}?comanda=${comanda}&token=${token}`} 
    />
  );
}