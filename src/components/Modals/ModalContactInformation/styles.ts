import styled, { css } from 'styled-components';

type Props = {
  isOpenModal?: boolean;
}


export const ContainerModal = styled.div<Props>`
display: ${props => props.isOpenModal ? 'flex' : 'none'};

flex-direction: column;
align-items: center;
justify-content: center;

max-width: 500px;
width: 100%;
height: 650px;

background-color: #FFFFFF;

@media (max-width: 768px) {
  display: flex;

  max-width: 100vw;
  width: 100%;

  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  visibility: ${props => props.isOpenModal ? 'visible' : 'hidden'};
  height: ${props => props.isOpenModal ? '100vh' : '0px'};

  transition: all 0.3s;
  overflow-y: hidden;
}
`

export const ContainerControllerModal = styled.div`
  position: relative;

  width: 100%;
  height: 10%;
  text-align: center;

  background-color: #EFF2F2;

  .close-icon {
    font-size: 2rem;
    position: absolute;
    right: 10px;
    top: 14px;
    color: #FF4C1C;
    cursor: pointer;

    @media (max-width: 768px) {
      top: 100px;
      right: 21px;
      display: none;
    }

  }

`

export const PositionProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerBody = styled.div`
  display: grid;

  padding: 1rem;
  justify-content: space-around;

  width: 100%;
  height: 90%;

`

export const InputsInformations = styled.div`
  display: grid;
  grid-gap: 30px;
  padding: 2rem 0;

  div{
    border: none;
  }

  @media (max-width: 768px){
    height: 60px;
  }
`

export const ContainerButtons = styled.div`
  display: grid;
  place-items: center;
  grid-gap: 10px;
  height: 120px;
`

export const ButtonDeleteContact = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.75rem;
  font-weight: bold;
  text-decoration: underline;
  color: #FF4C1C;
  padding-top: 1rem;
`

export const CloseButtonMobile = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;

    z-index: 10;
    top: 29px;
    right: 70px;

    background-color: transparent;
    border: none;

    color: #01302F;
    font-size: 0.875rem;
    font-weight: 500;
  }
`
