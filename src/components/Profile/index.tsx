import axios from 'axios';
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { ColorExtractor } from 'react-color-extractor'

import useDisclosure from "hooks/useDisclosure";
import { trackProfileButtonClick } from "services/analytics";
import { UserProps } from "domain/User";
import Avatar from "components/Avatar";
import { Heading, Text } from "components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import ProfileSocialButton from "components/ProfileSocialButton";
import { generateVcard, getImageUrl, getUserImageUrl } from "constants/functions";
import ModalQRCODE from "components/Modals/ModalQRCODE";
import ShareProfileModal from "components/ShareProfileModal";
import { SendInfosModal } from "components/SendInfosModal";
import { ModalPix } from "components/Modals/ModalPix"
import { getLuminosity } from "utils/getLuminosity";
import { ShareIconPetBanner } from "components/ShareIconPetBanner";
import { ProfileIconPetBanner } from "components/ProfileIconPetBanner";
import { TeamsGroupProps } from "domain/TeamsGroup";

import * as S from "./styles";

export type ProfileProps = {
  user: UserProps;
  bannerChildren?: React.ReactElement;
  admin?: UserProps;
  teamsGroup?: TeamsGroupProps;
};

export default function Profile(props: ProfileProps) {
  const [pixKey, setPixKey] = useState('')
  const shareProfileModal = useDisclosure();
  const sendInfosModal = useDisclosure();
  const qrCodeModal = useDisclosure();
  const pixModal = useDisclosure();

  const user = props.user;

  const fullName = (user.full_name ?? "").endsWith(user.surname)
    ? user.full_name ?? " "
    : `${user.full_name ?? " "} ${user.surname ?? " "}`

  const [imageLuminosity, setImageLuminosity] = useState(0)
  const [colors, setColors] = useState([])

  const qrCodeString = useMemo(() => {
    return generateVcard(props.user, "string");
  }, [props.user]);

  const colorScheme = props?.admin?.profileColor
    ? props.admin.profileColor 
    : props.user.profileColor;

  const luminosity = useMemo(() => {
    return getLuminosity(String(colorScheme))
  }, [colorScheme])

  /* const imageLum = useMemo(() => {
    const img = document.getElementById('banner-image-invisible')
    (async () => {
      const lum = await getLuminosityOfImage(props.user.bannerUrl)
      setImageLuminosity(lum)
    })()

  }, [props.user]) */

  useEffect(() => {

    const sum = colors.reduce((prev, curr) => {
      return getLuminosity(curr) + prev
    }, 0)

    const media = sum / colors.length
    setImageLuminosity(media)

    if (!colors || !colors[0]) {
      setImageLuminosity(255)
    }

  }, [props.user, colors])

  const socialButtons = useMemo(() => {
    return props.user.buttons.filter((button) => {
      if (button.hide) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function generateAndDownloadVcard() {
    if(props.user.imageUrl === 'https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png') {
      generateVcard(props.user);
    } else {
      try {
        const response = await axios.get(`${props.user.imageUrl}?not-from-cache-please`, { responseType: 'arraybuffer' });
        const string = Buffer.from(response.data, 'binary').toString('base64'); 
        generateVcard(props.user, "VCF", { string, mediaType: 'image/jpg' });
      } catch(e) {
        console.log('Erro ao consultar imagem', e);
        generateVcard(props.user);
      }
    }
  }

  async function handleSafeDownload() {
  try {
    // força a função generateVcard a retornar a string pura do conteúdo VCF
    const vcfString = await generateVcard(props.user, 'string');
    const blob = new Blob([vcfString], { type: 'text/vcard;charset=utf-8' });
    
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${props.user.full_name || 'contato'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Erro ao baixar o VCF com fallback:', err);
    alert("Não foi possível fazer o download do contato.");
  }
}


  function handleSendMyContacts() {
    sendInfosModal.handleOpen()
  }

  const { asPath } = useRouter()

  function handleOpenPixModal(href: string) {
    setPixKey(href)
    pixModal.handleOpen()
  }

  function getColorByLuminosity(luminosity: number) {

    if (luminosity >= 128) {
      return "#01302F"
    }
    if (luminosity <= 128) {
      return "white"
    }

    return "white"
  }

  const hightlightedButtons = socialButtons.filter(button => button.highlighted)
  const normalButtons = socialButtons.filter(button => !button.highlighted)

  const isSaveContactBlocked = props?.teamsGroup?.blockSaveContact ? true : props.user?.blockSaveContact ? true : false
  const isSendContactBlocked = props?.teamsGroup?.blockSendContacts ? true : props.user?.blockSendContacts ? true : false

  return <>
    {props.user.bannerUrl && (
      <ColorExtractor src={props.user.bannerUrl} getColors={(colors) => setColors(colors)} />
    )}
    <ShareProfileModal
      modalIsOpen={shareProfileModal.isOpen}
      closeModal={shareProfileModal.handleClose}
      email={props.user?.email}
      codeId={props.user?.name || props.user?.profileCode[0] || String(props.user?.profileCode)}
    />
    <SendInfosModal
      modalIsOpen={sendInfosModal.isOpen}
      closeModal={sendInfosModal.handleClose}
      userName={props.user.full_name}
      codeId={props.user?.name || props.user?.profileCode[0] || String(props.user?.profileCode)}
    />
    <S.Wrapper>
      <S.ColorBanner background_url={props.user.bannerUrl} style={{ background: props.user.bannerUrl ? "#F9FAFA" : colorScheme }}>
        <div className="banner">
          <div
            id="share-icon"
            style={{
              position: 'absolute',
              zIndex: '5',
              top: '32px',
              left: '15px',
              cursor: 'pointer',
              /* color: luminosity > 128 ? '#01302F' : 'white' */
            }}
            onClick={shareProfileModal.handleOpen}
          >
            <ShareIconPetBanner color={props.user?.profileColor} />
          </div>
          {props?.user?._id &&
            <div
              id="profile-icon"
              style={{
                position: 'absolute',
                zIndex: '5',
                top: '32px',
                right: '15px',
                cursor: 'pointer',
              }}
              onClick={() => Router.push('/profile/edit')}
            >
              <ProfileIconPetBanner color={props.user?.profileColor} />
            </div>
          }
        </div>
      </S.ColorBanner>

      <S.Content>
        <S.User>
          <Avatar imageUrl={getUserImageUrl(props.user.imageUrl)} />
          {props.admin && (
            <Avatar 
              imageUrl={getImageUrl(props.admin.logoImage)} 
              styleContainer={{ position: "absolute", top: "70px", right: "100px" }}
              size={55}
            />
          )}
          <Heading
            font="titleSm"
            style={{ marginTop: "0.5rem", textAlign: "center", color: "#383D3B" }}
          >
            {fullName}
          </Heading>
          <Text color="grayDark">{props.user.occupationArea ?? props.user.profession}</Text>
        </S.User>

        <S.ButtonsGrid>
        <ButtonPrimary
          onClick={handleSafeDownload}
          style={{ padding: "1rem", color: luminosity > 128 ? '#01302F' : 'white' }}
          colorScheme={colorScheme}
          disabled={isSaveContactBlocked}
        >
          Salvar este contato na agenda
        </ButtonPrimary>


          <ButtonPrimary
            onClick={handleSendMyContacts}
            colorScheme={colorScheme}
            style={{ color: luminosity > 128 ? '#01302F' : colorScheme }}
            variant="secondary"
            disabled={isSendContactBlocked}
          >
            Enviar meus Contatos
          </ButtonPrimary>

          {/* <ButtonPrimary
            variant="secondary"
            colorScheme={colorScheme}
            style={{ flex: 1, padding: 0 }}
            onClick={shareProfileModal.handleOpen}
          >
            Compartilhar
          </ButtonPrimary>

          <ButtonPrimary
            variant="secondary"
            style={{ padding: 0, flex: 1 }}
            colorScheme={colorScheme}
            rightElement={<AiOutlineQrcode size={16} />}
            onClick={qrCodeModal.handleOpen}
          >
            QR Code
          </ButtonPrimary> */}

        </S.ButtonsGrid>

        {
          hightlightedButtons?.length >= 1 && (
            <S.HighlightButtonsGrid>
              {
                hightlightedButtons?.map((button) => (
                  <ProfileSocialButton
                    key={button._id}
                    luminosity={luminosity}
                    target="_blank"
                    rel="noreferrer"
                    websiteName={button?.website_name}
                    buttonTitle={button?.title}
                    href={button.realUrl}
                    name={button.name as any}
                    colorScheme={colorScheme}
                    hightlightButton={button.highlighted}
                    onClick={async () => {
                      try {
                        button.name === 'PIX' ? handleOpenPixModal(button.realUrl) : null
                        await trackProfileButtonClick({
                          buttonName: button.name as string,
                          userId: props.user._id,
                        });
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  />
                ))}
            </S.HighlightButtonsGrid>
          )
        }

        <S.NormalButtonsGrid>
          <div>
            <ProfileSocialButton
              luminosity={luminosity}
              name="QRCODE"
              colorScheme={colorScheme}
              onClick={qrCodeModal.handleOpen}
            />
          </div>

          {
            normalButtons?.map((button) => (
              <div key={button._id}>
                <ProfileSocialButton
                  luminosity={luminosity}
                  target="_blank"
                  rel="noreferrer"
                  websiteName={button?.website_name}
                  buttonTitle={button?.title}
                  href={button.realUrl}
                  name={button.name as any}
                  colorScheme={colorScheme}
                  hightlightButton={false}
                  onClick={async () => {
                    try {
                      button.name === 'PIX' ? handleOpenPixModal(button.realUrl) : null
                      await trackProfileButtonClick({
                        buttonName: button.name as string,
                        userId: props.user._id,
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              </div>
            ))
          }
        </S.NormalButtonsGrid>
      </S.Content>
      <S.Footer>
        <Link href="/" passHref>

          <img
            src="/assets/powered-by-unitok.svg"
            alt="Powered by Unitok"
          />

        </Link>
      </S.Footer>
    </S.Wrapper>

    <ModalQRCODE
      closeModal={qrCodeModal.handleClose}
      modalIsOpen={qrCodeModal.isOpen}
      valueQRCODE={qrCodeString}
    />

    <ModalPix
      closeModal={pixModal.handleClose}
      modalIsOpen={pixModal.isOpen}
      pixKey={pixKey}
      user={props.user}
    />
  </>;
}
