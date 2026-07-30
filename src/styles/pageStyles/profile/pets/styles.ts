import styled, { css } from "styled-components";
import { Colors } from "styles/Colors";

export const MainContainer = styled.main`
  max-width: 490px;
  padding: 0 1.75rem 0;

  @media (max-width: 1119px) {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }

  @media (max-width: 540px) {
    padding: 0;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  > * + * {
    margin-top: 2.875rem;
  }

  @media (max-width: 1119px) {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  @media (max-width: 540px) {
    width: 100%;

    .profileEditSubmitButton {
      width: 100%;
      height: 40px;
    }
  }

`;

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateY(100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`;



export const AddTutor = styled.div`
`

export const ButtonsWrapper = styled.div`
  margin-top: 5.4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
  margin-bottom: 5rem;

  @media (max-width: 460px) {
    margin-top: 3.4rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`
