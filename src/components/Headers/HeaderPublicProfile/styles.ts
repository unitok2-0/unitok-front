import styled, { css, CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';
import lightOrDark from '../../../utils/lightOrDark';

type HeaderContainerStyleProp = {
  styleContentHeader?: CSSProp
}

export const HeaderContainer = styled.header`
  height: 9rem;
  border-bottom: 1px solid '#000';
  background: #000;
  top: 0;
`;

export const HeaderContent = styled.div<HeaderContainerStyleProp>`
  width: 100%;
  max-width: 1100px;
  height: 9rem;
  margin: 0 auto;
  padding: 0 2rem;
  padding-left: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: 920px) {
    padding-left: 0px;
  }
  
  ${props => props.styleContentHeader}
`;

export const Containers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  

  button svg {
    width: 10rem;
  }

  @media(max-width: 920px) {
    button svg {
      width: 8rem;
    }
  }
`;
