import styled from 'styled-components';

interface ContainerProps {
  width: string;
  height: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #000;

  border-radius: 8px;
  width: ${props => props.width};
  height: ${props => props.height};
`;