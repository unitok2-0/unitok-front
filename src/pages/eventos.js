import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import HeroImgText from "../components-new/section/hero-img-text";
import Container from "../components-new/layout/container";
import Image from "next/image";
import Link from "next/link";
import CarouselEventos from "../components-new/ui/carousel-eventos";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";

import { getPage } from '../lib-new/api';
import RemoveHtml from "../components-new/helpers/remove-html";
import Markdown from "markdown-to-jsx";
import { isImageExist } from "../components-new/helpers/check-image";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };


export default function Index(props) {

  const page = props.page

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec1 = () => {
      gsap.from(".sec1 figure", {
        x: -30,
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec1",
          start: "top 30%",
        },
      });
      gsap.from(".sec1 article *", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".sec1",
          start: "top 30%",
        },
        stagger: 0.2,
      });
    };

    const sec4 = () => {
      gsap.from(".box-green", {
        y: 30,
        opacity: 0,
        rotateX: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec4",
          start: "top 35%",
        },
      });
      gsap.from(".box-green > figure", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec4",
          start: "top 35%",
        },
      });
      gsap.from(".box-green > div > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sec4",
          start: "top 35%",
        },
        stagger: 0.2,
      });
    };

    // setTimeout(() => {
    //   sec1();
    //   sec4();
    // }, 1400);
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Eventos{SEO_TITLE}</title>
        </Head>

        <HeroImgText
          img={isImageExist(page.Hero?.Imagem)}
          label={page.Hero?.Label}
          title={page.Hero?.Titulo}
          text={page.Hero?.Texto}
          btn_label={page.Hero?.Botao?.Legenda}
          btn_link={page.Hero?.Botao?.Link}
          btn_externo={page.Hero?.Botao?.NovaAba}
        />

        <div className="md:mb-16"></div>

        <section className="sec1 md:py-24 py-14 bg-green-dark">
          <Container>
            <div className="flex md:flex-row flex-col">
              <figure className="md:w-6/12 w-full">
                <Image
                  src="/public-new/img/eventos/img1.png"
                  width={589}
                  height={528}
                  quality={100}
                />
              </figure>
              <article className="md:w-6/12 w-full flex flex-col items-center justify-center md:p-24 pt-12">
                <h2 className="md:typ-text-2 text-2xlMax leading-tight text-green-light mb-8">
                  <RemoveHtml>{page.Sec2?.Titulo}</RemoveHtml>
                </h2>
                <div className="typ-p text-white leading-relaxed">
                  <Markdown>{page.Sec2?.Texto}</Markdown>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <section className="sec2 md:py-32 py-14 bg-gray-mid">
          <Container>
            <div className="flex md:flex-row flex-col justify-between md:gap-y-0 gap-y-14">
              {page.Sec3?.map((item) => {
                return (
                  <div className="md:w-5/12 w-full">
                    <figure className="flex rounded-md overflow-hidden">
                      <picture className="w-full">
                        <Image
                          src={isImageExist(item?.Imagem)}
                          width={519}
                          height={335}
                          quality={100}
                          layout="responsive"
                        />
                      </picture>
                    </figure>
                    <article>
                      <h3 className="typ-text-4 text-green-dark font-bold mt-8 mb-2">
                        {item?.Titulo}
                      </h3>
                      <div className="typ-p text-gray-dark leading-relaxed">
                        <Markdown>{item?.Texto}</Markdown>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>

        <section className="sec3 py-12 md:pt-24 md:pb-0">
          <Container>
            <div className="w-full md:text-center text-left mb-16">
              <span className="text-xxs text-orange font-bold">{page.Sec4Head?.Label}</span>
              <h2 className="typ-text-2 text-green-dark mb-6 mt-8"><RemoveHtml>{page.Sec4Head?.Titulo}</RemoveHtml></h2>
              <p className="typ-p text-gray-dark md:w-8/12 w-full mx-auto leading-loose"><RemoveHtml>{page.Sec4Head?.Texto}</RemoveHtml></p>
            </div>
            <CarouselEventos list={page.Sec4List} />
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {

  const page = await getPage('page-eventos')
  if (!page) return { notFound: true };

  return {
    props: {
      btnPrimary: {
        label: "Agendar demonstração",
        link: "https://calendly.com/adbat/unitok-solucoes",
      },
      hero: {
        img: "/public-new/img/eventos/hero.jpg",
        label: "EVENTOS",
        title: "Aproveite ao máximo todos os leads",
        text:
          "Vai participar de uma feira de negócios, congresso, organizar um evento da sua empresa ou ter um estande em algum lugar que tenha bastante gente passando? Temos a solução ideal para capturar leads de forma instantânea e organizada.",
      },
      page
    },
    revalidate: 60, // In seconds
  };
}