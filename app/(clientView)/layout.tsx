"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Header } from "@/components";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
          intent: "capture",
          currency: "MXN",
        }}
      >
        <Header />
        <main className="bg-orange-grad">{children}</main>
      </PayPalScriptProvider>
    </div>
  );
}
