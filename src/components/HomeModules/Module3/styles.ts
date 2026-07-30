export const ThirdScreen = styled.div`
  min-height: 96rem;
  position: relative;
  text-align: center;
  padding-top: 16.125rem;
  background: ${(props) => props.theme.colors.secondary};
  position: relative;

  .PrincipalP {
    margin-top: 2.5rem;
  }

  img {
    width: 50%;
    height: auto;
    position: absolute;
    bottom: -15rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    transform: rotate(340deg);
  }


  @media (max-width: 430px) {
    min-height: 68rem;
    padding-top: 124px;

    .PrincipalH2 {
      height: 95px;
      margin: 0 auto;
      font-size: 95px;
      line-height: 95px;
      font-weight: 400;
    }

    .PrincipalP {
      margin-top: 8px;
      font-size: 17px;
    }
    
    img {
      width: 360px;
      bottom: -106px;
    }
  }

  @media (max-width: 320px) {
    img {
      width: 300px;
    }
  }
`;

import styled, { css, DefaultTheme } from 'styled-components';

export const ThirdTextDiv = styled.div`
  height: 24.375rem;
  text-align: center;
  width: 100%;
  right: 27rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;


  p {
    margin-bottom: 2.75rem;
  }

  @media (max-width: 1366px) {
    margin-top: 12.375rem;
    right: 156px;
  }

  @media (max-width: 1280px) {
    right: 114px;
  }
  @media (max-width: 730px) {
    flex-direction: column;
    gap: 2rem;
  }
  @media (max-width: 430px) {
    margin-top: 60px;
    right: 26px;

    h2 {
      font-size: 35px;
    }

    p {
      font-size: 15px;
      margin-bottom: 22px;
    }
  }
`;