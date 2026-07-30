import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from "framer-motion"

export const SeventhScreen = styled.div`
  padding-top: 0.5rem;
  min-height: 62.375rem;
  background: linear-gradient(276.36deg, #E44419 38.12%, #BFB0FF 93.95%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  .CartaoPersonalizado1{
    max-width: 700px;
  }
  @media (max-width: 430px) {
    min-height: 728px;
    display: block;

    .CartaoPersonalizado1 {
      display: none;
    }
  }
`;

export const SeventhScreenDiv = styled.div`
  h2 {
    width: 26.25rem;
  }

  .CartaoPersonalizado1Off {
    display: none;
  }

  .SeventhButton {
    width: 160px;
    background: ${(props) => props.theme.colors.white};
    border: none;
    &:hover{
      background: #D14018;
    }
    margin: 4.375rem auto 0;
  }
  
  @media (max-width: 430px) {
    flex-direction: column;

    h2 {
      width: 250px;
      margin: 90px auto 0;
      font-size: 35px;
    }

    .CartaoPersonalizado1Off {
      display: block;
      width: 344px;
      margin-top: 30px;
      margin-bottom: -20px;
    }
  }

  @media (max-width: 320px) {
    .CartaoPersonalizado1Off {
      width: 300px;
    }
  }
`;

interface ModalStyleProps {
  model: "first" | "second" | "third"
}

export const ModalOppenerDiv = styled(motion.div) <ModalStyleProps>`
  ${({
  model
}) => css`
    margin: 2.5rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .module2ModalButton {
      z-index: 3;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.46875rem;
      color: ${(props) => props.theme.colors.primary};
    }

    ${model === 'first' &&
  css`
        @media (max-height: 720px) {
          margin-bottom: 210px;
        }

        @media (max-width: 430px) {
          margin-bottom: 210px;
        }
      `
  }

    ${model === 'second' &&
  css`
        margin-top: -80px;
        margin-bottom: 150px;

        @media (max-width: 430px) {
          margin-top: 0;
          margin-bottom: 90px;
        }
      `
  }

    ${model === 'third' &&
  css`
        .underline {
          background: ${(props) => props.theme.colors.white};
        }

        svg {
          color: ${(props) => props.theme.colors.white};
        }

        @media (max-width: 430px) {
          margin-bottom: 90px;
        }
      `
  }    
  `}
`;