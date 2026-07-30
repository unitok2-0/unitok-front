import styled from 'styled-components'

export const Container = styled.div`
  background: #01302F;
  height: 2.625rem;

  display: grid;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  margin: auto;
  color: #FFFFFF;

  display: grid;
  grid-template-columns: 1fr 3rem;
  justify-content: center;
  align-items: center;
  text-align: center;


  div{ 
    button{
      color: #FF4C1C;
      font-weight: 500;
      text-decoration: underline;
      border: none;
      background-color: transparent;

      @media (max-width: 376px){
      font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 376px){
    padding: 0 1rem;
    font-size: 0.8rem;
  }

`
