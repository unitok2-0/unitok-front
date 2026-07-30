import React from 'react';

import {
  Title,
  Text,
} from "../../styles";
const Welcome: React.FC = () => {
  return (
    <>
      <Title>Olá!</Title>
      <Title>Seja bem-vindo.</Title>
      <Text>{`Vamos ativar o seu cartão e criar\n uma senha para acessar o seu perfil Unitok.`}
      </Text>

      <Text>
        E depois, edite e compartilhe quando e com quem quiser!
      </Text>
    </>
  )
}

export default Welcome;