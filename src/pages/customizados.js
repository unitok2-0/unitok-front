import Layout from '../components-new/layout/layout'
import Head from 'next/head'
import { SEO_TITLE } from '../lib-new/constants'
import Container from '../components-new/layout/container'
import Image from 'next/image'
import BoxGadgets from '../components-new/ui/box-gadgets'
import CardInfo from '../components-new/card/card-info'
import CardSimple from '../components-new/card/card-simple'
import EmpresasClientes from '../components-new/section/empresas-clientes'
import Btn from '../components-new/ui/btn'
import Link from 'next/link'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import CarouselVideoSimple from '../components-new/ui/carousel-simple-video'

export const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => { };

import { getPage } from '../lib-new/api';
import { isImageExist } from "../components-new/helpers/check-image";
import Markdown from "markdown-to-jsx";
import RemoveHtml from "../components-new/helpers/remove-html";

export default function Tags(props) {

  const [designOption, setDesignOption] = useState('template')
  const [isMobile, setIsMobile] = useState(false)
  const videos = ['https://drive.google.com/file/d/1k2PL_-Doc0aKPunPFBJAULXewQAnJXfS/preview',
    'https://drive.google.com/file/d/1dqoK46j4ulcKvDwO3VUS5g2AqjKCDJKv/preview',
    'https://drive.google.com/file/d/1RGfR0DQaWMM6hb_yqHVVESlb0OLfeb2K/preview']

  const page = props.page

  useEffect(() => {
    if (window.screen.width <= 420) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const animation = () => {
      setTimeout(() => {


        // SEC 2
        gsap.from('.sec3 h2, .sec3 p', {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: '.sec3',
            start: "top 40%",
          }
        });
        gsap.from('.btn-default', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: '.sec3',
            start: "top 30%",
          }
        });

        // SEC 4
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec4 .box',
            start: 'top 10%',
            toggleActions: 'play none none reverse',
            markers: false,
            pin: true,
            scrub: true,
          },
        });

        tl
          .from('.sec4 .step1 figure', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step3 article', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step2 figure', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step3 figure', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step4 article', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step4 figure', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step5 figure', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })
          .from('.sec4 .step5 article', {
            y: -10,
            opacity: 0,
            ease: "expo.out",
            autoAlpha: 0,
          })



        // SEC 6
        gsap.from('.box-green', {
          y: 30,
          opacity: 0,
          rotateX: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.sec6',
            start: "top 45%",
          }
        });
        gsap.from('.box-green > figure', {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: .2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.sec6',
            start: "top 45%",
          }
        });
        gsap.from('.box-green > div > *', {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: .2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.sec6',
            start: "top 45%",
          },
          stagger: 0.2
        });

      }, 1400);
    }
  }, []);

  function handleChangeDesignOption() {
    if (designOption === 'template')
      setDesignOption('designer')
    else if (designOption === 'designer')
      setDesignOption('template')
  }

  return (
    <>
      <Layout mobileIconsColors={'orange'}>

        <Head>
          <title>Customizados{SEO_TITLE}</title>
        </Head>

        <section className='sec1 md:pt-8 pt-20 pb-[90px] flex flex-col bg-[#FAFAFA]'>
        <Image src={isImageExist(page.Sec1?.Imagem)} width={1200} height={480} quality={100} />
          <Container>
            <div className=' gap-6'>
                <h1 className=' typ-text-2 text-green-dark max-w-sm text-left'><RemoveHtml>Unitok com a sua marca.</RemoveHtml></h1>
              <p className='text-sm text-[#646B67] max-w-xl mt-6'>Se você representa um negócio e deseja um Unitok que tenha a sua marca, nós temos um canal exclusivo para te atender.</p>
            </div>
          </Container>
        </section>

        <section className='sec8 flex flex-col gap-14 justify-center items-center md:w-full my-28'>
          <div className='flex items-start justify-between flex-wrap md:w-4/5 w-11/12 md:gap-28 gap-14'>
            <div className='md:w-5/12 w-full'>
              <CardInfo
                icon="/public-new/img/customizados/graphIcon.svg"
                title="Relatórios"
                text="Veja em tempo real a performance do seu time. Períodos em que foram captados maior número de leads, os principais responsáveis por essa captação e os dados de contato de cada lead. "
              />
            </div>
            <div className='md:w-5/12 w-full'>
              <CardInfo
                icon="/public-new/img/customizados/editIcon.svg"
                title="Edite o perfil individual de cada usuário do seu time"
                text="Com o Unitok para empresas você tem acesso a nossa plataforma digital exclusiva que permite o bloqueio ou desbloqueio de botões no perfil pessoal de cada usuário do dispositivo."
              />
            </div>
          </div>

          <div className='flex items-start justify-between mt-10 flex-wrap md:w-4/5 w-11/12 md:gap-28 gap-14'>
            <div className='md:w-5/12 w-full'>
              <CardInfo
                icon="/public-new/img/customizados/resetIcon.svg"
                title="Resete ou bloqueie o dispositivo de qualquer usuário  quando quiser"
                text="Você tem total controle do uso de todos os dispositivos. Caso seja necessário um dispositivo ser reutilizado por um outro usuário, basta resetá-lo que o novo usuário crie um novo cadastro."
              />
            </div>
            <div className='md:w-5/12 w-full flex items-start justify-start'>
              <CardInfo
                icon="/public-new/img/customizados/customizeIcon.svg"
                title="Deixe o perfil Unitok do seu time com a cara da sua empresa"
                text="Aplique o logotipo e a cor da sua empresa no perfil de todos os usuários para que fiquem todos padronizados com a cara da empresa."
              />
            </div>
          </div>
        </section>

        <section className='sec8 flex flex-col items-center md:mt-8'>
          <h3 className='md:text-5xl text-2xl text-center leading-tight text-green-dark md:w-3/4 w-11/12 mb-10'>
            <RemoveHtml>Duas maneiras de fazer uma arte exclusiva para o dispositivo Unitok da sua empresa</RemoveHtml>
          </h3>

          <div className='bg-gray-light flex flex-col items-center w-[84%] md:h-[650px] h-[550px] rounded-[10px] m-10'>
            <div className='w-full md:p-14 py-8 px-3'>
              <button
                onClick={handleChangeDesignOption}
                className={designOption === 'template' ? `w-[50%] border-b-[3px] border-b-orange text-orange py-4 text-lg font-bold` : 'w-[50%] border-b-[3px] border-b-[#909692] py-4 text-[#909692] text-lg font-bold'}
              >
                {isMobile ? 'Gabarito' : '1. Utilize nosso gabarito'}
              </button>
              <button
                onClick={handleChangeDesignOption}
                className={designOption === 'designer' ? `w-[50%] border-b-[3px] border-b-orange text-orange py-4 text-lg font-bold` : 'w-[50%] border-b-[3px] border-b-[#909692] py-4 text-[#909692] text-lg font-bold'}
              >
                {isMobile ? 'Designer' : '2. Contrate nosso designer'}
              </button>
            </div>
            {
              designOption === 'template' && (
                <>
                  <article className='flex justify-start md:mt-4 py-3 max-w-[700px] text-center z-10'>
                    <p className=' text-gray-dark text-sm'>E não é só colocar o logotipo. É uma customização completa. Nós te passamos todas as instruções para que que você mesmo elabore a arte dos seus cartões e tags. </p>
                  </article>

                  <picture className='mt-[-40px]'>
                    <Image src={isImageExist(page.Sec5?.Imagem)} width={459} height={316} quality={100} />
                  </picture>
                </>
              )
            }
            {
              designOption === 'designer' && (
                <>
                  <article className='flex justify-start md:mt-4 py-3 max-w-[700px] text-center z-10'>
                    <p className=' text-gray-dark text-sm'>Se você não tiver quem faça a sua arte, nós temos um serviço especial para te atender.</p>
                  </article>

                  <picture className='mt-16 mb-[94px] md:p-0 p-2'>
                    <Image src="/public-new/img/customizados/Group_1578.svg" width={770} height={138} quality={100} />
                  </picture>
                </>
              )
            }
            <Btn label="Acesse o gabarito" link="https://drive.google.com/file/d/110DnVW-Fn-uty3W21HC-GQoXiIuh6TuF/view" externo="1" cssClass="px-12" />
          </div>
        </section>

            {/* to do, add vidieos on strapi */}
        <section className='sec2 pb-20'>
          <Container>
              <h3 className='md:text-5xl text-2xl text-center leading-tight text-green-dark w-full md:mt-28 md:mb-20 mt-20 mb-10'>
                <RemoveHtml>Empresas que já estão usando Unitok</RemoveHtml>
              </h3>
              {/* <CarouselVideoSimple list={page.Sec7?.Empresas}/> */}
            <EmpresasClientes data={props.clientes}></EmpresasClientes>
          </Container>
        </section>

        {/* USAR ESSE EXEMPLO PARA OS 4 ITENS DE FUNCIONALIDADES */}
        {/* <section className='sec5 md:py-24 py-14'>
          <Container>
            <div className='flex md:flex-row flex-col justify-between md:gap-y-0 gap-y-14'>
              {listItens(page.Sec4_ListItens)}
            </div>
            <div className='w-full md:flex hidden justify-center mt-12'>
              <Btn label={page.Sec4_Botao.Legenda} link={page.Sec4_Botao.Link} externo="1" />
            </div>
          </Container>
        </section> */}
      </Layout>
    </>
  )
}


export async function getStaticProps() {

  const page = await getPage('page-customizados')
  if (!page) return { notFound: true };
  const clientes = await getPage('clientes')

  return {
    props: {
      btnPrimary: {
        label: 'Pedir orçamento',
        link: 'https://api.whatsapp.com/send?phone=5508004550800'
      },
      infoCards: [{
        icon: '/public-new/icons/customizados/icon4.svg',
        title: 'Um excelente brinde',
        text: 'Além de entregar para os colaboradores da sua empresa, fazer cartões e tags customizados com sua marca é uma excelente forma de presentear clientes, prospects, parceiros de negócios, amigos, familiares e todas aquelas pessoas que são importantes para o seu negócio. '
      }, {
        icon: '/public-new/icons/customizados/icon5.svg',
        title: 'Condições super especiais',
        text: 'Se você tiver uma demanda superior a 200 tags ou cartões, nós temos condições comerciais especiais, com descontos progressivos e facilidades de pagamento. Consulte o nosso time.'
      }],
      page,
      clientes
    },
    revalidate: 60, // In seconds
  }
}

function listItens(list) {
  const listItens = list.map((block, i) => {
    const item = {
      'icon': block?.Imagem.url,
      'title': block.Titulo,
      'text': block.Texto
    }
    return (
      <div className='md:w-5/12 w-full' key={i}>
        <CardInfo
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      </div>
    )
  })
  return listItens
}

function listComoFunciona(list) {
  const listCf = list.map((item, i) =>
    <div className='w-3/12'>
      <CardSimple image={item.image} text={item.text} key={item} ></CardSimple>
    </div>
  )
  return listCf
}