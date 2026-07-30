import { useTransform, useViewportScroll } from 'framer-motion'
import { Heading, Text } from 'components/Typography'
import * as S from './styles'
import { getWidthScreen } from 'utils/getWidthScreen'
import { homeIcons } from '../../../pages/index-old'

export function Module2() {
  const screenWidth = getWidthScreen()
  const limitScreenWidth = 719
  const { scrollYProgress } = useViewportScroll()

  const firstTextY = useTransform(scrollYProgress, [0.109, 0.128], [0, -720])

  const secondTextY = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [400, 200, -920]
  )

  const thirdTextY = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [0, 200, -160]
  )

  const firstHandY = useTransform(
    scrollYProgress,
    [0.023, 0.109, 0.128, 0.142],
    [-346, -40, -40, 200]
  )

  const firstHandX = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [-120, -80, -40]
  )

  const firstHandRotate = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [0, 6, 10]
  )

  const secondHandY = useTransform(scrollYProgress, [0.128, 0.142], [0, 260])

  const secondHandX = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [120, 80, 20]
  )

  const secondHandRotate = useTransform(
    scrollYProgress,
    [0.109, 0.128, 0.142],
    [0, -10, -14]
  )

  return (
    <S.SecondScreen id={'section-id-2'}>
      <S.SecondScreenBracoCartao
        src={homeIcons.bracoCartao1}
        /*         style={
          screenWidth > limitScreenWidth
            ? {
                y: firstHandY,
                x: firstHandX,
                rotate: firstHandRotate,
              }
            : {
                y: 360,
                x: 0,
                rotate: 0,
              }
        } */
      />
      {/* @ts-ignore */}
      {/*       {secondHandY.current >= 250 ? (
        <S.SecondScreenSmartphone
          src={homeIcons.bracoSmartphone1}
                    style={
            screenWidth > limitScreenWidth
              ? {
                  y: secondHandY,
                  x: secondHandX,
                  rotate: secondHandRotate,
                }
              : {
                  y: 360,
                  x: 0,
                  rotate: 0,
                }
          }
        />
      ) : ( */}
      <S.SecondScreenSmartphone
        src={homeIcons.bracoSmartphone1}
        /*           style={
            screenWidth > limitScreenWidth
              ? {
                  y: secondHandY,
                  x: secondHandX,
                  rotate: secondHandRotate,
                }
              : {
                  y: 360,
                  x: 0,
                  rotate: 0,
                }
          } */
      />

      <S.secondScreenTextDiv1
      /*         style={
          screenWidth > limitScreenWidth
            ? {
                y: firstTextY,
              }
            : {
                y: 0,
              }
        } */
      >
        {/*         <Heading font="titleMd" color="primary">
          Um cartão de visita digital.
        </Heading>
        <Heading font="titleMdLight" color="secondary">
          Inúmeras possibilidades.
        </Heading> */}
      </S.secondScreenTextDiv1>
      <S.secondScreenTextDiv2
      /*         style={
          screenWidth > limitScreenWidth
            ? {
                y: secondTextY,
              }
            : {
                y: 0,
              }
        } */
      >
        <Text font="bodyLg" color="secondary">
          Compartilhe seus dados em tempo real com qualquer telefone, sem
          necessidade de aplicativo.
        </Text>
      </S.secondScreenTextDiv2>

      <S.secondScreenTextDiv3
      /*         style={
          screenWidth > limitScreenWidth
            ? {
                y: thirdTextY,
              }
            : {
                y: 0,
              }
        } */
      >
        <Text font="bodyLg" color="secondary">
          Basta encostar
          <img src={homeIcons.orangeNFC} style={{ position: 'relative' }} />
          ou escanear
          <img src={homeIcons.orangeQRCODE} style={{ position: 'relative' }} />o
          seu Unitok no celular da pessoa que você acabou de conhecer e pronto.
        </Text>
      </S.secondScreenTextDiv3>
    </S.SecondScreen>
  )
}
