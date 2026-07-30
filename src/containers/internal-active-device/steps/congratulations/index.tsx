import ButtonPrimary from 'components/Buttons/ButtonPrimary';

import * as StylesDefault from '../../styles';
import * as StylesSpecific from './styles';

type ICongratulationsStepProps = {
  deviceType?: "PETS" | "CARD" | "TAG";
  onPushToProfileClick: () => void;
}

export function CongratulationsStep({ deviceType = "CARD", onPushToProfileClick }:  ICongratulationsStepProps) {
  const getContent = (deviceType: "PETS" | "CARD" | "TAG") => {
    if(deviceType === "PETS") {
      return (
        <>
          <StylesDefault.Title>Seu pingente foi ativado.</StylesDefault.Title>

          <StylesDefault.Text>
            Agora o perfil do seu pet está pronto <br /> para ser editado e compartilhado!
          </StylesDefault.Text>
        </>
      )
    } else {
      return (
        <>
          <StylesDefault.Title>Seu dispositivo foi ativado.</StylesDefault.Title>

          <StylesDefault.Text>
            Agora o seu perfil está pronto para<br /> ser editado e compartilhado!
          </StylesDefault.Text>
        </>
      )
    }
  }

  return (
    <>
      <StylesDefault.Header>
          <StylesDefault.Logo 
            src="/assets/logo.svg" 
            alt="logo" 
            id="logo" 
          />
      </StylesDefault.Header>
      <StylesSpecific.StepsContainer>
        <img
          src="/assets/icon_check_circle_red.svg"
          alt="Circle"
          style={{width: '3rem', marginTop: '2rem'}}
        />
        
        <StylesDefault.Title style={{ marginTop: '3rem' }}>Oba!</StylesDefault.Title>

        {getContent(deviceType)}

        <ButtonPrimary
          onClick={onPushToProfileClick}
          textButton={deviceType === "PETS" ? "Editar perfil do pet" : "Editar perfil"}
          style={{ marginTop: '2rem' }}
        />
      </StylesSpecific.StepsContainer>
    </>
  )
}