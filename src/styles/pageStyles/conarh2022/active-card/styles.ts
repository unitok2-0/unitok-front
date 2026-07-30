import styled from 'styled-components'

export const ContainerActiveCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ContainerContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #EFEFEF;
`

export const ContentTitle = styled.div`
  padding-top: 4rem;
  padding-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
`

export const ContentDescription = styled.div`
  max-width: 90%;
  width: 100%;
  text-align: center;
  font-size: 0.938rem;
  font-weight: 400;
`

export const ContainerPhoto = styled.div`
  width: 100%;
  height: 22.313rem;

  background-image: url('/images/conarh2022/Unitok_login_Conarh2.png');
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  grid-area: CP;

  .containerDivision{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2.563rem;
    padding-top: 1.875rem;
    padding-left: 1.813rem;
  }
`