import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SelectedCard, useCart } from "contexts/CartContext";
import { useCheckout } from "contexts/CheckoutContext";
import { formatPrice } from "utils/formatter";
import { CardVariants } from "constants/cards";
import { BsChevronLeft } from "react-icons/bs";
import Input from 'components/Inputs/Input'

import useDisclosure from "hooks/useDisclosure";

import CheckoutContainer from "containers/checkout";
import CartItem from "components/CartItem";
import { Heading, Text } from "components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import NextStepBox from "components/NextStepBox";
import EditCustomCardNamesModal from "components/EditCustomCardNamesModal";
import EditCustomCardNamesFileModal from "components/EditCustomCardNamesFileModal";
import EditCustomArtOrLogoFileModal from "components/EditCustomArtOrLogoFileModal";

import { toast } from "react-toastify";

import * as S from "styles/pageStyles/checkout/cart/styles";
import WhatsappButton from "components/Buttons/WhatsappButton";
import { calculateShipment, ShippingInformation } from "services/melhorenvio";
import { SetShipmentePriceWithouDiscount } from "utils/format-shipment";

export default function Cart() {
  const router = useRouter();
  const {
    selectedCards,
    allCardsSubtotal,
    getCardSubtotalPrice,
    removeCardFromCart,
    handleCardQuantityChange,
    updateCard,
  } = useCart();
  const { unlockNextCheckoutStep } = useCheckout();
  const editCustomNamesModal = useDisclosure();
  const editCustomArtOrLogoModal = useDisclosure();
  const [selectedCardToEdit, setSelectedCardToEdit] = useState<SelectedCard>();
  const [isAddMode, setIsAddMode] = useState(false);
  const [cep, setCep] = useState<string>('')
  const [pacPrice, setPacPrice] = useState<ShippingInformation>();
  const [sedexPrice, setSedexPrice] = useState<ShippingInformation>();
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(getQuantity())


  const handleQuantityChange = useCallback(
    (cardVariant: CardVariants) => {
      return (quantity: number) => {
        handleCardQuantityChange(cardVariant, quantity);
      };
    },
    [handleCardQuantityChange]
  );

  useEffect(() => {
    setQuantity(getQuantity());

    (async function () {
      if (cep) await getShipmentsPrices(cep);
    })();

  }, [selectedCards])

  function getQuantity(): number {
    let quantity = 0
    selectedCards.forEach(card => {
      quantity += card.quantity;
    });
    return quantity;
  }

  async function getShipmentsPrices(cepValue: string) {
    try {

      const data = await calculateShipment({
        to: cepValue,
        quantity
      });
      const pac = data.find(shipping => shipping.name === 'PAC');
      const sedex = data.find(shipping => shipping.name === 'SEDEX');

      setPacPrice(SetShipmentePriceWithouDiscount(pac));
      setSedexPrice(SetShipmentePriceWithouDiscount(sedex))
    } catch (error) {
      setPacPrice(null)
      setSedexPrice(null)
    }
  }

  function goToNextCheckoutStep() {
    unlockNextCheckoutStep(0);
    router.push("/checkout/data");
  }

  return <>
    <WhatsappButton />
    {editCustomArtOrLogoModal.isOpen && (
      <EditCustomArtOrLogoFileModal
        type={selectedCardToEdit.variant.includes("logo") ? "logo" : "art"}
        customArtOrLogoFile={selectedCardToEdit?.customArtOrLogoFile}
        onSave={(customArtOrLogoFile) => {
          updateCard(selectedCardToEdit?.variant, (card) => ({
            ...card,
            customArtOrLogoFile,
          }));
        }}
        modalIsOpen={editCustomArtOrLogoModal.isOpen}
        closeModal={editCustomArtOrLogoModal.handleClose}
      />
    )}
    {editCustomNamesModal.isOpen && (
      <>
        {selectedCardToEdit.quantity > 10 ? (
          <EditCustomCardNamesFileModal
            customNamesFile={selectedCardToEdit.customNamesFile}
            onSave={(customNamesFile) => {
              updateCard(selectedCardToEdit?.variant, (card) => ({
                ...card,
                customNamesFile,
              }));
            }}
            modalIsOpen={editCustomNamesModal.isOpen}
            closeModal={editCustomNamesModal.handleClose}
          />
        ) : (
          <EditCustomCardNamesModal
            shouldAllCustomNamesBeTheSame={
              selectedCardToEdit.shouldAllCustomNamesBeTheSame
            }
            shouldAddCustomName={isAddMode}
            quantity={selectedCardToEdit.quantity}
            modalIsOpen={editCustomNamesModal.isOpen}
            closeModal={editCustomNamesModal.handleClose}
            onSave={(state) => {
              updateCard(selectedCardToEdit?.variant, (card) => {
                return {
                  ...card,
                  customNames: state.newNamesState,
                  shouldAllCustomNamesBeTheSame:
                    state.shouldAllCustomNamesBeTheSame,
                };
              });
              editCustomNamesModal.handleClose();
            }}
            cardVariant={selectedCardToEdit?.variant}
            customNames={selectedCardToEdit?.customNames}
          />
        )}
      </>
    )}
    <Head>
      <title>Sacola | Unitok</title>
    </Head>
    <CheckoutContainer shouldHideCheckoutSummary shouldCenterContent={false}>
      {!selectedCards.length ? (
        <S.EmptyCartContainer>
          <Heading font="titleMd" style={{ fontWeight: 300 }}>
            Sua sacola <br /> está vazia!
          </Heading>
          <ButtonPrimary onClick={() => router.push("/cards/classictok-0")}>
            Escolha seu cartão
          </ButtonPrimary>
        </S.EmptyCartContainer>
      ) : (
        <S.CartContent>
          <Heading
            as="h1"
            color="primary"
            style={{
              fontSize: "35px",
              fontWeight: 300,
              marginBottom: "2rem",
            }}
          >
            Sacola
          </Heading>

          <S.THeadAsDiv>
            <span></span>
            <span></span>
            <Heading font="titleXs">{/* Personalização */}</Heading>
            <Heading font="titleXs">Valor Unit.</Heading>
            <Heading font="titleXs">Quantidade</Heading>
            <Heading font="titleXs">Total</Heading>
          </S.THeadAsDiv>
          <S.CartItemList>
            {selectedCards.map((card) => {
              return (
                <CartItem
                  key={card.variant}
                  variant={card.variant}
                  cardName={card.name}
                  customNames={card.customNames}
                  customNamesFile={card.customNamesFile}
                  customArtOrLogoFile={card.customArtOrLogoFile}
                  shouldAllCustomNamesBeTheSame={
                    card.shouldAllCustomNamesBeTheSame
                  }
                  formattedItemTotalPrice={formatPrice(
                    getCardSubtotalPrice(card.variant)
                  )}
                  formattedUnitPrice={formatPrice(card.unitPrice)}
                  onDeleteItemClick={() => {
                    toast.success(`${card.name} removido do carrinho`);
                    removeCardFromCart(card.variant);
                  }}
                  onAddCustomNameClick={() => {
                    setIsAddMode(true);
                    setSelectedCardToEdit(card);
                    editCustomNamesModal.handleOpen();
                  }}
                  onEditCustomNamesClick={() => {
                    setIsAddMode(false);
                    setSelectedCardToEdit(card);
                    editCustomNamesModal.handleOpen();
                  }}
                  onEditCustomArtOrLogoFileClick={() => {
                    setSelectedCardToEdit(card);
                    editCustomArtOrLogoModal.handleOpen();
                  }}
                  onQuantityChange={handleQuantityChange(card.variant)}
                  defaultQuantity={card.quantity}
                />
              );
            })}
          </S.CartItemList>

          <footer>
            <S.SubtotalAndShipping>
              <S.SubtotalAndShippingHStack>
                <Text>Subtotal</Text>
                <Text font="bodyLg" style={{ fontWeight: 500 }}>
                  {formatPrice(allCardsSubtotal)}
                </Text>
              </S.SubtotalAndShippingHStack>

              <S.ShippingPrices>
                <Text>Consulte o frete</Text>
                <Input
                  id="CEP"
                  name="CEP"
                  value={cep}
                  mask="99999-999"
                  onChange={async (e) => {
                    const cep = e.target.value.replace(/\D/g, '');
                    setCep(cep);
                    if (cep.length === 8) {
                      await getShipmentsPrices(cep);
                    }

                  }}
                />
              </S.ShippingPrices>
              {cep.length === 8 && !!pacPrice && !!sedexPrice && (
                <S.ShippingPricesWrapper>
                  <div>
                    <div className="delivery_type">
                      <Text style={{
                        fontWeight: 500
                      }}>Padrão</Text>
                      <Text>Frete grátis</Text>
                    </div>
                    <Text className="stipulated">Até 20 dias</Text>
                  </div>
                  <div>
                    <div className="delivery_type">
                      <Text style={{
                        fontWeight: 500
                      }}>Sedex</Text>
                      <Text>
                        {sedexPrice?.error ? 'Indisponível' : `R$ ${sedexPrice?.realPrice.replace('.', ',')}`}
                      </Text>
                    </div>
                    <Text className="stipulated">Até {sedexPrice?.delivery_time} dias</Text>
                  </div>
                  {/* <div>
                    <div className="delivery_type">
                      <Text style={{
                        fontWeight: 500
                      }}>PAC</Text>
                      <Text>
                        {pacPrice?.error ? 'Indisponível' : `R$ ${pacPrice?.realPrice.replace('.', ',')}`}
                      </Text>
                    </div>
                    <Text className="stipulated">Até {pacPrice?.delivery_time} dias</Text>
                  </div> */}
                </S.ShippingPricesWrapper>
              )}

            </S.SubtotalAndShipping>

            <S.NavigationFooter>
              <ButtonPrimary
                variant="tertiary"
                leftElement={<BsChevronLeft />}
                onClick={() => router.push("/cards/classictok-0")}
              >
                Escolher mais cartões
              </ButtonPrimary>

              <NextStepBox>
                <ButtonPrimary
                  type="button"
                  onClick={goToNextCheckoutStep}
                  style={{ justifySelf: "end" }}
                >
                  Finalizar pedido
                </ButtonPrimary>
              </NextStepBox>
            </S.NavigationFooter>
          </footer>
        </S.CartContent>
      )}
    </CheckoutContainer>
  </>;
}
