import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRAuthConarh<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['unitokConarh.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/conarh2022/login',
          permanent: false,
        }
      }
    }

    return await fn(context);
  }
}