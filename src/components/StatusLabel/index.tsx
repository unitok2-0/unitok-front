import { Text } from "components/Typography";
import { Theme } from "styles/themes/light";
import * as S from "./styles";

export type StatusLabelProps = S.WrapperProps & {
  activeText?: string;
  inactiveText?: string;
  activeLeftComponent?: React.ReactNode;
  inactiveLeftComponent?: React.ReactNode;
  font?: keyof Theme["fonts"];
};

export default function StatusLabel(props: StatusLabelProps) {
  return (
    <S.Wrapper isActive={props.isActive}>
      {props.activeLeftComponent || props.inactiveLeftComponent ? (
        props.isActive ? (
          props.activeLeftComponent
        ) : (
          props.inactiveLeftComponent
        )
      ) : (
        <span className="circle" />
      )}

      <Text font={props.font} as="span">
        {props.isActive
          ? props.activeText || "Ativo"
          : props.inactiveText || "Inativo"}
      </Text>
    </S.Wrapper>
  );
}
