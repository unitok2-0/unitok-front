import styled from 'styled-components';




export const Container = styled.div`
  display: grid;
  gap: 2.7rem;
  .grid{
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 30px;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
      gap: 2.7rem;
    }
  }
`