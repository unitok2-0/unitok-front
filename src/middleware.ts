import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Escopo atual do produto é só o módulo de Pets. Os módulos abaixo continuam
// no código (nada foi apagado — Cards/Teams/marketing podem voltar no
// futuro), mas ficam bloqueados: acessar a URL direto (autenticado ou não)
// redireciona pro login (deslogado) ou pro módulo de pets (logado) em vez
// de renderizar a página. `intern-management` fica de fora de propósito —
// continua em uso (gestão de contas/QR codes de pets).

// Páginas sem subrotas — comparadas por igualdade exata (evita prefixo
// colidir com outra rota parecida, ex.: "/tag" vs "/tags").
const DISABLED_EXACT_ROUTES = [
  '/',
  '/index-old',
  '/map',
  '/tag',
  '/tags',
  '/lojas',
  '/eventos',
  '/empresas',
  '/fornecedor',
  '/suporte',
  '/quem-somos',
  '/termos-e-condicoes',
  '/politica-de-privacidade',
  '/reembolso-e-trocas',
  '/ajuda',
  '/ajuda-old',
  '/privacidade',
  '/termos',
  '/cartao-visita',
  '/customizados',
  '/personalizado',
];

// Módulos inteiros (pasta + subrotas) — comparados por prefixo com limite de
// segmento, pra "/home" não bloquear acidentalmente algo como "/homepage".
const DISABLED_ROUTE_PREFIXES = [
  '/profile/contacts',
  '/profile/analytics',
  '/profile/mydevices',
  '/teams',
  '/checkout',
  '/cards',
  '/choice-card',
  '/advancedSettings',
  '/conarh2022',
  '/home',
  '/activePet',
  '/expositor',
  '/ads',
  '/checkin',
];

const LOGIN_ROUTE = '/login';
const PETS_FALLBACK_ROUTE = '/profile/mypets';
const AUTH_COOKIE_NAME = 'unitok.token';

function isDisabledRoute(pathname: string) {
  if (DISABLED_EXACT_ROUTES.includes(pathname)) return true;
  return DISABLED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isDisabledRoute(pathname)) {
    const isLoggedIn = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
    const destination = isLoggedIn ? PETS_FALLBACK_ROUTE : LOGIN_ROUTE;
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/index-old',
    '/map',
    '/tag',
    '/tags',
    '/lojas',
    '/eventos',
    '/empresas',
    '/fornecedor',
    '/suporte',
    '/quem-somos',
    '/termos-e-condicoes',
    '/politica-de-privacidade',
    '/reembolso-e-trocas',
    '/ajuda',
    '/ajuda-old',
    '/privacidade',
    '/termos',
    '/cartao-visita',
    '/customizados',
    '/personalizado',
    '/profile/contacts/:path*',
    '/profile/analytics/:path*',
    '/profile/mydevices/:path*',
    '/teams/:path*',
    '/checkout/:path*',
    '/cards/:path*',
    '/choice-card/:path*',
    '/advancedSettings/:path*',
    '/conarh2022/:path*',
    '/home/:path*',
    '/activePet/:path*',
    '/expositor/:path*',
    '/ads/:path*',
    '/checkin/:path*',
  ],
};
