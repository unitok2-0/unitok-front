import styled, { css, DefaultTheme } from 'styled-components';
import { Colors } from 'styles/Colors';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #EFEFEF;
  display: flex;
  justify-content: center;
  padding: 15rem 0;
  padding-bottom: 6rem;

  .relative-container{
    position: relative;
    width: 90%;
    display: flex;
    justify-content: center;

    @media (max-width: 900px){
      flex-direction: column;
      text-align: center;
      width: 100%;
      gap: 4rem;
    }
    @media (max-width: 480px){
      padding: 4rem 1rem;
    }
  }
  @media (max-width: 480px){
    padding: 4rem 1rem;
  }
`;


export const TitleWrapper = styled.div`
  position: relative;
  z-index: 5;
  h2{
    font-size: 3.6rem;
    line-height: 4.3rem;
    transform: translate(3.7rem, -5rem);

    @media (max-width: 900px){
      transform: none;
    }

    @media (max-width: 480px){
      font-size: 2.2rem;
    }

  }
`


export const VideoModal = styled.div`
  position: relative;
  width: 60rem;
  height: 30rem;
  video{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  button{
    width: 6rem;
    height: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%,-50%);
    
    border: none;
    background: #FF4C1C;
    border-radius: 50%;

    img{
      width: 1.3rem;
      position: relative;
      left: 6%;
      transition: transform 0.3s;
    }

    &:hover{
      img{
        transform: scale(1.2);
      }
    }

    @media (max-width: 480px){
      width: 4.8rem;
      height: 4.8rem;
    }

  }

    @media (max-width: 900px){
      width: 80%;
      margin: 0 auto;
    }
    @media (max-width: 480px){
      width: 100%;
      height: 16rem;
    }

`