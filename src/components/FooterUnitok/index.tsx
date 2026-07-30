import Link from 'next/link'
import { useRouter } from 'next/router'
import { FooterContainer, LeftContainer, RightContainer } from './styles'

import { FiInstagram, FiYoutube } from 'react-icons/fi'
//  import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { Heading, Text } from 'components/Typography'
import { FaLinkedinIn } from 'react-icons/fa'


export function FooterUnitok() {
  const { push } = useRouter()

  return (
    <FooterContainer>
      <LeftContainer>
        <Link href="/">

          <img src="/assets/logo_white.svg" alt="" />

        </Link>
        <Text color='white'>
          Unitok Sistemas LTDA. <br />
          CNPJ 45.340.462/0001-96
        </Text>

        <div className='links'>
          <Link href="">
            
              Política de privacidade
            
          </Link>
          <Link href="">
            
              Termos de uso
            
          </Link>
          <Text color='tertiary'>© Unitok 2022. Todos os direitos reservados.</Text>
        </div>
      </LeftContainer>

      <RightContainer>
        <Text color='primary' >Contato</Text>
        <Text color='white' fontWeight='300'>
          Horários de atendimento: <br />
          Segunda a sexta, das 9h às 20h
        </Text>
        <Link href="tel:5508004550800">
          
            0800 455 0800
          
        </Link>
        <Link href="mailto:contato@unitok.com">
          
            contato@unitok.com
          
        </Link>

        <div className='social-icons'>
          <Link href="https://www.instagram.com/unitok_br/" target="_target">

            <FiInstagram size={24} />

          </Link>
          <Link
            href="https://www.youtube.com/channel/UCmLVukDcy1WsiMNry_nNR6g"
            target="_target">

            <FiYoutube size={24} />

          </Link>
          <Link href="https://www.linkedin.com/company/unitok/" target="_target">

            <FaLinkedinIn size={24} />

          </Link>
        </div>

        <div className='links'>
          <Link href="">
            
              Política de privacidade
            
          </Link>
          <Link href="">
            
              Termos de uso
            
          </Link>
          <Text color='tertiary'>© Unitok 2022. Todos os direitos reservados.</Text>
        </div>
      </RightContainer>
    </FooterContainer>
  );
}
