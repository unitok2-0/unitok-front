import { shade } from 'polished';
import styled, { css } from 'styled-components';
import { Colors } from '../../Colors';

export const Main = styled.main`
   height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 12rem);
  margin: 0 auto;
  padding: 0 1rem;

  h1{
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem!important;
  }

  p{
    font-size: 1.1rem;
    font-weight: 300;
  }
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 12rem;
  padding: 0.8rem;
  margin-top: 4rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.35);

  transition: background-color 0.3s;
  &:hover {
    background: ${shade(0.1, Colors.primary)};
  }
`;