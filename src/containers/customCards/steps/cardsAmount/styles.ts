import styled from 'styled-components';




export const Container = styled.form`
display: block;
  h2{
    margin-bottom: 32px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

/* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .grid-inputs{
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 29px;

    @media (max-width: 480px) {
      margin-top: 3rem;
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
`