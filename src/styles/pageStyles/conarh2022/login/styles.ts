import styled, { css } from 'styled-components'

export const ContainerLoginConarh = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  background-color: #EFEFEF;
  
  grid-template-areas: 
    "CP CP CP CI CI"
  ;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const ContainerPhoto = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url('/images/conarh2022/Unitok_login_Conarh2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  grid-area: CP;

  .containerDivision{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2.563rem;
    padding-top: 3.875rem;
    padding-left: 1.813rem;
  }

  @media (max-width: 820px){
    .containerDivision{
      flex-direction: column;
      justify-content: center;
      padding-left: 0;
    }
  }

  @media (max-width: 768px) {
    height: 16.313rem;

    margin-bottom: -80px;

    z-index: 9;

    .containerDivision{
      flex-direction: row;
    }
  }
`

export const ContainerInput = styled.div`
  max-width: 90%;
  width: 100%;
  height: 100vh;
  background-color: #EFEFEF;
  grid-area: CI;

  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .buttonPosition{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.688rem;
    justify-content: center;

    .forgotYourPassword{
      margin-top: 2.25rem;
      color: #FF4C1C;
      text-decoration: underline;
      font-size: 0.75rem;
    }

  }

  @media (max-width: 768px) {

    .buttonPosition{
      display: flex;
    }

    .buttonPrimary{
      max-width: 100%;
      width: 100%;
    }
  }
`

export const TitleInput = styled.div`
  color: #01302F;
  font-weight: 500;
  font-size: 1.25rem;
`

export const DescriptionInput = styled.div`
  text-align: center;
  color: #01302F;
  font-size: 0.938rem;
  font-weight: 400;
  padding-top: 1.25rem;
`

export const GroupInputs = styled.div`
  max-width: 25.188rem;
  width: 100%;

  margin-top: 3.5rem;

  display: grid;
  gap: 2.8rem;
`