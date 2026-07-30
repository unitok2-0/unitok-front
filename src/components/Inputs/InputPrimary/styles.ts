import { FieldError } from 'react-hook-form';
import styled, { css, CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';

interface ContainerProps {
  styleContainer: CSSProp;
}

interface InputProps {
  styleInput: CSSProp;
  error: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 30rem;
  ${props => props.styleContainer};

  p{
    font-size: 0.8rem;
    color: ${Colors.danger};
    margin-left: 0.6rem;
    margin-top: 0.3rem;
    margin-bottom: 0;
  }
`;


export const InLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`


export const Input = styled.input<InputProps>`
  border: 1px solid ${Colors.gray300};
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  width: 100%;
  ${props => props.styleInput};
  ${props => !!props.error && css`border: 1px solid ${Colors.danger}`};
`;

export const Title = styled.h6`
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;
