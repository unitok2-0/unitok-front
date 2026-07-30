import styled, { css } from "styled-components";
import { Colors } from "styles/themes/light";

export type WrapperProps = {
  isActive?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray};

  display: flex;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 0 2px white, 0 0 0 4px ${props.theme.colors.primary};
    `}

  ${(props) =>
    props.role === "button" &&
    css`
      cursor: pointer;
    `}
`;

export type ColorProps =
  | {
      color: keyof Colors;
    }
  | { color: string };

export const Color = styled.span`
  flex: 1;

  background: ${({ color, theme }) => theme.colors[color] || color};
`;
