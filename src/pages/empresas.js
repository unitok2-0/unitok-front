import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Container from "../components-new/layout/container";
import BtnFixedMobile from "../components-new/ui/btn-fixed-mobile";
import CardGreenImage from "../components-new/card/card-green-image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";

import { getPageEmpresas } from '../lib-new/api';

export default function Empresas(props) {
  const box = useRef();
  const title = useRef();
  const text = useRef();

  const page = props.page

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(title.current, {
          y: 20,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
        });

        gsap.from(text.current, {
          y: 20,
          opacity: 0,
          duration: 1.2,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
        });

        gsap.from(".box-list-itens .item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
          stagger: 0.16,
        });
      }, 1400);
    }
  }, []);

  return (
    <>
      <Layout
        headerWhite={true}
        mobileIconsColors={"white"}
        classe={"bg-green-dark"}
      >
        <Head>
          <title>Empresas{SEO_TITLE}</title>
        </Head>

        <section className="md:pt-8 pt-20 w-full flex bg-green-dark">
          <Container>
            <div className="flex flex-col">
              <article className="md:w-8/12 w-full md:py-0 py-6">
                <h1 className="typ-text-2 text-white">{page.Sec1?.Label}</h1>
                <p className="typ-p text-white md:mt-8 mt-6 leading-relaxed">{page.Sec1?.Titulo}</p>
              </article>
            </div>
            <div className="md:hidden flex">
              <BtnFixedMobile label="Solicitar orçamento" link="/" />
            </div>
          </Container>
        </section>

        <section className="md:py-24 py-14 bg-green-dark">
          <Container>
            <div className="box-list-itens flex mb:flex-nowrap flex-wrap mb:gap-x-2 mb:gap-y-0 gap-8 justify-center">
              {page.Sec2?.map((item) => {
                return (
                  <div className="item mb:w-4/12 md:w-5/12 w-full">
                    <CardGreenImage
                      icon={item.Icone ? item.Icone.url : false}
                      iconHover={item.IconeHover ? item.IconeHover.url : false}
                      img={item?.Imagem ? item?.Imagem.url : false}
                      title={item?.Titulo}
                      link={item.Link}
                    />
                  </div>
                )
              })}
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const page = await getPageEmpresas()
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