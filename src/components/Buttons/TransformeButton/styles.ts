import styled, { CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';

type ButtonStyleProp = {
  styleProp: CSSProp
}

export const Container = styled.button<ButtonStyleProp>`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.styleProp};
`;
