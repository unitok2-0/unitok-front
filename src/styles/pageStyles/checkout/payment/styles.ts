import styled, { css } from "styled-components";
import { Colors } from "../../../Colors";

export const PaymentMethodsGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export type PaymentMethodContainerProps = {
  isDisabled?: boolean;
};

export const PaymentMethodContainer = styled.div<PaymentMethodContainerProps>`
  background: ${(props) => props.theme.colors.grayLighter};
  border-radius: 10px;

  opacity: ${(props) => props.isDisabled && 0.6};

  > * + * {
    border-top: 2px solid white;
  }
`;

export const PaymentMethod = styled.div`
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaymentMethodContent = styled.div<{ gap?: string }>`
  display: grid;
  gap: ${(props) => props.gap || "3rem"};

  padding: 2.25rem 2rem;
`;

export const Main = styled.main`
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 3;
  padding: 3rem 3rem;

  @media (max-width: 720px) {
    padding: 1.5rem 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
    margin-top: 3rem;
    font-weight: 500;
  }

  h2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    margin: 2rem 0 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    align-items: center;
    max-width: none;
  }
`;

export const InputStyle = css`
  margin-top: 1rem;
  max-width: 50rem;
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

export const InLine = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.2rem;
  width: 100%;
  margin-top: 0.4rem;
`;
export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;

  > label {
    margin-bottom: 1rem;
  }
`;

export const InstallmentsSelect = styled.div`
  margin-top: 1rem;
  width: 100%;

  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }

  select {
    width: 100%;
    font-size: 0.8rem;
    border: 1px solid ${Colors.gray300};
    border-radius: 8px;
    padding: 0.5rem;
    height: 2.5rem;
  }
`;

export const Aside = styled.aside`
  flex: 2;
  border-left: 1px solid black;

  @media (max-width: 970px) {
    border-left: none;
    border-top: 1px solid black;
  }
`;

export const VoucherContainer = styled.div`
  display: grid;
  align-items: flex-end;
  margin-bottom: 5rem;
  gap: 2rem;

  > div {
    flex: 1;
  }

  @media (min-width: 1120px) {
    gap: 1rem;
    grid-template-columns: 1fr auto;
  }
`;
