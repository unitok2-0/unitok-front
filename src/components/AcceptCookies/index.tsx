import { useRouter } from "next/router";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { Text } from "components/Typography";
import * as S from "./styles";

interface AcceptCookiesProps {
  handleAcceptCookies: () => void;
}

export function AcceptCookies(props: AcceptCookiesProps) {
  const { push } = useRouter();
  return (
    <S.AcceptCookieDiv>
      <Text font='bodyMd' color='secondary'>
        Nós usamos cookies para melhorar sua experiência de navegação. Ao utilizar nosso site, você concorda com a política de monitoramento de cookies. 
      </Text>

      <S.AcceptCookieButtonsDiv>
        <ButtonPrimary
          variant='tertiary'
          onClick={() => push('/privacidade')}
        >
          Política de privacidade
        </ButtonPrimary>

        <ButtonPrimary
          className='AcceptCookieButton'
          onClick={props.handleAcceptCookies}
        >
          Aceitar e fechar
        </ButtonPrimary>
      </S.AcceptCookieButtonsDiv>
    </S.AcceptCookieDiv>
  )
}