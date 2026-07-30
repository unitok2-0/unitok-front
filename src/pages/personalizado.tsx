import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import * as S from 'styles/pageStyles/personalized'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { Heading, Text } from 'components/Typography'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import Personalization, {
  PersonalizationState,
} from 'components/Personalization'
import ColorDot from 'components/ColorDot'
import useDisclosure from 'hooks/useDisclosure'
import useCardVariant from 'hooks/useCardVariant'
import { formatPrice } from 'utils/formatter'
import ConfirmationModal from 'components/ConfirmationModal'
import { composeEmptyCustomNamesWarningMessage } from 'utils/compose-empty-custom-names-warning-message'
import CardAlearyInCartMessage from 'components/CardAlearyInCartMessage'
import { useCart } from 'contexts/CartContext'
import CartAlreadyInCartMessage from 'components/CardAlearyInCartMessage'
import { CardVariants } from 'constants/cards'
import { parseCookies, setCookie } from 'nookies'
import { getCards } from 'services/cards'
import { GetServerSidePropsContext } from 'next'

type LogoCards = 'with-logo-0' | 'with-logo-1' | 'with-logo-2'

const PRICE_PER_CUSTOM_NAME = 1000

export default function PersonalizedPage() {
  const router = useRouter()
  const { addCardToCart, isCardInCart } = useCart()

  const [logoCardState, setLogoCardState] = useState<PersonalizationState>(null)
  const [artCardState, setArtCardState] = useState<PersonalizationState>(null)

  const [selectedLogoCard, setSelectedLogoCard] = useState<LogoCards>(
    'with-logo-0'
  )

  const logoCardVariant = useCardVariant(selectedLogoCard)
  const logoCardTotalPrice =
    logoCardVariant.card.price * logoCardState?.quantity +
    PRICE_PER_CUSTOM_NAME * logoCardState?.personalizationAmount

  const artCardVariant = useCardVariant('with-art-0')
  const artCardTotalPrice =
    artCardVariant.card.price * artCardState?.quantity +
    PRICE_PER_CUSTOM_NAME * artCardState?.personalizationAmount

  const logoCardDisclosure = useDisclosure(true)
  const confirmationModal = useDisclosure()

  const isLogoCardAlreadyInCart = isCardInCart(selectedLogoCard)
  const isArtCardAlreadyInCart = isCardInCart('with-art-0')

  function handleAddLogoCardToCart() {
    addCardToCart({
      _id: logoCardVariant.card._id,
      quantity: logoCardState.quantity,
      customArtOrLogoFile: logoCardState.customArtOrLogoFile,
      customNames: logoCardState.customNames,
      shouldAllCustomNamesBeTheSame:
        logoCardState.shouldAllCustomNamesBeTheSame,
      name: logoCardVariant.card.name,
      variant: logoCardVariant.card.variant as CardVariants,
      unitPrice: logoCardVariant.card.price,
    })

    confirmationModal.handleClose()
    router.push('/checkout/cart')
    // headerCartDropdown.handleOpen();
  }

  function handleAddLogoCardToCartClick() {
    if (logoCardState.isCustomArtOrLogoFileEmpty) return

    if (logoCardState?.emptyCustomNames?.length) {
      confirmationModal.handleOpen()
      return
    }

    handleAddLogoCardToCart()
  }

  function handleAddArtCardToCart() {
    addCardToCart({
      _id: artCardVariant.card._id,
      quantity: artCardState.quantity,
      customArtOrLogoFile: artCardState.customArtOrLogoFile,
      customNames: artCardState.customNames,
      shouldAllCustomNamesBeTheSame: artCardState.shouldAllCustomNamesBeTheSame,
      name: artCardVariant.card.name,
      variant: artCardVariant.card.variant as CardVariants,
      unitPrice: artCardVariant.card.price,
    })

    // headerCartDropdown.handleOpen();
    confirmationModal.handleClose()
    router.push('/checkout/cart')
  }

  function handleAddArtCardtoCartClick() {
    if (artCardState.isCustomArtOrLogoFileEmpty) return

    if (artCardState?.emptyCustomNames?.length) {
      confirmationModal.handleOpen()
      return
    }

    handleAddArtCardToCart()
  }

  return (
    <>
      <Head>
        <title>Cartões personalizados | Unitok</title>
      </Head>
      <ConfirmationModal
        closeModal={confirmationModal.handleClose}
        onCancelClick={confirmationModal.handleClose}
        onConfirmClick={
          logoCardDisclosure.isOpen
            ? handleAddLogoCardToCart
            : handleAddArtCardToCart
        }
        modalIsOpen={confirmationModal.isOpen}
        title="Nomes em branco"
      >
        <Text>
          {composeEmptyCustomNamesWarningMessage(
            logoCardDisclosure.isOpen
              ? logoCardState?.emptyCustomNames
              : artCardState?.emptyCustomNames
          )}
        </Text>
      </ConfirmationModal>
      <S.Wrapper>
        <Header position="static" whatPage={3} />

        <S.Container>
          <S.Hero>
            <Heading font="titleMdLight">
              2 maneiras diferentes de deixar
              <br />
              <Text as="strong" font="titleMd">
                seu Unitok com a sua cara
              </Text>
            </Heading>

            {/*             <Text as="strong" fontWeight="500" font="bodyXl" color="primary">
              Por R$89,90
            </Text> */}
          </S.Hero>

          <S.CardsGrid>
            <S.Card>
              <S.CardImageBox>
                <img src={`/images/cards/${selectedLogoCard}.png`} alt="" />
              </S.CardImageBox>
              <S.Center>
                <Heading>Com logotipo</Heading>
                <ButtonPrimary
                  variant="tertiary"
                  onClick={logoCardDisclosure.handleToggle}
                  rightElement={
                    logoCardDisclosure.isOpen ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )
                  }
                >
                  Personalizar
                </ButtonPrimary>
              </S.Center>
              <S.personalizationWrapper
                className={!logoCardDisclosure.isOpen ? 'disabled' : ''}
              >
                <S.ColorsBox>
                  <Text>Cor: {logoCardVariant.card.color?.label}</Text>

                  <div>
                    {logoCardVariant.cardVariantColors.map((colors, index) => {
                      const cardVariant = `${logoCardVariant.card.variant.slice(
                        0,
                        -2
                      )}-${index}`

                      return (
                        <ColorDot
                          onClick={() =>
                            setSelectedLogoCard(cardVariant as any)
                          }
                          asButton
                          key={index}
                          colors={colors}
                          isActive={cardVariant === selectedLogoCard}
                        />
                      )
                    })}
                  </div>
                </S.ColorsBox>
                {isLogoCardAlreadyInCart ? (
                  <CardAlearyInCartMessage />
                ) : (
                  <Personalization
                    onStateChange={setLogoCardState}
                    shouldShowLogoSection
                  />
                )}
                <Text
                  font="bodyLg"
                  fontWeight="500"
                  style={{ margin: '5rem 0 2rem' }}
                >
                  {formatPrice(
                    logoCardTotalPrice || logoCardVariant.card.price
                  )}
                </Text>
                {!isLogoCardAlreadyInCart && (
                  <ButtonPrimary
                    title={
                      logoCardState?.isCustomArtOrLogoFileEmpty
                        ? 'Selecione um arquivo com logo para colocar o cartão na sacola'
                        : ''
                    }
                    disabled={logoCardState?.isCustomArtOrLogoFileEmpty}
                    fullWidth
                    onClick={handleAddLogoCardToCartClick}
                  >
                    Colocar na sacola
                  </ButtonPrimary>
                )}
              </S.personalizationWrapper>
            </S.Card>

            <S.Card>
              <S.CardImageBox>
                <img src="/images/cards/with-art-0.png" alt="" />
              </S.CardImageBox>
              <S.Center>
                <Heading>Com logotipo + arte</Heading>
                <ButtonPrimary
                  variant="tertiary"
                  onClick={logoCardDisclosure.handleToggle}
                  rightElement={
                    logoCardDisclosure.isOpen ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )
                  }
                >
                  Personalizar
                </ButtonPrimary>
              </S.Center>

              <S.personalizationWrapper
                className={logoCardDisclosure.isOpen ? 'disabled' : ''}
              >
                {isArtCardAlreadyInCart ? (
                  <CartAlreadyInCartMessage />
                ) : (
                  <Personalization
                    onStateChange={setArtCardState}
                    shouldShowArtSection
                  />
                )}
                <Text
                  font="bodyLg"
                  fontWeight="500"
                  style={{ margin: '5rem 0 2rem' }}
                >
                  {formatPrice(artCardTotalPrice || artCardVariant.card.price)}
                </Text>
                {!isArtCardAlreadyInCart && (
                  <ButtonPrimary
                    title={
                      artCardState?.isCustomArtOrLogoFileEmpty
                        ? 'Selecione um arquivo com logo para colocar o cartão na sacola'
                        : ''
                    }
                    disabled={artCardState?.isCustomArtOrLogoFileEmpty}
                    fullWidth
                    onClick={handleAddArtCardtoCartClick}
                  >
                    Colocar na sacola
                  </ButtonPrimary>
                )}
              </S.personalizationWrapper>
            </S.Card>
          </S.CardsGrid>
        </S.Container>

        <Footer />
      </S.Wrapper>
    </>
  )
}

export async function getServerSideProps(req) {
  // Desabilitado temporariamente - João Túlio
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  }

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
