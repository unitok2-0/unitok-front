import styled, { css } from 'styled-components';



export const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center


`


export const TextContainer = styled.div`
  p{
    margin-top: 8px;
  }
`


export const ButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  margin-top: 8.75rem;
`


export const ButtonsStyle = css`
  width: 100%;
`


export const FullScrenContain = styled.div`
  
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #EFEFEF;
  padding: 0 29px;

  display: grid;
  place-items: center;

  p{
    text-align: center;
    margin: 0 auto;
    margin-top: 8px;
    max-width: 272px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
  

`
