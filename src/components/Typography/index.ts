import styled, { CSSProp, css } from "styled-components";
import * as types from 'styled-components/cssprop'
import { Theme } from "styles/themes/light";

export type TypographyProps = {
  extendStyle?: CSSProp;
  font?: keyof Theme["fonts"] | "preventDefault";
  color?: keyof Theme["colors"] | "preventDefault";
  fontWeight?: string;
};

export const Heading = styled.h2<TypographyProps>`
  ${({
    theme,
    font = "titleSm",
    color = "secondary",
    fontWeight,
    extendStyle,
  }) => css`
    font: ${color !== "preventDefault" && theme.fonts[font]};
    color: ${color !== "preventDefault" && theme.colors[color]};

    font-weight: ${fontWeight};

    ${extendStyle}
  `}
`;

export const Text = styled.p<TypographyProps>`
  ${({
    theme,
    font = "bodyMd",
    color = "secondary",
    fontWeight,
    extendStyle,
  }) => css`
    font: ${color !== "preventDefault" && theme.fonts[font]};
    color: ${color !== "preventDefault" && theme.colors[color]};
    font-feature-settings: 'ss01' on;

    font-weight: ${fontWeight};
    ${extendStyle};
  `}
`;
