'use client'
import { useState } from 'react'
import { registrarUsuario } from './actions'

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(e.currentTarget)
    const res = await registrarUsuario(formData)

    if (res.success) {
      setMessage({ type: 'success', text: '¡Usuario creado exitosamente!' })
      e.currentTarget.reset()
    } else {
      setMessage({ type: 'error', text: res.error || 'Error desconocido' })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-black text-gray-800 mb-6">Alta de Personal</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre de Usuario</label>
          <input name="usuario" type="text" required className="w-full p-3 bg-gray-50 border rounded-xl outline-orange-400 text-gray-400" placeholder="ej. juan_mesero" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-3 bg-gray-50 border rounded-xl outline-orange-400 text-gray-400" placeholder="correo@restaurante.com" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contraseña</label>
          <input name="password" type="password" required className="w-full p-3 bg-gray-50 border rounded-xl outline-orange-400 text-gray-400" placeholder="••••••••" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rol en el Sistema</label>
          <select name="rol" className="w-full p-3 bg-gray-50 border rounded-xl outline-orange-400 text-gray-400">
            <option value="mesero">Mesero</option>
            <option value="hostess">Hostess</option>
            <option value="admin">Administrador</option>
            <option value="cocina">Cocina</option>
          </select>
        </div>

        {message.text && (
          <p className={`p-3 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? 'REGISTRANDO...' : 'DAR DE ALTA'}
        </button>
      </form>
    </div>
  )
}