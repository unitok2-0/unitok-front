import styled from "styled-components";
import * as HeaderStyles from "components/Header/styles";
import { Colors } from "styles/Colors";

interface TeamsUser {
  profileColor?: string;
  logoImage?: string;
}

interface ActiveProps {
  teamsUser?: TeamsUser;
}

export const Wrapper = styled.div<ActiveProps>`
  min-height: 100vh;
  background: ${(props) => props.teamsUser ? '#E5E5E5' : props.theme.colors.secondary};
  display: flex;
  flex-direction: column;

  @media (max-width: 920px) {
    flex-direction: column;
    height: 80vh;
  }

  height: 80vh;

  ${HeaderStyles.HeaderContainer} {
    margin: 0;
    position: absolute;
  }

  ${({ teamsUser }) => teamsUser && `
    background: #F5F5F5;
  `}

  button {
  ${({ teamsUser }) => teamsUser && `
    background: ${teamsUser?.profileColor};
    color: #fff;
    border: none;
    :hover {
      background: ${teamsUser?.profileColor};
      filter: brightness(120%);
    }
  `}
  }

  div {
    ${({ teamsUser }) => teamsUser && `
    color: #383D3B;
  `}

    input {
      ${({ teamsUser }) => teamsUser && `
          color: #383D3B;
      `}
    }

  }
`;

export const Image = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 70%;
  display: none;

  @media (max-width: 920px) {
    width: 100%;
    height: 35vh;
    display: block;
  }
`;

export const Content = styled.div<ActiveProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  text-align: center;
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* background: ${(props) => props.theme.colors.secondary}; */
  color: ${(props) => props.theme.colors.white};
`;

export const ContentContainer = styled.div`
  max-width: 25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Due a bug envolving react-phone-input-2 styles injection and Next */
  .react-tel-input {
    width: 100%;
  }

  input.form-control {
    padding: 0 !important;
  }

  .fullWidth {
    width: 100%;
  }
`;

export const Form = styled.form<ActiveProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 1rem auto;

  ${({ teamsUser }) => teamsUser && `
    color: #383D3B;
  `}
`;

export const Title = styled.h1`
  font: ${(props) => props.theme.fonts.titleSm};
  margin-bottom: 1.5rem;

  & + h1 {
    margin-top: -1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const Text = styled.p`
  font: ${(props) => props.theme.fonts.bodyMd};
  margin-bottom: 3.5rem;
  max-width: 22rem;
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

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  max-width: 30rem;
  margin-top: 3rem;

  button {
    /* min-width: 9rem; */
  }
`;

export const FormInputs = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .input {
    margin-top: 1rem;
  }
  .input + .input {
    margin-top: 3rem;
  }

  ${({ teamsUser }) => teamsUser && `
    color: #383D3B;
  `}
`;

export const FormInputsCode = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  p {
    margin-bottom: 2rem;
  }

  input {
    width: 2.4rem;
    height: 2.8rem;
    border-radius: 10px;
    background: none;
    border: 1px solid ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
    text-align: center;

    ${(props) => props.teamsUser && `
    color: #red;
    border: 1px solid #383D3B;
  `}
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
  }

  input + input {
    margin-left: 0.9rem;
  }

  .buttonTotalVoice {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    margin-top: 8%;

    span {
      font: ${(props) => props.theme.fonts.bodyMd};
      color: ${Colors.white};
      margin-left: 0.8rem;

      ${({ teamsUser }) => teamsUser && `
        color: #383D3B;
      `}
    }
  }
`;

export const StepsContainer = styled.ul<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /* gap: 0.6rem; */
  color: red;

  li {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    border: 1px solid ${(props) => props.teamsUser ? props.teamsUser?.profileColor : props.theme.colors.primary};
    list-style: none;
    margin-right: 0.6rem;
  }

  .selected {
    width: 1.25rem;
    height: 0.55rem;
    border-radius: 10px;
    background: ${(props) => props.teamsUser ? props.teamsUser?.profileColor : props.theme.colors.primary};
  }
`;

export const PowerdBy = styled.footer`
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  padding: 0.5rem 0;
`;
