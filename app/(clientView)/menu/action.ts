'use server'
import { prisma } from '@/lib/prisma';

async function getContextoAmbiental() {
  try {
    const API_KEY = process.env.WEATHER_API_KEY; 
    const ciudad = "Guadalajara";
    const resClima = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ciudad}&aqi=no`,
      { next: { revalidate: 900 } }
    );
    const data = await resClima.json();
    const climaTexto = data.current.condition.text.toLowerCase();
    
    let climaId = 0; 
    if (climaTexto.includes("cloud") || climaTexto.includes("overcast")) climaId = 1;
    else if (climaTexto.includes("rain") || climaTexto.includes("thunder") || climaTexto.includes("drizzle")) climaId = 2;

    const hoy = new Date();
    const festivosFijos = ["01-01", "05-01", "09-16", "11-20", "12-25"];
    const esFestivo = festivosFijos.includes(
      `${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
    );

    return { climaId, esFestivo };
  } catch (error) {
    return { climaId: 0, esFestivo: false };
  }
}

/**
 * Obtiene todas las categorías activas de la base de datos.
 * Se usa tanto en el panel de administración como en el menú del cliente.
 */
export async function getCategorias() {
  try {
    const categorias = await prisma.categoria.findMany({
      where: {
        // Si tienes un campo para borrado lógico, fíltralo aquí
        // eliminado: false 
      },
      orderBy: {
        nombre: 'asc' // Orden alfabético para que el menú se vea organizado
      },
      select: {
        id_categoria: true,
        nombre: true,
        // Puedes incluir la relación de productos si necesitas contar cuántos hay
        // _count: { select: { productos: true } }
      }
    });

    return categorias;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    // Devolvemos un array vacío para evitar que la página colapse
    return [];
  }
}

export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada o comanda cerrada" };

    const { climaId, esFestivo } = await getContextoAmbiental();
    const ahora = new Date();

    const itemsCreados = await prisma.$transaction(async (tx) => {
      const resultados = [];

      for (const item of carrito) {
        const nuevoDetalle = await tx.detalleComanda.create({
          data: {
            id_comanda: idComanda,
            id_producto: item.prod,
            cantidad: item.cantidad,
            notas_especiales: item.nota || "",
            status: "En espera"
          },
          include: { 
            producto: {
              include: { categoriaRel: true } // Obtenemos el nombre de la categoría
            } 
          }
        });

        if (item.aditamentos?.length > 0) {
          await tx.comandaAditamentos.createMany({
            data: item.aditamentos.map((idAdi: number) => ({
              id_detalle: nuevoDetalle.id_detalle,
              id_aditamento: idAdi,
              confirmacion: true
            }))
          });
        }

        // Historial Analítico corregido con categoriaRel
        for (let i = 0; i < item.cantidad; i++) {
          await tx.historialAnalitico.create({
            data: {
              id_producto: item.prod,
              id_subcategoria: nuevoDetalle.producto.id_subcategoria,
              id_categoria: nuevoDetalle.producto.id_categoria,
              hora: ahora.getHours(),
              dia_semana: ahora.getDay(),
              es_festivo: esFestivo,
              clima_id: climaId
            }
          });
        }

        const detalleCompleto = await tx.detalleComanda.findUnique({
          where: { id_detalle: nuevoDetalle.id_detalle },
          include: {
            producto: true,
            comanda: true,
            aditamentos: { include: { aditamento: true } }
          }
        });

        if (detalleCompleto) resultados.push(detalleCompleto);
      }
      return resultados;
    });

    return { success: true, ordenCreada: JSON.parse(JSON.stringify(itemsCreados)) };

  } catch (e) {
    console.error("Error en sendOrder:", e);
    return { error: "No se pudo procesar la orden." };
  }
}