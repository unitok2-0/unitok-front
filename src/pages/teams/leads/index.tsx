import Head from 'next/head';
import React from 'react';

import DashboardContainer from "containers/dashboard";
import TeamsLeadsContainer from 'containers/teamsLeads';
import { withSSRAuth } from 'utils/withSSRAuth';

export default function TeamsLeadsPage() {
  return (
    <>
      <Head>
        <title>Leads | Unitok</title>
      </Head>
      <DashboardContainer variant="teams-admin">
        <TeamsLeadsContainer />
      </DashboardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return { props: {} }
}, {
  roles: ["TEAMS_ADMIN"]
})