import { useEffect, useState } from 'react'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { Heading, Text } from 'components/Typography'
import { useRouter } from 'next/router'
import videos from 'constants/videos'
import { MdPlayCircleOutline } from 'react-icons/md'
import * as S from './styles'
import { ActiveVideoModal } from '../../../pages/index-old'

/* DESATIVADO ATÉ VOLTAR COM OS CARTÕES PERSONALIZADOS*/

/* const webBackgroundImages = [
  { src: '/images/Home_banner01.jpg', alt: 'banner1' },
  { src: '/images/Home_banner02.jpg', alt: 'banner2' },
  { src: '/images/Home_banner03.jpg', alt: 'banner3' },
  { src: '/images/Home_banner04.jpg', alt: 'banner4' },
  { src: '/images/Home_banner05.jpg', alt: 'banner5' },
  { src: '/images/Home_banner06.jpg', alt: 'banner6' },
  { src: '/images/Home_banner07.jpg', alt: 'banner7' },
  { src: '/images/Home_banner08.jpg', alt: 'banner8' },
  { src: '/images/Home_banner09.jpg', alt: 'banner9' },
]

const mobileBackgroundImages = [
  { src: '/images/mobile/_Unitok_banner_persona01_mobile.jpg', alt: 'banner1' },
  { src: '/images/mobile/_Unitok_banner_persona02_mobile.jpg', alt: 'banner2' },
  { src: '/images/mobile/_Unitok_banner_persona03_mobile.jpg', alt: 'banner3' },
  { src: '/images/mobile/_Unitok_banner_persona04_mobile.jpg', alt: 'banner4' },
  { src: '/images/mobile/_Unitok_banner_persona05_mobile.jpg', alt: 'banner5' },
  { src: '/images/mobile/_Unitok_banner_persona06_mobile.jpg', alt: 'banner6' },
  { src: '/images/mobile/_Unitok_banner_persona07_mobile.jpg', alt: 'banner7' },
  { src: '/images/mobile/_Unitok_banner_persona08_mobile.jpg', alt: 'banner8' },
  { src: '/images/mobile/_Unitok_banner_persona09_mobile.jpg', alt: 'banner9' },
] */

const webBackgroundImages = [
  { src: 'images/home_temporario/web/Home_banner01.jpg', alt: 'banner1' },
  { src: '/images/home_temporario/web/Home_banner02.png', alt: 'banner2' },
  { src: '/images/home_temporario/web/Home_banner03.jpg', alt: 'banner3' },
  { src: '/images/home_temporario/web/Home_banner04.png', alt: 'banner4' },
  { src: '/images/home_temporario/web/Home_banner05.png', alt: 'banner5' },
  { src: '/images/home_temporario/web/Home_banner06.jpg', alt: 'banner6' },
  { src: '/images/home_temporario/web/Home_banner07.jpg', alt: 'banner7' },
  { src: '/images/home_temporario/web/Home_banner08.png', alt: 'banner8' },
  { src: '/images/home_temporario/web/Home_banner09.png', alt: 'banner9' },
]

const mobileBackgroundImages = [
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona01_mobile.jpg', alt: 'banner1' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona02_mobile.png', alt: 'banner2' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona03_mobile.jpg', alt: 'banner3' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona04_mobile.png', alt: 'banner4' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona05_mobile.png', alt: 'banner5' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona06_mobile.jpg', alt: 'banner6' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona07_mobile.jpg', alt: 'banner7' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona08_mobile.png', alt: 'banner8' },
  { src: '/images/home_temporario/mobile/_Unitok_banner_persona09_mobile.png', alt: 'banner9' },
]

export function Module1(props: ActiveVideoModal) {
  const { push } = useRouter()
  const [bgImageIndex, setBgImageIndex] = useState(0)
  const [backgroundImages, setBackgroundImages] = useState(webBackgroundImages)

  function cacheImages() {
    if (window.screen.width < 521) {
      setBackgroundImages(mobileBackgroundImages)
    } else {
      setBackgroundImages(webBackgroundImages)
    }
    const imgsArray = backgroundImages.forEach((picture) => {
      const img = new Image()
      img.src = picture.src
    })
  }

  useEffect(() => {
    cacheImages()
    setTimeout(() => {
      bgImageIndex + 2 > backgroundImages.length
        ? setBgImageIndex(0)
        : setBgImageIndex(bgImageIndex + 1)
    }, 2000)
  }, [bgImageIndex])

  return (
    <S.FirstScreen
      id={'section-id-1'}
      style={{
        backgroundImage: `url(${backgroundImages[bgImageIndex].src})`,
      }}
    >
      <S.MainTextDiv>
        <Heading as="h1" font="titleXs" color="tertiary">
          Cartão de Visita Digital
        </Heading>
        <S.CentralTextDiv>
          <Heading as="h1" font="titleMd" color="white">
            9 opções.
          </Heading>

          <Heading as="h1" font="titleMd" color="white">
            1 com a sua cara.
          </Heading>
          <Text font="bodyMd" color="white">
            Por R$ 46,00
          </Text>
        </S.CentralTextDiv>
      </S.MainTextDiv>
      {/* <S.LateralPriceText>
        <Text font="bodyMd" color="white">
          Por R$29,90
        </Text>
      </S.LateralPriceText> */}

      <S.ButtonsDiv>
        <ButtonPrimary
          className="primaryButton"
          onClick={() => push('cards/classictok-0')}
        >
          Escolha seu cartão
        </ButtonPrimary>

        <ButtonPrimary
          className="secondaryButton"
          variant="tertiary"
          onClick={() => {
            props.setSelectedVideoSrc(videos.conceptual)
            props.videoModal.handleOpen()
          }}
        >
          Veja o filme
          <MdPlayCircleOutline />
        </ButtonPrimary>
      </S.ButtonsDiv>
    </S.FirstScreen>
  )
}
