'use server'
import { prisma } from '@/lib/prisma'

export async function getVentasFiltradas(filtros: {
  busqueda?: string;
  status?: string;
  metodo?: string;
  fechaInicio?: string;
  fechaFin?: string;
}) {
  const { busqueda, status, metodo, fechaInicio, fechaFin } = filtros;

  // Construcción del objeto de consulta para Prisma
  const where: any = {
    // Siempre ignoramos registros que no tengan sentido financiero si así lo prefieres
  };

  // 1. Filtro por Token o ID de Transacción
  if (busqueda) {
    where.OR = [
      { token: { contains: busqueda, mode: 'insensitive' } },
      { transaccion_id: { contains: busqueda, mode: 'insensitive' } }
    ];
  }

  // 2. Filtro por Estatus de la Comanda
  if (status && status !== 'Todos') {
    where.estado = status;
  }

  // 3. Filtro por Método de Pago
  // Nota: Buscamos en transaccion_id si guardas ahí el tipo (ej: "EFECTIVO_123")
  if (metodo && metodo !== 'Todos') {
    where.metodo_pago = { contains: metodo, mode: 'insensitive' };
  }

  // 4. Filtro por Rango de Fechas
  if (fechaInicio && fechaFin) {
    where.fecha_hora = {
      gte: new Date(fechaInicio + "T00:00:00"),
      lte: new Date(fechaFin + "T23:59:59")
    };
  }

  try {
    const ventas = await prisma.comandas.findMany({
      where,
      take: 30, // Limitamos a las últimas 30 como pediste
      orderBy: { fecha_hora: 'desc' },
      include: {
        mesa: true,
        mesero: true
      }
    });

    return JSON.parse(JSON.stringify(ventas));
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    return [];
  }
}