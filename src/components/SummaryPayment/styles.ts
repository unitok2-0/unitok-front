import styled, { css } from "styled-components";
import { Colors } from "../../styles/Colors";

interface LineProps {
  total?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 3rem;
  width: 100%;
  height: 100%;

  strong {
    font-weight: 500;
  }

  @media (max-width: 1120px) {
    padding-left: 0;
    padding-right: 0;

    padding-bottom: 10rem;
  }
`;

export const Cards = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 1rem;

  max-height: 15rem;
  min-height: 10rem;

  margin-bottom: 3rem;
  flex: 1;
  overflow-y: scroll;

  @media (max-width: 1120px) {
    display: none;
  }
`;

export const Personalizations = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  * {
    font: ${(props) => props.theme.fonts.bodySm};
  }
`;

export const SpaceBetweeen = styled.div<LineProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0;

  @media (max-width: 330px) {
    div {
      display: none;
    }
  }
`;

export const PricesBox = styled.div`
  margin-top: 1.5rem;

  > * {
    border-top: 1px solid ${(props) => props.theme.colors.grayLight};
  }
`;
