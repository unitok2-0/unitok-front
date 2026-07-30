import TransformeButton from 'components/Buttons/TransformeButton'
import CartItem from 'components/CartItem'
import Modal, { MainModalProps } from 'components/Modals/MainModal'
import { CardVariants } from 'constants/cards'
import { SaleResponse } from 'services/sale'
import { formatDate, formatPrice } from 'utils/formatter'
import { Heading, Text } from '../Typography'
import * as S from './styles'

export type PurchaseCheckoutModal = MainModalProps & {
  sale: SaleResponse
}

export default function UseTermsModal(props: PurchaseCheckoutModal) {
  const paymentMethodFormatted = {
    boleto: 'Boleto bancário',
    credit_card: 'Cartão de crédito',
    pix: 'PIX',
    voucher: 'Cupom de desconto',
  }

  function getSubtotal() {
    return formatPrice(props.sale.subtotal_amount)
  }



  return (
    <Modal
      customStyles={{
        content: {
          height: '95%',
          overflow: 'auto',
          minWidth: '100%',
        },
      }}
      modalIsOpen={props.modalIsOpen}
      closeModal={props.closeModal}
    >
      <S.PurchaseModalProps>
        <TransformeButton
          styleProp={S.closeButton}
          onClick={() => {
            props.closeModal()
          }}
        >
          Fechar
        </TransformeButton>
        <header>
          <Heading>Detalhes da compra</Heading>
        </header>

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
                shouldAllCustomNamesBeTheSame={card.customNames.length === 1}
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
                {getSubtotal()}
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
              <Text>Frete</Text>
              <Text style={{ fontSize: "0.938rem" }} fontWeight="400">
                {props.sale.shipment_infos.value > 0 ? formatPrice(props.sale.shipment_infos.value) : "Grátis"}
              </Text>
            </S.SpaceBetween>
            <S.SpaceBetween>
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
              {paymentMethodFormatted[props.sale.transaction?.payment_method]}
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
      </S.PurchaseModalProps>
    </Modal>
  )
}
