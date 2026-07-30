import styled, { css } from "styled-components";
import ReactInputMask from "react-input-mask";
import ReactPhoneInput from "react-phone-input-2";

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
  isWhiteMode?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  ${({
  theme,
  shouldMaintainLabelOnTop,
  disabled,
  hasError,
  isWhiteMode,
}) => css`
    border-bottom: 1px solid
      ${theme.colors[isWhiteMode ? "white" : "secondary"]};
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-feature-settings: 'ss01' on;

    gap: 0.5rem;

    &::placeholder {
      color: #4A4F4C;
    }

    &:focus-within {
      ${Label} {
        top: -1.125rem;
        font: ${theme.fonts.bodySm};
        color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
      }
    }

    input::placeholder { /* WebKit, Blink, Edge */
    color: ${theme.colors.grayDark};
    opacity: 1;
    font-family: inherit;
    font-weight: inherit;
 }
    input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

    ${isWhiteMode &&
  `
      ${Input}  {
        color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
      }

      svg {
        color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
      }
    `}

    ${shouldMaintainLabelOnTop &&
  `
      ${Label} {
        top: -1.125rem;
        font: ${theme.fonts.bodySm};
        color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
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

export const Input = styled.input`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.colors.grayDark};

    width: 100%;
    flex: 1;
  `}
`;

export const MaskInput = styled(ReactInputMask as any)`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.colors.secondary};

    width: 100%;
    flex: 1;
  `}
`;

export const PhoneInput = styled(ReactPhoneInput as any)`
  ${({ theme }) => css`
    .special-label {
      display: none;
    }
    .phone_input {
      background: none;
      border: none;
      color: ${theme.colors.secondary};

      width: 100%;
      flex: 1;
    }
  `}
`;

export const Message = styled.span<{
  isError?: boolean;
  isWhiteMode?: boolean;
}>`
  ${({ theme, isError, isWhiteMode }) => css`
    font: ${theme.fonts.bodySm};
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 0.25rem));
    left: 0;

    color: ${theme.colors[isWhiteMode ? "white" : "secondary"]};
    ${isError && `color: ${theme.colors.error};`}
  `}
`;
