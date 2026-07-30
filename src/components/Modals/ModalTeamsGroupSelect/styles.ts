import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  width: 25rem;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% + -20px));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  gap: 2.75rem;
  z-index: 9;
  border-radius: 10px;

  @media (max-width: 380px){
    width: 20rem;
    top: -40px;
  }
`

export const List = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
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
