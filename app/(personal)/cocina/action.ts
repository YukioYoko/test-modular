// app/cocina/action.ts
'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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


export async function getPedidosCocina() {
  const pedidos = await prisma.detalleComanda.findMany({
    where: {
      status: { in: ['En espera', 'En preparacion'] },
      comanda: { estado: 'Abierta' }
    },
    include: {
      producto: true,
      aditamentos: { include: { aditamento: true } },
      comanda: { select: { id_mesa: true, fecha_hora: true, mesero: { select: { nombre: true } } } }
    },
    orderBy: { comanda: { fecha_hora: 'asc' } }
  });

  // Convertimos los objetos Decimal a números normales para que Next.js pueda serializarlos
  return pedidos.map(pedido => ({
    ...pedido,
    producto: {
      ...pedido.producto,
      precio: Number(pedido.producto.precio) // Convierte Decimal a Number
    },
    aditamentos: pedido.aditamentos.map(a => ({
      ...a,
      aditamento: {
        ...a.aditamento,
        precio: Number(a.aditamento.precio) // Convierte Decimal a Number
      }
    }))
  }));
}

export async function actualizarEstatusPedido(idDetalle: number, nuevoEstatus: string) {
  try {
    await prisma.detalleComanda.update({
      where: { id_detalle: idDetalle },
      data: { status: nuevoEstatus }
    });
    revalidatePath('/cocina');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}