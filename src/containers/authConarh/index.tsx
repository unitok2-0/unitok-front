import { Header } from "components/Header";
import * as S from "./styles";

export type AuthContainerProps = {
  imageSrc: string;
  children: React.ReactNode;
};

export default function AuthConarh(props: AuthContainerProps) {
  return (
    <S.Wrapper>
      <Header variant="logoOnly" whatColor="transp" />
      <S.Image style={{ backgroundImage: `url("${props.imageSrc}")` }} />
      <S.Content>
        <S.ContentContainer>{props.children}</S.ContentContainer>
      </S.Content>
    </S.Wrapper>
  );
}
