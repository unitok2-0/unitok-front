import { useCheckout } from "contexts/CheckoutContext";
import { formatPrice } from "utils/formatter";
import { Text } from "components/Typography";

import * as S from "./styles";

export type NextStepBoxProps = {
  children: React.ReactNode;
};

export default function NextStepBox(props: NextStepBoxProps) {
  const { discountedTotal } = useCheckout();

  return (
    <S.Wrapper>
      <S.SubTotalBox>
        <Text>Total</Text>
        <Text style={{ fontWeight: 500 }}>{formatPrice(discountedTotal)}</Text>
      </S.SubTotalBox>
      {props.children}
    </S.Wrapper>
  );
}
