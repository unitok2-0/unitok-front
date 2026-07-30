import styled from 'styled-components';

export const MainModal = styled.main`
  background-color: #FFFFFF;
  height: 100%;
  width: 29rem;
  border-radius: 10px;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 425px) {
    height: 80vh;
    width: 100vw;
  }
`

export const HeaderModal = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
  place-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #EFF2F2;
  width: 100%;
  height: 80px;
  padding: 0.5rem 0;
`

type IconsStepProps = {
  step: number
}

export const IconsStep = styled.div<IconsStepProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  .iconPhone {
    margin: 0 10px;
    opacity: ${props => props.step === 1 ? '1' : '0.3'};
    color: ${props => props.step === 1 ? '#FF4C1C' : '#383D3B'};
  }

  .iconLocation {
    margin: 0 10px;
    opacity: ${props => props.step === 2 || props.step === 3 ? '1' : '0.3'};
    color: ${props => props.step === 2 || props.step === 3 ? '#FF4C1C' : '#383D3B'};
  }

  .iconUser {
    margin: 0 10px;
    opacity: ${props => props.step === 4 ? '1' : '0.3'};
    color: ${props => props.step === 4 ? '#FF4C1C' : '#383D3B'};
  }

`

export const ImageLogo = styled.div`
  max-width: 70px;
  width: 100%;

  img{
    width: 100%;
  }
`



export const InputsContact = styled.form`
  width: 100%;
  display: grid;
  grid-gap: 35px;
`
export const TextModalLocation = styled.p`
  text-align: left;
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  color: #01302F;
`

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
`

export const CloseButton = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  color: #FF4C1C;

  display: none;

  @media (max-width: 425px){
    display: flex;
  }
`


export const ContainerStep4 = styled.div`
  display: grid;
  place-items: center;
`
