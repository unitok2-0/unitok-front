import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';
import { CSSProp } from 'styled-components';

import { Container } from './styles';

export interface WhatsappButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleProp?: CSSProp;
  whatColor?: 'colorful' | 'transp';
}

const WhatsappButton: React.FC<WhatsappButtonProp> = ({
  children,
  styleProp,
  whatColor,
  ...rest
}) => {

  return (
    <Container {...rest} styleProp={styleProp}>
      <a href='https://api.whatsapp.com/send?phone=5508004550800' target="_blank" rel="noreferrer">
        <p style={{
          color: whatColor === 'colorful' ? '#FFF' : '#01302F'
        }}>Dúvidas? Fale com a gente!</p>
        <img src="/assets/whatsapp.svg" alt="" />
      </a>
    </Container>
  )
}

export default WhatsappButton;
