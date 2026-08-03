import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Escopo atual do produto é só o módulo de Pets. Os módulos abaixo continuam
// no código (nada foi apagado — Cards/Teams podem voltar no futuro), mas
// ficam bloqueados: acessar a URL direto (autenticado ou não) redireciona
// pro módulo de pets em vez de renderizar a página. `intern-management` fica
// de fora de propósito — continua em uso (gestão de contas/QR codes de pets).
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
];

const PETS_FALLBACK_ROUTE = '/profile/mypets';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDisabledRoute = DISABLED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isDisabledRoute) {
    return NextResponse.redirect(new URL(PETS_FALLBACK_ROUTE, request.url));
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
  ],
};
