import styled from 'styled-components';

export const ContainerScreenShotQRCode = styled.div`
  width: 100vw;
  display: grid;
  place-items: center;
  justify-content: center;
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