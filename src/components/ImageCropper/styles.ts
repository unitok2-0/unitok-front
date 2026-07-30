import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 65vh;
`;

export const ButtonsArea = styled.div`
  position: absolute;
  bottom: 1px;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;

  button {
    background: white;
    padding: .5rem;
    border-radius: 100%;
  }
`;