import React from 'react';
import Head from 'next/head'
import HeaderProfile from '../../components/Headers/HeaderProfile';
import ViewerProfile from '../../containers/home/ViewerProfile';
import SkeletonHome from '../../containers/home/SkeletonHome';

import { FirstScreen } from 'components/HomeModules/Module1/styles';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { useAuth } from '../../contexts/AuthContext';


const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Adbat</title>
      </Head>
      <FirstScreen>
        <HeaderProfile />

        {!user ? <SkeletonHome /> : <ViewerProfile />}

      </FirstScreen>
    </>
  )
}

export default Home;

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {},
  }
})