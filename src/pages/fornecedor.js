import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Container from "../components-new/layout/container";
import Image from "next/image";
import Link from "next/link";
import BtnFixedMobile from "../components-new/ui/btn-fixed-mobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";
import { getPage } from '../lib-new/api';
import { isImageExist } from "../components-new/helpers/check-image";
import RemoveHtml from "../components-new/helpers/remove-html";
import Markdown from "markdown-to-jsx";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function Tags(props) {

  const page = props.page

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(".box-green", {
          y: 30,
          opacity: 0,
          rotateX: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sec2",
            start: "top 20%",
          },
        });
        gsap.from(".box-green > figure", {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sec2",
            start: "top 20%",
          },
        });
        gsap.from(".box-green > div > *", {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sec2",
            start: "top 20%",
          },
          stagger: 0.2,
        });
      }, 1400);
    }

  }, []);

  return <>
    <Layout headerWhite={true} mobileIconsColors={"white"}>
      <Head>
        <title>Fornecedor{SEO_TITLE}</title>
      </Head>

      <section className="sec1 z-0 relative md:-mt-36 bg-green-dark md:h-[100vh] overflow-hidden">
        <figure className="z-0 block md:absolute relative top-0 left-0 right-0 w-full ">
          <picture className="md:flex w-full h-full hidden z-0 relative">
            {page.Sec1?.Imagem &&
              <Image
                src={isImageExist(page.Sec1?.Imagem)}
                width={2160}
                height={1153}
                objectFit="cover"
                quality={80}
                priority="true"
              />
            }
          </picture>
          <picture className="md:hidden w-full flex">
            {page.Sec1?.ImagemMobile &&
              <Image
                src={isImageExist(page.Sec1?.ImagemMobile)}
                width={900}
                height={900}
                objectFit="cover"
                quality={80}
                priority="true"
              />
            }
          </picture>
          <div className="h-60 bg-gradient-to-t from-green-dark to-transparent z-10 absolute bottom-0 w-full"></div>
        </figure>

        <div className="flex z-20 md:items-center h-full relative">
          <div className="mb:w-7/12 md:w-5/12 w-0"></div>
          <div className="mb:w-4/12 md:w-7/12 w-full md:px-0 px-5">
            <span className="text-xs font-bold text-orange tracking-wider">{page.Sec1.Label}</span>
            <h1 className="mb:typ-text-2 md:text-4xl text-2xlMax  text-green-light mt-12 mb-8">{page.Sec1.Titulo}</h1>
            <p className="typ-p text-white font-light mb-12">{page.Sec1.Texto}</p>
            <BtnFixedMobile
              label={page.Sec1.Botao.Legenda}
              link={page.Sec1.Botao.Link}
            ></BtnFixedMobile>
          </div>
        </div>

        <div className="h-60 bg-gradient-to-t from-green-dark to-transparent z-10 absolute bottom-0 w-full hidden md:block"></div>
      </section>

      <section className="sec2 bg-green-dark py-16">
        <Container>
          <div className="w-full">
            <h2 className="md:typ-text-2 text-2xlMax text-white md:text-center mb-8">
              <RemoveHtml>{page.Sec2Head.Titulo}</RemoveHtml>
            </h2>
            <article className="typ-p text-white md:text-center font-light">
              <Markdown>{page.Sec2Head.Texto}</Markdown>
            </article>
          </div>
          <div className="box-green bg-green-light rounded flex md:flex-row flex-col md:p-14 py-14 px-8 mt-24">
            <figure className="md:w-4/12 w-full flex justify-center md:pr-14 md:mb-0 mb-12">
              {page.Sec2Bloco?.Imagem &&
                <Image
                  src={isImageExist(page.Sec2Bloco?.Imagem)}
                  width={127}
                  height={185}
                  quality={100}
                ></Image>
              }
            </figure>
            <div className="md:w-8/12 w-full">
              <h3 className="md:typ-text-2 text-2xlMax text-green-dark">
                <RemoveHtml>{page.Sec2Bloco.Titulo}</RemoveHtml>
              </h3>
              <article className="typ-p text-gray-dark mt-8 mb-12 leading-loose">
                <Markdown>{page.Sec2Bloco.Texto}</Markdown>
              </article>
              <Link
                href={page.Sec2Bloco.Botao.Link}
                className="btn md:float-left md:w-auto flex w-full justify-center">

                {page.Sec2Bloco.Botao.Legenda}

              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  </>;
}

export async function getStaticProps() {
  const page = await getPage('page-fornecedor')
  if (!page) return { notFound: true };

  return {
    props: {
      btnPrimary: {
        label: "Pedir orçamento",
        link: "mailto:contato@unitok.com",
      },
      page
    },
    revalidate: 60, // In seconds
  };
}
