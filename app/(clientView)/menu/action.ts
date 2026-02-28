'use server'
import { prisma } from '@/lib/prisma';

/**
 * Obtiene el clima y la hora local de la API para el contexto analítico.
 */
async function getContextoAmbiental() {
  try {
    const API_KEY = process.env.WEATHER_API_KEY; 
    const ciudad = "Guadalajara";
    const resClima = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ciudad}&aqi=no`,
      { next: { revalidate: 900 } }
    );
    const data = await resClima.json();
    
    // 1. Convertir el string "YYYY-MM-DD HH:mm" a un objeto Date válido
    // Reemplazamos el espacio por "T" para que el constructor de Date lo reconozca (ISO 8601)
    const fechaLocalString = data.location.localtime.replace(" ", "T");
    const fechaDb = new Date(fechaLocalString);

    const climaTexto = data.current.condition.text.toLowerCase();
    
    let climaId = 0; 
    if (climaTexto.includes("cloud") || climaTexto.includes("overcast")) climaId = 1;
    else if (climaTexto.includes("rain") || climaTexto.includes("thunder") || climaTexto.includes("drizzle")) climaId = 2;

    // 2. Lógica de festivos usando la fecha de la API
    const festivosFijos = ["01-01", "05-01", "09-16", "11-20", "12-25"];
    const mesDia = `${String(fechaDb.getMonth() + 1).padStart(2, '0')}-${String(fechaDb.getDate()).padStart(2, '0')}`;
    const esFestivo = festivosFijos.includes(mesDia);

    return { climaId, esFestivo, fechaDb };
  } catch (error) {
    console.error("Error al obtener clima:", error);
    // Fallback: Si falla la API, usamos la hora del sistema
    return { climaId: 0, esFestivo: false, fechaDb: new Date() };
  }
}

/**
 * Obtiene todas las categorías activas de la base de datos.
 */
export async function getCategorias() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: 'asc'
      },
      select: {
        id_categoria: true,
        nombre: true,
      }
    });
    return categorias;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

/**
 * Procesa el envío de una orden y guarda el registro analítico con la hora de la API.
 */
export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada o comanda cerrada" };

    // Obtenemos el contexto (clima y hora local de la ciudad)
    const { climaId, esFestivo, fechaDb } = await getContextoAmbiental();

    const itemsCreados = await prisma.$transaction(async (tx) => {
      const resultados = [];

      for (const item of carrito) {
        // 1. Crear el detalle de la comanda
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
              include: { categoriaRel: true } 
            } 
          }
        });

        // 2. Registrar aditamentos si existen
        if (item.aditamentos?.length > 0) {
          await tx.comandaAditamentos.createMany({
            data: item.aditamentos.map((idAdi: number) => ({
              id_detalle: nuevoDetalle.id_detalle,
              id_aditamento: idAdi,
              confirmacion: true
            }))
          });
        }

        // 3. Crear registros en Historial Analítico (uno por cada unidad de producto)
        for (let i = 0; i < item.cantidad; i++) {
          await tx.historialAnalitico.create({
            data: {
              id_producto: item.prod,
              id_subcategoria: nuevoDetalle.producto.id_subcategoria,
              id_categoria: nuevoDetalle.producto.id_categoria,
              // Guardamos la fecha completa y extraemos partes de la misma 'fechaDb'
              fecha_registro: fechaDb, 
              hora: fechaDb.getHours(),
              dia_semana: fechaDb.getDay(),
              es_festivo: esFestivo,
              clima_id: climaId
            }
          });
        }

        // Recuperar el detalle completo para el frontend
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

    return { 
      success: true, 
      ordenCreada: JSON.parse(JSON.stringify(itemsCreados)) 
    };

  } catch (e) {
    console.error("Error en sendOrder:", e);
    return { error: "No se pudo procesar la orden." };
  }
}