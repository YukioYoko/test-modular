// app/cuenta/page.tsx
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PaypalBut from '@/components/paypal/PaypalBut';


export default async function CuentaPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

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

  const desglose = comanda.detalles.map(detalle => {
    const precioBase = Number(detalle.producto.precio);
    // Suma de precios de aditamentos
    const precioExtras = detalle.aditamentos.reduce((acc, a) => acc + (a.aditamento.precio || 0), 0);
    const subtotalPorUnidad = precioBase + precioExtras;
    const subtotalItem = subtotalPorUnidad * detalle.cantidad;
    
    totalFinal += subtotalItem;

    return {
      nombre: detalle.producto.nombre,
      cantidad: detalle.cantidad,
      precioUnitario: subtotalPorUnidad,
      subtotal: subtotalItem,
      extras: detalle.aditamentos.map(a => ({
        nombre: a.aditamento.nombre,
        precio: a.aditamento.precio
      }))
    };
  });

  // Cálculos de impuestos (Precios ya incluyen IVA)
  const subtotalFiscal = totalFinal / 1.16;
  const ivaTotal = totalFinal - subtotalFiscal;

  const datosFinancieros = {
    sub_total: subtotalFiscal,
    ivaTotal: ivaTotal,
    total: totalFinal
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-md mx-auto p-6">
        {/* ... Header ... */}

        <div className="space-y-6 mb-10">
          {desglose.map((item, index) => (
            <div key={index} className="border-b border-slate-50 pb-4">
              <div className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <span className="font-bold text-slate-900">{item.cantidad}x {item.nombre}</span>
                  {item.extras.map((extra, i) => (
                    <div key={i} className="flex justify-between text-[11px] text-slate-500 ml-6 italic">
                      <span>+ {extra.nombre}</span>
                      <span>${extra.precio?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <span className="font-bold text-slate-900">${item.subtotal.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen Final con Impuestos Desglosados */}
        <div className="border-t-2 border-slate-900 pt-6 space-y-2">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal (sin IVA)</span>
            <span>${subtotalFiscal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>IVA (16%)</span>
            <span>${ivaTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-dashed border-slate-200">
            <span>TOTAL</span>
            <span>${totalFinal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8">
           <PaypalBut 
          amount={totalFinal.toFixed(2)} 
          idComanda={idComanda} 
          desglose={datosFinancieros} 
        />
        </div>
      </div>
    </div>
  );
}