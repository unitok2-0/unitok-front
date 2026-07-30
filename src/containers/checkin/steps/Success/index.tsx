import {
  Container,
  ContainerSuccessRegister,
} from "./styles";

import SuccessIcon from '../../../../../public/assets/success.svg';
import { Heading, Text } from "components/Typography";

export function SuccessRegister() {
  return (
    <ContainerSuccessRegister>
      <Container>
        <div><SuccessIcon /></div>
        <Heading>Login realizado com sucesso!</Heading>
        <Text>Agora você já pode marcar presença nos estandes que visitar durante o evento.</Text>
      </Container>
    </ContainerSuccessRegister>
  )
}