import styled from 'styled-components';

type Props = {
  finishActiveDevice: boolean;
}

export const MyProducts = styled.div`
  margin-top: 6.25rem;
  margin-bottom: 10.25rem;
`

export const CreateNewDevice = styled.div`

`

export const Title = styled.h3`
  font-size: 1.25rem;
  text-align: left;
`

export const ContainerBoxDevice = styled.div`
  margin-top: 3rem;
  margin-bottom: -2rem;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.813rem;
`

export const ModalActiveDevice = styled.div`
  position: fixed;
  height: 100vh;
  z-index: 9999;
  width: 100vw;
  background-color: #EFF2F2;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const CircularDevice = styled.div`
  background-color: #FFFFFF;
  max-width: 17.5rem;
  width: 100%;
  height: 17.5rem;
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CircularContainer = styled.div`
  display: grid;
  place-items: center;
  margin: auto;
`

export const Text = styled.h3<Props>`
  padding-top: 20px;
  color: ${props => props.finishActiveDevice ? '#01302F' : '#FF4C1C;'};
  font-weight: 400;
  font-size: 2.188rem;
  text-align: center;
`

export const Span = styled.span`
  margin-top: 1.2rem;
  display: grid;
  place-items: center;
`


export const ContainerScreenShotQRCode = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  justify-content: center;
  background-color: #000;

  .container-qrcode{
    position: relative;
    border-radius: 10px;
    height: 305px;
    background-color: #FFFFFF;

    img{
      position: relative;
      z-index: 99;
    }
  }

  .qr-reader{
    margin: auto;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    video{
      object-fit: cover;
      border-radius: 10px;
    }
  }

`

export const ButtonsWrapper = styled.div`
  margin-top: 5.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`
