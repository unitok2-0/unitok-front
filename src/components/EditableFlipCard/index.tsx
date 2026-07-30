import { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import cards, { CardVariants } from 'constants/cards'

import * as S from './styles'

export type EditableFlipCardProps = {
  cardVariant: CardVariants
  name?: string
  defaultSide?: 'BACK' | 'FRONT'
  shouldShowFlipController?: boolean
}

/**   aspect-ratio: 8.5 / 5.5; */
const ASPECT_RATIO_DIVISION = 1.545454

export default function EditableFlipCard(props: EditableFlipCardProps) {
  const [nameSize, setNameSize] = useState('1rem')
  const [wrapperHeight, setWrapperHeight] = useState<number>(null)

  const cardConfig = useMemo(() => {
    return cards.find((card) => card.variant === props.cardVariant)
  }, [props.cardVariant])
  const [side, setSide] = useState<'BACK' | 'FRONT'>(
    props.defaultSide || cardConfig?.customizationSide || 'FRONT'
  )

  const cardWrapperRef = useRef<HTMLDivElement>(null)

  const isBlackText = ['happytok-0'].includes(props.cardVariant)

  useEffect(() => {
    setNameSize(`${cardWrapperRef?.current.clientWidth / 25}px`)
    setWrapperHeight(
      cardWrapperRef?.current.clientWidth / ASPECT_RATIO_DIVISION
    )
  }, [cardWrapperRef])

  useEffect(() => {
    const cardWrapperElement = cardWrapperRef.current

    function handleResize() {
      setNameSize(`${cardWrapperElement.clientWidth / 27.5}px`)
      setWrapperHeight(
        cardWrapperRef?.current.clientWidth / ASPECT_RATIO_DIVISION
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    flipCard()
  }, [props.name])

  function flipCard() {
    setSide(cardConfig?.customizationSide)
  }

  return (
    <S.Wrapper>
      <S.CardWrapper ref={cardWrapperRef} style={{ minHeight: wrapperHeight }}>
        <S.Card className={side === 'BACK' ? 'show-back' : ''}>
          <S.Front cardVariantFront={props.cardVariant}>
            {/* <img
              src={`/images/cards/${props.cardVariant}-front.svg`}
              alt={`${props.cardVariant}-frente`}
            /> */}
            {cardConfig?.customizationSide === 'FRONT' && (
              <S.Name
                cardName={cardConfig.name}
                blackText={isBlackText}
                style={{ fontSize: nameSize }}
              >
                {/* {props.name || 'Seu nome aqui'} */}
              </S.Name>
            )}
          </S.Front>
          <S.Back cardVariantBack={props.cardVariant}>
            {/*   <img
              src={`/images/cards/${props.cardVariant}-back.svg`}
              alt={`${props.cardVariant}-verso`}
            /> */}
            {cardConfig?.customizationSide === 'BACK' && (
              <S.Name
                blackText={isBlackText}
                cardName={cardConfig.name}
                style={{ fontSize: nameSize }}
              >
                {/* {props.name || 'Seu nome aqui'} */}
              </S.Name>
            )}
          </S.Back>
        </S.Card>
      </S.CardWrapper>

      {props.shouldShowFlipController && (
        <S.ButtonWrapper>
          <ButtonPrimary
            variant="tertiary"
            onClick={() =>
              setSide((side) => (side === 'FRONT' ? 'BACK' : 'FRONT'))
            }
            rightElement={<BsArrowCounterclockwise />}
          >
            Ver {side === 'FRONT' ? 'verso' : 'frente'}
          </ButtonPrimary>
        </S.ButtonWrapper>
      )}
    </S.Wrapper>
  )
}
