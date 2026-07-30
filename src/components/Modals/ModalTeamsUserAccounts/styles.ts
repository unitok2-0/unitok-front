import styled from 'styled-components';


export const Container = styled.div`
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 31rem;
  position: absolute;
  left: 50%;
  top: 2%;
  transform: translateX(calc(-100% + -20px));
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  z-index: 999;

  @media(max-width: 1024px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  @media (max-width: 450px){
    width: 95%;
    min-width: 340px;
  }
`

export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #EFF2F2;
  padding: 0.5rem;
`

export const Backdrop = styled.div`
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`
