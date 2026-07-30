import { Header } from "components/Header";
import SummaryPayment from "components/SummaryPayment";
import * as S from "./styles";

export type CheckoutContainerProps = {
  children: React.ReactNode;
  shouldCenterContent?: boolean;
  shouldHideCheckoutSummary?: boolean;
};

export default function CheckoutContainer(props: CheckoutContainerProps) {
  const { shouldCenterContent = true } = props;

  return (
    <S.Wrapper>
      <Header variant="stepper" bgColor="white" boderBottomColor="grayLight" />
      <S.Main shouldCenterContent={shouldCenterContent}>
        {shouldCenterContent ? (
          <S.Content>{props.children}</S.Content>
        ) : (
          props.children
        )}
        {!props.shouldHideCheckoutSummary && (
          <S.CheckoutSummary>
            <SummaryPayment />
          </S.CheckoutSummary>
        )}
      </S.Main>
    </S.Wrapper>
  );
}
