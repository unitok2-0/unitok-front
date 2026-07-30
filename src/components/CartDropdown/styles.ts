import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1.25rem;

  display: grid;
  gap: 1.5rem;
`;

export const Button = styled.button`
  position: relative;
  border: none;
  background: none;

  svg{
    stroke-width: 2;
    width: 1.65rem;
    height: 1.65rem;
  }
`;

export const QuantityDot = styled.span`
  position: absolute;
  top: -40%;
  left: -25%;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  font-weight: 500;

  min-height: 1.25rem;
  min-width: 1.5rem;
  padding: 0 0.25rem;

  display: grid;
  place-items: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Cards = styled.div`
  display: grid;
  gap: 1.25rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
`;
