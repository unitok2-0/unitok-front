import { motion } from 'framer-motion';
import styled from 'styled-components';

/* export const BoxDevice = styled(motion.div)`
  cursor: pointer;
  margin: auto;
  max-width: 9.063rem;
  width: 100%;
  height: 9.063rem;
  background: #F9FAFA;
  border-radius: 10px;
`

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;

  height: 100%;
  
  text-align: center;

  span{
    font-size: 0.938rem;
    font-weight: 400;
  }
` */


export const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 145px 145px;
  gap: 13px;
`

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F9FAFA;
  border-radius: 10px;
  padding-top: 1.3rem;
  padding-bottom: 1rem;
  cursor: pointer;

  span{
    padding-top: 1rem;
  }
`