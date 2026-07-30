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
`;

export const TextButtonStyle = css`
  margin: 0px 12px;
  padding: 6px 16px;
  border-radius: 10px;
  font-weight: 500;
  transition: opacity 0.5s;
  transition: all 0.5s ease-in-out;
  opacity: 1;
  color: ${({ theme }) =>
    lightOrDark(theme.colors.profileColor) === "dark"
      ? '#000' : '#fff'};
  background: ${({ theme }) =>
    lightOrDark(theme.colors.profileColor) === "dark"
      ? '#fff' : theme.colors.profileColor};

  &:hover{
    opacity: 0.7;
  }
`;

export const linkButtonStyle = css`
  color: ${Colors.white};
  margin: 0px 12px;
  font-weight: 500;
  transition: opacity 0.5s;
  opacity: 1;

  &:hover{
    opacity: 0.7;
  }
`;

export const NavDesktop = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 2.5rem;
  @media(max-width: 920px) {
    display: none;
  }
`;

export const NavResponsive = styled.nav`
 @media(min-width: 921px) {
    display: none;
  }
`;

export const ContentDrawer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;

  >button, a{
    margin-top: 12px;
    font-size: 18px;
  }
`