import Head from "next/head"
import { useState } from "react"
import { Header } from "components/Header"
import { Heading, Text } from "components/Typography"
import { Privacy } from "components/Privacity"
import { Footer } from "components/Footer"
import { Module1MobileMenu } from "components/HomeModules/Module1MobileMenu"
import * as S from 'styles/pageStyles/privacity/styles'
import WhatsappButton from "components/Buttons/WhatsappButton"

const Privacity: React.FC = () => {
  const [oppenedBurguerMenu, setOppenedBurguerMenu] = useState(false)

  function handleChangeOppenedBurguerMenu() {
    setOppenedBurguerMenu(!oppenedBurguerMenu)
  }

  return (
    <>
      <Head>
        <title>Política de privacidade | Unitok</title>
      </Head>
      <WhatsappButton />
      {oppenedBurguerMenu &&
        (
          <Module1MobileMenu
            setOppenedBurguerMenu={handleChangeOppenedBurguerMenu}
          />
        )
      }

      <Header
        position='static'
        whatColor='transp'
        whatPage={6}
        oppenedBurguerMenu={oppenedBurguerMenu}
        setOppenedBurguerMenu={handleChangeOppenedBurguerMenu}
      />

      <S.PrivacityContainer>
        <Heading
          font='titleMdLight'
          color='secondary'
          style={{
            marginBottom: '2.75rem'
          }}
        >
          Política de privacidade e proteção de dados
        </Heading>

        <Text
          font='bodyMd'
          color='secondary'
          className='PrivacityMiddleTextTerms'
        >
          A Política de Privacidade do Unitok (“Política”) foi criada para demonstrar o seu comprometimento com a privacidade e segurança de dados coletados dos clientes através do site ou outros canais de comunicação.
        </Text>

        <Text
          font='bodyMd'
          color='secondary'
          className='PrivacityMiddleTextTerms'
        >
          No Unitok, uma de nossas principais prioridades é a privacidade. Este documento de Política de Privacidade contém os tipos de informações que são coletadas e registradas por nós e como as usamos.
        </Text>

        <Text
          font='bodyMd'
          color='secondary'
          className='PrivacityMiddleTextTerms'
        >
          Se você tiver perguntas adicionais ou precisar de mais informações sobre nossa Política de Privacidade, não hesite em nos contatar através do e-mail: <S.PrivacyPrimaryColorText>contato@unitok.com</S.PrivacyPrimaryColorText>.
        </Text>

        <Text
          font='bodyMd'
          color='secondary'
          className='PrivacityMiddleTextTerms'
        >
          O Unitok precisa coletar e usar certos tipos de informações sobre as pessoas ou usuários do serviço que entram em contato, a fim de continuar nosso trabalho. Essas informações pessoais devem ser coletadas e tratadas, como apropriadamente se é coletado em papel, armazenado em um banco de dados de computador ou registrado em outro material e há salvaguardas para garantir isso.
        </Text>

        <Privacy />

      </S.PrivacityContainer>
      <Footer />
    </>
  )
}

export default Privacity;