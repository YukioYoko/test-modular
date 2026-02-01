export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PaypalBut from '@/components/paypal/PaypalBut';

export default async function CuentaPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  if (!idComanda || !token) redirect('/login');

  const comanda = await prisma.comandas.findFirst({
    where: { id_comanda: idComanda, token: token, estado: 'Abierta' },
    include: {
      detalles: {
        include: {
          producto: true,
          aditamentos: { include: { aditamento: true } }
        }
      }
    }
  });

  if (!comanda) redirect('/acceso-denegado');

  let totalFinal = 0;

  // Mapeo para mostrar en UI
  const itemsTicket = comanda.detalles.map(detalle => {
    const precioBase = Number(detalle.producto.precio);
    const precioExtras = detalle.aditamentos.reduce((acc, a) => acc + (a.aditamento.precio || 0), 0);
    const subtotalItem = (precioBase + precioExtras) * detalle.cantidad;
    totalFinal += subtotalItem;

    return {
      nombre: detalle.producto.nombre,
      cantidad: detalle.cantidad,
      subtotal: subtotalItem,
      extras: detalle.aditamentos.map(a => ({
        nombre: a.aditamento.nombre,
        precio: a.aditamento.precio
      }))
    };
  });

  // Totales financieros (Precios ya incluyen IVA)
  const subtotalFiscal = totalFinal / 1.16;
  const ivaTotal = totalFinal - subtotalFiscal;

  const datosParaPago = {
    sub_total: subtotalFiscal,
    ivaTotal: ivaTotal,
    total: totalFinal
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-md mx-auto p-6">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">TICKET</h1>
          <p className="text-slate-400 text-sm">Comanda #{idComanda} • Mesa {comanda.id_mesa}</p>
          <div className="border-b-2 border-dashed border-slate-200 mt-4"></div>
        </header>

        <div className="space-y-6 mb-10">
          {itemsTicket.map((item, index) => (
            <div key={index} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <p className="font-bold text-slate-900">{item.cantidad}x {item.nombre}</p>
                {item.extras.map((ex, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-slate-400 ml-4 italic">
                    <span>+ {ex.nombre}</span>
                    <span>${ex.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <span className="font-bold text-slate-900 ml-4">${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-slate-900 pt-6 space-y-2">
          <div className="flex justify-between text-slate-500 text-xs">
            <span>SUBTOTAL (SIN IVA)</span>
            <span>${subtotalFiscal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-xs">
            <span>IVA (16%)</span>
            <span>${ivaTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-dashed border-slate-200">
            <span>TOTAL</span>
            <span>${totalFinal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-10">
          <PaypalBut 
            amount={totalFinal.toFixed(2)} 
            idComanda={idComanda} 
            desglose={datosParaPago} 
          />
        </div>
      </div>
    </div>
  );
}