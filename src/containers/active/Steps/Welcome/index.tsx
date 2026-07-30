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
  console.log(teamsUser)

  return (
    <Container>
      {teamsUser && <Avatar imageUrl={url} />}
      <span>

        <Title>Olá!</Title>
        <Title>Seja bem-vindo.</Title>

        <Text>
          {deviceType === "PETS" &&
            <>
              {`Vamos ativar o seu pingente para \n você acessar o perfil do seu pet.`}
            </>
          }
          {deviceType !== "PETS" &&
            <>
              {`Vamos ativar o seu Unitok e \n criar um login para acessar o seu perfil.`}
            </>
          }
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
