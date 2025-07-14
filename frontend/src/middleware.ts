// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas públicas que não requerem sessão:
  const publicPaths = ['/login', '/_next/', '/favicon.ico'];

  // Se for caminho público, libera:
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verifica cookie de sessão do Express (connect.sid)
  const sessionCookie = req.cookies.get('connect.sid');
  if (!sessionCookie) {
    // Redireciona para /login se não estiver autenticado
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // Autenticado, segue normalmente
  return NextResponse.next();
}

// Aplica o middleware somente nas rotas protegidas:
export const config = {
  matcher: ['/', '/produto/:path*'],
};