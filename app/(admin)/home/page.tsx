import React from 'react'

export default function HomePage() {
    return (
        <div className='flex space-x-2 mt-10'>
            <div className='bg-green-200 p-5 h-50 w-80 text-center justify-center'>
                <h2 className='mt-2'>Ventas</h2>
                <span  className='mt-4'>$ cant</span>
                <div className='justify-between w-full space-x-3 mt-4'>
                    <button className='bg-green-100 py-2 px-3'>Dia</button>
                    <button className='bg-green-100 py-2 px-3'>Semana</button>
                    <button className='bg-green-100 py-2 px-3'>Mes</button>
                </div>
            </div>

            <div className='bg-green-200 p-5 h-50 w-80 text-center justify-center'>
                <h2>Personal</h2>
            </div>

            <div className='bg-green-200 p-5 h-50 w-80 text-center justify-center'>
                <h2>Productos + vendidoss</h2>
            </div>
        </div>
    )
}
