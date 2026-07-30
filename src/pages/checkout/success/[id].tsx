import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Countdown, { zeroPad } from 'react-countdown'

import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { BsChevronDown, BsDownload } from 'react-icons/bs'
import { FiCopy } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { copyToClipboard } from 'utils/copy-to-clipboard'
import { QRCodeCanvas } from 'qrcode.react'

import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Heading, Text } from 'components/Typography'
import Button from 'components/Buttons/ButtonPrimary'
import CartItem from 'components/CartItem'
import { useCart } from 'contexts/CartContext'
import { formatDate, formatPrice } from 'utils/formatter'
import { useCheckout } from 'contexts/CheckoutContext'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import PurchaseCheckoutModal from '../../../components/PurchaseCheckoutModal'

import * as S from 'styles/pageStyles/checkout/success/styles'
import { getSale, SaleResponse } from 'services/sale'
import { CardVariants } from 'constants/cards'
import Scroll from 'utils/getScreenSize'
import { FormatShipmentValue } from 'utils/format-shipment'

const paymentMethodFormatted = {
  boleto: 'Boleto bancário',
  credit_card: 'Cartão de crédito',
  pix: 'PIX',
  voucher: 'Cupom de desconto',
}

export type SuccessPageProps = {
  sale: SaleResponse
}

export default function SuccessPage(props: SuccessPageProps) {
  const router = useRouter()
  const { cleanUpSelectedCardsStorage } = useCart()
  const { cleanUpCheckoutStorage } = useCheckout()

  const checkoutDetailsRef = useRef<HTMLDivElement>(null)
  const [isPixExpired, setIsCompleted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [])

  function setScreenWidthProp(width: number) {
    setScreenWidth(width)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function scrollToCheckoutDetails() {
    // window.localStorage.clear();
    checkoutDetailsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const isPix = Boolean(props.sale.transaction?.pix_qr_code)
  const isBoleto =
    props.sale.transaction?.boleto_barcode && props.sale.transaction?.boleto_url

  useEffect(() => {
    window.localStorage.clear()

    return () => {
      cleanUpCheckoutStorage()
      cleanUpSelectedCardsStorage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Scroll setWidth={setScreenWidthProp} />
      <Head>
        <title>Compra finalizada | Unitok</title>
      </Head>
      <S.Wrapper>
        <Header position="static" variant="logoOnly" />
        <S.Container>
          <S.SuccessGrid>
            {isPix && (
              <S.PaymentContainer>
                <div>
                  <Heading
                    font="titleXs"
                    as="h4"
                    style={{ marginBottom: '2rem' }}
                  >
                    Para realizar o pagamento, escaneie o QR Code ou copie a
                    chave PIX abaixo.
                  </Heading>

                  <Countdown
                    date={props.sale.transaction?.pix_expiration_date}
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        setIsCompleted(completed)
                        return (
                          <Text as="time" font="bodyLg" color="error">
                            Pagamento por PIX expirado
                          </Text>
                        )
                      }

                      return (
                        <>
                          {' '}
                          <Text>Tempo restante para pagamento:</Text>
                          <Text as="time" font="bodyLg" color="primary">
                            {zeroPad(minutes)}:{zeroPad(seconds)}
                          </Text>
                        </>
                      )
                    }}
                  />
                </div>

                {!isPixExpired && (
                  <>
                    <div style={{ alignSelf: 'center' }}>
                      <QRCodeCanvas
                        value={props.sale.transaction?.pix_qr_code || ''}
                        size={220}
                        level="M"
                      />
                    </div>

                    <ButtonPrimary
                      rightElement={<FiCopy />}
                      style={{ justifySelf: 'center' }}
                      onClick={() => {
                        copyToClipboard(props.sale.transaction?.pix_qr_code)
                        toast.success('Chave PIX copiada')
                      }}
                    >
                      Copiar chave PIX
                    </ButtonPrimary>
                  </>
                )}
              </S.PaymentContainer>
            )}
            {isBoleto && (
              <S.PaymentContainer>
                <div>
                  <Heading
                    font="titleXs"
                    as="h4"
                    style={{ marginBottom: '2rem' }}
                  >
                    Código de barras para pagamento do boleto:
                  </Heading>
                  <Text>{props.sale.transaction?.boleto_barcode}</Text>
                </div>
                <ButtonPrimary
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href={props.sale.transaction?.boleto_url}
                  rightElement={<BsDownload />}
                  style={{ justifySelf: 'center' }}
                >
                  Salvar boleto
                </ButtonPrimary>
              </S.PaymentContainer>
            )}
            <S.SuccessMessageContainer>
              <div>
                <IoIosCheckmarkCircleOutline size={64} />
                <Heading
                  font="titleMd"
                  fontWeight="300"
                  style={{ marginTop: '1.25rem' }}
                >
                  Seu pedido foi concluído com sucesso!
                </Heading>
                <Text style={{ marginTop: '3rem' }}>
                  Você irá receber junto com seu cartão todas as informações
                  necessárias para configurar o seu login e poder personalizar o
                  conteúdo do seu Unitok quando e como quiser!
                </Text>
              </div>
              <Button
                onClick={scrollToCheckoutDetails}
                variant="tertiary"
                rightElement={<BsChevronDown />}
              >
                Ver detalhes da compra
              </Button>
            </S.SuccessMessageContainer>
          </S.SuccessGrid>

          <S.CheckoutDetails ref={checkoutDetailsRef} id="details">
            {screenWidth >= 430 ? (
              <Heading
                as="h3"
                font="titleSm"
                style={{ textAlign: 'center', marginBottom: '1rem' }}
              >
                Detalhes da compra
              </Heading>
            ) : (
              <Text style={{ marginTop: '3rem' }}>
                Você irá receber junto com seu cartão todas as informações
                necessárias para configurar o seu login e poder personalizar o
                conteúdo do seu Unitok quando e como quiser!
              </Text>
            )}

            {screenWidth >= 430 && (
              <>
                <S.CartItems>
                  {props.sale.items.map((card) => {
                    return (
                      <CartItem
                        shouldBeStatic
                        key={card.card_info.variant}
                        variant={card.card_info.variant as CardVariants}
                        formattedUnitPrice=""
                        cardName={card.card_info.name}
                        customNames={card.customNames}
                        customNamesFileUrl={card.customNamesFileUrl}
                        customArtOrLogoFileUrl={card.customArtOrLogoFileUrl}
                        shouldAllCustomNamesBeTheSame={
                          card.customNames.length === 1
                        }
                        formattedItemTotalPrice={formatPrice(
                          card.quantity * card.card_info.price +
                          card.customNamesAmount * 1000
                        )}
                        defaultQuantity={card.quantity}
                      />
                    )
                  })}
                </S.CartItems>

                <S.CartDetails>
                  <div>
                    <S.SpaceBetween>
                      <Text>Subtotal</Text>
                      <Text style={{ fontSize: "0.938rem" }} fontWeight="400">
                        {formatPrice(props.sale.subtotal_amount)}
                      </Text>
                    </S.SpaceBetween>
                    {props.sale.discount_value != null && (
                      <S.SpaceBetween>
                        <Text>Desconto</Text>
                        <Text style={{ fontSize: "0.938rem" }} fontWeight="400">
                          - {formatPrice(props.sale.discount_value)}
                        </Text>
                      </S.SpaceBetween>
                    )}
                    <S.SpaceBetween>
                      <Text>Frete: {props.sale.shipment_infos.name === "DEFAULT" ? "Padrão" : props.sale.shipment_infos.name}</Text>
                      <Text style={{ fontSize: "0.938rem" }} fontWeight="400">
                        {FormatShipmentValue(props.sale.shipment_infos.value)}
                      </Text>
                    </S.SpaceBetween>
                    <S.SpaceBetween style={{ marginTop: '0.938rem' }}>
                      <Text>Total</Text>
                      <Text font="bodyLg" fontWeight="500">
                        {formatPrice(props.sale.transaction?.amount)}
                      </Text>
                    </S.SpaceBetween>
                  </div>
                </S.CartDetails>

                <S.CheckoutDetailsMetadataGrid>
                  <div>
                    <Heading font="titleXs">Número do pedido</Heading>
                    <Text>{props.sale.transaction?.transaction_id}</Text>
                  </div>
                  <div>
                    <Heading font="titleXs">Forma de pagamento</Heading>
                    <Text>
                      {
                        paymentMethodFormatted[
                        props.sale.transaction?.payment_method
                        ]
                      }
                    </Text>
                  </div>
                  <div>
                    <Heading font="titleXs">Endereço de entrega</Heading>
                    <Text>
                      {props.sale.address_delivery.street},{' '}
                      {props.sale.address_delivery.number} <br />
                      {props.sale.address_delivery.complement && (
                        <>
                          {props.sale.address_delivery.complement} <br />
                        </>
                      )}
                      {props.sale.address_delivery.district} –{' '}
                      {props.sale.address_delivery.city}/
                      {props.sale.address_delivery.state} <br />
                      CEP {props.sale.address_delivery.CEP}
                    </Text>
                  </div>
                  <div>
                    <Heading font="titleXs">Data do pedido</Heading>
                    <Text>
                      {formatDate(new Date(props.sale.transaction?.createdAt))}
                    </Text>
                  </div>
                  {props.sale.transaction?.payment_method !== 'voucher' && (
                    <div>
                      <Heading font="titleXs">Número de parcelas</Heading>
                      <Text>
                        {props.sale.transaction?.installments === 1
                          ? 'À vista'
                          : `${props.sale.transaction?.installments} vezes`}
                      </Text>
                    </div>
                  )}
                </S.CheckoutDetailsMetadataGrid>
              </>
            )}
            <S.GoBackToSiteButtonContainer>
              {screenWidth <= 430 && (
                <ButtonPrimary
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  Detalhes da compra
                </ButtonPrimary>
              )}
              <Button onClick={() => router.push('/')}>
                Voltar para o site
              </Button>
            </S.GoBackToSiteButtonContainer>
          </S.CheckoutDetails>
          <PurchaseCheckoutModal
            sale={props.sale}
            modalIsOpen={isModalOpen}
            closeModal={closeModal}
          />
        </S.Container>
        <Footer />
      </S.Wrapper>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const saleId = ctx.query?.id as string

  const sale = await getSale(saleId);

  const props = {
    sale
  }



  return {
    props,
  }
}
