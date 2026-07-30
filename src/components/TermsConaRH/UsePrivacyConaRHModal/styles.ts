import styled from "styled-components";

export const UseTermsModalProps = styled.div`
  padding: 2rem 1.5rem;

  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h2{
   margin: 4rem 0;
    font-weight: 400;
    font-size: 3rem;
    line-height: 3.6rem;
  }

  p{
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    a{
      color: #FF4C1C;
    }
  }

  @media (max-width: 360px){
    h2{
      font-size: 2rem;
      line-height: 3.5rem;
    }
  }
`;
