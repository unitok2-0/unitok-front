import styled from 'styled-components';

export const MainModal = styled.div`
  background-color: #FFFFFF;
  width: 22.5rem;
  height: 36.188rem;
  border-radius: 10px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  width: 80%;
`

export const ButtonDisabled = styled.button`
  background-color: transparent;
  border: none;
  color: #FF4C1C;
  text-decoration: underline;
  font-weight: 500;
`

export const Icon = styled.div`
  width: 60px;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img{
    margin-bottom: 20px;
    width: 100%;
  }
`

export const ContainerButtons = styled.div`
  width: 100%;

  display: grid;
  place-items: center;
  grid-gap: 20px;
`