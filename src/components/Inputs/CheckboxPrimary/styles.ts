import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/Colors';

interface ContainerProps {
  checked: boolean
}

export const Container = styled.label<ContainerProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    display: inline-block;
    width: 20px;
    height: 20px;

    border: 2px solid black;
    margin-right: 1rem;
    padding: 2px;

    ${props => props.checked && css`
      border: 2px solid ${Colors.primary};
      
      div {
        width: 96%;
        height: 96%;
        background: ${Colors.primary};
      }

    `}
  }

  strong {
    color: ${props => props.checked ? Colors.primary : 'black'};
  }
`  