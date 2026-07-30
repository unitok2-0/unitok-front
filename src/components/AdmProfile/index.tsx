import Avatar from "components/Avatar";
import { getImageUrl } from "constants/functions";
import { useAuth } from "contexts/AuthContext";
import { UserProps } from "domain/User";
import { Heading, Text } from "components/Typography";

import * as S from './styles'
import ButtonLink from "components/Buttons/ButtonLink";
import { useRouter } from "next/router";
import { QRCodeProps } from "domain/QRCode";

interface AdmProfileProps {
  user: UserProps;
  qrcodes: QRCodeProps[];
}

export function AdmProfile({ user, qrcodes }: AdmProfileProps) {
  const { push } = useRouter();

  const activeQrcodes = qrcodes.filter(code => code.status === "ACTIVE");

  return (
    <S.Wrapper>
      <S.AdminContainer>
        <Text extendStyle={"font-size: 1.25rem; font-weight: 500; @media(max-width: 480px){ text-align: center}"}>
          Padrões de perfil e botões
        </Text>
        <Text 
          extendStyle={"font-size: 0.6875rem; margin-bottom: 1.5rem; text-align: flex-start; width: 100%; @media(max-width: 480px){ text-align: center}"}
        >
          Aplicado nos perfis de todos os usuários
        </Text>
        <S.ProfileContainer>
          <S.ColorBanner background_url={getImageUrl(user?.bannerUrl)} style={{background: user?.bannerImage ? "" : `${user?.profileColor}`}}>
            <S.AvatarContainer>
              <Avatar imageUrl={user?.imageUrl} size={100} />
              <Avatar imageUrl={getImageUrl(user?.logoImage)} size={48} styleContainer={"margin-top: 4rem; margin-left: -2rem"} />
            </S.AvatarContainer>
          </S.ColorBanner>
          <Text style={{ fontWeight: "500", marginTop: "6rem", textAlign: "center", fontSize: "14px" }}>{user?.name}</Text>
          <Text
            style={{
              fontWeight: "400", marginTop: "0.5rem", textAlign: "center", fontSize: "14px", color: "#909692"
            }}>
            {user?.enterpriseName}
          </Text>

          <ButtonLink
            textButton="Definir padrões"
            styleProp={"width: 18rem; margin: 2rem auto"}
            onClick={() => push('/teams/enterprise-profile/set-patterns')}
          ></ButtonLink>
        </S.ProfileContainer>
      </S.AdminContainer>

      <S.AdminContainer className="devices">
        <Text extendStyle={"font-size: 1.25rem; font-weight: 500"}>
          Dispositivos
        </Text>

        <Text extendStyle={"font-size: 3.5rem; font-weight: 300; margin: 4.5rem 0 1rem 0"}>
          {qrcodes.length  - activeQrcodes.length}
        </Text>
        <Text extendStyle={"font-size: 0.875rem; font-weight: 400"}>
          inativos
        </Text>

        <Text extendStyle={"font-size: 3.5rem; font-weight: 300; margin: 4.5rem 0 1rem 0"}>
          {activeQrcodes.length}
        </Text>
        <Text extendStyle={"font-size: 0.875rem; font-weight: 400"}>
          ativos
        </Text>

        <ButtonLink
          as="a"
          textButton="Adquirir novos dispositivos"
          variant="tertiary"
          styleProp={"margin-top: 6rem; text-align: flex-start; width: 220px"}
          href="https://api.whatsapp.com/send?phone=5508004550800"
          target="_blank"
        ></ButtonLink>
      </S.AdminContainer>
    </S.Wrapper>
  )
}
