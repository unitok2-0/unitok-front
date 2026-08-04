import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addNewDevice } from 'services/user';

import {
  Title,
} from "../../styles";
import { Container } from './styles';

interface HaveAccountProps {
  handleNextButton: () => void;
  isAuthenticated: boolean;
  codeId: string;
}

export type IDevice = {
  _id: string;
  blocked: boolean;
  name: string;
  device_type: string;
}

const HaveAccount: React.FC<HaveAccountProps> = ({ isAuthenticated, handleNextButton, codeId }) => {
  const router = useRouter();

  const handleHaveAccount = () => {
    if (isAuthenticated && codeId) {
      addNewDevice({ qrcode_link: codeId }).then(({ data }) => {
        const newDevice = data?.qrcode;
        if (newDevice && newDevice.device_type === "PETS")
          router.push('/profile/pet-edit/' + newDevice._id)
        else
          router.push('/profile/mydevices')
      }).catch(err => {
        console.error('Erro ao ativar dispositivo', err);
        toast.error(`Erro ao ativar dispositivo. ${err}`);
      })
    }
    else
      router.push({ pathname: '/login', query: { codeId } });
  }

  return (
    <Container>
      <Title>Como deseja entrar em <br></br>nossa plataforma?</Title>
      <div className='gap-1 mt-8'>
        <ButtonPrimary
          onClick={handleHaveAccount}
          className='active-button'
          fullWidth
        >
          Usar uma conta existente
        </ButtonPrimary>
        <ButtonPrimary
          variant='secondary'
          onClick={handleNextButton}
          className='active-button'
          fullWidth
        >
          Criar uma nova conta
        </ButtonPrimary>
      </div>
    </Container>
  )
}

export default HaveAccount;
