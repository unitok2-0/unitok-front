import styled, { css } from 'styled-components';



export const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .exhibitor_link{
    position: relative;
    margin-top: 3.8rem;
    display: inline-block;
    font-size: 0.875rem;
    color: #6A736F;
    font-weight: 500;
    &:after{
      content: '';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -1px;
      border-width: 0 0 1px;
      border-style: solid;
      background-color:#6A736F;
    }
  }
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
