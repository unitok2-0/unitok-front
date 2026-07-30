import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Container from "../components-new/layout/container";
import Image from "next/image";
import Link from "next/link";
import ImgHalf from "../components-new/ui/img-half";
import BtnFixedMobile from "../components-new/ui/btn-fixed-mobile";
import { getPage } from '../lib-new/api';
import Markdown from 'markdown-to-jsx';
import { isImageExist } from "../components-new/helpers/check-image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";
export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function Tags(props) {

  const page = props.page

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec2 = () => {
      gsap.to(".sec2 .frame", {
        height: 0,
        duration: 0.8,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec2",
          start: "top 20%",
        },
      });
      gsap.from(".sec2 article", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec2",
          start: "top 20%",
        },
      });
    };
    const sec3 = () => {
      gsap.from(".sec3 h2", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec3",
          start: "top 40%",
        },
      });
    };
    const sec4 = () => {
      gsap.from(".sec4 h3", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec4",
          start: "top 40%",
        },
        stagger: 0.2,
      });
      gsap.from(".sec4 p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "circ.out",
        scrollTrigger: {
          trigger: ".sec4",
          start: "top 40%",
        },
      });
    };

    setTimeout(() => {
      // sec2();
      // sec3();
      // sec4();
    }, 1400);
  }, []);

  return (
    <>
      <Layout
        headerWhite={true}
        mobileIconsColors={"white"}
        classe={"bg-green-dark"}
      >
        <Head>
          <title>Quem Somos{SEO_TITLE}</title>
        </Head>

        <section className="sec1 pt-40 pb-20 w-full flex bg-green-dark">
          <Container>
            <div className="flex justify-end md:pr-20">
              <figure className="w-3/12 md:w-1/12">
                <Image
                  src={isImageExist(page.Sec1?.Imagem)}
                  width={104}
                  height={76}
                  layout="responsive"
                />
              </figure>
            </div>
            <div className="flex flex-col pt-12">
              <h1 className="md:text-7xl md:leading-snug text-4xl text-green-light font-bold mb-4">
                <Markdown>{page.Sec1.Titulo}</Markdown>
              </h1>
              <h2 className="md:text-7xl md:leading-snug text-4xl text-white font-light leading-tight w-full md:w-10/12">
                <Markdown>{page.Sec1.Texto}</Markdown>
              </h2>
            </div>
            <div className="md:hidden flex">
              <BtnFixedMobile label="Pedir orçamento" link="https://api.whatsapp.com/send?phone=5508004550800" />
            </div>
          </Container>
        </section>

        <section className="sec2 md:pb-24 pb-14 w-full bg-white">
          <Container>
            <div className="flex md:flex-row flex-col-reverse">
              <figure className="md:w-6/12 w-full md:rounded-b-md rounded-r-md overflow-hidden -ml-6">
                <picture className="w-full relative rounded-b overflow-hidden">
                  <Image
                    src={isImageExist(page.Sec2?.Imagem)}
                    width={691}
                    height={533}
                    layout="responsive"
                  />
                </picture>
              </figure>
              <article className="md:w-6/12 w-full flex items-end justify-center md:py-0 py-12">
                <h3 className="md:w-7/12 w-full md:typ-text-2 text-2xlMax md:leading-normal leading-tight text-orange">
                  {page.Sec2.Titulo}
                </h3>
              </article>
            </div>
          </Container>
        </section>

        <section className="sec3 w-full bg-white">
          <Container>
            <div className="flex flex-col">
              <h2 className="md:text-7xl md:leading-tight text-5xl text-green-dark font-light leading-tight md:w-8/12 w-full">
                Para isso, usamos duas tecnologias que estão se espalhando pelo
                mundo todo:{" "}
              </h2>
            </div>
          </Container>
        </section>

        <section className="sec4 md:pb-24 pb-14 w-full bg-white">
          <Container>
            <div className="flex flex-col">
              <h3 className="md:typ-text-1 text-5xl text-orange font-bold leading-tight my-4">
                a aproximação{" "}
              </h3>
            </div>
            <div className="flex md:mt-8 md:flex-row flex-col-reverse">
              <figure className="md:w-5/12 w-full rounded-md overflow-hidden drop-shadow-xl md:my-0 my-8">
                <picture className="w-full ">
                  <Image
                    src="/public-new/img/ui/unitok1.gif"
                    width={1080}
                    height={1080}
                    layout="responsive"
                  />
                </picture>
              </figure>
              <article className="md:w-7/12 w-full flex md:flex-col flex-col md:px-20">
                <div className="flex md:flex-row flex-row-reverse justify-between relative">
                  <figure className="flex items-center">
                    <picture className="w-full">
                      <Image
                        src="/public-new/icons/quem-somos/icon1.svg"
                        width={48}
                        height={48}
                      />
                    </picture>
                    <picture className="w-full">
                      <Image
                        src="/public-new/icons/quem-somos/icon2.svg"
                        width={48}
                        height={48}
                      />
                    </picture>
                  </figure>
                  <h3 className="md:typ-text-1 text-5xl text-orange font-bold leading-tight">
                    (NFC) e o
                  </h3>
                </div>
                <h3 className="md:typ-text-1 text-5xl text-orange font-bold leading-tight md:my-6">
                  QR Code.
                </h3>
                <p className="md:block hidden typ-p text-gray-dark w-9/12 mt-16">
                  <Markdown>{page.Sec2.Texto}</Markdown>
                </p>
              </article>
            </div>
            <p className="typ-p text-gray-dark w-full block md:hidden">
              <Markdown>{page.Sec2.Texto}</Markdown>
            </p>
          </Container>
        </section>
        <section className="sec6 md:py-24 py-14 w-full bg-white">
          <Container>
            <div className="flex flex-col">
              <article className="w-full">
                <h3 className="md:w-9/12 w-full md:typ-text-2 text-[27px] md:leading-normal leading-tight text-orange">
                <Markdown>{page.Sec4.Titulo}</Markdown>
                </h3>
              </article>
              <div className="w-full flex justify-end">
                <article className="md:w-5/12 w-full md:pr-20">
                  <div className="typ-p text-gray-dark my-8">
                    <Markdown>{page.Sec4.Texto}</Markdown>
                  </div>
                  <p className="typ-p text-lg text-green-dark font-bold">
                    {page.Sec4.Label}
                  </p>
                </article>
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {

  const page = await getPage('page-quem-somos')
  if (!page) return { notFound: true };

  return {
    props: {
      btnPrimary: {
        label: "Pedir orçamento",
        link: "https://api.whatsapp.com/send?phone=5508004550800",
      },
      page
    },
    revalidate: 60, // In seconds
  };
}