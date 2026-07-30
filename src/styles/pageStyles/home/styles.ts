import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from "framer-motion"

export const HomeDiv = styled(motion.div)`
  overflow: hidden;
`;


export const WhatsappButonStyles = css`
  @media(max-width: 430px){
    right: 1rem;
    bottom: 5rem;
  }
`