

import {Header} from '@/components'


export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      
      <Header/>
      <main className='bg-orange-grad'>
        
        {children}
      </main>
    </div>
  );
}