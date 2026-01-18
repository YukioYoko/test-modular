'use server'
import { prisma } from '@/lib/prisma';

export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    // 1. Validar Sesión
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada o comanda cerrada" };

    // 2. Iniciar Transacción
    const itemsCreados = await prisma.$transaction(async (tx) => {
      const resultados = []; // Aquí acumularemos los pedidos completos

      for (const item of carrito) { 
        // A. Crear el detalle principal
        const nuevoDetalle = await tx.detalleComanda.create({
          data: {
            id_comanda: idComanda,
            id_producto: item.prod,
            cantidad: item.cantidad,
            notas_especiales: item.nota,
            status: "En espera"
          }
        });

        // B. Insertar Aditamentos (si existen)
        if (item.aditamentos && item.aditamentos.length > 0) {
          await tx.comandaAditamentos.createMany({
            data: item.aditamentos.map((idAdi: number) => ({
              id_detalle: nuevoDetalle.id_detalle,
              id_aditamento: idAdi,
              confirmacion: true
            }))
          });
        }

        // C. RE-CONSULTAR para obtener el objeto COMPLETO (Vital para la UI de Cocina)
        // Necesitamos que incluya: Producto (nombre), Comanda (fecha) y Aditamentos (nombres)
        const detalleCompleto = await tx.detalleComanda.findUnique({
          where: { id_detalle: nuevoDetalle.id_detalle },
          include: {
            producto: true,
            comanda: true,
            // Asegúrate que en tu schema.prisma la relación se llame 'aditamentos' o 'comandaAditamentos'
            aditamentos: {
              include: {
                aditamento: true // Esto trae el nombre del extra (ej: "Queso Extra")
              }
            }
          }
        });

        resultados.push(detalleCompleto);
      }

      return resultados; // Devolvemos el array completo
    });

    // 3. Retornar éxito con los datos reales (IDs reales)
    return { success: true, ordenCreada: itemsCreados };

  } catch (e) {
    console.error(e);
    return { error: "Error al guardar el pedido en el servidor" };
  }
}