import styled, { css } from "styled-components";
import { Colors } from "../../../Colors";

export const CartContent = styled.div`
  padding: 3.75rem 2rem 5rem;
  max-width: 80rem;
  margin: 0 auto;

  @media (max-width: 1120px) {
    padding-bottom: 10rem;
  }
`;

export const EmptyCartContainer = styled.div`
  min-height: calc(100vh - 6rem);
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  padding: 3.75rem 2rem 10rem;

  > * + * {
    margin-top: 4.5rem;
  }
`;

export const THeadAsDiv = styled.div`
  display: grid;
  grid-template-columns: 4rem 9rem 3fr 1fr 1fr 1fr;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};

  * {
    text-align: center;
  }

  @media (max-width: 1120px) {
    display: none;
  }
`;

export const CartItemList = styled.div`
  display: grid;

  > * {
    border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};
  }
`;

export const SubtotalAndShipping = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 1rem 0;

  > * + * {
    margin-top: 1rem;
  }
`;

export const SubtotalAndShippingHStack = styled.div`
  width: 35%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  justify-items: end;
  align-items: center;

  @media (max-width: 1120px) {
    width: 100%;

    *:first-child {
      justify-self: start;
    }
  }
`;

export const ShippingPrices = styled.div`
  width: 35%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  justify-items: end;
  align-items: center;
  @media (max-width: 1120px) {
    width: 100%;

    *:first-child {
      justify-self: start;
    }
  }
`

export const ShippingPricesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  & > div{
    border-bottom: 1px solid #EFF2F2;
    padding: 0.625rem 0;
    width: 12.75rem;
    &:last-child{
      border: none;
    }
  }
  .delivery_type{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stipulated{
    color: #909692;
  }

  p{
    font-size:12px;
    font-weight: 500;
  }
`

export const NavigationFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.75rem;
`;

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

export const Section = styled.section`
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  /* max-width: 50rem; */
  padding: 3rem 3rem;
  margin-bottom: 3rem;

  @media (max-width: 720px) {
    padding: 1.5rem 1.5rem;
    align-items: center;
    max-width: none;
  }

  h1 {
    font-size: 1.4rem;
    margin: 3rem 0 1.5rem;
    font-weight: 500;
  }

  a {
    text-decoration: underline;
    color: ${Colors.primary};
  }
`;

export const AddNewCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;

  background: transparent;
  border: 1px solid ${Colors.gray300};
  border-radius: 1rem;

  font-weight: 500;
  margin-top: 1.5rem;

  span {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    background: ${Colors.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2.5rem;
`;

export const ButtonStyle = css`
  width: 100%;
  max-width: 13rem;
  padding: 0.8rem;
  margin-top: 2rem;
  align-self: flex-end;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.35);

  @media (max-width: 720px) {
    align-self: flex-start;
    max-width: none;
  }
`;

export const VoucherInputStyled = css`
  max-width: 15rem;
`;

export const Aside = styled.aside`
  flex: 2;
  border-left: 1px solid black;

  @media (max-width: 970px) {
    border-left: none;
    border-top: 1px solid black;
  }
`;
