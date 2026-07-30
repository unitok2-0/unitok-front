import styled, { css } from "styled-components";
import * as HeaderStyles from "components/Header/styles";

export const Wrapper = styled.div`
  min-height: 100vh;

  h1 {
    display: none;
  }

  @media (max-width: 1120px) {
    h1 {
      display: block;
    }
  }
  @media (max-width: 768px) {
    ${HeaderStyles.HeaderContainer} {
      position: static;
    }
  }
`;

export const Main = styled.div<{ shouldCenterContent?: boolean }>`
  display: ${({ shouldCenterContent = true }) =>
    shouldCenterContent ? "flex" : "block"};
  min-height: calc(100vh - 6rem); // 6rem represents header height

  @media (max-width: 1120px) {
    flex-direction: column;
    height: auto;
  }
`;

export const Content = styled.div`
  flex: 2;

  padding: 5.5rem 2rem;

  @media (max-width: 1120px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  display: grid;
  place-items: center;
`;

export const CheckoutSummary = styled.aside`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.grayLighter};

    padding-left: 2rem;
    padding-right: 2rem;

    @media (min-width: 1120px) {
      position: sticky;
      top: 7.5rem;
      max-height: calc(100vh - 7.5rem);
    }
  `}
`;

export const CheckoutForm = styled.form`
  display: grid;
  gap: 3rem;
  flex: 3;
  min-width: 80%;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1120px) {
    padding: 0;
    padding-bottom: 3rem;
    min-width: 100%;
  }

  @media (min-width: 1400px) {
    min-width: 60%;
    max-width: 60%;
  }
`;

export const InputInlineGrid = styled.div<{ gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns || "1fr 3fr"};
  gap: 1.75rem;

  @media (max-width: 768px) {
    gap: 3rem;
    grid-template-columns: 1fr;
  }
`;

export const NextStepBox = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.white};

  justify-content: flex-end;

  @media (max-width: 1120px) {
    flex-direction: column;
    position: fixed;
    z-index: 100;

    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem 2rem;
  }
`;

export const SubTotalBox = styled.div`
  display: none;

  @media (max-width: 1120px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;



export const SelectShipmentsContainer = styled.div`

`

export const ShipmentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F9FAFA;
  padding: 1.438rem 1rem;
  border-radius: 10px;
  margin-top: 0.625rem;
  &:first-child{
    margin-top: 0;
  }
`

export const InputRadioBox = styled.div`
  display: flex;
  .shipment-description{
    font-size: 12px;
    margin-left: 2rem;
    color: #909692;
  }

  .shipment-type{
    font-size: 0.875rem;
    font-weight: 400;
  }

  .shipment-price{
    font-size: 0.875rem;
  }

`
