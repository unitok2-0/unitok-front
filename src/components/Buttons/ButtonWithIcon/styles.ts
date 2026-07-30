import styled, { css, CSSProp, DefaultTheme } from "styled-components";

const variants = {
  primary: (theme: DefaultTheme, hasContrastMode: boolean) => css`
    background: ${hasContrastMode ? theme.colors.white : theme.colors.primary};
    color: ${hasContrastMode ? theme.colors.primary : theme.colors.white};
  `,

  secondary: (theme: DefaultTheme, hasContrastMode: boolean) => css`
    background: none;
    color: ${hasContrastMode ? "transparent" : theme.colors.primary};
    border: 1px solid
      ${hasContrastMode ? theme.colors.white : theme.colors.primary};
  `,

  tertiary: (theme: DefaultTheme, hasContrastMode: boolean) => css`
    background: none;
    padding: 0.5rem 1rem;
    text-decoration: underline;
    color: ${hasContrastMode ? theme.colors.secondary : theme.colors.primary};

    &:hover {
      background: none;
      color: ${hasContrastMode
        ? theme.colors.secondaryHover
        : theme.colors.primaryHover};
    }
  `,
};

export type ButtonStyleProp = {
  styleProp?: CSSProp;

  variant?: keyof typeof variants;
  hasContrastMode?: boolean;
  fullWidth?: boolean;
};

type RoundBackgroundProp = {
  backgroundRound?: string;
};

export const Container = styled.button<ButtonStyleProp>`
  ${({
    theme,
    styleProp,
    variant = "primary",
    hasContrastMode,
    fullWidth,
  }) => css`
    padding: 0 2rem;
    height: 2.5rem;
    border: none;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    font: ${theme.fonts.bodyMd}

    ${styleProp}

    &:hover {
      background: ${theme.colors.primaryHover};
      color: ${theme.colors.white};
      border-color: transparent;
    }

    ${variants[variant](theme, hasContrastMode)}
    ${fullWidth && `width: 100%;`}

    &:disabled {
      opacity: 0.3;
    }

  svg {
    transition: all 0.3s ease-in-out;
  }`}
`;

export const ContainerIcon = styled.div`
  margin-right: 1rem;

  display: grid;
  place-items: center;
`;

export const RoundBackground = styled.div<RoundBackgroundProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  background-color: ${({ backgroundRound, theme }) =>
    backgroundRound || theme.colors.profileColor};
`;
