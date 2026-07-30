import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { CSSProp } from "styled-components";
import { IconType } from "react-icons/lib";
import {
  Container,
  ContainerIcon,
  RoundBackground,
  ButtonStyleProp,
} from "./styles";
import { Colors } from "../../../styles/Colors";

export interface ButtonWithIconProp
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProp {
  Icon: IconType;
  colorIcon?: string;
  sizeIcon?: number;
  withRoundBackground?: boolean;
  textButton: string;
  colorBackground: string;
  styleProp?: CSSProp;
  backgroundRound?: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProp> = ({
  Icon,
  colorIcon = Colors.white,
  sizeIcon = 17,
  withRoundBackground = false,
  textButton,
  backgroundRound = undefined,
  styleProp = undefined,
  ...rest
}) => {
  return (
    <Container {...rest} styleProp={styleProp}>
      <ContainerIcon>
        {withRoundBackground ? (
          <RoundBackground backgroundRound={backgroundRound}>
            <Icon
              color={colorIcon}
              size={sizeIcon}
              style={{ transition: "all 0.30s ease-in-out" }}
            />
          </RoundBackground>
        ) : (
          <Icon color={colorIcon} size={sizeIcon} />
        )}
      </ContainerIcon>
      {textButton}
    </Container>
  );
};

export default ButtonWithIcon;
