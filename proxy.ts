import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session_user');
  const { pathname } = request.nextUrl;

  // =========================================================
  // 1. EXCEPCIONES: Rutas que NO requieren sesión (Públicas)
  // =========================================================
  
  // Agregamos /menu para que los clientes puedan ver los productos
  const esRutaPublica = pathname === '/login' || pathname.startsWith('/menu');

  if (esRutaPublica) {
    // Si ya tiene sesión y trata de ir al login, lo mandamos a su ruta base
    if (pathname === '/login' && session) {
      try {
        const user = JSON.parse(session.value);
        const rol = user.rol?.toLowerCase();
        if (rol === 'admin') return NextResponse.redirect(new URL('/home', request.url));
        return NextResponse.redirect(new URL(`/${rol}`, request.url));
      } catch {
        return NextResponse.next();
      }
    }
    // Si es /menu o /login sin sesión, permitimos el paso
    return NextResponse.next();
  }

  // =========================================================
  // 2. PROTECCIÓN GLOBAL: Si no hay sesión, todos al login
  // =========================================================
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const userData = JSON.parse(session.value);
    const rol = userData.rol?.toLowerCase();

    // ==========================================
    // REGLAS POR JERARQUÍA (Solo usuarios con sesión)
    // ==========================================

    // A. El ADMIN puede entrar a TODO
    if (rol === 'admin') {
      return NextResponse.next();
    }

    // B. REGLAS PARA HOSTESS
    if (pathname.startsWith('/hostess')) {
      if (rol === 'hostess') return NextResponse.next();
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

    // C. REGLAS PARA COCINA / COCINERO
    if (pathname.startsWith('/cocina') || pathname.startsWith('/cocinero')) {
      if (rol === 'cocina') return NextResponse.next();
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

    // D. RUTAS DE ADMINISTRACIÓN
    const rutasPrivadasAdmin = ['/home', '/ventas', '/productos', '/usuarios'];
    const intentaEntrarAAdmin = rutasPrivadasAdmin.some(ruta => pathname.startsWith(ruta));

    if (intentaEntrarAAdmin && rol !== 'admin') {
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

  } catch (error) {
    // Si la cookie está corrupta
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session_user');
    return response;
  }

  return NextResponse.next();
}

// CONFIGURACIÓN DEL FILTRO
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};