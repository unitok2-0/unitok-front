import styled, { css } from "styled-components";

export type WrapperProps = {
  isActive?: boolean;
};

export const Wrapper = styled.a<WrapperProps>`
  ${({ theme, isActive }) => css`
    position: relative;
    display: flex;
    align-items: center;
    width: max-content;
    height: 5.25rem;

    ::before {
      content: "";
      display: block;
      position: absolute;
      border-radius: 10px;
      width: 5.25rem;
      height: 5.25rem;
      opacity: 0;
      background: ${theme.colors.white};
    }

    @media (max-width: 1120px) {
      ${ColorDotStack} {
        flex-direction: row;
        left: 0;
        height: auto;
        width: 100%;
        bottom: -0.75rem;

        > * + * {
          margin-top: 0;
          margin-left: 0.5rem;
        }
      }
    }

    ${isActive &&
    css`
      ${ColorDotStack} {
        opacity: 1;
      }

      ${Image} {
        left: 2rem;

        @media (max-width: 1120px) {
          bottom: 1rem;
          left: 0;
        }
      }

      ::before {
        opacity: 1;

        left: 50%;
        transform: translateX(-50%);
      }
    `}
  `}
`;

export const ColorDotStack = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  position: absolute;
  left: -0.25rem;

  > * + * {
    margin-top: 0.5rem;
  }
`;

export const Image = styled.div`
  z-index: 8;
  position: relative;

  display: grid;
  place-items: center;

  img {
    height: 4rem;

    filter: drop-shadow(7px 7px 10px rgba(0, 0, 0, 0.15));
  }
`;
