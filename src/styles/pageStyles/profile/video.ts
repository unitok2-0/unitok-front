import styled from 'styled-components';



export const Container = styled.main`

  height: 100vh;
  display: grid;
  grid-template-rows: 4fr 1fr;

  iframe{
    width: 100%;
    height: 70%;

    @media (min-width: 700px) {
      height: 100%;
      width: 68.8%;
      margin: 0 auto;
      margin-top: 2rem;
    }
  }


`

export const IframeContainer = styled.div`
  display: flex;
  place-items: center;
`

