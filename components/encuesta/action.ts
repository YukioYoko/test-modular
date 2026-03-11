"use server";
import { prisma } from "@/lib/prisma";

export async function guardarEncuestaIA(data: any) {
  try {
    const ahora = new Date();
    const offsetMexico = -6; 
    const fechaMexico = new Date(ahora.getTime() + (offsetMexico * 60 * 60 * 1000));

    // Usamos .create() porque ahora permitimos múltiples encuestas por comanda
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
        fecha: fechaMexico, 
      },
    });
    
    return { success: true, id_encuesta: nuevaEncuesta.id };
  } catch (error) {
    console.error("Error en guardarEncuestaIA:", error);
    return { success: false, error: "No se pudo guardar la encuesta" };
  }
}