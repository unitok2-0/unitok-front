import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import SpinnerLoader, { SpinnerLoaderProps } from "../../Loaders/SpinnerLoader";
import { Container, ButtonStyleProp } from "./styles";

export type ButtonPrimaryProp = SpinnerLoaderProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProp & {
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    /** @deprecated */
    textButton?: string;
    children?: React.ReactNode;
    /** @deprecated use `colorScheme` instead */
    colorBackground?: string;
    colorScheme?: string;
    as?: string;
  };

const ButtonPrimary: React.FC<ButtonPrimaryProp> = (props) => {
  const {
    leftElement,
    textButton,
    loading,
    styleProp,
    colorSpinner,
    sizeSpinner,
    rightElement,
    as,
    ...rest
  } = props;

  return (
    <Container
      as={(as as unknown) as undefined}
      {...rest}
      styleProp={styleProp}
    >
      {loading ? (
        <SpinnerLoader
          colorSpinner="curentColor"
          loading={loading}
          sizeSpinner={sizeSpinner}
        />
      ) : (
        <>
          {leftElement}
          <span style={{ display: "inline-flex" }}>
            {props.children || textButton}
          </span>
          {rightElement}
        </>
      )}
    </Container>
  );
};

export default ButtonPrimary;
