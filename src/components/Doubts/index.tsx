import { useState } from "react";
import { Heading, Text } from "components/Typography";
import * as S from "./styles";
import { homeIcons } from '../../pages/index-old'

const land8 = [
  {
    question: 'Como o Unitok funciona?',
    answer: 'Unitok é um cartão de visita digital. Ele funciona sem a necessidade de um aplicativo, por leitura de QR Code e em qualquer celular iPhone ou Android que possui a tecnologia de pagamento por aproximação (NFC). Ao encostar seu cartão no celular ou escanear o QR Code, aparecerá uma notificação com um link. Ao clicar nesse link, você será redirecionado para o perfil que está vinculado ao cartão.',
    status: false
  },
  {
    question: 'Como, quando e quantas vezes eu posso editar meu perfil? ',
    answer: 'Sempre que quiser, quantas vezes for necessário e instantaneamente! Você pode alterar sua foto, mudar a cor do seu perfil e adicionar diversas informações de contato que precisar em poucos minutos. Basta criar um login no momento que receber o seu cartão e acessar a sua conta online pelo nosso site ou encostando seu cartão no seu celular.',
    status: false
  },
  {
    question: 'Como faço para compartilhar meu perfil online?',
    answer: 'Existem 2 formas diferentes para compartilhar o seu perfil de forma digital: pelos botão “Compartilhar” ou copiando a URL do seu perfil (unitok.com/SeuNomedeUsuario) e colocando-o onde deseja divulgar: na bio do Instagram, por mensagem no WhatsApp, no sobre do Facebook, etc.',
    status: false
  },
  {
    question: 'Como faço para compartilhar meu perfil caso a pessoa esteja sem internet?',
    answer: 'Quando a pessoa com a qual você vai compartilhar está sem internet, encoste o cartão em seu próprio celular e clique no botão “QR Code” que aparece no perfil para que ele/ela escaneie o código que aparece na sua tela e consiga salvar seus contatos diretamente na agenda dele/dela.',
    status: false
  },
  {
    question: 'Posso colocar a arte/logo da minha empresa na parte da frente e também atrás do cartão?',
    answer: 'Não, a arte da sua empresa aparecerá na parte da frente do cartão e a parte de trás é padrão, na cor cinza, juntamente com o QR Code. As instruções de como nos enviar a arte/logo serão enviadas para você e iremos te auxiliar durante todo o processo.',
    status: false
  },
  {
    question: 'O que consigo colocar no perfil Unitok?',
    answer: 'Você pode incluir todos os links que precisar dentro do seu cartão Unitok: e-mail, telefone, site, endereço, whatsapp, pix, redes sociais e muito mais.',
    status: false
  },
  {
    question: 'Como faço o pedido dos cartões?',
    answer: 'Através de um formulário de pedido que está disponível aqui em nosso site, basta apertar o botão "faça com a sua marca".',
    status: false
  },
  {
    question: 'Existe um pedido mínimo de cartões customizados?',
    answer: 'Sim, o pedido mínimo de cartões customizados é de 4 unidades.',
    status: false
  },
]

export function Doubts() {
  const [questions, setQuestions] = useState(land8)

  function handleCheckLast(section: number) {
    if (questions[section]?.question) return false
    return true
  }

  function handleSeeOppenedQuestion(index: number) {
    const list = [...questions]
    list[index].status = !list[index].status

    setQuestions(list)
  }

  return (
    <S.EighthScreen
      id={'section-id-8'}
    >
      <Heading
        font='titleMd'
        color='primary'

      >
        Dúvidas frequentes
      </Heading>

      {questions.map((land, i) => (
        <S.EightScreenDiv key={i}>
          <S.EightDiv>
            <Text
              key={i}
              font='bodyMd'
              color='white'
              style={{
                fontWeight: 500
              }}
            >
              {land.question}
            </Text>

            {!land.status ?
              <img
                className='EighthScreenPlayIcon'
                src={homeIcons.plusIcon64px}
                alt='Play icon 64px'
                onClick={() => handleSeeOppenedQuestion(i)}
              />
              :
              <img
                className='EighthScreenPlayIcon'
                src={homeIcons.reduceIcon64px}
                alt='Play icon 64px'
                onClick={() => handleSeeOppenedQuestion(i)}
              />
            }

          </S.EightDiv>
          {land.status && (
            <Text
              font='bodyMd'
              color='white'
              className='questionResponseText'
              style={{
                marginTop: '-36px',
                fontWeight: 300,
                lineHeight: "25px",
                color: "#D0D4D1"
              }}
            >
              {land.answer}
            </Text>
          )}
          <S.EightScreenSpan isLast={handleCheckLast(Number(i + 1))} />
        </S.EightScreenDiv>
      ))}
    </S.EighthScreen>
  )
}