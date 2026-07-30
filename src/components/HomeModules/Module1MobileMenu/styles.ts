import styled, { css, DefaultTheme } from 'styled-components';
// import { motion } from "framer-motion"

export const OppenedBurguerMenu = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;

  background: ${(props) => props.theme.colors.primary};
  z-index: 11;
`;

export const OppenedBurguerMenuHeader = styled.header`
  display: flex;
  justify-content: space-between;

  img {
    width: 4.5rem;
    height: 3rem;
  }

  button {
    padding: 0;
    border-radius: 0;
  }
`;

export const OppenedBurguerMenuOptionsArea = styled.main`
  text-align: end;
  > * + * {
    padding-top: 20px;
  }
`;