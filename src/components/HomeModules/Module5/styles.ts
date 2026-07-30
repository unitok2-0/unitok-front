import styled, { css, DefaultTheme } from 'styled-components'

export const FifthScreen = styled.div`
  min-height: 99rem;
  background: ${(prop) => prop.theme.colors.secondary};
  position: relative;
  padding-top: 20.25rem;
  .mainText {
    margin: 0;
    text-align: center;

  }

  div {
    width: 26.25rem;
    margin-top: 29.5rem;
    position: absolute;
    right: 0;
  }

  p {
    width: 26rem;
    margin: 1.25rem auto 0;
    text-align: center;
  }

  .CelularPrincipal2 {
    width: 45%;
    position: absolute;
    max-width: 1000px;
    bottom: -30rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 1400px) {
      bottom: -20rem;
    }
    

  }

  h2{
      font-weight: 400;
  }

  @media (max-width: 1280px) {
    div {
      width: 360px;
    }    

    .CelularPrincipal2 {
      width: 70%;
    }
  }

  @media (max-width: 430px) {
    min-height: 960px;
    padding-top: 60px;

    h2 {
      font-size: 95px;
    }

    p{
      line-height: 35px;
      width: 280px;
    }
    div {
      width: 200px;
      margin-top: 50px;
      right: 8px;

      h2 {
        font-size: 35px;
      }
    }

    .CelularPrincipal2 {
      width: 360px;
      bottom: -200px;
    }
  }

  @media (max-width: 320px) {
    .mainText {
      font-size: 92px;
    }

    .CelularPrincipal2 {
      width: 300px;
    }
  }
`;
