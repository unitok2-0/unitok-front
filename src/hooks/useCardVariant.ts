import mockedCards, { CardVariants } from "constants/cards";
import { useCart } from "contexts/CartContext";
import { useMemo } from "react";

export default function useCardVariant(cardVariant: CardVariants) {
  const { cards } = useCart();

  const card = useMemo(() => {
    return cards.find((card) => card.variant === cardVariant);
  }, [cardVariant, cards]);

  const cardVariantColors = useMemo(() => {
    const sameModelCards = cards.filter(
      ({ modelCard }) => modelCard === card?.modelCard
    );

    return sameModelCards
      .map((card: any) => card.color?.values)
      .filter(Boolean);
  }, [card, cards]);

  return {
    card,
    cardVariantColors,
  };
}
