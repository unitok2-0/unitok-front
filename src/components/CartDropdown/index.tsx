import { useRouter } from 'next/router'
//import { RiShoppingBag3Line } from 'react-icons/ri'
import CartIcon from '../../../public/assets/cart-icon.svg'

import { GenericDropdown } from 'components/GenericDropdown'
import Button from 'components/Buttons/ButtonPrimary'
import { Heading, Text } from 'components/Typography'
import { formatPrice } from 'utils/formatter'
import { useCart } from 'contexts/CartContext'

import * as S from './styles'
import { composeCardImageSrc } from 'utils/compose-card-image-src'

interface iconProps {
  color?: string
}

export default function CartDropdown({ color = '#01302F' }: iconProps) {
  const router = useRouter()
  const {
    allCardsSubtotal,
    selectedCards,
    PRICE_PER_PERSONALIZATION,
    getPersonalizationAmount,
    getCardSubtotalPrice,
    headerCartDropdown,
  } = useCart()

  return (
    <GenericDropdown
      header={
        <S.Button
          title="Abrir resumo da sacola"
          onClick={headerCartDropdown.handleToggle}
        >
          <CartIcon css={{ stroke: color }} size={32} />
          {selectedCards.length > 0 && (
            <S.QuantityDot title={`${selectedCards.length} itens na sacola`}>
              {selectedCards.length}
            </S.QuantityDot>
          )}
        </S.Button>
      }
      shouldShowContent={headerCartDropdown.isOpen}
      onClickOutside={headerCartDropdown.handleClose}
      maxContentHeight="60rem"
      minContentWidth="17rem"
      contentInset={{ right: '0' }}
    >
      <S.Wrapper>
        <Heading font="titleXs" style={{ textAlign: 'center' }}>
          Sacola {!Boolean(selectedCards.length) && 'vazia'}
        </Heading>

        <S.Cards>
          {selectedCards.map((card) => {
            const personalizationAmount = getPersonalizationAmount(card)

            return (
              <div key={card.variant}>
                <S.SpaceBetween>
                  <img
                    src={composeCardImageSrc(card.variant)}
                    alt={card.name}
                    title={card.name}
                    style={{ width: '3.75rem', display: 'block' }}
                  />
                  <Text
                    as="span"
                    style={{ marginRight: 'auto', marginLeft: '1rem ' }}
                  >
                    x{card.quantity}
                  </Text>
                  <Text fontWeight="500">
                    {formatPrice(getCardSubtotalPrice(card.variant))}
                  </Text>
                </S.SpaceBetween>
                {Boolean(personalizationAmount) && (
                  <S.SpaceBetween style={{ marginTop: '0.5rem' }}>
                    <Text font="bodySm" as="span">
                      + personalização
                    </Text>

                    <Text font="bodySm" fontWeight="500">
                      {formatPrice(
                        personalizationAmount * PRICE_PER_PERSONALIZATION
                      )}
                    </Text>
                  </S.SpaceBetween>
                )}
              </div>
            )
          })}
        </S.Cards>

        <S.SpaceBetween>
          <Text>Subtotal</Text>
          <Text font="bodyLg" fontWeight="500">
            {formatPrice(allCardsSubtotal)}
          </Text>
        </S.SpaceBetween>
        <Button
          variant="secondary"
          onClick={() => router.push('/checkout/cart')}
        >
          Ver Sacola
        </Button>
      </S.Wrapper>
    </GenericDropdown>
  )
}
