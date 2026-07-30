import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from "framer-motion"

export const SecondScreen = styled(motion.div)`
  min-height: 93vh;
  padding-bottom: 10rem;
  position: relative;
  background-color: #EFEFEF;
  
  @media (max-width: 430px){
    padding-bottom: 2.5rem
  }
`;

export const SecondScreenBracoCartao = styled(motion.img)`
  width: 100%;
  position: absolute;
  top: 9rem;
  left: -7.5rem;
  z-index: 1;

  @media(max-width: 2740px){
    left: -24rem;
  }

  @media(max-width:1820px){
    left: -7.5rem;
  }

  @media (max-width: 430px) {
    top: 5rem;
    left: -50px;
  }

  @media (max-width: 320px) {
    top: 3rem;
    left: -50px;
  }
`;

export const SecondScreenSmartphone = styled(motion.img)`
  width: 70%;
  position: absolute;
  top: 11.75rem;
  right: -7.5rem;
  z-index: 2;

  @media(max-width: 2740px){
    right: -14rem;
  }

  @media(max-width:1820px){
    right: -7.5rem;
  }

  @media (max-width: 600px) {
    right: -80px;
  }

  @media (max-width: 430px) {
    width: 80%;
    top: 11rem;
  }

  @media (max-width: 320px) {
    top: 6rem;
    right: -60px;
  }
`;

export const secondScreenTextDiv1 = styled(motion.div)`
  margin: 0 auto;
  text-align: center;

  width: 37.75rem;
  padding-top: 42rem;

  @media (max-width: 430px) {
    width: 332px;
    padding-top: 320px;
    
    h2 {
      font-size: 35px;
      line-height: 3.2rem;
    }
  }

  @media (max-width: 320px) {
    width: 300px;
    
    h2 {
      font-size: 32px;
    }
  }
`;

export const secondScreenTextDiv2 = styled(motion.div)`
  width: 28.875rem;
  margin: 5.625rem auto 0;
  text-align: center;
  img {
    vertical-align: middle;
  }

  @media (max-width: 430px) {
    width: 304px;
    margin-top: 50px;
    
    p {
      font-size: 17px;
    }
  }
`;

export const secondScreenTextDiv3 = styled(motion.div)`
  width: 28.875rem;
  margin: 5.625rem auto 0;
  text-align: center;

  img {
    vertical-align: middle;
  }

  @media (max-width: 430px) {
    width: 304px;
    margin-top: 50px;
    
    p {
      font-size: 17px;
    }
  }
`;
