import styled from 'styled-components';

export const MainModal = styled.main`
  background-color: #FFFFFF;
  height: 38.5rem;
  width: 29rem;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  @media (max-width: 425px) {
    height: 100vh;
    width: 100vw;
  }
`

export const ContainerOverFlow = styled.div`
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #FF4C1C;
    border-radius: 20px;
    border: 1px solid #FF4C1C;
  }
`

export const CloseModal = styled.div`
  position: absolute;
  right: 40px;
  top: 35px;
  color: #FF4C1C;
  cursor: pointer;
`
