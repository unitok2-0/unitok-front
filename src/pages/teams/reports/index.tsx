import Head from 'next/head'
import React from 'react'
import jwt_decode from 'jwt-decode';

import DashboardContainer from "containers/dashboard";
import { withSSRAuth } from 'utils/withSSRAuth';
import { adminGetContactsGroupedByDate } from 'services/user';
import TeamsReportsContainer from 'containers/teamsReports';
import { adminGetAnalyticsGroupedByDate } from 'services/analytics';
import { parseCookies } from 'nookies';
import { getTeamsGroups } from 'services/teamsGroup';
import { TeamsGroupProps } from 'domain/TeamsGroup';

interface ITeamsReports {
  groups: TeamsGroupProps[];
  groupedContacts: {
    _id: string;
    count: number
  }[];
  groupedAnalytics: {
    _id: string;
    count: number
  }[];
}

export default function TeamsReports({ groupedContacts, groupedAnalytics, groups }: ITeamsReports) {
  return (
    <>
      <Head>
        <title>Relatórios | Unitok</title>
      </Head>
      <DashboardContainer variant="teams-admin" title="Relatórios">
        <TeamsReportsContainer 
        groupedAnalytics={groupedAnalytics} 
        groupedContacts={groupedContacts} 
        groups={groups}
        />
      </DashboardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const cookies = parseCookies(context);
  const token = cookies['unitok.token'];
  const decoded = jwt_decode(token);
  const administratorId = decoded['_id'];

  const groups = await getTeamsGroups({ context, administratorId });
  
  const groupedAnalytics = await adminGetAnalyticsGroupedByDate({ context });

  const groupedContacts = await adminGetContactsGroupedByDate({ context });

  return {
    props: {
      groupedContacts,
      groupedAnalytics,
      groups
    },
  };
}, {
  roles: ["TEAMS_ADMIN"]
});
