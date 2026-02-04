'use server'
import { prisma } from '@/lib/prisma'

export async function getDashboardStats(rango: string = 'Dia') {
  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);

  // Ajustar fecha de inicio según el rango
  if (rango === 'Semana') {
    inicio.setDate(inicio.getDate() - 7);
  } else if (rango === 'Mes') {
    inicio.setMonth(inicio.getMonth() - 1);
  }

  // 1. Ventas filtradas por el rango dinámico
  const ventas = await prisma.comandas.findMany({
    where: { 
      estado: 'Cerrada', 
      fecha_hora: { gte: inicio } 
    },
    include: { 
      detalles: { 
        include: { producto: true } 
      } 
    }
  });

  const totalVentas = ventas.reduce((acc, comanda) => {
    return acc + comanda.detalles.reduce((sub, det) => 
      sub + (Number(det.producto.precio) * det.cantidad), 0);
  }, 0);

  // 2. Personal con Rol (Usando tabla 'usuario')
  const listaPersonal = await prisma.usuario.findMany({
    select: {
      id: true,
      usuario: true, // Nombre del campo en tu tabla
      rol: true,
    },
    take: 5
  });

  // 3. Top Productos (Usando tabla 'detalleComanda')
  const productosMasVendidos = await prisma.detalleComanda.groupBy({
    by: ['id_producto'],
    _sum: { cantidad: true },
    orderBy: { _sum: { cantidad: 'desc' } },
    where: {
      // Opcional: filtrar top productos también por fecha
      comanda: { fecha_hora: { gte: inicio } }
    },
    take: 5,
  });

  const topProductos = await Promise.all(
    productosMasVendidos.map(async (item) => {
      const p = await prisma.producto.findUnique({ 
        where: { id_producto: item.id_producto } 
      });
      return { nombre: p?.nombre, cantidad: item._sum.cantidad };
    })
  );

  return { totalVentas, listaPersonal, topProductos };
}