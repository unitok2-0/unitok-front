import styled, { css } from 'styled-components'
import { Colors } from 'styles/Colors'
import { Theme } from 'styles/Theme'

export const ContainerRegisterExpositor = styled.div`
  display: grid;
  grid-template-rows: 360px 1fr;
`

export const ContainerPhoto = styled.div`
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
  padding: 0 1.8rem;
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  
  h2{
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 3.1rem;
  }
`


export const GroupInputs = styled.div`
  display: grid;
  gap: 48px;
  .passwordInput{
    margin-top: 2.8rem;
    margin-bottom: 4.8rem;
  }
`


export const CheckboxStyles = css`
  text-align: left;
  align-self: flex-end;

  span{
    color: #FF4C1C;
    text-decoration: underline;
  }
`