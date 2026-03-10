"use server";
import { prisma } from "@/lib/prisma";

export async function guardarEncuestaIA(data: any) {
  try {
    // 1. Obtenemos la hora actual del sistema (que suele ser UTC en Vercel/Render)
    const ahora = new Date();
    
    // 2. Calculamos el desfase de Ciudad de México (CST es UTC-6)
    // Usamos un offset fijo de -6 horas para asegurar consistencia con Guadalajara
    const offsetMexico = -6; 
    const fechaMexico = new Date(ahora.getTime() + (offsetMexico * 60 * 60 * 1000));

    const nuevaEncuesta = await prisma.encuestaSatisfaccion.create({
      data: {
        id_comanda: data.idComanda,
        score_entradas: data.scores.entradas,
        score_fuertes: data.scores.fuertes,
        score_postres: data.scores.postres,
        score_bebidas: data.scores.bebidas,
        score_pastas: data.scores.pastas,
        score_ensaladas: data.scores.ensaladas,
        recomendacion_app: data.recomendacionApp,
        funcional: data.funcional,
        comentarios: data.comentarios,
        // Forzamos la fecha calculada manualmente
        fecha: fechaMexico, 
      },
    });
    
    return { success: true, fecha: fechaMexico };
  } catch (error) {
    console.error("Error en guardarEncuestaIA:", error);
    return { success: false };
  }
}