'use client'

import { AdminHeader } from "@/components";



export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      
      <AdminHeader/>
      <main className=''>
        
        {children}
      </main>
    </div>
  );
}