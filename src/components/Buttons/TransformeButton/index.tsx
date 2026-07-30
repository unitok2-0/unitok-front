import React, { ButtonHTMLAttributes } from 'react';
import { CSSProp } from 'styled-components';

import { Container } from './styles';

export interface ButtonPrimaryProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  textButton?: string;
  styleProp?: CSSProp;
}

const TransformeButton: React.FC<ButtonPrimaryProp> = ({
  children,
  styleProp,
  textButton,
  ...rest
}) => {
  return (
    <Container {...rest} styleProp={styleProp}>
      {children}
      {!!textButton && textButton}
    </Container>
  )
}

export default TransformeButton;