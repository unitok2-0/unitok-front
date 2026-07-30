import { useCallback, useEffect, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { Text } from "components/Typography";

import * as S from "./styles";

export type QuantityInputProps = {
  onChange?: (quantity: number) => void;
  defaultQuantity?: number;
  min?: number;
  max?: number;
};

export default function QuantityInput(props: QuantityInputProps) {
  const { onChange } = props;

  const [quantity, setQuantity] = useState(
    props.defaultQuantity || props.min || 0
  );

  const increment = useCallback(() => {
    setQuantity((state) => {
      if ((props.max || props.max === 0) && state >= props.max) return state;
      return state + 1;
    });
  }, [props.max]);

  const decrement = useCallback(() => {
    setQuantity((state) => {
      if ((props.min || props.min === 0) && state <= props.min) return state;
      return state - 1;
    });
  }, [props.min]);

  useEffect(() => {
    onChange?.(quantity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <S.Wrapper>
      <ButtonPrimary
        type="button"
        asIconButton
        variant="secondary"
        title="Decrementar"
        onClick={decrement}
        disabled={quantity <= props.min}
      >
        <FiMinus size={20} />
      </ButtonPrimary>
      <Text style={{ minWidth: "1.125rem", textAlign: "center" }}>
        {quantity}
      </Text>
      <ButtonPrimary
        type="button"
        asIconButton
        variant="secondary"
        title="Incrementar"
        onClick={increment}
        disabled={quantity >= props.max}
      >
        <FiPlus size={20} />
      </ButtonPrimary>
    </S.Wrapper>
  );
}
