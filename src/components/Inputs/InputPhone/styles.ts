import { FieldError } from 'react-hook-form';
import PhoneInput from "react-phone-input-2";
import styled, { css, CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';

interface ContainerProps {
  styleContainer: CSSProp;
}

interface InputProps {
  styleInput: CSSProp;
  error: FieldError;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 30rem;
  ${props => props.styleContainer};

  p{
    font-size: 0.8rem;
    color: ${Colors.danger};
    margin-left: 0.6rem;
    margin-top: 0.3rem
  }

  input{
    box-shadow: none!important;
  }
`;


export const InLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled(PhoneInput) <InputProps>`
  .phone_input{
    border: 1px solid ${Colors.primary}!important;
    padding: 0.6rem 1.2rem!important;
    border-radius: 30px!important;
    width: 100%!important;
    ${props => props.styleInput};
    ${props => !!props.error && css`border: 1px solid ${Colors.danger}`};
  }
 
`;

export const Title = styled.h6`
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;
