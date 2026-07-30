import { Heading, Text } from 'components/Typography';
import { Container, TextContainer, ButtonsContainer, ButtonsStyle } from './styles';
import PrimaryButton from '../../../../components/Buttons/ButtonPrimary'
import { CurrentScreen } from 'containers/checkin';
import { FiArrowLeft } from 'react-icons/fi';


interface HaveAccountProps {
  setCurrentComponent: (component: CurrentScreen) => void;
}

export function HaveAccount({ setCurrentComponent }: HaveAccountProps) {

  return (
    <Container>
       <button className='arrow-back'>
        <FiArrowLeft onClick={() => setCurrentComponent(CurrentScreen.FIRST_SCREEN)}/>
      </button>
      <TextContainer>
        <Heading>Você possui uma conta Unitok?</Heading>

      </TextContainer>

      <ButtonsContainer>

        <PrimaryButton onFocus={()=> true} styleProp={ButtonsStyle} onClick={() => { setCurrentComponent(CurrentScreen.LOGIN) }}>
          Sim
        </PrimaryButton>

        <PrimaryButton variant="secondary" styleProp={ButtonsStyle} onClick={() => { setCurrentComponent(CurrentScreen.REGISTER) }}>
          Não
        </PrimaryButton>

      </ButtonsContainer>
    </Container>
  )

}