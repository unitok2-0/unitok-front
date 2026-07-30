import styled, { css } from "styled-components";

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    color: ${theme.colors.primary};
    width: 100%;

    gap: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 500;

    background: white;

    transition: 0.2s;

    cursor: pointer;

    :focus-within {
      border-color: ${theme.colors.primary};
    }
  `}

  div {
    width: 100%;
  }
`;

export const Wrapper = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    position: relative;
    width: 100%;
    /* height: 100vh; */
    overflow: visible

    & ${Header} .chevron,
    .chevron-animation svg {
      transition: transform 0.2s;
      transform: rotate(0deg);
    }

    ${isOpen &&
    css`
      & ${Header} .chevron,
      .chevron-animation  svg {
        transform: rotate(180deg);
      }
    `}
  `}
`;

export type ContentProps = {
  isOpen: boolean;
  isGroupView?: boolean;
  maxHeight?: string;
  minWidth?: string;
  customStyles?: string;
  inset?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
};


export const Content = styled.div<ContentProps>`
  ${({ theme, isOpen, maxHeight, minWidth, inset, isGroupView, customStyles }) => css`
    max-height: 0px;
    opacity: 0;
    padding: 0;
    /* width: 100%; */
    min-width: ${minWidth || "9rem"};
    display: grid;
    background: ${theme.colors.white};

    border-radius: 10px;
    margin-top: .25rem;

    position: ${ isGroupView ? 'relative' : 'absolute'};
    top: ${inset?.top};
    right: ${inset?.right};
    bottom: ${inset?.bottom};
    left: ${inset?.left};

    z-index: 100;
    pointer-events: none;
    overflow-y: visible;

    transition: 0.2s;

    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

    ::-webkit-scrollbar {
      width: 0.5rem;
      
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
    }

    ${isOpen &&
    css`
      pointer-events: all;
      max-height: ${maxHeight || "15rem"};
      opacity: 1;
    `}
    ${customStyles}
  `}
`;

interface ButtonProps {
  isGroupView?: boolean;
}

export const Button = styled.button<{ selected?: boolean, isGroupView?: boolean }>`
  ${({ theme, selected, isGroupView }) => css`
    font-size: 0.9375rem;
    padding: 0.5rem;
    cursor: pointer;
    background: ${isGroupView ? '#FAFAFA' : '#FFFF'};
    transition: 0.2s;
    border: none;
    text-align: left;


    ${isGroupView && css`
      margin: 0.25rem;
      border-radius: 10px;
    `}
    :hover {
      filter: brightness(0.98);
    }

    ${selected &&
    css`
      filter: brightness(0.98);
    `}
  `};
`;
