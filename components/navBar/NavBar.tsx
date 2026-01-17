// components/navBar/navBar.tsx
'use client'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

export const NavBar = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const idComanda = params.get('comanda');
  const token = params.get('token');

  const navLinks = [
    { name: 'Menú', href: '/menu' },
    { name: 'Mi Pedido', href: '/pedido' },
    { name: 'Cuenta', href: '/cuenta' },
  ];

  if (!idComanda || !token) return null; // No mostrar si no hay sesión

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navLinks.map((link) => {
        const fullHref = `${link.href}?comanda=${idComanda}&token=${token}`;
        const isActive = pathname === link.href;
        
        return (
          <Link key={link.name} href={fullHref} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
            {isActive && <div className="w-1 h-1 bg-orange-600 rounded-full" />}
          </Link>
        );
      })}
    </nav>
  )
}