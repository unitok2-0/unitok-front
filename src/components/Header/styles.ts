import styled, { css } from "styled-components";
import { Colors } from "styles/themes/light";
import * as GenericDropdownStyles from "components/GenericDropdown/styles";

export type HeaderContainerProps = {
  position?: "absolute" | "fixed" | "sticky" | "static";
  bgColor?: keyof Colors;
  boderBottomColor?: keyof Colors;
};

export const HeaderContainer = styled.header<HeaderContainerProps>`
  padding: 1.75rem;
  position: ${(props) => props.position || "sticky"};
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  background: ${({ theme, bgColor }) =>
    bgColor ? theme.colors[bgColor] : "transparent"};

  ${(props) =>
    props.boderBottomColor &&
    css`
      border-bottom: 1px solid ${props.theme.colors.grayLight};
    `}

  ${GenericDropdownStyles.Wrapper} {
    width: auto;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const HeaderContent = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  gap: 2.6rem;

  p {
    cursor: pointer;
  }

  .redDot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};

    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const HeaderContent2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .go-to-cards-button {
    min-width: 13.75rem;
    margin-right: 1rem;
  }

  @media (max-width: 1000px) {
    .go-to-cards-button {
      display: none;
    }
  }
`;

interface HeaderDivProps {
  color: string;
}

export const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .burguerMenuClass {
    display: none;
  }

  svg {
    cursor: pointer;
    width: 1.65rem;
    height: 1.65rem;
  }
  .user-icon{
    svg{
      stroke-width: 2;
    }

  }
  .cart-icon{
    margin: 0;
    margin-left: 2rem;
  }

  @media (max-width: 1000px) {
    .burguerMenuClass {
      display: block;
      width: 2rem;
    }
    .cart-icon{
      margin-left: 1rem;
    }

    .menu{
      svg{
        transform: translateY(-3px);
        margin-right: 1rem;
      }
    }

    svg {
      width: 4rem;
      height: 2rem;
      padding: 0;
      margin: 0;
    }

    div {
      button {
        svg {
          width: 2rem;
        }
      }
    }
  }
`;
