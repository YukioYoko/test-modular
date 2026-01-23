// app/cuenta/page.tsx
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function CuentaPage({ searchParams }: { searchParams: Promise<{ comanda: string, token?: string }> }) {
  const params = await searchParams;
  const idComanda = parseInt(params.comanda);
  const token = params.token;

  if (!idComanda || !token) redirect('/login');

  // 1. Obtenemos la comanda con todos sus detalles y aditamentos
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
          aditamentos: {
            include: { aditamento: true }
          }
        }
      }
    }
  });

  if (!comanda) redirect('/acceso-denegado');

  // 2. Lógica de cálculo del Total
  let totalAcumulado = 0;

  const desglose = comanda.detalles.map(detalle => {
    const precioBase = Number(detalle.producto.precio);
    const precioExtras = detalle.aditamentos.reduce((acc, a) => acc + (a.aditamento.precio || 0), 0);
    const subtotalItem = (precioBase + precioExtras) * detalle.cantidad;
    
    totalAcumulado += subtotalItem;

    return {
      nombre: detalle.producto.nombre,
      cantidad: detalle.cantidad,
      precioUnitario: precioBase + precioExtras,
      subtotal: subtotalItem,
      extras: detalle.aditamentos.map(a => a.aditamento.nombre)
    };
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-md mx-auto p-6">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">TICKET</h1>
          <p className="text-slate-400 text-sm">Comanda #{idComanda} • Mesa {comanda.id_mesa}</p>
          <div className="border-b-2 border-dashed border-slate-200 mt-4"></div>
        </header>

        {/* Listado de Productos */}
        <div className="space-y-6 mb-10">
          {desglose.map((item, index) => (
            <div key={index} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.cantidad}x</span>
                  <span className="font-medium text-slate-700">{item.nombre}</span>
                </div>
                {item.extras.length > 0 && (
                  <p className="text-[11px] text-slate-400 ml-6 italic">
                    + {item.extras.join(', ')}
                  </p>
                )}
              </div>
              <span className="font-bold text-slate-900 ml-4">
                ${item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Resumen Final */}
        <div className="border-t-2 border-slate-900 pt-6 space-y-2">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal</span>
            <span>${totalAcumulado.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
            <span>TOTAL</span>
            <span>${totalAcumulado.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón de Pago (Simulado) */}
        <div className="mt-12 space-y-4">
          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-[0.98] transition-all">
            Solicitar Cuenta al Mesero
          </button>
          <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Gracias por su visita
          </p>
        </div>
      </div>
    </div>
  );
}