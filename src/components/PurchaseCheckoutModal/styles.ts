import styled, { css } from "styled-components";



export const PurchaseModalProps = styled.div`
  padding: 2rem 1.5rem;
  position: relative;
  header{
    text-align: center;
    h2{
      font-size: 1.6rem;
    }
  }

`;

export const CartItems = styled.div`
  > * {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  }

  margin-bottom: 2rem;
`;

export const CartDetails = styled.div`
  padding-bottom: 3.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
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

  @media (max-width: 430px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: auto auto;

    > div:nth-child(3) {
      grid-row: 1/-1;
      grid-column: 3;
    }
  }
`;

export const closeButton = css`
  position: fixed;
  top: 1rem;
  right: 3rem;
  color: #FF4C1C;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1.2rem;
`