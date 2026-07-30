import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from "../../components/Headers/HeaderInitial";

import { Main, Content } from '../../styles/pageStyles/checkout/success/styles';

import SuccessImage from '../../../public/assets/iconSuccessSignup.svg';
import { GetServerSideProps } from 'next';

interface CheckoutSuccessPageProps {
  boletoUrl?: string;
  boletoBarcode?: string;
}

const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = ({ boletoBarcode, boletoUrl }) => {
  return (
    <Main>
      <Head>
        <title>Sucesso | Unitok</title>
      </Head>
      <Header />
      <Content>
        <section>
          <SuccessImage />
          <h1>Seu pedido foi enviado com sucesso</h1>
          {boletoBarcode ? (
            <>
              <p>Dados para o pagamento do boleto</p>
              <p>Código de barras: <strong>{boletoBarcode}</strong></p>
              {boletoUrl && (
                <a 
                  href={String(boletoUrl)} 
                  target="_blank" 
                  rel="noreferrer"
                >Clique aqui para ver seu boleto</a>
              )}
            </>
          ) : (
            <p>Em breve te enviaremos um email com a confirmação do pagamento</p>
          )}
        </section>
      </Content>
    </Main>
  )
}

export default CheckoutSuccessPage;

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  const props = {
    boletoUrl: query.boleto_url ?? null,
    boletoBarcode: query.boleto_barcode ?? null
  }

  return {
    props
  }
}