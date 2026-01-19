

import {Header, NavBar} from '@/components'


export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar/>
      <Header/>
      <main>
        
        {children}
      </main>
    </div>
  );
}