import styled, { css } from "styled-components";

export const Label = styled.label`
  position: absolute;

  font: ${(props) => props.theme.fonts.bodyMd};
  color: ${(props) => props.theme.colors.grayDark};
  left: 0;
  top: 0;
  pointer-events: none;

  transition: 0.2s;
`;

export type WrapperProps = {
  shouldMaintainLabelOnTop?: boolean;
  disabled?: boolean;
  hasError?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, shouldMaintainLabelOnTop, disabled, hasError }) => css`
    border-bottom: 1px solid ${theme.colors.secondary};
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    &::placeholder {
      color: ${theme.colors.gray};
    }

    &:focus-within {
      ${Label} {
        top: -1.125rem;
        font: ${theme.fonts.bodySm};
        color: ${(props) => props.theme.colors.secondary};
      }
    }

    ${shouldMaintainLabelOnTop &&
    css`
      ${Label} {
        top: -1.125rem;
        font: ${theme.fonts.bodySm};
        color: ${(props) => props.theme.colors.secondary};
      }
    `}

    ${disabled &&
    `
     opacity: 0.3;
    `}

    ${hasError &&
    css`
      border-color: ${theme.colors.error};

      svg {
        color: ${theme.colors.error};
      }
    `}
  `}
`;

interface SelectedProps {
  isFormEditStyles?: boolean;
}

export const Selected = styled.button<SelectedProps>`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.colors.secondary};

    width: 100%;
    text-align: start;
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
  ${({ isFormEditStyles, theme }) => isFormEditStyles && css`
    color: ${theme.colors.grayDark}
  `}
`;

export const SelectDropdown = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: -3rem;

    z-index: 10;
    left: 0;
    width: 100%;
    background: ${theme.colors.white};
    overflow: hidden;
  `}
`;

export const SelectOption = styled.label`
  padding: 10px;
  display: block;
  cursor: pointer;

  font: ${(props) => props.theme.fonts.bodyMd};
  background: ${(props) => props.theme.colors.white};

  &:hover {
    background: ${(props) => props.theme.colors.grayLighter};
  }

  :focus-within {
    background: ${(props) => props.theme.colors.grayLighter};
  }
`;

export const HiddenRadio = styled.input.attrs({ type: "radio" })`
  visibility: hidden;
`;

export const Message = styled.span<{
  isError?: boolean;
  isWhiteMode?: boolean;
}>`
  ${({ theme, isError, isWhiteMode }) => css`
    font: ${theme.fonts.bodySm};
    position: absolute;
    bottom: -1.5rem;
    left: 0;

    color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
    ${isError && `color: ${theme.colors.error};`}
  `}
`;
