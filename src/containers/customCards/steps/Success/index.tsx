import Input from 'components/Inputs/Input'
import { Heading, Text } from 'components/Typography'

import { Container } from './styles'


export function Success() {
  return (
    <Container>
      <img src="/assets/success-icon.svg" alt="Círculo com sinal de visto dentro" />
      <Heading font='titleMdLight'>Sua solicitação foi enviada com sucesso!</Heading>
      <Text>Vamos analisar o seu pedido e, assim que possível, enviaremos um orçamento completo e detalhado para o número informado no preenchimento do formulário. </Text>
    </Container>
  )
}