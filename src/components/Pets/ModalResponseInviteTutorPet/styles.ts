import styled from 'styled-components';

export const MainModal = styled.main`
  background-color: #FFFFFF;
  height: 38.5rem;
  width: 29rem;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    height: 100vh;
    width: 100vw;
  }
`

export const ContainerImages = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr 130px;
  grid-gap: 12px;
  align-items: center;
  justify-content: center;
  place-items: center;
`

export const ImagesPhoto = styled.div`
  width: 110px;
  height: 110px;
  clip-path: circle();
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 100%;
    height: 100%;
    clip-path: circle();
  }
`

export const LogoUnitok = styled.div`
  margin-top: -30px;
  width: 40px;
  height: 40px;

  img{
    width: 100%;
  }
`
export const CloseModal = styled.div`
  position: absolute;
  right: 40px;
  top: 35px;
  color: #FF4C1C;
  cursor: pointer;
`
