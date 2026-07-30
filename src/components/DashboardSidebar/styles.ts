import styled, { css, CSSProp, DefaultTheme } from "styled-components";
import Image from 'next/image';

export const Container = styled.div`
  width: 403px;
  height: 768px;
  padding: 28px;
  background: ${(props) => props.theme.colors.grayLight};
`;

export const UserContainer = styled.div`
  width: 18.8rem;
  height: 5.5rem;
  margin: 3.125rem auto 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserImage = styled(Image)`
  width: 5.5rem;
  border-radius: 50%;
`;

export const UserInfos = styled.div`
  width: 11.75rem;
  height: 5rem;
  padding: 1rem 0;
`;

export const UserName = styled.h1`
  font: ${(props) => props.theme.fonts.titleXs};
  color: ${(props) => props.theme.colors.secondary};
`;

export const UserStatus = styled.p`
  font: ${(props) => props.theme.fonts.bodySm};
  color: ${(props) => props.theme.colors.secondary};
`;