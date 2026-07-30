import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2.9rem;
  padding-top: 6.6rem;
  max-width: 32rem;
  min-height: 50vh;

  text-align: center;

  #close-btn-mobile{
    transform: none;
    top: 1.8rem;
    padding: 0;
    height: 32px;
  }

  @media (max-width: 600px) {
    max-width: none;
    width: 100vw;
    height: 100vh;
    /* #close-btn-mobile{
      position: static;
    }
    .header{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    } */
  }

  /* > * + * {
    margin-top: 2.5rem;
  } */
`;


export const IconAndTitle = styled.div`
  p{
    margin-top: 0.6rem;
  }
  margin-bottom: 3.3rem;
`

export const StepOne = styled.div`
  width: 100%;
  p{
    text-align: left;
  }

  #currency-input{
    border: none;
    width: 100%;
    color: #01302F;
    font-weight: 400;
    border-bottom: 1px solid #01302F;
    margin-top: 24px;
    box-shadow: none;
    border-radius: 0;
  }
`

export const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-top: 2rem;
`

export const StepTwo = styled.div`

  .value{
    margin-top: 2.8rem;
    margin-bottom: 0.75rem;
  }
  .value > span{
    font-weight: 500;
  }

  .description{
    margin-bottom: 2.5rem;
  }
`

export const BackButton = styled.button`
  background: none;
  border: none;
  position: absolute;
   top: 2rem;
  left: 14px;
  height: 32px;
`