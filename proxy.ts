import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session_user');
  const { pathname } = request.nextUrl;

  // 1. EXCEPCIONES: Permitir siempre el acceso a la página de login
  if (pathname === '/login') {
    // Si ya tiene sesión y trata de ir al login, lo mandamos a su ruta base
    if (session) {
      try {
        const user = JSON.parse(session.value);
        const rol = user.rol?.toLowerCase();
        if (rol === 'admin') return NextResponse.redirect(new URL('/home', request.url));
        return NextResponse.redirect(new URL(`/${rol}`, request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2. PROTECCIÓN GLOBAL: Si no hay sesión, todos al login
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const userData = JSON.parse(session.value);
    const rol = userData.rol?.toLowerCase();

    // ==========================================
    // REGLAS POR JERARQUÍA
    // ==========================================

    // A. El ADMIN puede entrar a TODO (no aplicamos filtros de restricción)
    if (rol === 'admin') {
      return NextResponse.next();
    }

    // B. REGLAS PARA HOSTESS
    if (pathname.startsWith('/hostess')) {
      if (rol === 'hostess') return NextResponse.next();
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

    // C. REGLAS PARA COCINA
    if (pathname.startsWith('/cocina')) {
      if (rol === 'cocina') return NextResponse.next();
      //return NextResponse.redirect(new URL(`/${rol}`, request.url));
      return NextResponse.redirect(new URL('/login', request.url));
    }

     if (pathname.startsWith('/cocinero')) {
      if (rol === 'cocina') return NextResponse.next();
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

    // D. RUTAS DE ADMINISTRACIÓN (Ventas, Productos, Home)
    // Bloqueamos estas rutas para cualquier rol que NO sea admin
    const rutasPrivadasAdmin = ['/home', '/ventas', '/productos', '/usuarios'];
    const intentaEntrarAAdmin = rutasPrivadasAdmin.some(ruta => pathname.startsWith(ruta));

    if (intentaEntrarAAdmin && rol !== 'admin') {
      // Si un Hostess o Cocina intenta entrar aquí, lo mandamos a SU página operativa
      return NextResponse.redirect(new URL(`/${rol}`, request.url));
    }

  } catch (error) {
    // Si la cookie está corrupta o no es un JSON válido
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session_user');
    return response;
  }

  return NextResponse.next();
}

// CONFIGURACIÓN DEL FILTRO
export const config = {
  matcher: [
    /*
     * Protege todas las rutas de la app excepto:
     * - api (rutas de servidor)
     * - _next/static y _next/image (archivos de sistema)
     * - favicon.ico y archivos en public
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};