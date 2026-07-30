import styled from 'styled-components';
import { Colors } from 'styles/Colors';

export const Container = styled.div`
  z-index: 9;
  background: #FFF;
  width: 25rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  h3 {
    font-weight: 500;
    font-size: 1.25rem;
  }

  h4 {
    font-weight: 400;
    font-size: 1rem;
  }

  small {
    font-size: 1rem;
    color: ${Colors.gray300}
  }

  @media (max-width: 380px){
    width: 20rem;
    top: -40px;
  }
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .8rem;

  label {
    color: ${Colors.gray300}
  }

  strong {
    font-weight: 500;
    margin-bottom: 1rem;
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  background: #80808052;
`
