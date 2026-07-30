import { Heading, Text } from 'components/Typography';
import { Container, TextContainer, ButtonsContainer, ButtonsStyle, FullScrenContain } from './styles';
import PrimaryButton from '../../../../components/Buttons/ButtonPrimary'
import { useState } from 'react';
import { CurrentScreen } from '../../index'
import { FiArrowLeft } from 'react-icons/fi';




interface HaveActivateCardProps {
  setCurrentComponent: (screen: CurrentScreen) => void;
}


export function HaveActivateCard({ setCurrentComponent }: HaveActivateCardProps) {
  const [internStep, setInternStep] = useState(0);
  return (
    <Container>
       <button className='arrow-back'>
        <FiArrowLeft onClick={() => setCurrentComponent(CurrentScreen.FIRST_SCREEN)}/>
      </button>

      {internStep === 0 ? (
        <>
          <TextContainer>

            <img src="/images/conarh2022/cardABRHUnitok.png" alt="" />

            <Heading>Você já ativou seu cartão ABRH Brasil?</Heading>

          </TextContainer>

          <ButtonsContainer>

            <PrimaryButton styleProp={ButtonsStyle} onClick={() => setCurrentComponent(CurrentScreen.LOGIN)}>
              Sim
            </PrimaryButton>

            <PrimaryButton styleProp={ButtonsStyle} variant='secondary' onClick={() => { setInternStep(1) }} >
              Não
            </PrimaryButton>

          </ButtonsContainer>
        </>
      ) : (
        <FullScrenContain>
          <div>
            <button className='arrow-back'>
              <FiArrowLeft onClick={() => setInternStep(0)}/>
            </button>
            <Heading>Para fazer check-in, ative seu cartão.</Heading>
            <Text>Siga o passo a passo que veio junto com seu cartão ou acesse nosso site para saber como.</Text>
            <PrimaryButton
              as="a"
              href='/conarh2022'
              styleProp={ButtonsStyle}
              style={{ marginTop: "6.5rem" }}
            >
              Ver como ativar
            </PrimaryButton>

          </div>
        </FullScrenContain>
      )}

    </Container>
  )

}