import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  width: 100%;
`;

interface ColorBannerProps {
  background_url: string;
}

export const ColorBanner = styled.div<ColorBannerProps>`
  position: relative;
  min-height: 12.5rem;
  background-color: #F9FAFA;
  color: white;

  > * + * {
    margin-left: 2rem;
  }

  .banner{
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    background: ${props => `url("${props.background_url}")`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Content = styled.div`
  position: relative;
  top: -3.75rem;
  width: 100%;
  max-width:24rem;
  margin: 0 auto;

  padding: 0 1rem;

  > * + * {
    margin-top: 2.75rem;
  }
`;

export const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const SOS = styled.div`
  display: grid;
  place-items: center;
  grid-gap: 30px;

  .textSOS {
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .buttonSOS {
    background: #E10101;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);

    max-width: 7rem;
    width: 100%;
    height: 7rem;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: 500;

    cursor: pointer;
  }

`

export const PetInformation = styled.div`
  display: grid;
  grid-gap: 40px;
`

export const TextContainer = styled.div`
`

export const SmallText = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: #909692;
`

export const BigText = styled.p`
  font-size: 1rem;
`

export const PetPhotos = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(3, 95px);
  grid-gap: 16px;
`

export const SquarePhoto = styled.img`
  cursor: pointer;
  max-width: 7rem;
  width: 100%;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`

export const SquareVideo = styled.video`
  cursor: pointer;
  max-width: 7rem;
  width: 100%;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`

export const ContainerVideo = styled.div`
  img {
    position: absolute;
    margin-top: 7px;
    margin-left: 70px;
  }
`
