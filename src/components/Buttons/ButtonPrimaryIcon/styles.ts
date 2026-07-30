import styled, { css, CSSProp, DefaultTheme } from "styled-components";

const variants = {
  primary: (
    theme: DefaultTheme,
    hasContrastMode: boolean,
    colorScheme?: string
  ) => css`
    ${colorScheme
      ? css`
          background: ${theme.colors[colorScheme] || colorScheme};
          color: white;

          &:hover {
            filter: brightness(0.9);
          }
        `
      : css`
          background: ${hasContrastMode
          ? theme.colors.white
          : theme.colors.primary};
          color: ${hasContrastMode ? theme.colors.primary : theme.colors.white};
          &:hover {
            background: ${theme.colors.primaryHover};
            color: ${theme.colors.white};
            border-color: transparent;
          }
        `}
  `,

  secondary: (
    theme: DefaultTheme,
    hasContrastMode: boolean,
    colorScheme?: string
  ) => css`
    background: none;

    ${colorScheme
      ? css`
          border: 1px solid ${theme.colors[colorScheme] || colorScheme};
          color: ${theme.colors[colorScheme] || colorScheme};

          &:active {
            background: ${theme.colors[colorScheme] || colorScheme};
            color: ${theme.colors.white};
            border-color: transparent;
          }
        `
      : css`
          color: ${hasContrastMode ? theme.colors.white : theme.colors.primary};
          border: 1px solid
            ${hasContrastMode ? theme.colors.white : theme.colors.primary};

          &:active {
            background: ${theme.colors.primaryHover};
            color: ${theme.colors.white};
            border-color: transparent;
          }
        `}
  `,

  tertiary: (
    theme: DefaultTheme,
    hasContrastMode: boolean,
    colorScheme?: string
  ) => css`
    background: none;
    padding: 0.5rem 0rem;
    text-decoration: underline;

    ${colorScheme
      ? css`
          color: ${theme.colors[colorScheme] || colorScheme};
        `
      : css`
          color: ${hasContrastMode
          ? theme.colors.secondary
          : theme.colors.primary};

          &:hover {
            background: none;
            color: ${hasContrastMode
          ? theme.colors.secondaryHover
          : theme.colors.primaryHover};
          }
        `}
  `,
};

export type ButtonStyleProp = {
  styleProp?: CSSProp;
  variant?: keyof typeof variants;
  hasContrastMode?: boolean;
  fullWidth?: boolean;
  asIconButton?: boolean;
  colorScheme?: string;
};

export const Container = styled.button<ButtonStyleProp>`
  ${({
  theme,
  styleProp,
  variant = "primary",
  hasContrastMode,
  fullWidth,
  colorScheme,
  asIconButton,
}) => css`
    padding: 0 2rem;
    height: 44px;
    width: 44px;
    border: none;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    font: ${theme.fonts.bodyMd}

    span, label {
      cursor: pointer;
    }

    ${variants[variant](theme, hasContrastMode, colorScheme)}
    ${fullWidth && `width: 100%;`}

    &:disabled {
      opacity: 0.3;
    }

    > * + * {
      margin-left: 0.5rem;
    }

    ${asIconButton &&
  `
        padding: 0;
        width: 1.75rem;
        height: 1.75rem;
      `
  }

    ${styleProp}

  `}
`;
