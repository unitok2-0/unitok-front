import React from "react";
import Head from "next/head";

import { GetServerSidePropsContext } from "next";

type ActivePetProps = {
  codeId: string;
  withoutPasswordQr: boolean;
};

const ActivePet: React.FC<ActivePetProps> = ({
  codeId,
  withoutPasswordQr,
}) => {
  return (
    <>
      <Head>
        <title>Ativar cartão</title>
      </Head>
    </>
  );
};

export default ActivePet;

export const getServerSideProps = async ({
  query,
  params,
}: GetServerSidePropsContext) => {
  const { codeId, pass } = query;

  return {
    props: {
      codeId,
      withoutPasswordQr: pass === "false",
    },
  };
};
