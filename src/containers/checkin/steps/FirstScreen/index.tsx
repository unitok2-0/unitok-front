import { Heading, Text } from 'components/Typography';
import { Container, TextContainer, ButtonsContainer, ButtonsStyle } from './styles';
import PrimaryButton from '../../../../components/Buttons/ButtonPrimary'
import { CurrentScreen } from 'containers/checkin';
import Link from 'next/link'

interface FirstScreenProps {
  setCurrentComponent: (component: CurrentScreen) => void;
}

export function FirstScreen({ setCurrentComponent }: FirstScreenProps) {

  return (
    <Container>
      <TextContainer>
        <Heading>Antes de tudo!</Heading>
        <Text>Você está participando do evento como visitante ou congressista?</Text>
      </TextContainer>

      <ButtonsContainer>

        <PrimaryButton styleProp={ButtonsStyle} onClick={() => { setCurrentComponent(CurrentScreen.HAVE_ACTIVATE_CARD) }}>
          Sou congressista
        </PrimaryButton>

        <PrimaryButton styleProp={ButtonsStyle} onClick={() => { setCurrentComponent(CurrentScreen.HAVE_ACCOUNT) }}>
          Sou visitante
        </PrimaryButton>
        <span>

          <Link href={'/conarh2022/login'} className='exhibitor_link'>
            
              Sou expositor
            
          </Link>
        </span>
      </ButtonsContainer>
    </Container>
  );

}