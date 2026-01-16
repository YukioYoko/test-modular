// action.ts
export async function sendOrder(idComanda: number, carrito: any[], token: string | null) {
  try {
    const comanda = await prisma.comandas.findFirst({
      where: { id_comanda: idComanda, token: token, estado: 'Abierta' }
    });

    if (!comanda) return { error: "Sesión expirada" };

    await prisma.$transaction(async (tx) => {
      for (const item of carrito) {
        // 1. Creamos el detalle del producto
        const nuevoDetalle = await tx.detalleComanda.create({
          data: {
            id_comanda: idComanda,
            id_producto: item.prod,
            cantidad: item.cantidad,
            notas_especiales: item.nota,
            status: "En espera"
          }
        });

        // 2. Si el item tiene aditamentos, los guardamos vinculados al id_detalle
        if (item.aditamentos && item.aditamentos.length > 0) {
          await tx.comandaAditamentos.createMany({
            data: item.aditamentos.map((idAdi: number) => ({
              id_detalle: nuevoDetalle.id_detalle,
              id_aditamento: idAdi,
              confirmacion: true
            }))
          });
        }
      }
    });

    revalidatePath('/menu');
    revalidatePath('/pedido');
    return { success: true };
  } catch (e) {
    return { error: "Error al guardar el pedido" };
  }
}