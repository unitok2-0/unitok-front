import styled from "styled-components";

export const InputGrid = styled.div`
  display: grid;
  gap: 3rem;
`;

export const InputRowGrid = styled.div`
  display: grid;
  gap: 3rem;

  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const SuccessAcountCreationMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: ${(props) => props.theme.colors.grayLight};
  z-index: 100;

  display: flex;
  flex-direction: column;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;

    max-width: 1120rem;
    margin: 0 auto;

    padding-bottom: 10rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  margin-top: 4.25rem;

  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  @media (min-width: 1120px) {
    max-width: 31rem;
  }

  > * + * {
    margin-top: 5.75rem;
  }
`;

export const ContentHStack = styled.div`
  @media (min-width: 1120px) {
    max-width: 60rem;
  }

  > * + * {
    margin-top: 5.75rem;
  }
`;

export const ResponsiveStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1120px) {
    flex-direction: column;
    align-items: stretch;

    > * + * {
      margin-top: 1.5rem;
    }
  }
`;
export const QRCodeModalWrapper = styled.div`
  padding: 2.5rem;
  text-align: center;
  display: grid;
  place-items: center;

  max-width: 100%;
  min-width: 20rem;

  > img {
    display: block;
    width: 12rem;
    height: 12rem;
  }
`;

export const PaymentsSaleModalWrapper = styled.div`
  padding-right: 0.5rem;

  > div {
    min-width: 80vw;
    max-width: 80vw;
    padding: 2.5rem;
    padding-right: 2rem;

    height: 90vh;
    overflow-y: scroll;
    overflow-x: scroll;
    text-align: center;
    display: grid;

    @media (max-width: 768px) {
      min-width: 90vw;
      padding: 1.25rem;
    }
  }
`;

export const SaleInfos = styled.div`
  display: grid;
  gap: 0.75rem;
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
