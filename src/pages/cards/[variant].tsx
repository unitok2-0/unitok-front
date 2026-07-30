import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { useCart } from 'contexts/CartContext'
import useCardVariant from 'hooks/useCardVariant'
import { formatPrice } from 'utils/formatter'
import { CardVariants } from 'constants/cards'
import useDisclosure from 'hooks/useDisclosure'

import { composeEmptyCustomNamesWarningMessage } from 'utils/compose-empty-custom-names-warning-message'

import CardLink from 'components/CardLink'
import { Header } from 'components/Header'
import ColorDot from 'components/ColorDot'
import EditableFlipCard from 'components/EditableFlipCard'
import { Heading, Text } from 'components/Typography'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import ConfirmationModal from 'components/ConfirmationModal'
import CardAlearyInCartMessage from 'components/CardAlearyInCartMessage'
import Personalization, {
  PersonalizationState,
} from 'components/Personalization'
import { getCards } from 'services/cards'
import { parseCookies, setCookie } from 'nookies'

import * as S from 'styles/pageStyles/cards/styles'
import WhatsappButton from 'components/Buttons/WhatsappButton'

/* const cardVariants = [
  'darktok-0',
  'classictok-0',
  'colortok-0',
  'wavetok-0',
  'urbantok-0',
  'happytok-0',
] as const */
const cardVariants = [
  'classictok-0',
  'colortok-0',
  'wavetok-0',
  /* 'urbantok-0', */
  'happytok-0',
] as const

export default function Cards() {
  const router = useRouter()
  const query = router.query as { variant: CardVariants }
  /** Below line is just a mocked value for cards. Must be refactored. It probably may come from backend */
  const { card, cardVariantColors } = useCardVariant(query.variant)
  const cardName = query.variant?.slice(0, -5)

  const { addCardToCart, isCardInCart } = useCart()
  const emptyCustomNamesWarningModal = useDisclosure()

  const [cardState, setCardState] = useState<PersonalizationState>(null)

  const isCardAlrearyInCart = isCardInCart(query.variant)

  function handleAddCardToCart() {
    const cardCustomNames = cardState?.isCardQuantityOver10
      ? []
      : cardState?.customNames

    addCardToCart({
      _id: card._id,
      customNames: cardCustomNames,
      customNamesFile: cardState?.customNamesFile,
      shouldAllCustomNamesBeTheSame:
        cardState?.isCardQuantityOver10 ||
        cardState?.shouldAllCustomNamesBeTheSame,
      name: card.name,
      variant: card.variant as CardVariants,
      unitPrice: card.price,
      quantity: cardState?.quantity,
    })

    emptyCustomNamesWarningModal.handleClose()
    /* router.push('/checkout/cart') */
  }

  return (
    <>
      <Head>
        <title>Cartões | Unitok</title>
      </Head>
      <WhatsappButton />
      <ConfirmationModal
        title={
          cardState?.isCustomNamesFileEmpty
            ? 'Planilha não enviada'
            : 'Nomes em branco'
        }
        modalIsOpen={emptyCustomNamesWarningModal.isOpen}
        closeModal={emptyCustomNamesWarningModal.handleClose}
        onCancelClick={emptyCustomNamesWarningModal.handleClose}
        onConfirmClick={handleAddCardToCart}
        confirmButtonText="Sim, colocar na sacola"
      >
        <Text>
          {cardState?.isCustomNamesFileEmpty
            ? 'O arquivo contendo os nomes não foi enviado. Deseja adicionar os cartões sem nome?'
            : composeEmptyCustomNamesWarningMessage(
              cardState?.emptyCustomNames
            )}
        </Text>
      </ConfirmationModal>
      <S.Wrapper>
        <S.ClipPath />
        <S.CLipPathDesktop />
        <Header
          variant="logoAndCartOnly"
          whatColor="transp"
          position="absolute"
        />
        <S.Main>
          <S.Cards>
            <S.CardAsideContainer>
              <S.CardAside>
                {cardVariants.map((variant) => (
                  <CardLink
                    key={variant}
                    cardVariant={variant}
                    isActive={cardName === variant?.slice(0, -5)}
                  />
                ))}
              </S.CardAside>

            </S.CardAsideContainer>

            <S.CardHighLight>
              <EditableFlipCard
                name={cardState?.nameOnFlipCard}
                cardVariant={query.variant}
                shouldShowFlipController
              />
            </S.CardHighLight>
          </S.Cards>

          <S.RightSide
            onSubmit={(event) => {
              event.preventDefault()
              if (cardState?.isCustomNamesFileEmpty) {
                emptyCustomNamesWarningModal.handleOpen()
                return
              }

              if (
                !cardState?.isCardQuantityOver10 &&
                cardState?.emptyCustomNames?.length
              ) {
                emptyCustomNamesWarningModal.handleOpen()
              } else {
                handleAddCardToCart()
              }
            }}
          >
            <S.CardData>
              <S.CardName>
                <strong>{card?.name?.slice(0, -3)}</strong>
                <span>tok </span>
              </S.CardName>

              <S.CardInputs>
                {!!card?.color?.values.length && (
                  <S.CardInput>
                    <Text>Cor: {card?.color?.label}</Text>

                    <S.ColorDotsHStack>
                      {cardVariantColors.map((value, index) => (
                        <ColorDot
                          colors={value}
                          key={index}
                          onClick={() =>
                            router.push(
                              `/cards/${card.name.toLocaleLowerCase()}-${index}`
                            )
                          }
                          isActive={
                            `${card.name.toLocaleLowerCase()}-${index}` ===
                            query.variant
                          }
                          asButton
                        />
                      ))}
                    </S.ColorDotsHStack>
                  </S.CardInput>
                )}

                {isCardAlrearyInCart ? (
                  <CardAlearyInCartMessage />
                ) : (
                  <Personalization onStateChange={setCardState} />
                )}
              </S.CardInputs>
            </S.CardData>

            <S.CartInfoBox>
              <Text font="bodyLg" fontWeight="500">
                {formatPrice(
                  card?.price * cardState?.quantity +
                  cardState?.personalizationAmount * 1000 || card?.price
                )}
              </Text>
              {!isCardAlrearyInCart && (
                <ButtonPrimary fullWidth type="submit">
                  Colocar na sacola
                </ButtonPrimary>
              )}
            </S.CartInfoBox>
          </S.RightSide>
        </S.Main>
      </S.Wrapper>
    </>
  )
}

export async function getServerSideProps(req) {
  const { 'unitok.cards': storagedCards } = parseCookies(req)

  let cards = storagedCards ? JSON.parse(storagedCards) : null

  if (!cards) {
    cards = (await getCards()) || null

    setCookie(req, 'unitok.cards', JSON.stringify(cards), { maxAge: 60 })
  }

  return {
    props: {
      cards,
    },
  }
}
