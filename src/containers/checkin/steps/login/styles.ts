import styled, { css } from 'styled-components'
import { Colors } from 'styles/Colors'

export const ContainerLoginConarh = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 360px 1fr;
`

export const ContainerPhoto = styled.div`
  max-width: 100vw;
  width: 100%;
  background-image: url('/images/conarh2022/Unitok_login_Conarh2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .containerDivision{
    padding: 0 48px;
    padding-left:70px;
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    gap: 2.6rem;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 500px){
      justify-content: flex-end;
    }

    @media (max-width: 340px) {
      flex-direction: column;
    }
  }
`

export const ContainerInput = styled.div`
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 1.8rem;

  h2{
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 3.1rem;
  }
`


export const GroupInputs = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding:0.4rem;
    font-size: 0.875rem;
  }

  .passwordInput{
    margin-top: 2.8rem;
  }

  button {
    max-width: 302px;
    width: 100%;
    height: 40px;
    align-self: center;
    margin-top: 4.5rem;
    font-size: 0.875rem;
    letter-spacing: -2%;
    line-height: 18px;
  }
`
export const TextForgotYourPassword = styled.div`
  text-decoration: underline;
  color: #FF4C1C;
  font-weight: 500;
  cursor: pointer;
`
