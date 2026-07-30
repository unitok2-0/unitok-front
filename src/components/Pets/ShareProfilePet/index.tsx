import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import * as S from "./styles";
import iconsPattern from "utils/IconsPatterns";
import Button from "components/Buttons/ButtonPrimary";
import { useState } from "react";
import { copyToClipboard } from "utils/copy-to-clipboard";
import { toast } from "react-toastify";
import genererateShareLink from "utils/generateShareLink";
import { FiCopy } from "react-icons/fi";
import { useAuth } from "contexts/AuthContext";

export type ShareProfilePetModalProps = MainModalProps & {
  codeId: string;
};

const socialIcons = iconsPattern.filter((pattern) =>
  ["WHATSAPP", "FACEBOOK"].includes(pattern.value)
);

const WEBSITE = "unitok.com/pet/";

export default function ShareProfilePetModal(props: ShareProfilePetModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const profileLink = WEBSITE + props.codeId;

  function handleCopyProfileLink() {
    copyToClipboard(profileLink);
    toast.success("Link do perfil copiado");
    setIsCopied(true);
  }

  return (
    <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal}>
      <S.Wrapper>
        <S.LinksContainer>
          <Heading font="titleXs" color="primary">
            Compartilhar meu perfil
          </Heading>

          <S.LinksGrid>
            {socialIcons.map((pattern) => (
              <S.Link
                key={pattern.name}
                target="_blank"
                rel="noreferrer"
                href={genererateShareLink(
                  pattern.name.toLocaleLowerCase() as any,
                  profileLink,
                )}
              >
                <div>
                  <pattern.icon size="1.5rem" />
                </div>
                <span>
                  {pattern.name}
                </span>
              </S.Link>
            ))}
          </S.LinksGrid>
        </S.LinksContainer>

        <S.ProfileLinkContainer>
          <Heading font="titleXs">Copiar link do perfil</Heading>

          <S.ProfileLinkBox>
            <Text color="grayDark">{profileLink}</Text>
            {isCopied ? (
              <Button styleProp={{ color: "unset" }} onClick={handleCopyProfileLink} colorScheme="success">
                Copiado
              </Button>
            ) : (
              <Button onClick={handleCopyProfileLink}>
                <FiCopy 
                  size={18}
                />
              </Button>
            )}
          </S.ProfileLinkBox>
        </S.ProfileLinkContainer>
      </S.Wrapper>
    </Modal>
  );
}
