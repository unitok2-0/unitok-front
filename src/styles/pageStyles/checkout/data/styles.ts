import styled, { css } from 'styled-components';
import { Colors } from '../../../Colors';
// import Image from 'next/image'

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled.form`
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 3rem 3rem;
  margin-bottom: 3rem;

  @media(max-width: 720px) {
    padding: 1.5rem 1.5rem;
    align-items: center;
    max-width: none;
  }

  h1{
    font-size: 1.4rem;
    margin-top: 3rem;
    font-weight: 500;
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
  margin-top: 1rem;
  max-width: 42rem;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 13rem;
  padding: 0.8rem;
  margin-top: 2rem;
  align-self: flex-end;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35);

  @media(max-width: 720px) {
    align-self: flex-start;
    max-width: none;
  }
`;

export const Aside = styled.aside`
  flex: 2;
  border-left: 1px solid black;

  @media (max-width: 920px) {
    display: none;
  }
`;
