import styled, { css } from "styled-components";

export const StepperContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  > * + * {
    margin-left: 1rem;
  }

  @media (max-width: 414px) {
    overflow-x: scroll;
    max-width: 5rem;
    padding: 0.5rem 7rem;

    > * + * {
      margin-left: 0.5rem;
    }
  }
`;

export interface StepperLinkProps {
  isActive?: boolean;
  disabled?: boolean;
}

export const StepperLink = styled.button<StepperLinkProps>`
  ${({ isActive, disabled }) => css`
    border: 0;
    background: transparent;
    font: ${(props) => props.theme.fonts.titleXs};
    color: ${(props) => props.theme.colors.secondary};
    padding: 0.25rem 0.5rem;
    position: relative;
    ${isActive &&
    css`
      color: ${(props) => props.theme.colors.primary};
    `}
    ${disabled &&
    css`
      color: ${(props) => props.theme.colors.gray};
      cursor: not-allowed;
    `}
  `}
`;

export const Label = styled.span`
  display: block;
  @media (max-width: 1140px) {
    display: none;
  }
`;

export const Icon = styled.span`
  display: none;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (max-width: 1140px) {
    display: block;
  }
`;
