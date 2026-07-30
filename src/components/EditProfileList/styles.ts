import styled, { css } from 'styled-components';
import { motion } from "framer-motion"
import { Colors } from 'styles/Colors';

export const Ul = styled.ul`
  overflow: auto;
  list-style-type: none;
  position: relative;
`;

interface LiProps {
  hidden: boolean;
}

export const Li = styled(motion.li)`
  overflow: auto;
  padding: 14px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 540px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const LiLeftContainer = styled.div<LiProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({
  hidden
}) => css`
    ${!hidden && css`
      opacity: 50%;
    `}
  `}

  div {
    width: 28px;
    position: relative;

    svg {
      width: 28px;
      color: ${(props) => props.theme.colors.primary};
      position: absolute;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: 0;
      cursor: pointer;
    }
  }

  .icon {
    width: 40px;
    height: 40px;

    margin: 0 16px 0 24px;
  }

  @media (max-width: 720px) {
    .icon {
      width: 36px;
      height: 36px;

      margin: 0 10px 0 20px;
    }
  }
`;

export const LiRightContainer = styled.div<LiProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;

  svg {
    width: 24px;
    height: 24px;

    margin-left: 20px;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;

    ${({
  hidden
}) => css`
      ${!hidden && css`
        opacity: 50%;
      `}
    `}
  }

  @media (max-width: 720px) {
    .liRightButton {
      font-size: 12px;
    }

    svg {
      width: 24px;
      height: 24px;
      margin-left: 14px;
    }
  }
`;

export const Form = styled.form`

  > * + * {
    margin-top: 46px;
  }

`;

export const ButtonAdderContainer = styled.div`
  margin: 10px auto;
  height: 100%;

  section {
    margin-bottom: 24px;
    margin-top: 4rem;
    h1 {
      margin: 0;
      /* margin-bottom: 0; */
    }
  }
`;

export const AddButtonsContainer = styled.div`
  /* max-height: 320px; */
  height: 84%;
  margin: 0 -26px;
  padding-bottom: 1rem;
  overflow-x: hidden;

  display: grid;
  grid-template-columns: 1fr 1fr;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.grayLight};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 20px;
  }
`;

export const AddMoreButtons = styled.button`
position: relative;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  justify-content: center;
  cursor: pointer;
  color: #FF4C1C;
  top: 16px;
  left: 50px;
  font-weight: 500;

  @media (max-width: 540px) {
    left: 36px;
  }
`

export const AddButtonsContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const AddButtonsContainerLeft = styled.div`
`

export const AddButtonsContainerRight = styled.div`
`

export const ButtonOpenModal = styled.button`
`

export const ButtonSelector = styled.div`
  width: 150px;
  height: 98px;
  margin: 7px;

  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 8px;

  display: grid;

  align-items: center;
  justify-content: center;

  cursor: pointer;

 svg {
   width: 32px;
   height: 32px;
   margin: 0 auto;
 }
`;

export const AddButtonContainer = styled.div`
  margin-bottom: 26px;
  width: 100%;

  .modalReturnIcon {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.colors.primary};
    position: absolute;
    top: 3rem;
    left: 2.5rem;
    cursor: pointer;
  }

  /* .modalAddButton {
    cursor: disabled;
  } */
`;


export const Icon = styled.span`
width: 36px;
height: 36px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  color: white;
  background: ${Colors.primaryGreen};
  margin-right: 0.5rem;
  margin-left: 0.6rem;
  .icon{
    width: 14px;
    margin: 0 0.10rem;
  }
`

type FlexInputProps = {
  middle?: boolean;
}

export const FlexInput = styled.div<FlexInputProps>`
  display: grid;
  /* grid-template-columns: 2fr 1fr; */
  grid-template-columns: ${(props) => props.middle ? '1fr 1fr' : '2fr 1fr'};
  gap: 2rem;
`
