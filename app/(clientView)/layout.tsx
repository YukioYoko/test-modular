'use client'

import {Header} from '@/components'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PayPalScriptProvider options={{
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
      intent: 'capture',
      currency:'MXN'
    }}>

    
    <div>
  <Header />
      <main className='bg-(--militar-green)'>
        
        {children}
      </main>
    </div>
</PayPalScriptProvider>
  );
}