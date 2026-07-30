import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['unitok.token'];

    if (token) {
      return {
        redirect: {
          destination: '/profile/me',
          permanent: false,
        }
      }
    }

    return await fn(context);
  }
}