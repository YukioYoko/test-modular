'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
// Importación con ruta relativa física para evitar errores de alias en (groups)
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

  if (isPending) return <div className="h-14 w-full bg-slate-100 animate-pulse rounded-lg" />;

  return (
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
            
            // Llamada al Server Action
            const result = await registrarPagoExitoso(
              idComanda, 
              details.id ?? "ID_PENDIENTE", 
              desglose
            );

            if (result.success) {
              router.push('/hostess'); // O la página de éxito que prefieras
            } else {
              alert("Error: El pago se procesó pero la mesa sigue ocupada. Contacta al mesero.");
            }
          } catch (err) {
            console.error("Error capturando orden:", err);
            alert("Hubo un problema al procesar el pago con PayPal.");
          }
        }
      }}
    />
  );
}