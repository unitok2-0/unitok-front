import styled, { css } from "styled-components";
import { Colors } from "../../Colors";
import { shade } from "polished";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 1rem auto;
  padding: 0px 1.5rem;
  margin-bottom: 3rem;

  h1 {
    font: ${(props) => props.theme.fonts.titleSm};
    margin-bottom: 1.5rem;
  }

  p {
    font: ${(props) => props.theme.fonts.bodyMd};
    margin-bottom: 3.5rem;
  }

  h2 {
    font-size: 16px;
    font-weight: 300;
    line-height: 19px;
    letter-spacing: 0em;
    margin-top: 4rem;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }

  a {
    text-decoration: underline;
    color: ${Colors.primary};
  }
`;

export const InputContainer = styled.div`
  display: grid;
  gap: 3rem;
`;

export const ButtonsContainer = styled.div`
  margin-top: 3.5rem;
  display: grid;
  gap: 2rem;

  justify-content: center;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 16rem;
  padding: 0.8rem;
  margin-top: 2rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);

  transition: background-color 0.5s;
  &:hover {
    background: ${shade(0.1, Colors.primary)};
  }
`;

export const ButtonForgotPassword = css`
  font-size: 12px;
  color: ${Colors.gray800};
  align-self: flex-end;
  margin-right: 1rem;
  margin-top: 0.8rem;
`;
