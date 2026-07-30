import styled from 'styled-components'
import { Colors } from '../../styles/Colors';

export const FooterContainer = styled.footer`
  height: 39.735rem;
  padding: 5.4375rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${Colors.primaryGreen};

  @media (max-width: 430px) {
    min-height: 587px;
    padding: 44px 28px;
    display: block;
  }
`;

export const RightSide = styled.div`
  width: 100%;
  margin-top: 15rem;

  h2 {
    margin-bottom: 2.12rem;
  }

  div {
    width: 158px;
    height: 88px;
  }

  @media (max-width: 430px) {
    margin-top: 0;

    h2 {
      font-size: 60px;
    }
  }
`;

export const LeftSide = styled.div`
  width: 100%;
  margin-top: 23.7rem;

  span {
    display: flex;
    justify-content: flex-end;
    gap: 1.4rem;
  }

  @media (max-width: 430px) {
    margin-top: 40px;
    position: relative;

    span {
      display: block;
    }

    p {
      margin-bottom: 20px;
    }
  }
`;

export const IconsContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3.875rem;
  
  svg {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.white};
  }

  @media (max-width: 430px) {
    margin-bottom: -86px;
    position: absolute;
    bottom: 0;

    svg {
      margin-right: 20px;
    }
  }
`