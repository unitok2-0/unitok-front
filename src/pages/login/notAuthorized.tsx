import { useRouter } from 'next/router';
import React from 'react';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import Header from '../../components/Headers/HeaderInitial';
import { Container, Main, ButtonStyle } from '../../styles/pageStyles/notAuthorized/styles';

// import { Container } from './styles';

const NotAuthorized: React.FC = () => {
  const { back, query } = useRouter()
  const { name = '' } = query

  //@ts-ignore
  const labelName = name?.split(' ')[0] || ''
  return (
    <Main>
      <Header headerOnlyBack />
      <Container>

        <h1>{`Olá ${labelName}!`}</h1>

        <h1>Estamos aguardando seu pagamento para liberar o login do seu perfil</h1>

        <h1>Você irá receber um email com um link de confirmação de cadastro assim que confirmamos seu pagamento.</h1>

        <ButtonPrimary
          textButton="Voltar"
          styleProp={ButtonStyle}
          type="button"
          onClick={() => back()}
        />
      </Container>
    </Main>
  )
}

export default NotAuthorized;