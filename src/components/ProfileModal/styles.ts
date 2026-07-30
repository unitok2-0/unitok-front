import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 80vw;
  max-width: 100%;

  height: 90vh;
  overflow-y: scroll;

  @media (max-width: 768px) {
    min-width: 90vw;
  }
`;

export const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
