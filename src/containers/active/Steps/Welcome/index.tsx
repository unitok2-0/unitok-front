import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import { getImageUrl } from 'constants/functions';
import { UserProps } from 'domain/User';
import React, { useState } from 'react';

import {
  Title,
  Text,
} from "../../styles";
import { Container } from './styles';

interface WelcomeProps {
  handleNextButton: () => void;
  deviceType: string;
  teamsUser: UserProps;
}

const Welcome: React.FC<WelcomeProps> = ({ handleNextButton, deviceType, teamsUser }) => {
  const url = teamsUser ? getImageUrl(teamsUser?.logoImage) : '/assets/default_logo.svg'

  // Só é possível ativar dispositivos PETS hoje — outros tipos de QR code
  // (CARD, TAG, STICKER) caem nessa mensagem em vez do fluxo de ativação.
  if (deviceType !== "PETS") {
    return (
      <Container>
        {teamsUser && <Avatar imageUrl={url} />}
        <span>
          <Title>Olá!</Title>

          <Text>
            Esse serviço está indisponível no momento.
          </Text>
        </span>
      </Container>
    )
  }

  return (
    <Container>
      {teamsUser && <Avatar imageUrl={url} />}
      <span>

        <Title>Olá!</Title>
        <Title>Seja bem-vindo.</Title>

        <Text>
          {`Vamos ativar o seu pingente para \n você acessar o perfil do seu pet.`}
        </Text>

        <Text>
          E depois, edite e compartilhe quando e com quem quiser!
        </Text>

        <ButtonPrimary onClick={handleNextButton} className='active-button' fullWidth style={{ maxWidth: "82%" }}>Ativar dispositivo</ButtonPrimary>
      </span>
    </Container>
  )
}

export default Welcome;
