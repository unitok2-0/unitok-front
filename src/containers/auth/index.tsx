import { Header } from "components/Header";
import Link from "next/link";
import * as S from "./styles";

export type AuthContainerProps = {
  imageSrc: string;
  children: React.ReactNode;
  teamsUser?: any;
};

export default function AuthContainer(props: AuthContainerProps) {
  return (
    <S.Wrapper teamsUser={props.teamsUser}>
      {!props.teamsUser && <Header variant="logoOnly" whatColor="transp" />}
      {!props.teamsUser && <S.Image style={{ backgroundImage: `url("${props.imageSrc}")` }} />}
      <S.Content>
        <S.ContentContainer>{props.children}</S.ContentContainer>
      </S.Content>
      {
        props.teamsUser && (
          <S.PowerdBy>
            <Link href="/" passHref>

              <img
                src="/assets/powered-by-unitok.svg"
                alt="Powered by Unitok"
              />

            </Link>
          </S.PowerdBy>
        )
      }
    </S.Wrapper>
  );
}
