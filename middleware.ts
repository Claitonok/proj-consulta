import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

// Obtém o token salvo nos cookies
const token = request.cookies.get("token")?.value;
const { pathname } = request.nextUrl;

// Define as rotas que exigem autenticação
const isProtectedArea = pathname.startsWith("/pages/dashboard");

  // 🔒 Se não houver token, redireciona para a tela de login
  if (isProtectedArea && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
  return NextResponse.next();

}

export const config = {
  matcher: [
    "/pages/ResetPasswordPage/:path*",
    "/pages/dashboard/:path*",
  ],
};