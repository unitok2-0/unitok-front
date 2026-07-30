import { useEffect, useState } from 'react'
import { Heading, Text } from 'components/Typography'
import * as S from './styles'

const module5FadingImages = [
  'images/_Unitok_celular-principal1.png',
  'images/_Unitok_celular-principal2.png',
  'images/_Unitok_celular-principal3.png',
  'images/_Unitok_celular-principal4.png',
]

export function Module5() {
  const [module5Image, setModule5Image] = useState(module5FadingImages[0])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter + 1 >= module5FadingImages.length) {
        setModule5Image(module5FadingImages[0])
        setCounter(0)
      } else {
        setModule5Image(module5FadingImages[counter + 1])
        setCounter(counter + 1)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [counter])

  return (
    <S.FifthScreen id={'section-id-5'}>
      <Heading className="mainText" font="titleLg" color="primary">
        digital
      </Heading>
      <Text font="bodyMd" color="white">
        Você tem o controle total de tudo, inclusive quantas vezes os seus dados
        são vistos.
      </Text>
      <div>
        <Heading font="titleMdLight" color="white">
          edite
        </Heading>
        <Heading font="titleMdLight" color="white">
          adicione
        </Heading>
        <Heading font="titleMdLight" color="white">
          apague
        </Heading>
      </div>
      <img className="CelularPrincipal2" src={module5Image} />
    </S.FifthScreen>
  )
}
