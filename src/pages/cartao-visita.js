import Layout from '../components-new/layout/layout'
import Head from 'next/head'
import { SEO_TITLE } from '../lib-new/constants'
import Container from '../components-new/layout/container'
import Image from 'next/image'
import Link from 'next/link'
import ListInfocards from '../components-new/ui/list-infocards'
import BoxGadgets from '../components-new/ui/box-gadgets'
import ImgHalf from '../components-new/ui/img-half'
import EscolhaTag from '../components-new/ui/escolha-tag'
import Carousel from '../components-new/ui/carousel'
import TabsContent from '../components-new/section/tabs-content'
import EmpresasClientes from '../components-new/section/empresas-clientes'
import EscolhaCartao from '../components-new/ui/escolha-cartao'
import CalculadorCartao from '../components-new/ui/calculadora-cartao'
import CarouselImageFade from '../components-new/ui/carousel-image-fade'

import { getPage } from '../lib-new/api';
import { isImageExist } from "../components-new/helpers/check-image";
import Markdown from "markdown-to-jsx";
import RemoveHtml from "../components-new/helpers/remove-html";

export default function CartaoVisita(props) {

  const page = props.page

  return <>
    <Layout mobileIconsColors={'orange'}>

      <Head>
        <title>Cartão Visita{SEO_TITLE}</title>
      </Head>

      <section className='md:pt-8 pt-20 overflow-hidden'>
        <Container>
          <div className='flex md:flex-row flex-col z-10 relative'>
            <article className='md:w-8/12 w-full md:py-0 py-6'>
              <h1 className='typ-text-2 text-green-dark'>
                <RemoveHtml>{page.Sec1.Titulo}</RemoveHtml>
              </h1>
            </article>
            <div className='md:w-4/12 w-full relative flex md:justify-end justify-start items-center my-8'>
              <BoxGadgets></BoxGadgets>
            </div>
          </div>
          <figure className='md:w-[130%] md:-ml-[16%] w-[130%] -ml-[15%] lg:-mt-16 z-0 relative'>
            <div className='hidden md:block'>
              <Image src={isImageExist(page.Sec1?.Imagem)}
                width={2445}
                height={1156}
                quality={100}
                priority="true"
              />
            </div>
            <div className='block md:hidden'>
              <figure className='w-[130%] -ml-[22%] lg:-mt-16 z-0 relative'>
                <Image src={isImageExist(page.Sec1?.ImagemMobile)} width={922} height={790} quality={100} priority="true" />
              </figure>
            </div>
          </figure>
        </Container>
      </section>

      <section className='md:-mt-20 -mt-14 md:pb-24 pb-14'>
        <Container>
          <article className='flex justify-end'>
            <h2 className='md:w-8/12 w-full md:text-3xl text-xl md:leading-relaxed leading-snug text-orange font-light'>
              <RemoveHtml>{page.Sec1.Texto}</RemoveHtml>
            </h2>
          </article>
        </Container>
      </section>
      
      <section className='mb-8'>
        <Container>
          <ListInfocards data={page.Sec2}></ListInfocards>
          <div className='w-full md:flex hidden justify-center mt-20'>
            <Link href={page.Sec2Btn.Link} target="_blank" className='btn'>
              {page.Sec2Btn.Legenda}
            </Link>
          </div>
        </Container>
      </section>


      <section className='md:py-24 py-14'>
        <Container>
          <h2 className='typ-text-2 text-green-dark md:w-8/12 w-full mx-auto md:text-center'>Recursos que nenhum cartão de visita impresso jamais terá</h2>
          <div className='mb:w-full md:w-8/12 w-full mx-auto'>
            <TabsContent data={page.Sec3Tabs}></TabsContent>
          </div>
        </Container>
      </section>

      <section className='md:mt-24 md:py-24 py-14 bg-green-dark'>
        <Container>
          <div className='flex mb:flex-row-reverse flex-col-reverse justify-between items-center'>
            <article className='mb:w-6/12 w-full md:p-12 flex flex-col'>
              <span className='text-xxs text-orange font-bold uppercase tracking-wider'>{page.Sec4.Legenda}</span>
              <h2 className='typ-text-2 text-green-light my-7'>
                <RemoveHtml>{page.Sec4.Titulo}</RemoveHtml>
              </h2>
              <div className='typ-p text-white font-light leading-relaxed'>
                <Markdown>{page.Sec4.Texto}</Markdown>
              </div>
            </article>
            <div className='mb:w-6/12 w-full flex justify-center'>
              <figure className='mb:w-full w-[300px] flex justify-center items-center'>
                <Image src={isImageExist(page.Sec4?.Imagem)} width={662} height={502} />
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className='py-12 md:py-24 bg-gray-mid'>
        <Container>
          <div className='w-full md:text-center text-left mb-16'>
            <span className='text-xxs text-orange font-bold'>{page.Sec5Header.Label} </span>
            <h2 className='typ-text-2 text-green-dark mb-6 mt-8'><RemoveHtml>{page.Sec5Header.Titulo}</RemoveHtml></h2>
            <article className='typ-p text-gray-dark md:w-8/12 w-full mx-auto leading-loose'><Markdown>{page.Sec5Header.Texto}</Markdown></article>
          </div>
          <Carousel bgWhite="true" list={props.diferenciais}></Carousel>
        </Container>
      </section>

      <section className='bg-green-dark relative  overflow-hidden'>
        <div className='mb:flex hidden _half-green bg-green-light w-[50%] h-full top-0 right-0 absolute'></div>
        <Container>
          <div className='flex mb:flex-row flex-col justify-between items-center'>
            <article className='mb:w-6/12 w-full md:p-12 py-8 flex flex-col md:pr-24 relative'>
              <h2 className='typ-text-2 text-green-light mb-8'><Markdown>{page.Sec6.Titulo}</Markdown></h2>
              <div className='typ-p text-white font-light w-10/12 leading-loose'><Markdown>{page.Sec6.Texto}</Markdown></div>
              <div className='w-full flex justify-start mt-12'>
                <Link href={page.Sec6.Botao.Link} target="_blank" className='btn'>
                  {page.Sec6.Botao.Legenda}
                </Link>
              </div>
            </article>
            <ImgHalf img={isImageExist(page.Sec6?.Imagem)}></ImgHalf>
          </div>
        </Container>
      </section>

      <section className='md:py-32 py-14 bg-gray-mid'>
        <Container>
          <div className='flex md:flex-row flex-col justify-between items-center'>
            <div className='md:w-6/12 w-full'>
              <CarouselImageFade gallery={page.Sec7Galeria} />
            </div>
            <article className='md:w-6/12 w-full md:p-12 flex flex-col'>
              <span className='text-xxs text-orange font-bold uppercase tracking-wide'>PRODUTOS PERSONALIZADOS</span>
              <h2 className='typ-text-2 text-green-dark my-7'>Você pode ter o Unitok com a marca do seu negócio.</h2>
              <p className='typ-p text-gray-dark font-light'>Ele fica lindo, e sua empresa bem na foto.</p>
              <div className='w-full md:flex hidden justify-start mt-12'>
                <Link
                  href="https://api.whatsapp.com/send?phone=5508004550800"
                  target="_blank"
                  className='btn'>
                  Pedir orçamento
                </Link>
              </div>
            </article>
          </div>
          <div className='w-full mt-16'>
            <EmpresasClientes data={props.clientes}></EmpresasClientes>
            <div className='w-full md:hidden flex justify-center mt-12'>
              <Link href={props.btnPrimary.link} className='btn w-full'>
                Pedir orçamento
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='md:py-24 py-14'>
        <Container>
          <div className='w-full md:text-center'>
            <h2 className='typ-text-2 text-green-dark mb-6 mt-8'>
            Crie seu cartão
            </h2>
            <p className='typ-p text-gray-dark md:w-6/12 w-full mx-auto leading-loose'>
            Você pode fazer o cartão Unitok totalmente customizado com a sua identidade visual ou escolher os modelos disponíveis aqui no site.
            </p>
          </div>
          <div className='flex md:flex-row flex-col justify-center md:my-16 my-24 mb:gap-8 md:gap-x-8 md:gap-y-16 gap-y-32'>
            {/* {page.Sec8Cartoes.map((item, i) => {
              return (
                <EscolhaCartao key={i} data={item} />
              );
            })} */}
            <EscolhaCartao key={1} data={page.Sec8Cartoes[page.Sec8Cartoes.length-1]} />
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <figure>
              <Image src="/public-new/icons/tags/icons_group.svg" width={147} height={36} quality={100} />
            </figure>
            <p className='my-6 text-sm font-bold text-green-dark mx-auto md:w-6/12 w-full text-center leading-loose'>Você pode usar o seu cartão de visita junto com outros dispositivos Unitok. Basta adicioná-los ao seu perfil e sair compartilhando.</p>
          </div>
        </Container>
      </section>

      <section className='md:pb-24 pb-14'>
        <Container>
          <div className='bg-green-light md:p-14 p-8 rounded-md'>
            <article className='md:mb-24 mb-12'>
              <h2 className='typ-text-2 text-green-dark w-10/12 mb-4'>Veja como você vai economizar optando pelos cartões de visita digital Unitok.</h2>
              <p className='typ-p text-gray-dark'>Tenha um Unitok e seja mais uma pessoa entre milhares de usuários a poupar as árvores do nosso planeta. </p>
            </article>
            <CalculadorCartao />
          </div>
        </Container>
      </section> 
    </Layout>
  </>;
}


export async function getStaticProps() {

  const page = await getPage('page-cartao-de-visita')
  if (!page) return { notFound: true };
  const diferenciais = await getPage('diferenciais')
  const clientes = await getPage('clientes')

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
          name: 'Classictok',
          value: 'R$ 59,90',
          link: 'https://shop.unitok.com',
          options: [
            {
              color: '',
              img: '/public-new/img/cartao-visita/img3_1.png'
            }
          ]
        },
        {
          name: 'Urbantok',
          value: 'R$ 59,90',
          link: 'https://shop.unitok.com',
          options: [
            {
              color: '',
              img: '/public-new/img/cartao-visita/img3_2.png'
            }
          ]
        },
        {
          name: 'Colortok',
          value: 'R$ 59,90',
          link: 'https://shop.unitok.com',
          options:
            [
              {
                color: '#171717',
                img: '/public-new/img/cartao-visita/card1.png'
              },
              {
                color: '#A7A9AC',
                img: '/public-new/img/cartao-visita/card2.png'
              },
              {
                color: '#EAEAEA',
                img: '/public-new/img/cartao-visita/card3.png'
              },
              {
                color: '#C62127',
                img: '/public-new/img/cartao-visita/card4.png'
              },
              {
                color: '#BAAED6',
                img: '/public-new/img/cartao-visita/card5.png'
              },
              {
                color: '#3658A8',
                img: '/public-new/img/cartao-visita/card6.png'
              }
            ]
        },
        {
          name: 'Customizado',
          value: 'Preço sob consulta',
          link: 'https://shop.unitok.com',
          btn: {
            label: 'Pedir orçamento',
            link: 'https://api.whatsapp.com/send?phone=551940420134'
          },
          options: [
            {
              color: '',
              img: '/public-new/img/cartao-visita/img6.png'
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
      ],
      cartoesGallery: [
        { img: '/public-new/img/cartao-visita/Unitok_personalizados_cartao1.png' },
        { img: '/public-new/img/cartao-visita/Unitok_personalizados_cartao2.png' },
        { img: '/public-new/img/cartao-visita/Unitok_personalizados_cartao3.png' },
        { img: '/public-new/img/cartao-visita/Unitok_personalizados_cartao4.png' },
        { img: '/public-new/img/cartao-visita/Unitok_personalizados_cartao5.png' }
      ],
      page,
      diferenciais,
      clientes
    },
    revalidate: 60, // In seconds
  }
}