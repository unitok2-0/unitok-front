import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/Colors';
import { shade } from 'polished'

export const HeaderContainer = styled.header`
  height: 4rem;
  border-bottom: 1px solid '#000';
  background: #000;
  position: sticky;
  top: 0;
`;

export const HeaderContent = styled.div`
  /* max-width: 1120px; */
  height: 4rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: 720px) {
    nav{
      > button svg{
        margin-left: -2rem;
      }
    }
  }
`;

export const Containers = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextButtonStyle = css`
  color: ${Colors.white};
  margin-right: 24px;
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
  @media(max-width: 720px) {
    display: none;
  }
`;

export const NavResponsive = styled.nav`
 @media(min-width: 721px) {
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
export const ButtonStyle = css`
  padding: 6px 16px;
  border-radius: 10px;
  background: ${Colors.primary};
  color: ${Colors.white}!important;
  font-weight: 500;
  transition: background-color 0.5s;
  &:hover {
    background: ${shade(0.1, Colors.primary)};
  }
`;