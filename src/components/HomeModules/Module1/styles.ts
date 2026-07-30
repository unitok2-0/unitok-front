import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from "framer-motion"

export const FirstScreen = styled.div`
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  padding-bottom: 2rem;
`;

export const MainTextDiv = styled.div`
  padding: 21rem 0 0 5.375rem;

  p{
    margin-top: 60px;
    font-weight: 400;
    font-size: 1.2rem;
  }

  @media (max-height: 720px) {
    padding: 17rem 0 0 5.375rem;
  }

  @media (max-width: 430px) {
    width: 280px;
    margin: 0 auto;
    padding-left: 0;
    padding-top: 12rem;
    
    @media (max-height: 823px) {
      padding: 8rem 0 0 0;
      margin-bottom: -10rem;
    }

    @media (max-height: 736px) {
      padding: 8rem 0 0 0;
      margin-bottom: -16rem;
    }
  }
`;

export const CentralTextDiv = styled.div`
  .textSeparator {
    display: flex;
  }
`;

export const LateralPriceText = styled.div`
  width: 18.5rem;
  height: 2.1875rem;
  margin: 3.75rem 0 2rem 5.375rem;

  @media(max-width:430px) {
    margin: 460px auto 10px;
    display: flex;
    justify-content: start;

    @media(max-height: 720px) {
      margin: 480px auto 0;
    }

    @media(max-height: 670px) {
      margin: 400px auto 0;
    }
    
    @media(max-height: 640px) {
      margin: 370px auto 0;
    }

    /* @media(max-height: 620px) {
      margin: 380px auto 0;
    } */

    @media(max-height: 570px) {
      margin: 300px auto 0;
    }

    @media(max-height: 520px) {
      margin: 280px auto 0;
    }
  }
`;

export const ButtonsDiv = styled.div`
  width: 31.25rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 30px;

  .primaryButton {
    z-index: 3;
    
  }

  @media (max-width: 430px) {
    width: 100%;
    margin: 80px auto 0;

    position: relative;
    flex-direction: column;
    gap: 1rem;
    margin-top: 100%;

    .primaryButton {
      position: fixed;
      bottom: 0;
      left:0;

      width: 100%;
      order: 2;
      border-radius: 0;
      padding: 2rem 0;
      z-index: 6;
    }
  }

  svg {
    color: ${(props) => props.theme.colors.primary};
    width: 1.375rem;
    height: 1.375rem;
    margin-left: 0.5rem;
  }
`;

export const WppFixedButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: #FF4C1C;
  border: none;
  z-index: 5;
  width:60px;
	height:60px;
  border-radius: 50px;
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: 1s wiggle ease infinite;
  }

  span{
    position: absolute;
    left: 0%;
    top: 50%;
    color: #FFF;
    white-space: nowrap;
    transform: translate(-110%, -50%);
    font-weight: 500;

  }


`