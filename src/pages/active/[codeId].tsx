import React from "react";

import Head from "next/head";
import * as yup from "yup";
import { withSSRGuest } from "../../utils/withSSRGuest";
import ActiveContainer from "containers/active";

import { GetServerSidePropsContext } from "next";
import { getQrcode, getUser } from "services/user";
import { UserProps } from "domain/User";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu email").email("Email inválido"),
  password: yup.string().required("Digite sua senha"),
});

export enum ProductsTypes {
  CARD = "CARD",
  TAG = "TAG",
  STICKER = "STICKER",
  PETS = "PETS",
}

type ActiveCardProps = {
  typeQRCODE: string;
  codeId: string;
  withoutPasswordQr: boolean;
  deviceType: ProductsTypes;
  imageBanner: string;
  qrcode: any;
  teamsUser?: UserProps;
};

const ActiveCard: React.FC<ActiveCardProps> = ({
  typeQRCODE,
  codeId,
  qrcode,
  withoutPasswordQr,
  deviceType,
  imageBanner,
  teamsUser
}) => {
  return (
    <>
      <Head>
        <title>Ativar {typeQRCODE}</title>
      </Head>

      <ActiveContainer
        withoutPasswordQr={withoutPasswordQr}
        codeId={codeId}
        imageSrc={imageBanner}
        deviceType={deviceType}
        qrcode={qrcode}
        teamsUser={teamsUser}
      />
    </>
  );
};

export default ActiveCard;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { codeId, pass } = ctx.query;

  let typeQRCODE: string;
  let imageBanner: string;

  const qrcode = await getQrcode(String(codeId));

  if(qrcode?.status == 'ACTIVE') {
    return {
      redirect: {
        permanent: false,
        destination: `/${codeId}`
      }
    }
  }

  switch(qrcode?.device_type) {
    case 'PETS':
      typeQRCODE = "Pet"
      imageBanner = "/images/UnitokPet_active.jpg"
      break;

    case 'CARD':
      typeQRCODE = "Cartão"
      imageBanner = "/images/Unitok_activate.jpg"
      break;

    case 'TAG':
      typeQRCODE = "Tag"
      imageBanner = "/images/Unitok_activate.jpg"
      break;

    case 'STICKER':
      typeQRCODE = "Sticker"
      imageBanner = "/images/Unitok_activate.jpg"
      break;

    default:
      break;
  }

  let teamsUser = null

  if (qrcode.hasOwnProperty('administratorId')) {
    try {
      teamsUser = await getUser(qrcode.administratorId, ctx);
    } catch (error) {
      console.log(error)
    }
  }

  return {
    props: {
      typeQRCODE: typeQRCODE || "Unitok",
      imageBanner: imageBanner || "",
      codeId,
      withoutPasswordQr: pass === "false",
      deviceType: qrcode.device_type || "CARD",
      qrcode,
      teamsUser,
    },
  };
};
