'use server'
import { prisma } from '@/lib/prisma';

// Función auxiliar para obtener clima y festivos (puedes moverla a un utils.ts)
async function getContextoAmbiental() {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const ciudad = "Guadalajara"; // O extraer de la configuración del restaurante
    
    // 1. Obtener Clima
    const resClima = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`);
    const dataClima = await resClima.json();
    const climaMain = dataClima.weather?.[0]?.main || "Clear";
    const mapping: Record<string, number> = { "Clear": 0, "Clouds": 1, "Rain": 2, "Drizzle": 2, "Thunderstorm": 2 };
    const climaId = mapping[climaMain] ?? 3;

    // 2. Obtener si es festivo (Lógica simple para México o usa una librería)
    // Para simplificar en este ejemplo, usaremos una validación manual de fechas clave 
    // o puedes llamar a una API de festivos.
    const hoy = new Date();
    const festivosFijos = ["01-01", "05-01", "09-16", "11-20", "12-25"]; // Ejemplo: Año nuevo, Navidad...
    const esFestivo = festivosFijos.includes(`${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`);

    return { climaId, esFestivo };
  } catch (error) {
    return { climaId: 0, esFestivo: false }; // Fallback en caso de error de API
  }
}

export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    // 1. Validar Sesión
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada o comanda cerrada" };

    // 2. Obtener Contexto para la IA (Clima y Hora)
    const { climaId, esFestivo } = await getContextoAmbiental();
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const diaSemana = ahora.getDay();

    // 3. Iniciar Transacción
    const itemsCreados = await prisma.$transaction(async (tx) => {
      const resultados = [];

      for (const item of carrito) {
        // A. Crear el detalle principal
        const nuevoDetalle = await tx.detalleComanda.create({
          data: {
            id_comanda: idComanda,
            id_producto: item.prod,
            cantidad: item.cantidad,
            notas_especiales: item.nota,
            status: "En espera"
          },
          include: { producto: true } // Traemos el producto para saber su subcategoría
        });

        // B. Insertar Aditamentos
        if (item.aditamentos && item.aditamentos.length > 0) {
          await tx.comandaAditamentos.createMany({
            data: item.aditamentos.map((idAdi: number) => ({
              id_detalle: nuevoDetalle.id_detalle,
              id_aditamento: idAdi,
              confirmacion: true
            }))
          });
        }

        // C. GUARDAR EN HISTORIAL ANALÍTICO (Para el Random Forest)
        // Guardamos una entrada por cada unidad del producto pedida
        for (let i = 0; i < item.cantidad; i++) {
          await tx.historialAnalitico.create({
            data: {
              id_producto: item.prod,
              id_subcategoria: nuevoDetalle.producto.id_subcategoria,
              categoria_nom: nuevoDetalle.producto.categoria,
              hora: horaActual,
              dia_semana: diaSemana,
              es_festivo: esFestivo,
              clima_id: climaId
            }
          });
        }

        // D. Re-consultar para la UI
        const detalleCompleto = await tx.detalleComanda.findUnique({
          where: { id_detalle: nuevoDetalle.id_detalle },
          include: {
            producto: true,
            comanda: true,
            aditamentos: { include: { aditamento: true } }
          }
        });

        resultados.push(detalleCompleto);
      }

      return resultados;
    });

    return { success: true, ordenCreada: itemsCreados };

  } catch (e) {
    console.error(e);
    return { error: "Error al guardar el pedido e historial" };
  }
}