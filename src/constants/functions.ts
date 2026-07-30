import vCardsJS from '@abumalick/vcards-js'

import { ButtonsProps, UserProps } from '../domain/User'
import { FILES_COMPRESSED_URL, FILES_URL } from './values'

export function getFileName(file: string) {
  const fileName = file.substr(file.lastIndexOf('/') + 1)
  const array = fileName.split('?')
  const [name] = array
  const fileExtension = name.substr(name.lastIndexOf('.') + 1)
  return (`${Date.now().toString(36) + Math.random().toString(36).substr(2, 15)}.${fileExtension}`)
}

type sizeType = 'small' | 'medium' | 'large'

export const getImageUrl = (imageName: string, size?: sizeType) => {
  const image = imageName
  const imageSize = size
  if (typeof image !== 'undefined' && image != null && image !== '') {
    if (image.startsWith('https://') || image.startsWith('http://') || image.startsWith('file://') || image.startsWith('content://') || image.startsWith('/')) {
      return image
    } else if (imageSize) {
      const fileExtension = image.substr(image.lastIndexOf('.') + 1)
      let imageName = image.replace(/\.[^/.]+$/, '')
      imageName = `${imageName}.${fileExtension}`
      const imageUrl = `${FILES_URL}${imageSize}/${imageName}`
      return imageUrl
    }
    const imageUrl = `${FILES_URL}${imageName}`
    return imageUrl
  }
  return imageName
}

export const getUserImageUrl = (imageName: string, size?: sizeType) => {
  const image = imageName
  const imageSize = size

  const FILES_BASE_URL = FILES_COMPRESSED_URL ?? FILES_URL;

  if (typeof image !== 'undefined' && image != null && image !== '') {
    if (image.startsWith('https://') || image.startsWith('http://') || image.startsWith('file://') || image.startsWith('content://') || image.startsWith('/')) {
      return image
    } else if (imageSize) {
      const fileExtension = image.substr(image.lastIndexOf('.') + 1)
      let imageName = image.replace(/\.[^/.]+$/, '')
      imageName = `${imageName}.${fileExtension}`
      const imageUrl = `${FILES_BASE_URL}${imageSize}/${imageName}`
      return imageUrl
    }
    const imageUrl = `${FILES_BASE_URL}${imageName}`
    return imageUrl
  }
  return imageName
}

export const getLinkToButton = (button: ButtonsProps) => {
  const { name, url } = button
  let realUrl = url
  switch (name) {
    case 'INSTAGRAM':
      realUrl = formatUrlWeb(url, 'instagram.com')
      realUrl = realUrl.replace(/@/g, '')
      break;
    case 'FACEBOOK':
      realUrl = formatUrlWeb(url, 'facebook.com')
      break;
    case 'LINKEDIN':
      realUrl = formatUrlWeb(url, 'linkedin.com/in')
      break;
    case 'EMAIL':
      realUrl = `mailto:${url}`
      break;
    case 'WHATSAPP':
      realUrl = `https://wa.me/${url}`
      break;
    case 'TELEFONE':
      realUrl = `tel:+${url}`
      break;
    case 'TELEFONE_COMERCIAL':
      realUrl = `tel:+${url}`
      break;
    case 'WEBSITE':
      realUrl = formatUrlWeb(url, '')
      break;
    case 'TWITTER':
      realUrl = formatUrlWeb(url, 'twitter.com')
      break;
    case 'BEHANCE':
      realUrl = formatUrlWeb(url, 'behance.net')
      break;
    case 'PINTEREST':
      realUrl = formatUrlWeb(url, 'br.pinterest.com')
      break;
    case 'TELEGRAM':
      realUrl = formatUrlWeb(url, 't.me')
      break;
    case 'TWITCH':
      realUrl = formatUrlWeb(url, 'twitch.tv')
      break;
    case 'WBUSINESS':
      realUrl = `https://wa.me/${url}`
      break;

    default:
      break;
  }

  return { ...button, realUrl: realUrl || '' }
}

export const formatUrlWeb = (url: string, domain: string) => {
  if (url.startsWith('https://')
    || url.startsWith('http://')
    || url.startsWith('file://')
    || url.startsWith('content://')
  ) {
    return url
  } else if (url.startsWith('/')) {
    return `https://${domain}${url}`
  }

  return `https://${domain}/${url}`
}

export const formatUniqueName = (name: string) => {
  let str = name
  str = str?.replace(/[ÀÁÂÃÄÅ]/g, "A");
  str = str?.replace(/[àáâãäå]/g, "a");
  str = str?.replace(/[ÈÉÊË]/g, "E");
  str = str?.replace(/[çÇ]/g, "c");
  str = str?.replace(/[ìíÍ]/g, "i");
  str = str?.replace(/[ÚÙ]/g, "u");
  const nameFormated = str?.replace(/[^A-Z0-9]+/ig, '_')?.toLowerCase()
  return nameFormated
}

export function isStringValidURL(url: string) {
  try {
    new URL(url);
  } catch(e) {
    return false;
  }
  return true;
}

type PhotoData = {
  string: string;
  mediaType: string;
}

export const generateVcard = (user: UserProps, type: 'VCF' | 'string' = 'VCF', photoBase64?: PhotoData) => {
  console.log('user', user);

  try {
    var vCard = vCardsJS();

    const name = user?.full_name || user?.name
    const nameArray = name?.split(' ')

    const email = user?.buttons.find(button => button.name === 'EMAIL')?.realUrl || user?.email;
    const siteUrl = user?.buttons.find(button => button.name === 'WEBSITE')?.realUrl;
    const linkedin = user?.buttons.find(button => button.name === 'LINKEDIN')?.realUrl;
    const twitter = user?.buttons.find(button => button.name === 'TWITTER')?.realUrl;
    const facebook = user?.buttons.find(button => button.name === 'FACEBOOK')?.realUrl;
    const discord = user?.buttons.find(button => button.name === 'DISCORD')?.realUrl;
    const instagram = user?.buttons.find(button => button.name === 'INSTAGRAM')?.realUrl;
    const workPhone = user?.buttons.find(button => button.name === 'TELEFONE_COMERCIAL')?.url;

    const emailAddress = email.replace('mailto:', "")

    //set properties
    vCard.firstName = nameArray[0];
    if (user?.surname) vCard.middleName = user?.surname; 

    if(user?.enterpriseName) vCard.lastName = ` | ${user?.enterpriseName}`;

    if(user?.phone)
      vCard.cellPhone = user?.phone;

    if(workPhone)
      vCard.workPhone = workPhone;

    if(user.occupationArea) {
      vCard.title = user.occupationArea;
      vCard.role = user.occupationArea;
    } else if(user.profession) {
      vCard.title = user.profession;
      vCard.role = user.profession;
    } 

    // vCard.email = emailAddress;
    vCard.workEmail = emailAddress;
    
    if(user.enterpriseName)
      vCard.organization = user.enterpriseName 

    if (facebook) vCard.socialUrls['facebook'] = facebook;
    if (twitter) vCard.socialUrls['twitter'] = twitter;
    if (linkedin) vCard.socialUrls['linkedIn'] = linkedin;
    if (discord) vCard.socialUrls['discord'] = discord;
    if (instagram) vCard.socialUrls['instagram'] = instagram;

    if(siteUrl && isStringValidURL(siteUrl)) vCard.url = siteUrl;

    const userAddress = user?.buttons.find(button => button.name === 'LOCALIZATION');

    console.log('address', userAddress)

    if (userAddress && userAddress.street && userAddress.city) {
      const { street, city, state, postalCode, district, number, complement } = userAddress

      let addressLabel = [street, number, complement, district, city, state].filter(item => item).join(', ');

      if(postalCode) addressLabel = `${addressLabel} - ${postalCode}`;

      vCard.workAddress.label = addressLabel;

      if (street) vCard.workAddress.street = [street, number, complement].filter(item => item).join(', ');
      if (city) vCard.workAddress.city = city
      if (state) vCard.workAddress.stateProvince = state
      if (postalCode) vCard.workAddress.postalCode = postalCode

      vCard.workAddress.countryRegion = 'Brasil'
    }
    
    console.log('vcard', vCard)

    // const fileExtension = user?.imageUrl?.substr(user?.imageUrl?.lastIndexOf('.') + 1)
    // vCard.photo.attachFromUrl(user?.imageUrl, fileExtension)
    // vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    
    if(photoBase64)
      vCard.photo.embedFromString(photoBase64.string, photoBase64.mediaType);

    const card = vCard.getFormattedString()
    const url = 'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(card);

    if (type === 'string') 
      return card

    document.location.href = url;
  } catch (error) {
    console.error('Erro ao gerar vcard', error);
    return ''
  }
}

interface ContactProps {
  _id: string;
  img?: string;
  full_name: string;
  job?: string;
  company?: string;
  phone: string;
  email: string;
  date: string;
  dayOfTheWeek: string;
}

export const generateVcardToContact = (user: ContactProps, type: 'VCF' | 'string' = 'VCF') => {
  //create a new vCard
  try {


    var vCard = vCardsJS();

    const name = user.full_name;
    const email = user.email

    const nameArray = name?.split(' ')
    const lenghtArray = nameArray?.length
    //set properties

    vCard.firstName = nameArray[0];
    if (
      nameArray[lenghtArray - 1] && nameArray[0] !== nameArray[lenghtArray - 1]
    ) { vCard.middleName = nameArray[lenghtArray - 1]; }


    if (user.job) {
      vCard.title = user.job
    }
    vCard.cellPhone = user?.phone
    vCard.email = email

    vCard.workAddress.label = 'Work Address'


    const fileExtension = user?.img?.substr(user?.img?.lastIndexOf('.') + 1)
    vCard.photo.attachFromUrl(user?.img, fileExtension)

    const card = vCard.getFormattedString()
    const url = 'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(card);

    if (type === 'string') return card

    document.location.href = url;
  } catch (error) {
    return ''
  }
}
