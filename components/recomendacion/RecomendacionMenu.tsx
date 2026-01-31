import React from 'react'

export default function RecomendacionMenu() {
  return (
    <div className=''>

      <div className='flex justify-left align-center mb-3'>
        <h3
          className={` font-(family-name:--satoshi) text-2xl font-bold text-left mb-3`}
        >Recomendaciones</h3>
      </div>

      <div
        className=' p-4 bg-(--militar-green) rounded-2xl shadow-md flex justify-center items-center gap-24 mb-6'>
        <img src="#" alt="Foto de comida" className='bg-none'></img>
        <div
          className='text-white font-family-(family-name:--satoshi) flex flex-col'
        >
          <p className='' >Descuento 20%</p>
          <p className='text-gray-400'>Ver mas..</p>
        </div>
      </div>
    </div>
  )
}
