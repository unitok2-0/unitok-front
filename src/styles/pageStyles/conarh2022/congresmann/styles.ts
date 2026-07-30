import styled from 'styled-components'

export const ContainerCongressman = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  max-width: 90%;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title{
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 0.85rem;
    color: #909692;
  }

  .description{
    width: 100%;
    text-align: center;
    font-size: 0.938rem;
    font-weight: 400;
    line-height: 2rem;
  }

  .buttonPosition{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    justify-content: center;
    gap: 0.938rem;
  }

`