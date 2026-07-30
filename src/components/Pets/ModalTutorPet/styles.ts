import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  width: 24rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(calc(-100% + -20px));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  gap: 2.75rem;
  z-index: 9;

  @media (max-width: 425px) {
    transform: translateX(calc(-100% + 20px));
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

    div:last-child{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  @media (max-width: 380px){
    width: 20rem;
    top: -40px;
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
