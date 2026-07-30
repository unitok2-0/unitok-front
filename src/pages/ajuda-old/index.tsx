import { GetServerSidePropsContext } from 'next';
import Head from 'next/head'


export default function Ajuda() {
  return (
    <>
      <Head>
        <title>Unitok | Ajuda</title>
      </Head>

      <h1>Tutorial Unitok</h1>
    </>
  )
}


export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {

  return {
    redirect: {
      permanent: false,
      destination: `404`,
    }
  }
};
