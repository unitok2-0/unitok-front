import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Header } from "../components/Header";
import { Main, Container } from "../styles/pageStyles/404/styles";
import { Heading, Text } from "components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

const NotFoundPage: React.FC = () => {
  return <>
    <Head>
      <title>Página não encontrada | Unitok</title>
    </Head>
    <Main>
      <Header position="static" variant="logoOnly" />
      <Container>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <Heading font="titleMd" fontWeight="300" color="primary">
            404
          </Heading>
          <Heading font="titleSm" color="white">
            Página não encontrada
          </Heading>

          <Text color="white">
            A página que você está procurando pode ter sido removida ou o link
            que você seguiu está incorreto.
          </Text>
        </div>
        <Link href="/" passHref legacyBehavior>
          <ButtonPrimary as="a">Voltar para o site</ButtonPrimary>
        </Link>
      </Container>
    </Main>
  </>;
};

export default NotFoundPage;
