'use client';

import { useState } from 'react';
import { loginUsuario } from './actions'; // Importamos la lógica del servidor

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const datosFormulario = Object.fromEntries(formData.entries());
  console.log("Datos enviados:", datosFormulario);
    const resultado = await loginUsuario(formData);

    if (resultado?.error) {
      setError(resultado.error);
      setLoading(false);
      
    } else {
      // Si el login es exitoso, redirigimos al dashboard de la veterinaria
      window.location.href = '/hostess';
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sistema Veterinaria - Login
        </h1>
        
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          Acceso exclusivo para personal de la clínica
        </p>
      </div>
    </div>
  );
}