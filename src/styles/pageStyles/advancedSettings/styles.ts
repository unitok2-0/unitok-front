import styled, { css } from 'styled-components';
import { Colors } from '../../Colors';
import { shade } from 'polished'

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  height: calc(100vh - 4rem);
  max-width: 1100px;
  margin: 0 auto;
  padding: 0px 6.5rem;
  @media(max-width: 720px) {
    padding: 0px 2rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 45rem;
  margin-top: 3rem;

  h1{
    font-size: 1.9rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

export const InputStyle = css`
  margin-bottom: 0.7rem;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 12rem;
  padding: 0.8rem;
  margin: 2.2rem 0;
  margin-top: 3rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35);

  transition: background-color 0.5s;
  &:hover {
    background: ${shade(0.1, Colors.primary)};
  }
`;

export const ButtonStyleOutiline = css`
  width: 100%;
  max-width: 10rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: none;
  color: ${Colors.gray800};
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid ${Colors.gray300};

  transition: opacity 0.3s;
  &:hover {
    background: none;
    opacity: 0.8;
  }
`;

export const ButtonForgotPassword = css`
  font-size: 12px;
  color: ${Colors.gray800};
  align-self: flex-end;
  margin-right: 1rem;
  margin-top: 0.8rem;
`;