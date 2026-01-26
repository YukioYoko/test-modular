// components/paypal/PaypalBut.tsx
'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
// Usamos ruta relativa para evitar problemas con el alias @ y (clientView)
import { registrarPagoExitoso } from "../../app/(clientView)/cuenta/action"; 


interface Props {
  amount: string;
  idComanda: number;
  desglose: {
    sub_total: number;
    ivaTotal: number;
    total: number;
  }
}

export default function PaypalBut({ amount, idComanda, desglose }: Props) {
  const router = useRouter();
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) return <div className="h-12 bg-slate-100 animate-pulse rounded" />;

  return (
    <PayPalButtons
      style={{ layout: "vertical", color: "blue", shape: "rect" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [{
            description: `Pago Comanda #${idComanda} - Foodlify`,
            amount: { 
              currency_code: "MXN", // Asegúrate de que coincida con tu cuenta PayPal
              value: amount 
            }
          }]
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          const details = await actions.order.capture();
          
          // Enviamos los datos financieros calculados en el servidor
          const result = await registrarPagoExitoso(
            idComanda, 
            details.id ?? "N/A", 
            desglose
          );
          
          if (result.success) {
            router.push('/hostess'); 
          } else {
            alert("Error en el sistema: el pago se realizó pero la base de datos no se actualizó.");
          }
        }
      }}
    />
  );
}