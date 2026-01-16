'use client'
import React from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

export const NavBar = () => {
    const params = useSearchParams();
    const idComanda = params.get('comanda');
    const token = params.get('token');

  return (
    <nav>
        <Link href={`/menu?comanda=${idComanda}&token=${token}`}>
            <span>Heaedr</span>
        </Link>

        <Link href={`/pedido?comanda=${idComanda}&token=${token}`}> Pedido </Link>
        <Link href={`/entrada?comanda=${idComanda}&token=${token}`}> Entradas </Link>
        <Link href={`/platoFuerte?comanda=${idComanda}&token=${token}`}> Plato fuerte </Link>
        <Link href={`/postre?comanda=${idComanda}&token=${token}`}> Postres </Link>
        <Link href={`/bebidas?comanda=${idComanda}&token=${token}`}> Bebidas </Link>

        <Link href={`/cuenta?comanda=${idComanda}&token=${token}`}> Pedido </Link>

    </nav>
  )
}



