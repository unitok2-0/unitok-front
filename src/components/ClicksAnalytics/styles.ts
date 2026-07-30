import styled from "styled-components";

export const Wrapper = styled.div`
  h2 {
    border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
  }
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 3rem;
  align-items: start;
  justify-content: start;
  padding: 1rem 0;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  display: grid;
  gap: 2.5rem;
  justify-content: center;

  text-align: center;

  @media (min-width: 1400px) {
    max-width: 40rem;
  }
`;
