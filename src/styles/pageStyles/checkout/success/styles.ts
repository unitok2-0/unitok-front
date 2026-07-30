import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.grayLight};
  `}
`;

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const SuccessGrid = styled.div`
  min-height: calc(100vh - 6rem);
  display: grid;
  gap: 5rem;

  padding: 2rem 0 5rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 1120px) {
    /* grid-template-columns: 1fr 1fr; */
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 430px){
    min-height:0;
    padding-bottom: 0;
  }
`;

export const PaymentContainer = styled.div`
  display: grid;
  gap: 3rem;
  text-align: center;
  align-self: start;
  justify-content: center;

  padding: 3rem;
  background: #fff;
  border-radius: 10px;
`;

export const SuccessMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
   @media (max-width: 1120px) {
     order: -1;

     h2{
       line-height: 50px;
       font-size: 3rem;
     }
  }
   @media (max-width: 430px) {
     p,button{
       display: none;
     }
  }
`;

export const CheckoutDetails = styled.div`
  padding: 5rem 0 9.75rem;

  @media(max-width: 430px){
    padding-top: 1.8rem;
    padding-bottom: 4.6rem;
  }
`;

export const CartDetails = styled.div`
  padding-bottom: 3.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;

export const CartItems = styled.div`
  > * {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  }

  margin-bottom: 2rem;
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CheckoutDetailsMetadataGrid = styled.div`
  margin-top: 2.5rem;

  display: grid;

  row-gap: 2.5rem;
  column-gap: 2rem;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: auto auto;

    > div:nth-child(3) {
      grid-row: 1/-1;
      grid-column: 3;
    }
  }
`;

export const GoBackToSiteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 5rem;

  @media (max-width: 430px){
    button{
      width: 100%;
    }
  }
 
`;

/** below code belongs to checkout/old-success */

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  padding: 1rem;
  text-align: center;

  section {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 275px;
  }

  @media (max-width: 425px) {
    height: 50%;
  }
`;
