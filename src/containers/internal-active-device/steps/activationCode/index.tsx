import Input from "components/Inputs/Input";
import ButtonPrimary from 'components/Buttons/ButtonPrimary';

import * as StylesDefault from '../../styles';
import * as StylesSpecific from './styles';
import { useState } from "react";
import { toast } from "react-toastify";

type IActivationCodeStepProps = {
  deviceType?: "PETS" | "CARD" | "TAG";
  onBackClick: () => void;
  onValidationCodeValidated: () => void;
}

export function ActivationCodeStep({ deviceType  = "CARD", onBackClick, onValidationCodeValidated }: IActivationCodeStepProps) {
  const [code, setCode] = useState('');

  const validateActivationCode = () => {
    if(Number(code) !== 783316)
      return toast.error('Código inválido!')

    onValidationCodeValidated();
  }

  return (
    <>
      <StylesDefault.Header>
          <StylesDefault.Logo src="/assets/logo.svg" alt="logo" id="logo" />
          
          <StylesDefault.ButtonBack 
            onClick={onBackClick}
            id="back"
          >Voltar</StylesDefault.ButtonBack>
          
          <img src="/images/unitok_ativacao.png" alt="img" id="optional-img"/>
      </StylesDefault.Header>
      <StylesSpecific.StepsContainer>
        <StylesDefault.Title style={{ marginTop: '1rem' }}>Código de ativação</StylesDefault.Title>

        <StylesDefault.Text>
          Informe o código de 6 dígitos que<br /> 
          aparece no envelope que recebeu o<br /> 
          seu {deviceType === 'PETS' ? 'pingente' : 'dispositivo'}:
        </StylesDefault.Text>

        <Input
          id="activationCode"
          label={"Código de ativação"}
          classNameContainer="fullWidth"
          onChange={e => setCode(e.target.value)}
          isWhiteMode
          max={6}
        />

        <ButtonPrimary
          onClick={validateActivationCode}
          className='active-button' 
          fullWidth 
          style={{ width: "50%", marginTop: '2rem', alignSelf: 'end' }}
        >Próximo</ButtonPrimary>
      </StylesSpecific.StepsContainer>
    </>
  )
}