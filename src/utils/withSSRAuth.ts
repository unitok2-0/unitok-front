import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";
import { verifyRole } from "./verifyRole";

type withSSRAuthOptions = {
  roles?: string[],
  redirectAdmin?: boolean
}

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
