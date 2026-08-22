import * as StylesDefault from '../../styles';
import * as StylesSpecific from '../wellcome/styles';

type IBlockedDeviceStepProps = {
  onBackClick: () => void;
}

export function BlockedDeviceStep({ onBackClick }: IBlockedDeviceStepProps) {
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

        <StylesDefault.Text>
          Esse serviço está indisponível no momento.
        </StylesDefault.Text>
      </StylesSpecific.StepsContainer>
    </>
  )
}
