import { useRouter } from 'next/router'
import { FooterContainer, RightSide, LeftSide, IconsContainer } from './styles'

import { FiInstagram, FiYoutube } from 'react-icons/fi'
//  import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { Heading, Text } from 'components/Typography'
import { FaLinkedinIn } from 'react-icons/fa'

export interface FooterProps { }

export function Footer() {
  const { push } = useRouter()

  return (
    <FooterContainer>
      <RightSide>
        <Heading font="titleMd" color="primary">
          Contato
        </Heading>
        <div>
          <Text font="bodyMd" color="white">
            Whatsapp
          </Text>
          <Text font="bodyMd" color="white">
            <a href="tel:+5508004550800">0800 455 0800</a>
          </Text>
        </div>

        <div>
          <Text font="bodyMd" color="white">
            E-mail
          </Text>
          <Text font="bodyMd" color="white">
            <a href="mailto:contato@unitok.com">contato@unitok.com</a>
          </Text>
        </div>
      </RightSide>

      <LeftSide>
        <IconsContainer>
          <a
            href="https://www.instagram.com/unitok_br/"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/unitok/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
          {/* <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FiYoutube />
          </a>
           */}
        </IconsContainer>

        <span>
          <Text
            font="bodySm"
            color="white"
            style={{
              textDecorationLine: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => push('/privacidade')}
          >
            Política de privacidade
          </Text>
          <Text
            font="bodySm"
            color="white"
            style={{
              textDecorationLine: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => push('/termos')}
          >
            Termos de uso
          </Text>
          <Text font="bodySm" color="tertiary">
            Todos os direitos reservados 2021
          </Text>
        </span>
      </LeftSide>
    </FooterContainer>
  )
}
