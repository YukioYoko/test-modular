// components/navBar/navBar.tsx
'use client'
import { useSearchParams, usePathname } from 'next/navigation'

export const Header= () => {
const params = useSearchParams();
const idComanda = params.get('comanda');
  return (
    <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-black text-orange-600">MENÚ DIGITAL</h1>
        <p className="text-xs text-gray-500">Ordenando para la Comanda #{idComanda}</p>
      </header>
  )
}