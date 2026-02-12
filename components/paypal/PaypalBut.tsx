'use client'

import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { registrarPagoExitoso } from "../../app/(clientView)/cuenta/action";

interface Props {
  amount: string;
  idComanda: number;
  desglose: {
    sub_total: number;
    ivaTotal: number;
    total: number;
  };
}

export default function PaypalBut({ amount, idComanda, desglose }: Props) {
  const router = useRouter();
  const [{ isPending }] = usePayPalScriptReducer();
  const [showGratitude, setShowGratitude] = useState(false);

  const cerrarYAvanzar = () => {
    setShowGratitude(false);
    router.push('/hostess'); // Redirección a hostess tras el éxito
  };

  if (isPending) return <div className="h-14 w-full bg-slate-100 animate-pulse rounded-2xl" />;

  return (
    <>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
              description: `Pago Foodlify Comanda #${idComanda}`,
              amount: { 
                currency_code: "MXN", 
                value: amount 
              }
            }]
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            try {
              const details = await actions.order.capture();
              
              // Llamada al Server Action para registrar en DB y liberar mesa
              const result = await registrarPagoExitoso(
                idComanda, 
                details.id ?? "ID_PENDIENTE", 
                desglose
              );

              if (result.success) {
                setShowGratitude(true); // Activamos el modal de agradecimiento
              } else {
                alert(`Error en sistema: ${result.message}`);
              }
            } catch (err) {
              console.error("Error capturando orden:", err);
              alert("Hubo un problema al procesar el pago con PayPal.");
            }
          }
        }}
      />

      {/* MODAL DE AGRADECIMIENTO (Mismo diseño que efectivo) */}
      {showGratitude && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl text-center animate-in zoom-in duration-300 border border-slate-100">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✨</span>
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter mb-2">
              ¡Pago Exitoso!
            </h2>
            
            <p className="text-slate-500 font-medium mb-8">
              Tu pago con PayPal ha sido procesado correctamente. La mesa ha sido liberada. ¡Vuelve pronto!
            </p>

            <button 
              onClick={cerrarYAvanzar}
              className="w-full py-5 bg-(--militar-green) text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Cerrar y Salir
            </button>
          </div>
        </div>
      )}
    </>
  );
}