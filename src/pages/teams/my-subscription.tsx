import { parseCookies } from "nookies";
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import styled from 'styled-components'

import ButtonLink from "components/Buttons/ButtonLink";
import { Heading, Text } from "components/Typography";
import DashbardContainer from "containers/dashboard";
import { getUsers } from "services/user";
import { withSSRAuth } from "utils/withSSRAuth";

const Flex = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 2rem;
  font-weight: 500;

  small {
    color: #909692;
  }
`

export default function MySubscription(users: any) {
  const [amountOfUsers, setAmountOfUsers] = useState(0)
  const SubscriptionValue = 7990 // will be set in .env or something else

 useEffect(() => {
  setAmountOfUsers(users.users.length)
 },[])

 const total = (amountOfUsers * SubscriptionValue) / 100;
 const formatedValue = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(total)

  return(
    <>
      <DashbardContainer variant="teams-admin" title="Minha assinatura">
        <Heading>Assinatura</Heading>
        <Flex>
          <div>
            <small>USUÁRIOS</small>
            <Text extendStyle={"font-weight: 500"}>{amountOfUsers}</Text>
            <ButtonLink 
              as='a'
              styleProp={"font-weight: 500; margin-top: 1rem"} 
              variant="tertiary"
              href='https://api.whatsapp.com/send?phone=5508004550800'
              target="_blank"
            >
              Fazer upgrade
            </ButtonLink>
          </div>

          <div>
            <small>VALOR</small>
            <Text extendStyle={"font-weight: 500"}>{formatedValue}</Text>
          </div>
        </Flex>
      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const cookies = parseCookies(context);
  const token = cookies['unitok.token'];
  const decoded = jwt_decode(token);
  const administratorId = decoded['_id'];

  const users = await getUsers({ context, administratorId });

  return {
    props: {
      users: users.payload
    },
  };
}, {
  roles: ["TEAMS_ADMIN"]
});
