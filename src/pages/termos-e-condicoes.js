import Layout from "../components-new/layout/layout";
import Head from "next/head";
import { SEO_TITLE } from "../lib-new/constants";
import Container from "../components-new/layout/container";
import CollapseItem from "../components-new/ui/collapse-item";
import { getPage } from '../lib-new/api';
import Markdown from 'markdown-to-jsx';

export default function TermosCondicoes(props) {

  const page = props.page

  return (
    <>
      <Layout>
        <Head>
          <title>Termos e Condições de uso{SEO_TITLE}</title>
        </Head>

        <section className="md:pt-14 pt-24">
          <Container>
            <h1 className="md:typ-text-2 text-2xlMax text-green-dark">{page.Sec1Titulo}</h1>
          </Container>
        </section>

        <section className="md:py-24 py-14">
          <Container>
            <div className="w-full flex">
              <div className="md:w-3/12"></div>
              <div className="md:w-9/12 w-full">
                <article className="typ-p text-gray-dark leading-relaxed"><Markdown>{page.Sec1Texto}</Markdown></article>

                <div className="w-full flex flex-col mt-8">
                  {
                    page.Sec2ListItens?.map((item) => {
                      return (
                        <CollapseItem label={item?.Titulo}><Markdown>{item?.Texto}</Markdown></CollapseItem>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const page = await getPage('page-termos-e-condicoes')
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
