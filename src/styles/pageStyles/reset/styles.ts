import styled, { css } from 'styled-components';
import { Colors } from '../../Colors';
import { shade } from 'polished'

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: calc(100vh - 4rem);

  .leftBackground{
    width: 50%;
    @media(max-width: 920px) {
      display: none;
    }
  }
`;

export const EmailSent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  h4{
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    text-align: center;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 35rem;
  margin: 1rem auto;
  padding: 0px 1.5rem;
  margin-bottom: 3rem;

  h1{
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  p{
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  h2{
    font-size: 16px;
    font-weight: 300;
    line-height: 19px;
    letter-spacing: 0em;
    margin-top: 4rem;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover{
      opacity: 0.6;
    }
  }

  a{
    text-decoration: underline;
    color: ${Colors.primary};
  }
`;

export const ImageContainer = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const InputStyle = css`
  margin-top: 2rem;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 16rem;
  padding: 0.8rem;
  margin-top: 3rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35);

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