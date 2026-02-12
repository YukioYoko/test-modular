export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PaypalBut from '@/components/paypal/PaypalBut';
import { registrarPagoEfectivo } from './action';

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

  let acumuladoTotal = 0;

  // 1. Mapeo de items con redondeo por línea
  const itemsTicket = comanda.detalles.map(detalle => {
    const precioBase = Number(detalle.producto.precio);
    const precioExtras = detalle.aditamentos.reduce((acc, a) => acc + Number(a.aditamento.precio || 0), 0);
    
    // Calculamos y redondeamos el subtotal de esta línea a 2 decimales
    const subtotalItem = Math.round(((precioBase + precioExtras) * detalle.cantidad) * 100) / 100;
    acumuladoTotal += subtotalItem;

    return {
      nombre: detalle.producto.nombre,
      cantidad: detalle.cantidad,
      subtotal: subtotalItem,
      extras: detalle.aditamentos.map(a => ({
        nombre: a.aditamento.nombre,
        precio: Number(a.aditamento.precio)
      }))
    };
  });

  // --- CÁLCULOS FINANCIEROS (Ajuste de Calce) ---
  
  // Total absoluto redondeado
  const totalFinal = Math.round(acumuladoTotal * 100) / 100;

  // Calculamos el IVA y redondeamos
  const ivaTotal = Math.round((totalFinal - (totalFinal / 1.16)) * 100) / 100;

  // El Subtotal se obtiene restando el IVA del Total para garantizar que coincidan
  const subtotalFiscal = Math.round((totalFinal - ivaTotal) * 100) / 100;

  const datosParaPago = {
    sub_total: subtotalFiscal,
    ivaTotal: ivaTotal,
    total: totalFinal
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <div className="max-w-md mx-auto p-6">
        
        {/* HEADER ESTILO TICKET */}
        <header className="text-center mb-10">
          <div className="inline-block bg-black text-white px-4 py-1 mb-4 text-[10px] font-black uppercase tracking-[0.3em]">
            Foodlify Receipt
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">CUENTA</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Comanda #{idComanda} • Mesa {comanda.id_mesa}
          </p>
          <div className="border-b-2 border-dashed border-slate-200 mt-6"></div>
        </header>

        {/* LISTA DE PRODUCTOS */}
        <div className="space-y-6 mb-10">
          {itemsTicket.map((item, index) => (
            <div key={index} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-400 text-xs">{item.cantidad}x</span>
                  <p className="font-bold text-slate-900 uppercase tracking-tight">{item.nombre}</p>
                </div>
                {item.extras.map((ex, i) => (
                  <div key={i} className="flex justify-between text-[10px] text-slate-400 ml-6 mt-1 italic font-medium">
                    <span>+ {ex.nombre}</span>
                    <span>${ex.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <span className="font-black text-slate-900 ml-4 tracking-tighter">
                ${item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* DESGLOSE FINAL */}
        <div className="border-t-4 border-slate-900 pt-6 space-y-3">
          <div className="flex justify-between text-slate-500 text-[10px] font-black tracking-widest uppercase">
            <span>Subtotal (Base Gravable)</span>
            <span>${datosParaPago.sub_total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-[10px] font-black tracking-widest uppercase">
            <span>IVA Trasladado (16%)</span>
            <span>${datosParaPago.ivaTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-2xl font-black text-slate-900 pt-4 border-t border-dashed border-slate-200 mt-2">
            <span className="italic tracking-tighter">TOTAL</span>
            <span className="tracking-tighter">${datosParaPago.total.toFixed(2)}</span>
          </div>
        </div>

        {/* BOTÓN DE PAGO */}
        <div className="mt-12 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <p className="text-[9px] font-black text-center text-slate-400 uppercase tracking-[0.2em] mb-4">
            Procesamiento de Pago Seguro
          </p>
          {/* NUEVO COMPONENTE */}
  <BotonEfectivo 
    idComanda={idComanda} 
    desglose={datosParaPago} 
  />
          <PaypalBut 
            amount={datosParaPago.total.toFixed(2)} 
            idComanda={idComanda} 
            desglose={datosParaPago} 
          />
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            ¡Gracias por tu preferencia!
          </p>
        </footer>
      </div>
    </div>
  );
}