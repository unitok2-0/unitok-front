import styled from "styled-components";

interface HighlitedButton {
  color?: string;
}

export const HighlitedButton = styled.button<HighlitedButton>`
    min-width: 8rem;
    flex: 1;
    height: 6.5rem;
    margin-bottom: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.color}30;

    border-radius: 0.5rem;

    span:first-of-type {
      height: 3.4rem;
      width: 3.4rem;
      margin-top: -36px;
      margin-bottom: 1rem;

      svg {
        height: 24px;
        width: 24px;
      }
    }

    span + span {
      color: #383D3B;
    }
`

export const NormalButton = styled.button`
  display: flex;
  align-items: center;

  background: none;
  border: none;

  > * + * {
    margin-left: 1rem;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

export const RoundIcon = styled.span`
  display: grid;
  place-items: center;

  height: 2.5rem;
  width: 2.5rem;

  border-radius: 9999px;
  svg{
    width: 18px;
    height: 18px;
  }
  color: white;

  background: ${(props) => props.theme.colors.secondary};
`;
