import styled from "styled-components";
import * as HeaderStyles from "components/Header/styles";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;

  grid-template-columns: 6fr 4fr;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3.5fr 6fr;

    @media (max-height: 769px) {
      grid-template-rows: 3fr 7fr;
    }
  }

  ${HeaderStyles.HeaderContainer} {
    position: absolute;
    margin: 0;
  }
`;

export const Image = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;

  background: #EFEFEF;
  color: #01302F;

  @media (max-width: 768px) {
    align-items: start;
    padding-top: 1rem;
    padding-bottom: 3rem;
  }
`;

export const ContentContainer = styled.div`
  max-width: 25rem;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 1rem auto;
`;

export const Heading = styled.h1`
  font: ${(props) => props.theme.fonts.titleSm};
  margin-bottom: 1.5rem;
`;

export const Text = styled.p`
  font: ${(props) => props.theme.fonts.bodyMd};
  margin-bottom: 3.5rem;
`;

export const InputContainer = styled.div`
  display: grid;
  gap: 3rem;

  .react-tel-input {
    width: 100%;
  }

  input.form-control {
    padding: 0 !important;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 3.5rem;
  display: grid;
  gap: 2rem;

  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
    gap: 1rem;
    justify-content: stretch;
  }
`;
