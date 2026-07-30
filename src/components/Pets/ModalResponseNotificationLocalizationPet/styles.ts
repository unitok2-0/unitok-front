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
  grid-template-columns: 100px 1fr 100px;
  grid-gap: 30px;
  align-items: center;
  justify-content: center;
`

export const ImagesPhoto = styled.div`
  width: 100px;
  height: 100px;
  clip-path: circle();

  img{
    width: 100%;
    clip-path: circle();
  }
`

interface PhotoPetImageProps {
  petImage: string
}

export const PhotoPet = styled.div<PhotoPetImageProps>`
  width: 150px;
  height: 150px;

  background-image: url(${props => props.petImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  clip-path: circle();

  /* img{
    width: 150px;
    height: 150px;
    clip-path: circle();
  } */
`

export const LogoUnitok = styled.div`
`
export const CloseModal = styled.div`
  position: absolute;
  right: 40px;
  top: 35px;
  color: #FF4C1C;
  cursor: pointer;
`
