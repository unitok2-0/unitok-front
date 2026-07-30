import React from "react";

import Head from "next/head";
import * as yup from "yup";
import ActiveContainer from "containers/active-event";

import { GetServerSidePropsContext } from "next";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu email").email("Email inválido"),
  password: yup.string().required("Digite sua senha"),
});

type ActiveCardProps = {
  codeId: string;
  withoutPasswordQr: boolean;
};

const ActiveCard: React.FC<ActiveCardProps> = ({
  codeId,
  withoutPasswordQr,
}) => {
  return (
    <>
      <Head>
        <title>Ativar cartão</title>
      </Head>

      <ActiveContainer
        withoutPasswordQr={true}
        codeId={codeId}
        imageSrc="/assets/Unitok_login_Conarh.png"
      />
    </>
  );
};

export default ActiveCard;

export const getServerSideProps = async ({
  query,
  params,
}: GetServerSidePropsContext) => {
  const { codeId, pass } = query;
  console.log(codeId);
  return {
    props: {
      codeId,
      withoutPasswordQr: pass === "false",
    },
  };
};
