import styled, { css, CSSProp } from 'styled-components';
import { Colors } from '../../styles/Colors';

interface styleText {
  active: boolean;
  styleTextProp?: CSSProp;
}

export const TextLink = styled.a<styleText>`
  font-size: 1rem;
  ${props => props.styleTextProp};
  ${props => props.active && css`
    color: ${Colors.primary};
  `};
`;

export const Button = styled.button<styleText>`
  font-size: 1rem;
  background: none;
  border: none;
  ${props => props.styleTextProp};
  ${props => props.active && css`
    color: ${Colors.primary};
  `};
`;
