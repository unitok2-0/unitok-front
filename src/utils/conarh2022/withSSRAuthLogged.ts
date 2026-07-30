import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

import withSSRIsAdmin from "./withSSRIsAdmin";

export function withSSRAuthLogged<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['unitokConarh.token'];

    if (token) {
      const isAdmin = await withSSRIsAdmin(context);

      if (isAdmin) {
        return {
          redirect: {
            destination: '/conarh2022/visits-event',
            permanent: false,
          }
        }
      } else {
        return {
          redirect: {
            destination: '/expositor/dashboard',
            permanent: false,
          }
        }
      }
    }



    return await fn(context);
  }
}