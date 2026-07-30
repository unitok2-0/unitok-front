/* eslint-disable react/no-unescaped-entities */
import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Container from "../components-new/layout/container";
import CollapseItem from "../components-new/ui/collapse-item";
import CollapseItemIcon from "../components-new/ui/collapse-item-icon";
import Link from "next/link";
import Image from "next/image";
import Markdown from 'markdown-to-jsx';

import { gsap } from "gsap";
import { useLayoutEffect, useEffect } from "react";

import { getPageSuporte } from '../lib-new/api';

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function Ajuda(props) {
  const page = props.page

  useEffect(() => {
    const animation = () => {
      gsap.from(".list-questions .collapse-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.16,
      });
    }
  }, []);

  return <>
    <Layout>
      <Head>
        <title>Suporte{SEO_TITLE}</title>
      </Head>

      <section className="sec1 md:py-14 py-24 mb-14">
        <Container>
          <div className="flex md:flex-row flex-col">

            <div className="md:w-4/12 w-full">
              <h1 className="md:typ-text-2 text-2xlMax text-green-dark md:mb-32">
                {page.Sec1Titulo}
              </h1>

              <div className="w-full flex flex-col gap-y-4 my-10">
                <div className="flex items-center">
                  <figure>
                    <picture className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-orange cursor-pointer">
                      <Image
                        className="rounded-sm"
                        src="/public-new/icons/layout/footer/whatsapp.svg"
                        width={24}
                        height={24}
                      />
                    </picture>
                  </figure>
                  <Link
                    href={`tel:${page.Sec1Telefone}`}
                    className="text-base text-orange font-bold hover:underline ml-3">

                    {page.Sec1Telefone}

                  </Link>
                </div>

                <div className="flex items-center">
                  <figure>
                    <picture className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-orange cursor-pointer">
                      <Image
                        className="rounded-sm"
                        src="/public-new/icons/layout/footer/email.svg"
                        width={24}
                        height={24}
                      />
                    </picture>
                  </figure>
                  <Link
                    href={`mailto:${page.Sec1Email}`}
                    className="text-base text-orange font-bold hover:underline ml-3">

                    {page.Sec1Email}

                  </Link>
                </div>
              </div>

              <div className="w-full text-xs text-gray-dark">
                <h6 className="text-base text-green-dark font-bold mb-2">
                  Horários de atendimento
                </h6>
                <Markdown options={{ wrapper: 'article' }}>
                  {page.Sec1HorarioAtendimento}
                </Markdown>
              </div>
            </div>

            <div className="md:w-8/12 w-full">
              <div className="list-questions w-full flex flex-col md:mt-0 mt-8">

                {page.Sec2ListItens.map((item) => {
                  return (
                    <>
                      <CollapseItemIcon
                        label={item.Titulo}
                        icon={item.IconActive.url}
                        iconActive={item.Icone.url}
                      >
                        <Markdown>
                          {item.Texto}
                        </Markdown>

                        {item.Itens.map((subitem) => {
                          return (
                            <>
                              <CollapseItem label={subitem.Titulo}>
                                <Markdown>
                                  {subitem.Texto}
                                </Markdown>
                              </CollapseItem>
                            </>
                          )
                        })}
                      </CollapseItemIcon>
                    </>
                  )
                })}

              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  </>;
}

export async function getStaticProps() {
  const page = await getPageSuporte()
  if (!page) return { notFound: true };

  return {
    props: {
      btnPrimary: {
        label: "Quero ser embaixador",
        link: "/lojas",
      },
      page
    },
    revalidate: 60, // In seconds
  };
}
