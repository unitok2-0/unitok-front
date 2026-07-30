import { CardVariants } from "constants/cards";

export function composeCardImageSrc(cardVariant: CardVariants) {
  if (cardVariant.startsWith("with")) {
    return `/images/cards/${cardVariant}.png`;
  } else return `/images/cards/${cardVariant}-front.svg`;
}
