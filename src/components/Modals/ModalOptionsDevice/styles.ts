import styled from 'styled-components';

type Props = {
  open: boolean;
}

export const Container = styled.div`
  max-width: 240px;
  min-width: 210px;
  display: flex;
  position: absolute;
  background-color: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  right: 11px;
  padding: 1.8rem;

  z-index: 999;

  justify-content: center;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;

  button {
    width: 100%;

    border: none;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: left;

    margin: 3px;
    &:disabled{opacity: 0.3}
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: left;
    
    svg {
      flex: 1;
    }

    span {
      flex: 3;
    }
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
  z-index: 1;
`
