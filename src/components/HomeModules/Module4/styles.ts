import styled, { css, DefaultTheme } from 'styled-components';

export const FourthScreen = styled.div`
  padding-top: 21.875rem;
  padding-bottom: 16rem;
  background: ${(props) => props.theme.colors.tertiary};
  text-align: center;
  position: relative;

  p {
    width: 28.75rem;
    margin: 0 auto;
    font-weight: 400;

    img {
      vertical-align: sub;
    }
  }

  .celularPrincipal3 {
    width: 60.5rem;
    position: absolute;
    bottom: -26rem;
    left: 0;
    z-index: 1;
  }

  .group80 {
    display: none;
  }

  @media (max-width: 430px) {
    padding: 10rem 0;
    p{
      width: 21rem;
    }
    h2{
      font-size:10rem;
    }
    .celularPrincipal3 {
      display: none;
    }

    .group80 {
      width: 362px;
      display: block;
      position: absolute;
      right: 0;
      bottom: -186px;
      z-index: 1;
    }
  }

  @media (max-width: 320px) {

    .group80 {
      width: 300px;
    }
     h2{
      font-size:7rem;
    }
    p{
      width: 20rem;
    }
  }
`;