import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import MenuClientComponent from './MenuClientComponent';

export default async function ProductoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ producto: string | ""; comanda?: string; token?: string }>;
}) {
  const { id } = await params;
  const { comanda, token, producto } = await searchParams;
  
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
    <MenuClientComponent 
      productos={productoFormateado} 
      idComanda={token} 
    />
  );
}