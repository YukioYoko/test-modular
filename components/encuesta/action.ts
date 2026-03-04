"use server";
import { prisma } from "@/lib/prisma";
import { TimezoneDate } from 'timezone-date.ts'

export async function guardarEncuestaIA(data: any) {
  try {
    const nuevaEncuesta = await prisma.encuestaSatisfaccion.create({
      data: {
        id_comanda: data.idComanda,
        score_entradas: data.scores.entradas,
        score_fuertes: data.scores.fuertes,
        score_postres: data.scores.postres,
        score_bebidas: data.scores.bebidas,
        recomendacion_app: data.recomendacionApp,
        funcional: data.funcional,
        comentarios: data.comentarios,
        fehca: new TimezoneDate(Date.now(), { timezone: 'America/New_York' })
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error al guardar encuesta:", error);
    return { success: false };
  }
}