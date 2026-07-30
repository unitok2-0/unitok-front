import styled, { CSSProp } from 'styled-components';
import Image from 'next/image';

interface StyleAvatar {
  // heightImage: number,
  img_url: string | ArrayBuffer;
  size?: number;
}

interface StyleContainer {
  styleContainer?: CSSProp,
}

export const Container = styled.div<StyleContainer>`
  ${props => props.styleContainer};
  /* z-index: 10; */
`;

export const AvatarImage = styled.div<StyleAvatar>`
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: ${(props => `url("${props.img_url}")`)};
  background-position: center;
  background-size: cover;

  border: 3px solid white;
`;
