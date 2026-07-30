import Link from 'next/link'
import ColorDot from 'components/ColorDot'
import * as S from './styles'
import { CardVariants } from 'constants/cards'
import useCardVariant from 'hooks/useCardVariant'
import { useRouter } from 'next/router'
import { useState } from 'react'

export type CardLinkProps = S.WrapperProps & {
  cardVariant: CardVariants
}

export default function CardLink(props: CardLinkProps) {
  const { cardVariantColors, card } = useCardVariant(props.cardVariant)
  const router = useRouter()
  const [isActive, setIsActive] = useState<boolean>()
  const shouldAddColorDots = cardVariantColors.some(
    (cardVariant) => cardVariant.length
  )

  return (
    <S.Wrapper
      isActive={isActive ? isActive : props.isActive}
      onMouseEnter={() => {
        if (!props.isActive) {
          setIsActive(true)
        }
      }}
      onMouseLeave={() => {
        setIsActive(false)
      }}
      title={card.name}
    >
      {shouldAddColorDots && (
        <S.ColorDotStack>
          {cardVariantColors.map((colors, index) => (
            <ColorDot
              onClick={() =>
                router.push(`/cards/${props.cardVariant.slice(0, -1)}${index}`)
              }
              asButton
              colors={colors}
              key={index}
            />
          ))}
        </S.ColorDotStack>
      )}
      <Link href={`/cards/${props.cardVariant}`} passHref legacyBehavior>
        <S.Image>
          <img
            src={`/images/cards/${props.cardVariant}-front.svg`}
            alt={card.modelCard}
          />
        </S.Image>
      </Link>
    </S.Wrapper>
  );
}
