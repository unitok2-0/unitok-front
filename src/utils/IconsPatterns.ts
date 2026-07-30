import { IconType } from "react-icons/lib";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
  FaVimeoV,
  FaBehanceSquare,
  FaPinterestP,
  FaTelegramPlane,
  FaTwitch,
  FaFacebookMessenger,
  FaDiscord,
  FaWindows,
} from 'react-icons/fa'
import PixIcon from '../../public/assets/pixIcon.svg'
import DiscordIcon from '../../public/assets/discord_icon.svg';
import WBusinessIcon from '../../public/assets/WB_icon.svg';

import { BsCameraVideo, BsMic, BsTelephoneFill, BsTwitter } from 'react-icons/bs';
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { FiMousePointer } from 'react-icons/fi'
import { MdQrCode2 } from 'react-icons/md'
import { RiMapPin2Fill } from "react-icons/ri";
// SiMicrosoftoffice was removed from react-icons/si (Simple Icons dropped the Microsoft Office brand icon).
const SiMicrosoftoffice = FaWindows;

export const iconsPatternContainerLeft = [
  {
    icon: FaWhatsapp,
    value: "WHATSAPP",
    name: "Whatsapp",
    withRoundBackground: true,
    labelInput: 'Digite seu número no whatsapp',
    typeInput: 'tel',
    index: 2,
  },
  {
    icon: RiMapPin2Fill,
    value: "LOCALIZATION",
    name: "Endereço",
    withRoundBackground: false,
    labelInput: 'Informe sua localização',
    typeInput: 'text',
    index: 3,
  },
  {
    icon: FiMousePointer,
    value: "WEBSITE",
    name: "Link",
    withRoundBackground: false,
    labelInput: 'Digite a url do site',
    typeInput: 'text',
    index: 4
  },
  {
    icon: FaLinkedinIn,
    value: "LINKEDIN",
    name: "Linkedin",
    withRoundBackground: true,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
    index: 5
  },
  {
    icon: FaWhatsapp,
    value: "WBUSINESS",
    name: "WhatsApp Business",
    withRoundBackground: true,
    labelInput: 'Digite o seu número business',
    typeInput: 'tel',
    index: 6
  },
  {
    icon: FaFacebookF,
    value: "FACEBOOK",
    name: "Facebook",
    withRoundBackground: false,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
    index: 7
  },
  {
    icon: FaFacebookMessenger,
    value: "MESSENGER",
    name: "Messenger",
    withRoundBackground: false,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
    index: 8
  },
  {
    icon: FaTiktok,
    value: 'TIKTOK',
    name: 'Tik tok',
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text',
    index: 9
  },
  {
    icon: BsTelephoneFill,
    value: "TELEFONE",
    name: "Telefone",
    withRoundBackground: true,
    labelInput: 'Digite seu número',
    typeInput: 'tel',
    index: 10,
  },
  {
    icon: FaYoutube,
    value: "YOUTUBE",
    name: "Youtube",
    withRoundBackground: true,
    labelInput: 'Digite a url do video',
    typeInput: 'text',
    index: 11,
  },
  {
    icon: FaDiscord,
    value: "DISCORD",
    name: "Discord",
    withRoundBackground: true,
    labelInput: 'usuario#0000',
    typeInput: 'text',
    withTitle: true,
    index: 12,
  }
]

export const iconsPatternContainerRight = [
  {
    icon: PixIcon,
    value: "PIX",
    name: "Pix",
    withRoundBackground: false,
    labelInput: 'Informe sua chave PIX',
    typeInput: 'text',
    index: 2,
  },
  {
    icon: FaInstagram,
    value: "INSTAGRAM",
    name: "Instagram",
    withRoundBackground: true,
    labelInput: 'Digite seu @',
    typeInput: 'text',
    index: 3,
  },
  {
    icon: BsTwitter,
    value: "TWITTER",
    name: "Twitter",
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text',
    index: 4,
  },
  {
    icon: IoMusicalNotesOutline,
    value: "PLAYLIST",
    name: "Playlist",
    withRoundBackground: false,
    labelInput: 'Informe a URL da sua playlist',
    typeInput: 'text',
    index: 5,
  },
  {
    icon: BsMic,
    value: "PODCAST",
    name: "Podcast",
    withRoundBackground: false,
    labelInput: 'Informe a URL do seu podcast',
    typeInput: 'text',
    index: 6,
  },
  {
    icon: BsTelephoneFill,
    value: "TELEFONE_COMERCIAL",
    name: "Telefone Comercial",
    withRoundBackground: true,
    labelInput: 'Digite o número',
    typeInput: 'tel',
    index: 7,
  },
  {
    icon: FaEnvelope,
    value: "EMAIL",
    name: "Email",
    withRoundBackground: true,
    labelInput: 'Digite endereço de email',
    typeInput: 'text',
    index: 8,
  },
  {
    icon: FaVimeoV,
    value: "VIMEO",
    name: "Vimeo",
    withRoundBackground: true,
    labelInput: 'Digite a url do video',
    typeInput: 'text',
    index: 9,
  },
  {
    icon: FaBehanceSquare,
    value: "BEHANCE",
    name: "Behance",
    withRoundBackground: true,
    labelInput: 'Digite seu perfil ou URL',
    typeInput: 'text',
    index: 10,
  },
  {
    icon: FaTelegramPlane,
    value: "TELEGRAM",
    name: "Telegram",
    withRoundBackground: true,
    labelInput: 'Digite a url',
    typeInput: 'text',
    withTitle: true,
    index: 11,
  },
  {
    icon: SiMicrosoftoffice,
    value: "OFFICE",
    name: "Office 365",
    withRoundBackground: true,
    labelInput: 'Digite a url',
    typeInput: 'text',
    withTitle: true,
    index: 12,
  },
  {
    icon: FaPinterestP,
    value: "PINTEREST",
    name: "Pinterest",
    withRoundBackground: true,
    labelInput: 'Digite seu @',
    typeInput: 'text',
    withTitle: true,
    index: 13,
  },
  {
    icon: FaTwitch,
    value: "TWITCH",
    name: "Twitch",
    withRoundBackground: true,
    labelInput: 'Digite seu usuário ou URL',
    typeInput: 'text',
    withTitle: true,
    index: 14,
  },
]

const iconsPattern = [
  {
    icon: SiMicrosoftoffice,
    value: "OFFICE",
    name: "Office 365",
    withRoundBackground: true,
    labelInput: 'Digite a url',
    typeInput: 'text',
    withTitle: true,
    index: 11,
  },
  {
    icon: BsTelephoneFill,
    value: "TELEFONE",
    name: "Telefone",
    withRoundBackground: true,
    labelInput: 'Digite seu número',
    typeInput: 'tel'
  },
  {
    icon: FaFacebookF,
    value: "FACEBOOK",
    name: "Facebook",
    withRoundBackground: false,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text'
  },
  {
    icon: FaWhatsapp,
    value: "WHATSAPP",
    name: "Whatsapp",
    withRoundBackground: true,
    labelInput: 'Digite seu número no whatsapp',
    typeInput: 'tel'
  },
  {
    icon: FaInstagram,
    value: "INSTAGRAM",
    name: "Instagram",
    withRoundBackground: true,
    labelInput: 'Digite seu @',
    typeInput: 'text'
  },
  {
    icon: FaLinkedinIn,
    value: "LINKEDIN",
    name: "Linkedin",
    withRoundBackground: true,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text'
  },
  {
    icon: FaEnvelope,
    value: "EMAIL",
    name: "Email",
    withRoundBackground: true,
    labelInput: 'Digite endereço de email',
    typeInput: 'text'
  },
  {
    icon: BsTelephoneFill,
    value: "TELEFONE_COMERCIAL",
    name: "Telefone Comercial",
    withRoundBackground: true,
    labelInput: 'Digite o número',
    typeInput: 'tel',
  },
  {
    icon: FiMousePointer,
    value: "WEBSITE",
    name: "Site",
    withRoundBackground: false,
    labelInput: 'Digite a url do site',
    typeInput: 'text'
  },
  {
    icon: BsCameraVideo,
    value: "PRODUCT",
    name: "Vídeo",
    withRoundBackground: false,
    labelInput: 'Informe a URL do seu vídeo',
    typeInput: 'text'
  },
  {
    icon: IoMusicalNotesOutline,
    value: "PLAYLIST",
    name: "Playlist",
    withRoundBackground: false,
    labelInput: 'Informe a URL da sua playlist',
    typeInput: 'text'
  },
  {
    icon: BsMic,
    value: "PODCAST",
    name: "Podcast",
    withRoundBackground: false,
    labelInput: 'Informe a URL do seu podcast',
    typeInput: 'text'
  },
  {
    icon: RiMapPin2Fill,
    value: "LOCALIZATION",
    name: "Endereço",
    withRoundBackground: false,
    labelInput: 'Informe sua localização',
    typeInput: 'text'
  },
  {
    icon: PixIcon,
    value: "PIX",
    name: "Pix",
    withRoundBackground: false,
    labelInput: 'Informe sua chave PIX',
    typeInput: 'text'
  },
  {
    icon: BsTwitter,
    value: "TWITTER",
    name: "Twitter",
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text'
  },
  {
    icon: FaTiktok,
    value: 'TIKTOK',
    name: 'Tik tok',
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text',
  },
  {
    icon: MdQrCode2,
    value: 'QRCODE',
    name: 'QR Code',
    withRoundBackground: false,
    labelInput: '',
    typeInput: 'text',
  },
  {
    icon: FaYoutube,
    value: "YOUTUBE",
    name: "Youtube",
    withRoundBackground: true,
    labelInput: 'Digite a url do video',
    typeInput: 'text',
  },
  {
    icon: FaVimeoV,
    value: "VIMEO",
    name: "Vimeo",
    withRoundBackground: true,
    labelInput: 'Digite a url do video',
    typeInput: 'text',
    index: 8,
  },
  {
    icon: FaBehanceSquare,
    value: "BEHANCE",
    name: "Behance",
    withRoundBackground: true,
    labelInput: 'Digite seu perfil ou URL',
    typeInput: 'text',
    index: 9,
  },
  {
    icon: FaPinterestP,
    value: "PINTEREST",
    name: "Pinterest",
    withRoundBackground: true,
    labelInput: 'Digite seu @',
    typeInput: 'text',
    withTitle: true,
    index: 10,
  },
  {
    icon: FaTelegramPlane,
    value: "TELEGRAM",
    name: "Telegram",
    withRoundBackground: true,
    labelInput: 'Digite a url',
    typeInput: 'text',
    withTitle: true,
    index: 11,
  },
  {
    icon: FaDiscord,
    value: "DISCORD",
    name: "Discord",
    withRoundBackground: true,
    labelInput: 'usuario#0000',
    typeInput: 'text',
    withTitle: true,
    index: 11,
  },
  {
    icon: FaFacebookMessenger,
    value: "MESSENGER",
    name: "Messenger",
    withRoundBackground: false,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
    index: 7
  },
  {
    icon: FaWhatsapp,
    value: "WBUSINESS",
    name: "WhatsApp Business",
    withRoundBackground: true,
    labelInput: 'Digite o seu número business',
    typeInput: 'tel',
    index: 5
  }
]

export const teamsIconsPatterns = [
  {
    icon: BsTelephoneFill,
    value: "TELEFONE",
    name: "Telefone",
    withRoundBackground: true,
    labelInput: 'Digite seu número',
    typeInput: 'tel',
  },
  {
    icon: FaWhatsapp,
    value: "WHATSAPP",
    name: "Whatsapp",
    withRoundBackground: true,
    labelInput: 'Digite seu número no whatsapp',
    typeInput: 'tel',
  },
  {
    icon: FaFacebookF,
    value: "FACEBOOK",
    name: "Facebook",
    withRoundBackground: false,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
  },
  {
    icon: FaInstagram,
    value: "INSTAGRAM",
    name: "Instagram",
    withRoundBackground: true,
    labelInput: 'Digite seu @',
    typeInput: 'text',
  },
  {
    icon: FaLinkedinIn,
    value: "LINKEDIN",
    name: "Linkedin",
    withRoundBackground: true,
    labelInput: 'Digite a url do seu perfil',
    typeInput: 'text',
  },
  {
    icon: RiMapPin2Fill,
    value: "LOCALIZATION",
    name: "Endereço",
    withRoundBackground: false,
    labelInput: 'Informe sua localização',
    typeInput: 'text',
  },
  {
    icon: FiMousePointer,
    value: "WEBSITE",
    name: "Site",
    withRoundBackground: false,
    labelInput: 'Digite a url do site',
    typeInput: 'text'
  },
  {
    icon: PixIcon,
    value: "PIX",
    name: "Pix",
    withRoundBackground: false,
    labelInput: 'Informe sua chave PIX',
    typeInput: 'text',
  },
  {
    icon: BsTwitter,
    value: "TWITTER",
    name: "Twitter",
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text',
  },
  {
    icon: IoMusicalNotesOutline,
    value: "PLAYLIST",
    name: "Playlist",
    withRoundBackground: false,
    labelInput: 'Informe a URL da sua playlist',
    typeInput: 'text',
  },
  {
    icon: FaTiktok,
    value: 'TIKTOK',
    name: 'Tik tok',
    withRoundBackground: false,
    labelInput: 'Digite seu @',
    typeInput: 'text',
  },
  {
    icon: BsMic,
    value: "PODCAST",
    name: "Podcast",
    withRoundBackground: false,
    labelInput: 'Informe a URL do seu podcast',
    typeInput: 'text',
  },
  {
    icon: BsTelephoneFill,
    value: "TELEFONE_COMERCIAL",
    name: "Telefone Comercial",
    withRoundBackground: true,
    labelInput: 'Digite o número',
    typeInput: 'tel',
  },
  {
    icon: FaEnvelope,
    value: "EMAIL",
    name: "Email",
    withRoundBackground: true,
    labelInput: 'Digite endereço de email',
    typeInput: 'text',
  },
  {
    icon: BsCameraVideo,
    value: "PRODUCT",
    name: "Vídeo",
    withRoundBackground: false,
    labelInput: 'Informe a URL do seu vídeo',
    typeInput: 'text'
  },
]
export interface IconsPatternProps {
  data: {
    icon: IconType;
    value: string;
    name: string;
    withRoundBackground: boolean;
  }[]
}

export interface IconPatterProps {
  icon: IconType;
  value: string;
  name: string;
  labelInput: string;
  typeInput?: string;
  withRoundBackground: boolean;
}

export default iconsPattern
