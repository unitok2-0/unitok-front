import React from "react";

import { useCart } from "contexts/CartContext";

import {
  Container,
  Cards,
  SpaceBetweeen,
  PricesBox,
  Personalizations,
} from "./styles";
import { formatPrice } from "../../utils/formatter";
import { Heading, Text } from "components/Typography";
import { useCheckout } from "contexts/CheckoutContext";
import { composeCardImageSrc } from "utils/compose-card-image-src";

const SummaryPayment: React.FC = () => {
  const {
    selectedCards,
    allCardsSubtotal,
    getPersonalizationAmount,

    PRICE_PER_PERSONALIZATION,
  } = useCart();

  const { discountedTotal, discountPrice, voucher, selectedShipment } = useCheckout();

  const formattedAllCardsSubtotal = formatPrice(allCardsSubtotal);

  const formattedCheckoutTotal = formatPrice(discountedTotal);

  if (!selectedCards.length) {
    return (
      <Container>
        <Heading font="titleSm">Resumo da compra</Heading>
        <SpaceBetweeen>Nenhum produto adicionado</SpaceBetweeen>
      </Container>
    );
  }

  return (
    <Container>
      <Heading font="titleSm">Resumo da compra</Heading>
      <Cards className="light-custom-scrollbar">
        {selectedCards.map((card) => {
          const personalizationAmount = getPersonalizationAmount(card);

          return (
            <div key={card.variant}>
              <SpaceBetweeen>
                <img
                  title={card.name}
                  src={composeCardImageSrc(card.variant)}
                  alt={card.name}
                  style={{ width: "3.75rem" }}
                />
                <Text
                  as="span"
                  style={{ marginRight: "auto", marginLeft: "1rem " }}
                >
                  x{card.quantity}
                </Text>
                <Text as="strong">
                  {formatPrice(card.unitPrice * card.quantity)}
                </Text>
              </SpaceBetweeen>
              {Boolean(personalizationAmount) && (
                <Personalizations>
                  <Text font="bodySm" as="span">
                    personalização
                  </Text>
                  <Text
                    font="bodySm"
                    as="span"
                    style={{ marginRight: "auto", marginLeft: "1rem " }}
                  >
                    {personalizationAmount} x
                  </Text>

                  <Text font="bodySm" as="strong">
                    {formatPrice(
                      personalizationAmount * PRICE_PER_PERSONALIZATION
                    )}
                  </Text>
                </Personalizations>
              )}
            </div>
          );
        })}
      </Cards>

      <div>
        <PricesBox>
          <div>
            <SpaceBetweeen>
              <Text as="span">Subtotal</Text>
              <Text as="span">{formattedAllCardsSubtotal}</Text>
            </SpaceBetweeen>
            {voucher && (
              <SpaceBetweeen>
                <Text as="span">Desconto</Text>
                <Text as="span">-{formatPrice(discountPrice)}</Text>
              </SpaceBetweeen>
            )}
            <SpaceBetweeen>
              <Text as="span">Frete</Text>
              <Text as="span">{Number(selectedShipment.custom_price) <= 0 ? "Grátis" : `R$ ${selectedShipment.realPrice}`}</Text>
            </SpaceBetweeen>

          </div>


          <SpaceBetweeen>
            <Text as="span">Total</Text>
            <Text font="bodyLg" as="strong">
              {formattedCheckoutTotal}
            </Text>
          </SpaceBetweeen>
        </PricesBox>
      </div>
    </Container>
  );
};

export default SummaryPayment;
