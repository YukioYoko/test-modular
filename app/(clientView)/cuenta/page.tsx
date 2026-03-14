export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PaypalBut from '@/components/paypal/PaypalBut';
import BotonEfectivo from '@/components/botonEfectivo/BotonEfectivo';
import SincronizadorCuenta from '@/components/sincronizadorCuenta/SincronizadorCuenta';
import { ShoppingBag } from 'lucide-react'; // Opcional para el icono

export default async function CuentaPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ comanda: string, token?: string }> 
}) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  if (!idComanda || !token) redirect('/login');

  const comanda = await prisma.comandas.findFirst({
    where: { 
      id_comanda: idComanda, 
      token: token, 
      estado: 'Abierta' 
    },
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

  // --- LÓGICA DE VERIFICACIÓN DE CONTENIDO ---
  const tieneProductos = comanda.detalles.length > 0;

  let acumuladoTotal = 0;

  const itemsTicket = comanda.detalles.map(detalle => {
    const precioBase = Number(detalle.producto.precio);
    const precioExtras = detalle.aditamentos.reduce(
      (acc, a) => acc + Number(a.aditamento.precio || 0), 0
    );
    
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

  const totalFinal = Math.round(acumuladoTotal * 100) / 100;
  const ivaTotal = Math.round((totalFinal - (totalFinal / 1.16)) * 100) / 100;
  const subtotalFiscal = Math.round((totalFinal - ivaTotal) * 100) / 100;

  const datosParaPago = {
    sub_total: subtotalFiscal,
    ivaTotal: ivaTotal,
    total: totalFinal
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <SincronizadorCuenta idComanda={idComanda ?? 0} />

      <div className="max-w-md mx-auto p-6">
        
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

        {/* LISTADO DE PRODUCTOS O MENSAJE DE VACÍO */}
        {tieneProductos ? (
          <div className="space-y-6 mb-10 animate-in fade-in duration-500">
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
        ) : (
          <div className="text-center py-12 px-4 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200 mb-10">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="text-slate-300" size={24} />
            </div>
            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Tu cuenta está vacía</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">
              Agrega productos del menú para poder realizar el pago
            </p>
          </div>
        )}

        {/* DESGLOSE FINAL - Solo se muestra si hay productos */}
        {tieneProductos && (
          <div className="border-t-4 border-slate-900 pt-6 space-y-3 animate-in slide-in-from-bottom-2 duration-500">
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
        )}

        {/* SECCIÓN DE PAGO CONDICIONAL */}
        {tieneProductos ? (
          <div className="mt-12 bg-slate-50 p-4 rounded-3xl border border-slate-100 animate-in fade-in zoom-in duration-500">
            <p className="text-[9px] font-black text-center text-slate-400 uppercase tracking-[0.2em] mb-4">
              Procesamiento de Pago Seguro
            </p>
            
            <div className="flex flex-col gap-4">
              <BotonEfectivo 
                idComanda={idComanda} 
                desglose={datosParaPago} 
              />
              <div className="relative z-10">
                <PaypalBut 
                  amount={datosParaPago.total.toFixed(2)} 
                  idComanda={idComanda} 
                  desglose={datosParaPago} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <button 
              disabled
              className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] cursor-not-allowed border border-slate-200"
            >
              Módulo de pago inactivo
            </button>
          </div>
        )}

        <footer className="mt-10 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            {tieneProductos ? '¡Gracias por tu preferencia!' : 'Foodlify System'}
          </p>
        </footer>
      </div>
    </div>
  );
}