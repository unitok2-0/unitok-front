import * as S from "./styles";

export type ColorDotProps = S.WrapperProps & {
  colors: S.ColorProps["color"][];
  asButton?: boolean;
  onClick?: () => void;
  ["aria-label"]?: string;
};

export default function ColorDot(props: ColorDotProps) {
  return (
    <S.Wrapper
      isActive={props.isActive}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      title={props["aria-label"]}
      {...(props.asButton && { role: "button" })}
    >
      {props.colors?.map((color) => (
        <S.Color color={color} key={color} />
      ))}
    </S.Wrapper>
  );
}
