import styled from 'styled-components';
import { Colors } from 'styles/Colors';

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  font-size: 1rem;

  * {
    cursor: pointer;
  }
`

type ItemProps = {
  selected?: boolean;
}

export const Item = styled.span<ItemProps>`
  color: ${props => props.selected ? Colors.orange : Colors.primaryGreen};
`