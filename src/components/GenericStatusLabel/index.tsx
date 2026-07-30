import { Text } from "components/Typography";
import { Theme } from "styles/themes/light";
import * as S from "./styles";

export type GenericStatusLabelProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  font?: keyof Theme["fonts"];
};

export default function GenericStatusLabel(props: GenericStatusLabelProps) {
  return (
    <S.Wrapper>
      {props.icon}

      <Text font={props.font} as="span">
        {props.children}
      </Text>
    </S.Wrapper>
  );
}
