import styled, { css } from 'styled-components';

interface ContainerProps {
  isSucessPage?: boolean;
}

export const Container = styled.form<ContainerProps>`
  height: 100%;
  width: 100%;
  display: grid;
  padding-right: 5rem;  
  padding-top: 4rem;
  grid-template-rows: ${props => props.isSucessPage ? '1fr' : '1fr 4fr 2fr'};
  .divider{
    margin-top: 8px;
    height: 1px;
    background-color: #D0D4D1;
  }

  @media (max-width: 1060px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
  @media (max-width: 580px) {
    padding-top: 0rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`

export const StepAndTitle = styled.div`
  
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;
  padding-top: 2rem;

  #next{
    width: 16rem;
    height: 40px;
    border: none;
    background-color: #FF4C1C;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    transition: background-color 0.20s;
    &:hover{
      background-color: #D14018;
    }
  }
  @media(max-width: 560px){
    justify-content: center;
  }
  @media(max-width: 420px){
    flex-direction: column;
    gap: 0;
    button + button{
      margin-top: 1rem;
      order: -1;
      margin-bottom: 1rem;
    }
  }
`


export const ButtonStyles = css`
  width: 16rem;

  @media(max-width: 560px){
    width: 100%;
  }

`