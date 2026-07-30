import { shade } from 'polished';
import styled, { css, CSSProp } from 'styled-components';
import { Colors } from '../../../styles/Colors';

interface InputProps {
  styleInput: CSSProp;
  error: boolean;
}

interface ContainerProps {
  styleContainer: CSSProp;
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

export const Content = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  button{
    display: flex;
    border-radius: 50%;
    width: 1.9rem;
    height: 1.8rem;
    border: none;
    background: ${Colors.primary};
    align-items: center;
    justify-content: center;
    color: ${Colors.white};
    font-weight: bold;
    font-size: 1.2rem;
    transition: background-color 0.5s;
  }

  .less{
    font-size: 1.8rem;
    margin-right: 0.5rem;
  }

  .more{
    margin-left: 0.5rem;
  }

  
  button:hover {
    background: ${shade(0.1, Colors.primary)};
  }

`;

export const Input = styled.input<InputProps>`
  border: 1px solid ${Colors.gray300};
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 4rem
  ${props => props.styleInput};
  ${props => !!props.error && css`border: 1px solid ${Colors.danger}`};
`;