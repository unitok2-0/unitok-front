import Container from "../components-new/layout/container";
import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Image from "next/image";
import Link from "next/link";
import ListInfocards from "../components-new/ui/list-infocards";
import CardSimple from "../components-new/card/card-simple";
import CarouselSimple from "../components-new/ui/carousel-simple";
import VideoTutorial from "../components-new/ui/video-tutorial";
import EmpresasClientes from "../components-new/section/empresas-clientes";
import CarouselImageFade from "../components-new/ui/carousel-image-fade";
import BoxSmartphones from "../components-new/ui/box-smartphones";
import Encontros from "../components-new/section/encontros";
import { getPage } from '../lib-new/api';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { isImageExist } from "../components-new/helpers/check-image";
import RemoveHtml, { remove } from '../components-new/helpers/remove-html'

export const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : () => {};

export default function Index(props) {

  const page = props.page

  const [positionButtonDynamic, setPositionButtonDynamic] = useState(
    'bottom-23'
  );
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => setScrollTop(e.target.documentElement.scrollTop);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  useEffect(() => {
    if (scrollTop > 0) setPositionButtonDynamic('bottom-0');
    if (scrollTop === 0) setPositionButtonDynamic('bottom-23');
  }, [scrollTop]);

  const cssPositionButtonDynamic = `btn md:hidden sm:block fixed w-screen m-0 h-[52px] mr-20 transition delay-15 text-center flex justify-center items-center rounded-none -ml-[18px] -mt-[52px] z-20 bottom-0`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec2 = () => {
      gsap.to('.sec2 .frame1', {
        height: 0,
        duration: 0.8,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: '.sec2 .frame1',
          start: 'top 40%',
        },
      });
      gsap.to('.sec2 .frame2', {
        height: 0,
        duration: 0.8,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: '.sec2 .frame2',
          start: 'top 40%',
        },
      });
      gsap.from('.sec2 h3', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: '.sec2 h3',
          start: 'top 50%',
        },
      });
      gsap.to('.sec2 .frame3', {
        height: 0,
        duration: 0.8,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: '.sec2 .frame3',
          start: 'top 40%',
        },
      });
    };

    const sec3 = () => {
      gsap.from('.sec3 .btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.sec3 .btn',
          start: 'top 60%',
        },
      });
      gsap.from('.sec3 .boxSmart', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.sec3 .boxSmart',
          start: 'top 60%',
        },
      });
    };

    const sec4 = () => {
      gsap.from('.sec4 .box', {
        y: 30,
        opacity: 0,
        rotateX: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec4 .box',
          start: 'top 50%',
        },
      });
      gsap.from('.sec4 .box > figure', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec4 .box',
          start: 'top 50%',
        },
      });
      gsap.from('.sec4 .box > article > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec4 .box',
          start: 'top 50%',
        },
        stagger: 0.2,
      });
    };

    const sec5 = () => {
      gsap.from('.sec5 .list .item', {
        y: 30,
        opacity: 0,
        rotateX: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec5',
          start: 'top 50%',
        },
        stagger: 0.2,
      });
    };

    const sec8 = () => {
      gsap.from('.sec8 .bg-green-light', {
        y: 30,
        opacity: 0,
        rotateX: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec8',
          start: 'top 50%',
        },
      });
      gsap.from('.sec8 .bg-green-light > figure', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec8',
          start: 'top 50%',
        },
      });
      gsap.from('.sec8 .bg-green-light > div > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sec8',
          start: 'top 50%',
        },
        stagger: 0.2,
      });
    };

    // setTimeout(() => {
    //   sec2();
    //   sec3();
    //   sec4();
    //   sec5();
    //   sec8();
    // }, 1400);
  }, []);

  return <>
    <Layout classe="bg-gray-mid">
      <Head>
        <title>Home{SEO_TITLE}</title>
      </Head>

      <section className="sec1 md:pt-12 pt-24 h-[100vh]">
        <div className="block md:hidden pb-12 p-3">
          <h2 className="home-title md:typ-text-1 text-5xl text-center leading-tight  text-green-dark font-light">
          <Markdown>{page.Sec1Texto}</Markdown>
          </h2>
        </div>
        <div className="row-1 flex justify-end md:gap-x-16 gap-x-4">
          <figure className="shadow-xl flex h-full overflow-hidden rounded-lg">
            <Image
              src="/public-new/img/home/card_a.png"
              width={273}
              height={171}
              quality={100}
              alt="Imagem"
            ></Image>
          </figure>
          <figure className="shadow-xl flex h-full overflow-hidden rounded-lg">
            <Image
              src="/public-new/img/home/card_b.png"
              width={273}
              height={172}
              quality={100}
              alt="Imagem"
            ></Image>
          </figure>
          <figure className="shadow-xl flex h-full overflow-hidden rounded-lg">
            <Image
              src="/public-new/img/home/card_c.png"
              width={181}
              height={171}
              quality={100}
              alt="Imagem"
            ></Image>
          </figure>
        </div>
        <Container>
          <div className="row-2 md:pt-12 flex">
            <div className="w-6/12 hidden md:block">
              <h1 className="home-title typ-text-1 text-green-dark font-light xl:mt-0 mt-10 mb-10">
                <Markdown>{page.Sec1Texto}</Markdown>
              </h1>
              <Link href={page.Sec7.Botao.Link} target="_blank" className='btn'>

                {page.Sec7.Botao.Legenda}

              </Link>
            </div>
            <div className="md:w-6/12 w-full relative">
              <figure className="md:absolute md:-top-32 right-0 md:mb-0 -mb-28">
                <Image
                  src={isImageExist(page.Sec1Image1)}
                  width={561}
                  height={755}
                  quality={100}
                  alt="Imagem"
                ></Image>
              </figure>
            </div>
          </div>
          <div className="w-screen md:hidden sm:block absolute">
            <Link
              href={page.Sec7.Botao.Link}
              target="_blank"
              className={cssPositionButtonDynamic}>

              {page.Sec7.Botao.Legenda}

            </Link>
          </div>
        </Container>
      </section>

      <section className="sec2 bg-green-dark py-16">
        <Container>
          <div className="row-1 flex md:flex-row flex-col-reverse">
            <div className="md:w-6/12 w-full flex items-end md:justify-center justify-end">
              <div className="flex md:w-auto w-6/12 md:mt-0 mt-2">
                <figure className="overflow-hidden rounded flex relative">
                  <Image
                    src={isImageExist(page.Sec2Image2)}
                    width={288}
                    height={345}
                    quality={100}
                    alt="Imagem"
                  />
                  {/* <span className="frame1 absolute bottom-0 left-0 bg-green-black w-full h-full"></span> */}
                </figure>
              </div>
            </div>
            <div className="md:w-6/12 w-full md:block flex flex-col-reverse">
              <div className="flex justify-start md:pt-40 md:pb-24">
                <figure className="overflow-hidden rounded flex relative">
                  <Image
                    src={isImageExist(page.Sec2Image1)}
                    width={547}
                    height={403}
                    quality={100}
                    alt="Imagem"
                  />
                  {/* <span className="frame2 absolute bottom-0 left-0 bg-green-black w-full h-full"></span> */}
                </figure>
              </div>
              <h3 className="md:typ-text-2 text-2xlMax leading-snug md:mb-0 mb-8 text-green-light font-light">
                {page.Sec2Text1}
              </h3>
            </div>
          </div>

          <div className="row-2 flex md:flex-row flex-col md:mt-0 mt-2">
            <div className="md:w-4/12 w-full flex flex-row items-end justify-center relative ">
              <figure className="absolute md:w-auto w-40 md:-bottom-12 md:-right-4 bottom-0 right-[50vw]">
                <Image
                  src="/public-new/img/home/img6_b.png"
                  width={347}
                  height={351}
                  quality={100}
                  alt="Imagem"
                />
              </figure>
              <figure className="absolute md:w-auto w-40 md:bottom-14 md:-right-24 z-10 right-[42vw] bottom-10">
                <Image
                  src="/public-new/img/home/img6_a.png"
                  width={318}
                  height={320}
                  quality={100}
                  alt="Imagem"
                />
              </figure>
            </div>
            <div className="md:w-8/12 w-full">
              <div className="flex justify-start md:pt-40 md:pb-24">
                <figure className="overflow-hidden rounded flex relative">
                  <Image
                    src={isImageExist(page.Sec2Image3)}
                    width={576}
                    height={328}
                    quality={100}
                    alt="Imagem"
                  />
                  {/* <span className="frame3 absolute bottom-0 left-0 bg-green-black w-full h-full"></span> */}
                </figure>
              </div>
              <h3 className="md:typ-text-3 text-xl leading-normal md:mt-0 mt-8 text-white font-light max-w-3xl">
                {page.Sec2Text2}
              </h3>
            </div>
          </div>
        </Container>
      </section>

      <section className="sec3 md:pt-32 md:pb-32 py-14 bg-white">
        <Container>
          <div className="flex md:flex-row flex-col">
            <div className="md:w-5/12 w-full md:pr-20 mb-8">
              <span className="text-orange text-xxs tracking-wider font-bold">
                NOSSAS SOLUÇÕES
              </span>
              <h2 className="md:typ-text-2 text-2xlMax text-green-dark md:my-12 mt-8">
                {page.Sec3Text3}
              </h2>
              <div className="md:block hidden">
                <Link href={page.Sec3Btn1.Link} target="_blank" className="btn">

                  {page.Sec3Btn1.Legenda}

                </Link>
              </div>
            </div>
            <div className="md:w-7/12 w-full relative">
              <figure className="flex md:flex-row flex-col justify-end">
                <div className="flex md:flex-col flex-row md:justify-start justify-end gap-4 md:mr-8 md:mb-0 mb-4">
                  <Image src="/public-new/icons/ui/gadget4.svg" width={24} height={24} alt="Imagem"/>
                  <Image src="/public-new/icons/ui/gadget1.svg" width={24} height={24} alt="Imagem"/>
                </div>
                <picture className="relative h-auto 2xl:w-9/12 md:w-10/12">
                  <Image
                    src={isImageExist(page.Sec3Image1)}
                    width={600}
                    height={600}
                    layout="responsive"
                    alt="Imagem"
                  ></Image>
                </picture>
              </figure>
              <div className="boxSmart md:absolute relative md:w-64 w-full xl:-bottom-14 md:-bottom-24 xl:-left-10 md:-left-20">
                <BoxSmartphones cssClass="md:rounded-md rounded-t-none" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="sec4 md:py-24 py-8 bg-white">
        <Container>
          <ListInfocards data={page.Sec4Itens}></ListInfocards>

          <div className="flex md:flex-row flex-col justify-between md:mt-12 mt-24 md:gap-y-0 gap-y-16">
            <div className="box md:w-5/12 w-full bg-green-dark flex flex-col lg:flex-row p-8 rounded">
              <figure className="md:w-6/12 w-full lg-mb-40 md:-mt-24 -mt-36 md:-mb-20 md:-ml-4 -mb-8">
                <Image
                  src="/public-new/img/home/img8_a.gif"
                  width={272}
                  height={436}
                  quality={100}
                  alt="Imagem"
                ></Image>
              </figure>
              <article className="lg:w-6/12 w-full flex flex-col justify-center">
                <p className="text-sm text-green-light font-bold mb-2 leading-relaxed">
                  Cartões de visita em papel costumam ir para o lixo, gerando
                  resíduos tóxicos.
                </p>
                <p className="text-xs text-white font-light leading-relaxed">
                  Com o Unitok isso não acontece. Se os seus contatos mudarem,
                  basta editar e o seu cartão de visitas continua atualizado.{" "}
                </p>
              </article>
            </div>
            <div className="box md:w-5/12 w-full bg-green-dark flex flex-col lg:flex-row p-8 rounded">
              <div className="w-6/12 relative">
                <figure className="lg:absolute w-[374px] md:-top-8 -top-16 right-0 lg:mt-0 -mt-24 md:-ml-12 -ml-16 lg:ml-0">
                  <Image
                    src="/public-new/img/home/img8_b.png"
                    width={374}
                    height={274}
                    quality={100}
                    alt="Imagem"
                  ></Image>
                </figure>
              </div>
              <article className="lg:w-6/12 w-full flex flex-col justify-center">
                <p className="text-sm text-green-light font-bold mb-2 leading-relaxed">
                  Faz um PIX pra mim.
                </p>
                <p className="text-xs text-white font-light leading-relaxed">
                  Com o Unitok ficou mais fácil receber pagamentos com o PIX.
                  Basta a outra pessoa pressionar no botão PIX do seu cartão
                  de visita e entrar no app do banco. Pronto, tudo feito em
                  segundos.
                </p>
              </article>
            </div>
          </div>

          <div className="hidden w-full md:flex justify-center mt-20">
            <Link href={page.Sec4Botao.Link} className="btn" target="_blank">

              {page.Sec4Botao.Legenda}

            </Link>
          </div>
        </Container>
      </section>

      <section className="sec5 py-20">
        <Container>
          <div className="row-1 flex justify-between">
            <h2 className="xl:w-4/12 md:w-5/12 w-full md:typ-text-2 text-2xlMax leading-normal text-green-dark">
              {page.Sec5Texto}
            </h2>
            <div className="md:block hidden">
              <VideoTutorial></VideoTutorial>
            </div>
          </div>
          <div className="list row-2 md:flex hidden gap-x-14 my-20">
            {listComoFunciona(page.Sec5List)}
          </div>
          <div className='md:hidden block mt-16'>
            <CarouselSimple list={page.Sec5List}></CarouselSimple>
          </div>
          <div className="md:hidden block my-10">
            <VideoTutorial></VideoTutorial>
          </div>
          <div className="w-full flex justify-center">
            <Link href="/suporte" className="btn md:w-auto w-full">
              Ver tutoriais
            </Link>
          </div>
        </Container>
      </section>

      <section className="sec6 bg-green-dark relative overflow-hidden">
        <div className="_half-green md:block hidden bg-green-light w-[50%] h-full top-0 right-0 absolute"></div>
        <Container>
          <Encontros slides={page.Sec6List} />
        </Container>
      </section>

      <section className="sec7 md:py-32 py-14 bg-gray-light">
        <Container>
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="md:w-6/12 w-full">
              <CarouselImageFade gallery={page.Sec7GaleriaImagens} />
            </div>
            <article className="md:w-6/12 w-full md:p-12 lg:pr-12 pr-0 flex flex-col">
              <span className="md:block hidden text-xxs text-orange font-bold uppercase tracking-wide">
                {page.Sec7.Label}
              </span>
              <h2 className="md:typ-text-2 text-2xlMax text-green-dark my-7">
                <RemoveHtml>{page.Sec7.Titulo}</RemoveHtml>
              </h2>
              <p className="typ-p text-gray-dark font-light">
                <RemoveHtml>{page.Sec7.Texto}</RemoveHtml>
              </p>
              <div className="w-full md:flex hidden justify-start mt-12">
                <Link href={page.Sec7.Botao.Link} className="btn" target="_blank">

                  {page.Sec7.Botao.Legenda}

                </Link>
              </div>
            </article>
          </div>
          <div className="w-full mt-16">
            <EmpresasClientes data={props.clientes} ></EmpresasClientes>
          </div>
          <div className="w-full md:hidden flex justify-start mt-12">
            <Link href={page.Sec7.Botao.Link} className="btn w-full">
              {page.Sec7.Botao.Legenda}
            </Link>
          </div>
        </Container>
      </section>

      <section className="sec8 md:pt-16 md:pb-24 pb-12 bg-gray-light">
        <Container>
          <div className="bg-green-light rounded flex md:flex-row flex-col md:pt-14 md:pl-14 md:pb-14 p-8 pb-0 pr-0">
            <div className="md:w-6/12 w-full xl:pr-24 md:pr-4 pr-8 md:pb-0 pb-8">
              <h2 className="typ-text-2 text-green-dark">
                <RemoveHtml>{page.Sec8.Titulo}</RemoveHtml>
              </h2>
              <article className="typ-p text-gray-dark mt-10 mb-6 leading-loose">
                <Markdown>{page.Sec8.Texto}</Markdown>
              </article>
              <p className="typ-p text-green-dark font-bold">
                {page.Sec8.Label}
              </p>
            </div>
            <div className="md:w-6/12 w-full flex justify-end item relative">
              <figure className="md:absolute md:-bottom-14 flex">
                <Image
                  src={isImageExist(page.Sec8?.Imagem)}
                  width={547}
                  height={384}
                  quality={100}
                ></Image>
              </figure>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  </>;
}

export async function getStaticProps() {

  const page = await getPage('home')
  if (!page) return { notFound: true };
  const clientes = await getPage('clientes')
  return {
    props: {
      page,
      clientes
    },
    revalidate: 60, // In seconds
  };
}

function listComoFunciona(list) {
  const listCf = list.map((block, i) => {
    const item = {
      'image': (block?.Imagem) ? block?.Imagem.url : block.Icone.url,
      'text': block.Texto
    }
    return (
      <div className="item w-3/12">
        <CardSimple image={item.image} text={item.text} key={i}></CardSimple>
      </div>
    )
  });
  return listCf;
}