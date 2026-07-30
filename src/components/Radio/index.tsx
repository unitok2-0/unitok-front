import { Text } from "components/Typography";
import { InputHTMLAttributes, useState } from "react";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

import * as S from "./styles";

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
};

export default function Radio(props: RadioProps) {
  const { children, ...inputProps } = props;

  return (
    <S.Wrapper>
      <S.InputDiv>
        <S.Input {...inputProps} type="radio" />
        {props.checked ? (
          <MdRadioButtonChecked size={20} />
        ) : (
          <MdRadioButtonUnchecked size={20} />
        )}
      </S.InputDiv>
      <Text as="span">{children}</Text>
    </S.Wrapper>
  );
}
