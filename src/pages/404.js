import Layout from '../components-new/layout/layout'
import Head from 'next/head'
import { SEO_TITLE } from '../lib-new/constants'
import Container from '../components-new/layout/container'
import Btn from '../components-new/ui/btn'


export default function Tags(props) {

  return (
    <>
      <Layout mobileIconsColors={'orange'}>

        <Head>
          <title>Página não encontrada {SEO_TITLE}</title>
        </Head>

        <section>
          <Container>
            <div className='flex flex-col items-center justify-center py-[20vh] text-center'>
              <h1 className='typ-text-1 text-orange'>404</h1>
              <h2 className='typ-text-2 text-green-dark mt-8 md:mb-24 mb-8'>Página não encontrada</h2>
              <Btn label={'Voltar a Home'} link='/' ></Btn>
            </div>
          </Container>
        </section>


      </Layout>
    </>
  )
}


export async function getStaticProps() {
  return {
    props: {
      btnPrimary: {
        label: 'Pedir orçamento',
        link: 'https://api.whatsapp.com/send?phone=5508004550800'
      },
      infoCards: [{
        icon: '/public-new/icons/tags/icon2.svg',
        title: 'Presente ideal para seus clientes, amigos e parceiros de negócios',
        text: 'Você pode escolher um dos nossos modelos do site ou fazer totalmente customizado com a sua marca. Um excelente brinde que será usado e lembrado sempre.'
      }, {
        icon: '/public-new/icons/tags/icon4.svg',
        title: 'Edite os dados quantas vezes quiser, sem pagar nenhuma mensalidade ',
        text: 'Com o Unitok você tem acesso a nossa plataforma digital que permite alterar os dados do seu cartão de visitas quantas vezes desejar, grátis. Além disso, você pode alterar cor, foto, muito mais. É tudo muito simples e fácil.'
      }, {
        icon: '/public-new/icons/tags/icon3.svg',
        title: 'Nada fica gravado nos cartões ou Tags',
        text: 'Tudo fica na nuvem, com total segurança e compatibilidade com a Lei Geral de Proteção de Dados (LGPD).'
      }, {
        icon: '/public-new/icons/tags/icon1.svg',
        title: 'Não precisa de aplicativo',
        text: 'A outra pessoa não precisa de nenhum app instalado para ver o seu cartão de visitas digital e salvar os seus contatos na agenda dela em segundos.'
      }],
      escolhaTag: [
        {
          name: 'Colortok Tag 26mm',
          value: 'R$ 59,90',
          link: '/#item1',
          options:
            [
              {
                color: '#171717',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#A7A9AC',
                img: '/public-new/img/ui/escolha_tag2.png'
              },
              {
                color: '#EAEAEA',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#C62127',
                img: '/public-new/img/ui/escolha_tag2.png'
              },
              {
                color: '#BAAED6',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#3658A8',
                img: '/public-new/img/ui/escolha_tag2.png'
              }
            ]
        },
        {
          name: 'Colortok Tag 26mm',
          value: 'R$ 59,90',
          link: '/#item2',
          options:
            [
              {
                color: '#171717',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#A7A9AC',
                img: '/public-new/img/ui/escolha_tag2.png'
              },
              {
                color: '#EAEAEA',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#C62127',
                img: '/public-new/img/ui/escolha_tag2.png'
              },
              {
                color: '#BAAED6',
                img: '/public-new/img/ui/escolha_tag1.png'
              },
              {
                color: '#3658A8',
                img: '/public-new/img/ui/escolha_tag2.png'
              }
            ]
        },
        {
          name: 'Customizado',
          value: 'Preço sob consulta',
          link: '/#item3',
          options:
            [
              {
                color: '',
                img: '/public-new/img/ui/escolha_tag3.png'
              }
            ]
        },
      ],
      recursos: [
        {
          label: 'PIX',
          title: 'Receba PIX direto na sua conta bancária, com total segurança e sem pagar nenhuma taxa por isso',
          text: 'Você ou a outra pessoa podem gerar o QR Code com o valor exato a ser transferido diretamente no seu perfil Unitok.',
          icon: '/public-new/icons/section/recurso_icon1.svg',
          img: '/public-new/img/section/recurso_img1.png'
        },
        {
          label: 'Link na bio',
          title: 'Sabe o link na Bio? ',
          text: 'Você pode colocar o link do seu perfil Unitok e todos os visitantes da sua rede social poderão acessar o seus contatos instantaneamente.',
          icon: '/public-new/icons/section/recurso_icon2.svg',
          img: '/public-new/img/section/recurso_img2.png'
        },
        {
          label: 'CRM',
          title: 'Baixe todos os contatos em uma planilha e use-a no seu software de CRM favorito',
          text: 'O cartão de visita digital Unitok é muito mais que um simples cartão. Ele é uma poderosa ferramenta de relacionamento e negócios para você e sua empresa.',
          icon: '/public-new/icons/section/recurso_icon3.svg',
          img: '/public-new/img/section/recurso_img3.png'
        }
        , {
          label: 'Contatos',
          title: 'Capture contatos e faça muitos negócios',
          text: 'Peça para a outra pessoa pressionar no botão "envie seus contatos" e tenha você também os contatos dela para conversar posteriormente.',
          icon: '/public-new/icons/section/recurso_icon4.svg',
          img: '/public-new/img/section/recurso_img4.png'
        }
      ]
    },
  }
}
