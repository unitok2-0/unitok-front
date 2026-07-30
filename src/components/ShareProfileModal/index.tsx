import { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react'
import { toast } from "react-toastify";
import { FiCopy, FiDownload } from "react-icons/fi";

import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import iconsPattern from "utils/IconsPatterns";
import Button from "components/Buttons/ButtonPrimary";
import { copyToClipboard } from "utils/copy-to-clipboard";
import genererateShareLink from "utils/generateShareLink";
import { useAuth } from "contexts/AuthContext";
import { BASE_URL_WEB } from 'constants/values';

import * as S from "./styles";

export type ShareProfileModalProps = MainModalProps & {
  codeId: string;
  email: string;
};

const socialIcons = iconsPattern.filter((pattern) =>
  ["WHATSAPP", "FACEBOOK", "LINKEDIN", "EMAIL"].includes(pattern.value)
);

export default function ShareProfileModal(props: ShareProfileModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const profileLink = `${BASE_URL_WEB}/${props.codeId}`
  const { user } = useAuth()

  function handleCopyProfileLink() {
    copyToClipboard(profileLink);
    toast.success("Link do perfil copiado");
    setIsCopied(true);
  }

  async function handleDownloadQRProfile() {
    const canvas: any = document.querySelector('.HpQrcode > canvas');
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `${props.codeId}-Unitok-QRCODE.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  props.email
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
          <Heading font="titleXs">Baixar Qr Code</Heading>

          <S.ProfileLinkBox>
            <Text color="grayDark">Qr Code do perfil público</Text>
            
              <Button onClick={handleDownloadQRProfile} styleProp={"border-radius: 999px; padding: 0; width: 36px; height: 36px"}>
                <FiDownload 
                  size={18}
                />
              </Button>
          </S.ProfileLinkBox>
        </S.ProfileLinkContainer>

        <S.ProfileLinkContainer style={{marginTop: '2rem'}}>
          <Heading font="titleXs">Copiar link do perfil</Heading>

          <S.ProfileLinkBox>
            <Text color="grayDark">{profileLink}</Text>
            {isCopied ? (
              <Button 
                styleProp={"border-radius: 999px; padding: 0; width: 36px; height: 36px"} 
                onClick={handleCopyProfileLink} 
                colorScheme="success">
                <FiCopy 
                  size={18}
                />
              </Button>
            ) : (
              <Button 
                onClick={handleCopyProfileLink}
                styleProp={"border-radius: 999px; padding: 0; width: 36px; height: 36px"}
              >
                <FiCopy 
                  size={18}
                />
              </Button>
            )}
          </S.ProfileLinkBox>
        </S.ProfileLinkContainer>
        <div className="HpQrcode" style={{display: 'none'}}>
          <QRCodeCanvas
            value={profileLink}
            size={200}
            level="M"
            fgColor="#000"
          />
        </div>
      </S.Wrapper>
    </Modal>
  );
}
