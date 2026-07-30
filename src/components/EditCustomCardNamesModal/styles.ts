import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2.5rem;
`;

export const Form = styled.div`
  text-align: center;
  display: grid;
  gap: 2.5rem;
  min-width: 20rem;
  max-height: 80vh;
  overflow-y: scroll;
  padding-right: 1rem;

  @media (min-width: 1120px) {
    padding-left: 11rem;
    min-width: 30rem;

    button {
      justify-self: center;
    }
  }
`;

export const EditableFlipCardContainer = styled.div`
  position: absolute;
  left: 0;
  top: 20%;
  transform: translateX(-50%);

  min-width: 20rem;

  @media (max-width: 1120px) {
    display: none;
  }
`;
