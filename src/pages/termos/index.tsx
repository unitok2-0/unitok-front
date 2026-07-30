import Head from "next/head"
import { useState } from "react"
import { Header } from "components/Header"
import { UseTerms } from "components/UseTerms"
import { Footer } from "components/Footer"
import { Heading, Text } from "components/Typography"
import * as S from 'styles/pageStyles/terms/styles'
import { Module1MobileMenu } from "components/HomeModules/Module1MobileMenu"
import WhatsappButton from "components/Buttons/WhatsappButton"

const Terms: React.FC = () => {
  const [oppenedBurguerMenu, setOppenedBurguerMenu] = useState(false)

  function handleChangeOppenedBurguerMenu() {
    setOppenedBurguerMenu(!oppenedBurguerMenu)
  }

  return (
    <>
      <Head>
        <title>Termos de uso | Unitok</title>
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

      <S.TermsContainer>
        <Heading
          font='titleMdLight'
          color='secondary'
          style={{
            marginBottom: '2.75rem'
          }}
        >
          Termos e Condições de uso
        </Heading>

        <Text
          font='bodyMd'
          color='secondary'
          className='TermsMiddleTextTerms'
        >
           Termos e condições gerais de uso dos serviços do site www.unitok.com. Tais serviços são fornecidos pela Empresa de Responsabilidade Limitada UNITOK SISTEMAS LTDA, inscrita no CNPJ 45.340.462/0001-96, com sede na R Comendador Torlogo Dauntre, 74, sala 1207, Cambui, Campinas, SP, cep 13.025-270, com atos constitutivos averbados na Jucesp sob o NIRE 35235077380 de 11.09.2017 e 1ª alteração contratual averbada sob nº 246.522/21-5 de 17.06.2021 que é titular da propriedade intelectual sobre a tecnologias envolvidas, código-fonte de programa de computador, website, know how, marca, logotipos e insígnias, conteúdos, vídeos e demais elementos protegidos pelas Leis 9279/96, 9609/98 e 9610/98.
        </Text>

        <UseTerms />

      </S.TermsContainer>
      <Footer />
    </>
  )
}

export default Terms;