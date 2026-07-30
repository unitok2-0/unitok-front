import ButtonPrimary from 'components/Buttons/ButtonPrimary';

import * as StylesDefault from '../../styles';
import * as StylesSpecific from './styles';

type IWellcomeStepProps = {
  deviceType?: "PETS" | "CARD" | "TAG";
  onNextClick: () => void;
  onBackClick: () => void;
}

export function WellcomeStep({ deviceType  = "CARD", onNextClick, onBackClick }: IWellcomeStepProps) {

  const renderText = (deviceType: "PETS" | "CARD" | "TAG") => {
    if(deviceType === "PETS") {
      return (
        <StylesDefault.Text>
          Com o seu dispositivo em mãos, <br />
          escaneie o QR Code para ativá-lo <br />
          e crie o perfil do seu pet. <br /><br />

          Depois, edite e compartilhe quando<br /> 
          e com quem quiser!
        </StylesDefault.Text>
      )
    } else {
      return (
        <StylesDefault.Text>
          Com o seu dispositivo em mãos, <br />
          escaneie o QR Code para ativá-lo <br />
          e crie o seu perfil Unitok. <br /><br />

          Depois, edite e compartilhe quando<br /> 
          e com quem quiser!
        </StylesDefault.Text>
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
          
          <StylesDefault.ButtonBack 
            onClick={onBackClick}
            id="back"
          >Voltar</StylesDefault.ButtonBack>
      </StylesDefault.Header>
      <StylesSpecific.StepsContainer>
        <StylesDefault.Title style={{ marginTop: '3.5rem' }}>Olá!</StylesDefault.Title>

        {renderText(deviceType)}

        <ButtonPrimary 
          onClick={onNextClick} 
          className='active-button' 
          fullWidth 
          style={{ width: '80%', marginTop: '2rem' }}
        >Escanear QR Code</ButtonPrimary>
      </StylesSpecific.StepsContainer>
    </>
  )
}