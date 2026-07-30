import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import HeroImgText from "../components-new/section/hero-img-text";
import Container from "../components-new/layout/container";
import Image from "next/image";
import Link from "next/link";
import ListInfocards from "../components-new/ui/list-infocards";
import Carousel from "../components-new/ui/carousel";
import CardGreen from "../components-new/card/card-green";
import BoxSmartphones from "../components-new/ui/box-smartphones";
import { getPage } from '../lib-new/api';
import { isImageExist } from "../components-new/helpers/check-image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import RemoveHtml from "../components-new/helpers/remove-html";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function Lojas(props) {

  const page = props.page

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec5 = () => {
      gsap.from(".box-green", {
        y: 30,
        opacity: 0,
        rotateX: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec5",
          start: "top 60%",
        },
      });
      gsap.from(".box-green > figure", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec5",
          start: "top 60%",
        },
      });
      gsap.from(".box-green > div > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec5",
          start: "top 60%",
        },
        stagger: 0.2,
      });
    };

    // setTimeout(() => {
    //   sec5();
    // }, 1400);
  }, []);

  return <>
    <Layout>
      <Head>
        <title>Lojas{SEO_TITLE}</title>
      </Head>

      <HeroImgText
        img={page.Sec1?.Imagem.url}
        label={page.Sec1.Label}
        title={page.Sec1.Titulo}
        text={page.Sec1.Texto}
        btn_label={page.Sec1.Botao.Legenda}
        btn_link={page.Sec1.Botao.Link}
        btn_externo={page.Sec1.Botao.NovaAba}
      />

      <section className="md:py-28 py-14">
        <Container>
          <h2 className="mb:w-8/12 w-12/12 typ-text-2 text-green-dark">
            <Markdown>{page.Sec2.Titulo}</Markdown>
          </h2>
        </Container>
      </section>

      <section className="md:pb-24 py-10">
        <Container>
          <div className="flex md:flex-row flex-col">
            <div className="md:w-7/12 w-full relative">
              <figure className="flex md:flex-row flex-col-reverse">
                <picture className="md:w-10/12 w-full h-auto">
                  <Image
                    src={isImageExist(page.Sec2?.Imagem)}
                    width={600}
                    height={600}
                    layout="responsive"
                  ></Image>
                </picture>
                <div className="flex md:flex-col flex-row md:justify-start justify-end gap-4 mb:ml-8 md:ml-4 mb-4">
                  <Image
                    src="/public-new/icons/ui/gadget4.svg"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/public-new/icons/ui/gadget1.svg"
                    width={24}
                    height={24}
                  />
                </div>
              </figure>
              <div className="md:absolute relative md:w-64 w-full mb:-bottom-16 md:-bottom-32 mb:right-0 md:-right-12 ">
                <BoxSmartphones cssClass="md:rounded-md rounded-t-none" />
              </div>
            </div>
            <div className="md:w-5/12 w-full pt-12 mb:pl-0 md:pl-8">
              <article className="typ-p text-gray-dark">
                <Markdown>
                  {page.Sec2.Texto}
                </Markdown>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="md:my-24 my-14">
        <Container>
          <ListInfocards data={page.Sec3}></ListInfocards>

          <div className="w-full flex justify-center mt-20">
            <Link href={page.Sec3_Botao.Link} className="btn">
              {page.Sec3_Botao.Legenda}
            </Link>
          </div>
        </Container>
      </section>

      <section className="my-24">
        <Container>
          <div className="w-full md:text-center text-left mb:mb-0 mb-20">
            <span className="text-xxs text-orange font-bold">
              {page.Sec4_Header.Label}
            </span>
            <h2 className="typ-text-2 text-green-dark mb-6 mt-8">
              <RemoveHtml>{page.Sec4_Header.Titulo}</RemoveHtml>
            </h2>
            <article className="typ-p text-gray-dark">
              <Markdown>{page.Sec4_Header.Texto}</Markdown>
            </article>
          </div>

          <Carousel list={props.diferenciais}></Carousel>

        </Container>
      </section>

      <section className="md:py-24 py-14 bg-green-dark">
        <Container>
          <div className="text-center mb-24">
            <h2 className="typ-text-2 text-green-light mb-6">
              <RemoveHtml>{page.Sec6_Header.Titulo}</RemoveHtml>
            </h2>
            <article className="typ-p text-white font-light">
              <Markdown>{page.Sec6_Header.Texto}</Markdown>
            </article>
          </div>
          <div className="flex mb:flex-nowrap flex-wrap mb:gap-x-2 mb:gap-y-0 gap-8 justify-center">
            {
              page.Sec6_ListItens.map((item) => {

                return (
                  <div className="item mb:w-4/12 md:w-5/12 w-full">
                    <CardGreen
                      icon={isImageExist(item.Icone)}
                      iconHover={isImageExist(item.IconeHover)}
                      title={item.Titulo}
                      link={item.Link ? item.Link : '#'}
                    />
                  </div>
                )
              })
            }
          </div>
        </Container>
      </section>
    </Layout>
  </>;
}

export async function getStaticProps() {

  const page = await getPage('page-lojas')
  if (!page) return { notFound: true };
  const diferenciais = await getPage('diferenciais')

  return {
    props: {
      hero: {
        img: "/public-new/img/lojas/hero.jpg",
        label: "PONTOS DE VENDA (PDV)",
        title: "A solução ideal para coletar leads para o seu PDV.",
        text:
          "Use a plataforma Unitok para estender o alcance do seu PDV (Ponto de Venda). Muita gente passa na frente do seu comércio e não entra. Colocando um adesivo Unitok bem visível na entrada, as suas chances de fazer negócios vão aumentar muito.",
        btn_label: "Quero no meu PDV",
        btn_link: "https://calendly.com/adbat/unitok-solucoes",
      },
      btnPrimary: {
        label: "Quero no meu PDV",
        link: "/",
      },
      infoCards: [
        {
          icon: "/public-new/icons/lojas/icon1.svg",
          title:
            "Quando o cliente está dentro da loja você pode oferecer ainda mais",
          text:
            "Você pode configurar outros adesivos Unitok dentro da loja para mostrar produtos que não estão ali no estoque da loja no momento mas que podem ser entregues na casa dele e uma séria de outras possibilidades de interação.",
        },
        {
          icon: "/public-new/icons/lojas/icon3.svg",
          title: "Tem um produto que é complexo de explicar?",
          text:
            "Cole um adesivo Unitok perto dele e ofereça uma experiência estendida, com um vídeo tutorial, por exemplo.",
        },
        {
          icon: "/public-new/icons/lojas/icon2.svg",
          title:
            "Peça para os seus clientes fazer check-in na sua loja e ofereça brindes e mimos",
          text:
            "Se o visitante já tiver um perfil Unitok, ele vai apertar o botão check-in e entrar automaticamente na sua base de cadastros. Se ainda não tiver, vai fazer um rápido cadastro em menos de 1 minuto e apertar check-in.",
        },
        {
          icon: "/public-new/icons/lojas/icon4.svg",
          title:
            "Faça o seu cliente imaginar o que poderá ter ao levar o seu produto",
          text:
            "Se você vende batedeira, pode mostrar receitas incríveis para fazer com ela. Se vende celular, mostre todos os recursos do modelo que tem na sua loja. A ideia é essa. Com a solução Unitok PDV você aumenta o potencial das suas vendas e oferece uma experiência digital mesmo dentro da sua loja física.",
        },
      ],
      page,
      diferenciais
    },
    revalidate: 60, // In seconds
  };
}
