import styled from 'styled-components';


export const Container = styled.div`
  background: #FFF;
  width: 18rem;
  position: fixed;
  left: 35%;
  top: 45%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 0.5rem;
  display: grid;
  gap: 2.75rem;
  z-index: 9;
  border-radius: 0.625rem;

  box-sizing: border-box;

  @media (max-width: 390px) {
    left: 30%;
    top: 20%;
  }

  @media (max-width: 343px) {
    left: 15%;
    top: 20%;
  }

  button{
    background: none;
    border: none;
    display: flex;
    align-items: center;
    font-weight: 500;
    text-align: left;

    p{
      margin-left: 20px;
    }

    .icon{
      display: grid;
      place-items: center;
    }

    svg {
      width: 18px;
      height: 18px;
    }

    div:last-child{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`

export const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.1);
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
