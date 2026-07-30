import { CardNames } from "constants/cards";
import styled, { css } from "styled-components";



function getNamePositionByCardName(name: CardNames) {
  switch (name) {
    case "Happytok":
    case "Darktok":
      return css`
        left: 7.5%;
        bottom: 10%;
      `;

    case "Colortok":
      return css`
        left: 7.5%;
        bottom: 50%;
        transform: translateY(50%);
      `;

    case "Urbantok":
      return css`
        left: 7.5%;
        bottom: 23.5%;
      `;

    case "Classictok":
      return css`
        right: 7.5%;
        bottom: 10%;
      `;

    case "Wavetok":
      return css`
        right: 0;
        left: 0;
        text-align: center;
        bottom: 10%;
      `;
  }
}

export const Wrapper = styled.div`
  position: relative;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: -1.5rem;
  right: -1.5rem;
`;

export const CardWrapper = styled.div`
  position: relative;
  min-height: 5rem;

  /** Older browser does not support, so it should be commented */
  /* aspect-ratio: 8.5 / 5.5; */

  transform: rotate(-7.7deg);

  filter: drop-shadow(25px 20px 50px rgba(0, 0, 0, 0.15));
`;

export const Card = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;

  /* top: 0;
  left: 0; */

  transition: all 0.5s;

  &.show-back {
    transform: rotateY(180deg);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;

    object-fit: cover;
    border-radius: 10px;
  }
`;


type CardFrontProps = {
  cardVariantFront: string;
}

export const Front = styled.div<CardFrontProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-image: ${props => `url(/images/cards/${props.cardVariantFront}-front.svg)`};
  background-position: center;
  background-repeat: no-repeat;
`;

type CardBackProps = {
  cardVariantBack: string;
}

export const Back = styled.div<CardBackProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background-image: ${props => `url(/images/cards/${props.cardVariantBack}-back.svg)`};
  background-position: center;
  background-repeat: no-repeat;
`;

export type NameProps = {
  cardName: CardNames;

  blackText?: boolean;
};

export const Name = styled.span<NameProps>`
  position: absolute;

  text-transform: uppercase;

  color: ${({ blackText }) => (blackText ? "black" : "white")};

  ${(props) => getNamePositionByCardName(props.cardName)};
`;
