import styled, { css, DefaultTheme } from 'styled-components';

export const SixthScreen = styled.div`
  min-height: 100vh;
  padding-top: 26rem;
  padding-bottom: 2rem;
  text-align: center;
  background: ${(props) => props.theme.colors.m6Gray};
  padding-bottom: 4rem;

  @media (max-width: 430px) {
    padding: 14rem 14px 0 14px;

    h2 {
      font-size: 35px;
      margin: 0 auto;
    }
  }
`;

export const SixthImageContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  position: relative;

  button {
    width: 15rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0.5rem auto 0 auto;

     svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.46875rem;
      color: ${(props) => props.theme.colors.primary};
     }
  }
`;