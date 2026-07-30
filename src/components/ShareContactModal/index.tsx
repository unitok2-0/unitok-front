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
import { Contact } from 'pages/profile/contacts';
import {
  FaPhoneAlt,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaTiktok,
  FaFacebookF,
} from 'react-icons/fa'
export type ShareContactModalProps = MainModalProps & {
  contact: Contact;
};

const socialIcons = iconsPattern.filter((pattern) =>
  ["WHATSAPP", "FACEBOOK", "LINKEDIN", "EMAIL"].includes(pattern.value)
);

const WEBSITE = "unitok.com/";

export default function ShareContactModal(props: ShareContactModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  //const profileLink = WEBSITE + props.codeId;

  /* function handleCopyProfileLink() {
    copyToClipboard(profileLink);
    toast.success("Link do perfil copiado");
    setIsCopied(true);
  } */

  return (
    <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal}>
      <S.Wrapper>
        <S.LinksContainer>
          <Heading font="titleXs" color="primary">
            Compartilhar este contato
          </Heading>

          <S.LinksGrid>
            <S.Link
              target="_blank"
              rel="noreferrer"
              href={`whatsapp://send?text=${props.contact.phone}`}
            >
              <div>
                <FaWhatsapp size="1.5rem" />
              </div>
              <span>
                Whatsapp
              </span>
            </S.Link>
            <S.Link
              target="_blank"
              rel="noreferrer"
              href={`mailto:${props.contact.email}`}
            >
              <div>
                <FaEnvelope size="1.5rem" />
              </div>
              <span>
                E-mail
              </span>
            </S.Link>
          </S.LinksGrid>
        </S.LinksContainer>

        {/* <S.ProfileLinkContainer>
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
        </S.ProfileLinkContainer> */}
      </S.Wrapper>
    </Modal>
  );
}
