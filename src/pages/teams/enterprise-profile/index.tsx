import Head from "next/head";
import styled from 'styled-components'
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import jwt_decode from 'jwt-decode';
import { parseCookies } from 'nookies';

import DashbardContainer from 'containers/dashboard'

import { AdmProfile } from 'components/AdmProfile';
import { useAuth } from 'contexts/AuthContext';

import { UsersAdminstrationContainer } from 'components/UsersAdminstrationContainer';
import { EnterpriseGroupsContainer } from 'components/EnterpriseGroupsContainer';
import { withSSRAuth } from 'utils/withSSRAuth';
import { getQrcodes } from 'services/user';
import { QRCodeProps } from 'domain/QRCode';
import { getTeamsGroups } from 'services/teamsGroup';
import { TeamsGroupProps } from 'domain/TeamsGroup';
import { ModalTeamsReportLeads } from "components/Modals/ModalTeamsReportLeads";
import { ModalTeamsReportViews } from "components/Modals/ModalTeamsReportViews";

type IEnterpriseProfileProps = {
  qrcodes: QRCodeProps[];
  groups: TeamsGroupProps[];
}

interface ViewButtonProps {
  isActive: boolean;
}

export const Flex = styled.div`
  display: flex;
  margin-top: 4rem;
`

export const ViewButton = styled.button<ViewButtonProps>`
  width: 50%;
  border-bottom: ${props => props.isActive ? "3px solid #FF4C1C" : "3px solid #C4C4C4"};
  color: ${props => props.isActive ? "#FF4C1C" : "#909692"};
  padding-bottom: 0.2rem;
`

export default function EnterpriseProfile({ qrcodes, groups }: IEnterpriseProfileProps) {
  const { user } = useAuth()
  const [viewActive, setViewActive] = useState("users")

  const handleClickUsers = () => {
    setViewActive("users")
  }

  const handleClickGroups = () => {
    setViewActive("groups")
  }

  return (
    <>
      <Head>
        <title>Usuários | Unitok</title>
      </Head>
      <DashbardContainer variant="teams-admin" title="Usuários">
        <AdmProfile user={user} qrcodes={qrcodes} />
        <Flex>
          <ViewButton isActive={viewActive === 'users'} onClick={handleClickUsers}>Usuários</ViewButton>
          <ViewButton isActive={viewActive === 'groups'} onClick={handleClickGroups}>Grupos</ViewButton>
        </Flex>

        {viewActive === "users"
          ? <UsersAdminstrationContainer admin={user} groups={groups} typeView="no-report" />
          : <EnterpriseGroupsContainer admin={user} typeView="no-report"/>
        }
      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const cookies = parseCookies(context);
  const token = cookies['unitok.token'];
  const decoded = jwt_decode(token);
  const administratorId = decoded['_id'];

  const qrCodes = await getQrcodes({ context, administratorId });

  const groups = await getTeamsGroups({ context, administratorId });

  return { props: { qrcodes: qrCodes.payload, groups: groups.payload } }
}, {
  roles: ["TEAMS_ADMIN"]
});
