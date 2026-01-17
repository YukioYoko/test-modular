

import {NavBar} from '@/components'


export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar/>
      <main>
        
        {children}
      </main>
    </div>
  );
}