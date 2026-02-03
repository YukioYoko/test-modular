'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginUsuario } from './actions';

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  /* =========================
     CARGAR TEMA GUARDADO
  ========================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  /* =========================
     GUARDAR TEMA
  ========================= */
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  async function clientAction(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginUsuario(formData);
      if (result?.success) {
        if (result.rol === 'hostess') router.push('/hostess');
        else if (result.rol === 'admin') router.push('/home');
        else if (result.rol === 'cocina') router.push('/cocina');
        router.refresh();
      } else {
        setError(result?.error || 'Credenciales inválidas');
      }
    });
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-app transition-theme min-h-screen flex items-center justify-center p-4 ">
        <div className="relative w-full max-w-5xl bg-card transition-theme rounded-[3rem] shadow-2xl  flex flex-col md:flex-row overflow-hidden">

          {/* TOGGLE */}
          <div className="absolute top-8 right-10 z-20">
            <button
              onClick={toggleTheme}
              className={`w-14 h-7 rounded-full transition-all flex items-center px-1 ${isDark ? 'bg-green-grad' : 'bg-green-grad'}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center text-[10px]
                ${isDark ? 'translate-x-7' : 'translate-x-0'}`}
              >
                {isDark ? '🌙' : '☀️'}
              </div>
            </button>
          </div>

          {/* PANEL IZQUIERDO */}
          <div className="relative w-full md:w-[45%] h-75 md:h-162 p-12 flex flex-col justify-between overflow-hidden">
            <div
              className={`absolute inset-0 ${isDark ? 'bg-green-grad' : 'bg-green-grad'} `}
              style={{
                clipPath:
                  'polygon( 0% 0%, 0% 0%, 100% 0%, 86% 100%, 0% 100%)',
              }}
            />
            <h1 className= {`font-(family-name:--tanker) relative text-8xl ${isDark ? 'text-(--militar-green)' : 'text-white'} `}>
              FOODLIFY
            </h1>

            <p className= {` relative text-2xl leading-tight font-(family-name:--satoshi) font-bold ${isDark ? 'text-(--militar-green)' : 'text-white'}`}>
              Control total sobre tu <br /> restaurante
            </p>
          </div>

          {/* FORM */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-sm mx-auto space-y-8">
              <h2 className="text-4xl font-bold text-center font-(family-name:--satoshi) mb-15">Welcome back!</h2>

              <form action={clientAction} className="space-y-6">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={` border-solid border-gray-200 border-2 outline-none transition-theme w-full px-6 py-4 rounded-2xl focus:ring-3 focus:ring-(--mint-green) focus:border-none ${isDark ? 'text-white' : 'text-gray-500'} `}
                />

                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className={`border-solid border-gray-200 border-2 transition-theme w-full px-6 py-4 rounded-2xl outline-none focus:ring-3 focus:ring-(--mint-green) focus:border-none ${isDark ? 'text-white' : 'text-gray-500'}`}
                />

                {error && (
                  <div className="text-red-600 text-sm font-bold">
                    {error}
                  </div>
                )}

                <div className="flex justify-center mt-10">
                  <button
                    type="submit"
                    disabled={isPending}
                    className={`w-40 py-3 font-(family-name:--satoshi) text-lg rounded-full text-(--dark-green) ring-2 ring-(--mint-green) hover:opacity-80 transition-all  `}
                  >
                    {isPending ? 'LOGGING IN...' : 'Log in'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
