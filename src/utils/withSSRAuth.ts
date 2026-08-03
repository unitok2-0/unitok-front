import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";
import { verifyRole } from "./verifyRole";

type withSSRAuthOptions = {
  roles?: string[],
  redirectAdmin?: boolean
}

// Escopo atual do produto é só o módulo de Pets. Os módulos abaixo continuam
// no código (nada foi apagado — Cards/Teams podem voltar no futuro), mas
// ficam bloqueados: acessar a URL direto redireciona pro módulo de pets em
// vez de renderizar a página. `intern-management` fica de fora dessa lista
// de propósito — continua em uso (gestão de contas/QR codes de pets).
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

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: withSSRAuthOptions) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['unitok.token'];
    const rolesUser = cookies['unitok.user.roles'];

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    const requestPath = context.resolvedUrl.split('?')[0];
    const isDisabledRoute = DISABLED_ROUTE_PREFIXES.some((prefix) => requestPath.startsWith(prefix));

    if (isDisabledRoute) {
      return {
        redirect: {
          destination: PETS_FALLBACK_ROUTE,
          permanent: false,
        }
      }
    }


    if (options?.redirectAdmin && rolesUser) {
      const rolesUserJson = JSON.parse(rolesUser) as Array<String>
      const includeAdmin = rolesUserJson?.includes('ADMIN')

      if (includeAdmin && rolesUserJson.length === 1) {
        return {
          redirect: {
            destination: '/intern-management/accounts',
            permanent: false,
          }
        }
      }
    }

    // if (options?.redirectAdmin && rolesUser) {
    //   const rolesUserJson = JSON.parse(rolesUser) as Array<String>
    //   const includeAdminTeams = rolesUserJson?.includes('TEAMS_ADMIN')

    //   if (includeAdminTeams && rolesUserJson.length === 1) {
    //     return {
    //       redirect: {
    //         destination: '/teams/enterprise-profile',
    //         permanent: false,
    //       }
    //     }
    //   }
    // }

    if (options?.roles && rolesUser) {
      const rolesUserJson = JSON.parse(rolesUser) as Array<string>
      const userPermission = verifyRole(rolesUserJson, options.roles)

      if (!userPermission) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          }
        }
      }
    }

    return await fn(context);
  }
}
