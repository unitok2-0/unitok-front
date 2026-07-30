import styled, { css } from 'styled-components'

type Props = {
  isNextFinish: boolean;
}


export const ContainerRegisterExpositor = styled.div`
  min-height: 100vh;
  display: grid;

  background-color: #EFEFEF;
  
  grid-template-columns: 3fr 2fr;

  @media (max-width: 1120px){
    display: flex;
    flex-direction: column;
  }
`

export const ContainerPhoto = styled.div`
  background-image: url('/images/conarh2022/Unitok_login_Conarh2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .logos{
    position: absolute;
    z-index: 100;
    left: 30px;
    top: 30px;

    display: flex;
    align-items: center;
    a:last-child{
      margin-left: 2rem;
    }

    

    @media (max-width: 480px) {
      left: 0;
      top: 30px;
      width: 100%;
      gap:43px;
      justify-content: center;
      align-items: center;
      a:last-child{
      margin-left: 0;
    }
    }
  }
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(134, 134, 134, 0.4) 0%, rgba(0, 0, 0, 0) 38.02%);
  }

  @media (max-width: 1120px){
    min-height: 260px;
  }
`


export const FormContainer = styled.form`
  
  
`

export const RegisterForm = styled.div`
  width: 100%;
  max-width: 403px;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;

  h2{
    text-align: center;
  }

  @media(max-width: 480px){
    margin-top: 3rem;
    max-width: none;
    padding: 0 1.8rem;
  }


`


export const GroupInput = styled.div`
  margin-top: 3.5rem;

  display: grid;
  gap: 2.8rem;
`

export const ButtonsContainer = styled.div`
  margin-top: 4.3rem;
  display: flex;
  justify-content: flex-end;
  button{
    width: 190px;
  }
  button:last-child{
    margin-left: 1.25rem;
  }
  button.next{
    margin-left: 0;
  }

  .back-button{
    border-radius: 99999px;
    border: 1px solid #FF4C1C;
    color: #FF4C1C;
    transition: 0.25s;
    padding: 0 2rem;
    height: 2.5rem;
    &:hover{
      background-color: #FF4C1C;
      color: #FFF;
    }

  }

  @media(max-width: 480px){
    width: 100%;
    flex-direction: column-reverse;
    gap:10px;

    button{
      width: 100%;
    }

    button:last-child{
      margin-left: 0;
      margin-top: 16px;
    }
  }
`

export const ContainerInputPassword = styled.div`
  max-width: 25.188rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4rem;
`
export const styleInput = css`
  margin: auto;
  height: 1.25rem;
  width: 100%;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #01302F;
  padding-left: 1px;
  padding-bottom: 15px;
  margin-top: 2.875rem;
`

export const styleContainer = css`
  margin: auto;
  max-width: 25.188rem;
  width: 100%;
`
