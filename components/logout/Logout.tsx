'use client';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-black text-xs rounded-xl hover:bg-red-600 hover:text-white transition-all group"
    >
      <span>CERRAR SESIÓN</span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </button>
  );
}