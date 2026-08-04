import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Escopo atual do produto é só o módulo de Pets. Os módulos abaixo continuam
// no código (nada foi apagado — Cards/Teams podem voltar no futuro), mas
// ficam bloqueados: acessar a URL direto (autenticado ou não) redireciona
// pro login (deslogado) ou pro módulo de pets (logado) em vez de renderizar
// a página. `intern-management` fica de fora de propósito — continua em uso
// (gestão de contas/QR codes de pets).
const DISABLED_ROUTE_PREFIXES = [
  '/profile/contacts',
  '/profile/analytics',
  '/profile/mydevices',
  '/teams',
  '/checkout',
  '/cards',
  '/choice-card',
  '/customizados',
  '/personalizado',
  '/cartao-visita',
  '/advancedSettings',
  '/conarh2022',
  '/home',
  '/index-old',
  '/activePet',
  '/expositor',
  '/ads',
  '/map',
  '/tag',
  '/checkin',
];

const LOGIN_ROUTE = '/login';
const PETS_FALLBACK_ROUTE = '/profile/mypets';
const AUTH_COOKIE_NAME = 'unitok.token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDisabledRoute = DISABLED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isDisabledRoute) {
    const isLoggedIn = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
    const destination = isLoggedIn ? PETS_FALLBACK_ROUTE : LOGIN_ROUTE;
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/contacts/:path*',
    '/profile/analytics/:path*',
    '/profile/mydevices/:path*',
    '/teams/:path*',
    '/checkout/:path*',
    '/cards/:path*',
    '/choice-card/:path*',
    '/customizados/:path*',
    '/personalizado/:path*',
    '/cartao-visita/:path*',
    '/advancedSettings/:path*',
    '/conarh2022/:path*',
    '/home/:path*',
    '/index-old',
    '/activePet/:path*',
    '/expositor/:path*',
    '/ads/:path*',
    '/map',
    '/tag/:path*',
    '/checkin/:path*',
  ],
};
