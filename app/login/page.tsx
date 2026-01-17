'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginUsuario } from './actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition(); // Mejor que un state manual
  const router = useRouter();

  async function clientAction(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const resultado = await loginUsuario(formData);

      if (resultado?.error) {
        setError(resultado.error);
      } else if (resultado?.success) {
        // Redirección basada en el rol si es necesario
        if(resultado.rol === "hostess")
          router.push('/hostess');
        if (resultado.rol === "admin")
          router.push('/admin')
        if(resultado.rol === "cocina")
          router.push('/cocina')
        router.refresh(); // Limpia el cache de la ruta
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Restaurante POS</h1>
          <p className="text-slate-500 mt-2">Inicia sesión para acceder al sistema</p>
        </header>
        
        <form action={clientAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              required
              placeholder="chef@restaurante.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-slate-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-slate-800"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 active:scale-[0.98] disabled:bg-orange-300 transition-all shadow-lg shadow-orange-200"
          >
            {isPending ? 'Verificando...' : 'Entrar al Sistema'}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            &copy; 2026 Restaurante Management System
          </p>
        </footer>
      </div>
    </div>
  );
}