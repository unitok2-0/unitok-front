import styled from "styled-components";

export type WrapperProps = {
  shouldBeStatic?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: 4rem 9rem 3fr 1fr 1fr 1fr;
  gap: 1.5rem;

  align-items: center;

  padding: 1.5rem 0;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      "cardbox cardbox cardbox cardbox cardbox cardbox cardbox cardbox cardbox trash"
      "custombox custombox custombox custombox custombox custombox custombox custombox custombox custombox"
      "quantity quantity quantity quantity quantity total total total total total";
  }

  @media (max-width: 1120px) {
    > button:first-child {
      grid-area: trash;
    }

    .quantity {
      grid-area: quantity;
      justify-content: start;
    }

    .total-price {
      grid-area: total;
      justify-content: end;
      text-align: end;
    }
  }
`;

export const CustomNamesBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  text-align: start;

  * {
    font: ${(props) => props.theme.fonts.bodySm};
  }

  > * + * {
    margin-top: 1rem;
  }

  @media (max-width: 1120px) {
    grid-area: custombox;
  }
`;

export const CardBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-direction: row-reverse;
  align-items: center;

  @media (max-width: 1120px) {
    grid-area: cardbox;
  }

  @media (min-width: 1120px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CustomInfoBox = styled.div`
  padding-left: 1.5rem;
`;

export const PlaceItemsCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UnitPriceBox = styled.div`
  display: grid;
  text-align: center;

  /* @media (max-width: 1120px) {
    display: none;
  } */
`;

export const StaticWrapper = styled.div`
  display: grid;
  grid-template-columns: 9rem 1fr 1fr 1fr;
  gap: 1.5rem;

  align-items: center;

  padding: 1.5rem 0;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr 1fr;
    justify-content: start;
    text-align: start;

    > * {
      grid-area: unset !important;
      justify-content: flex-start;
    }
  }

  ${CardBox} {
    @media (max-width: 1120px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
