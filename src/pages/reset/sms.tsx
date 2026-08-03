import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import AuthContainter from "containers/auth";
import { Form, Heading, Text, ButtonsContainer } from "containers/auth/styles";
import Input from "components/Inputs/Input";

import { withSSRGuest } from "../../utils/withSSRGuest";
import { sendForgotPasswordEmail } from "../../services/auth";

type SignInFormData = {
  email: string;
};



export default function ResetSMS() {
  const [email, setEmail] = useState("")

  const { push } = useRouter();
  const [sent, setSent] = useState(false);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    try {
      await sendForgotPasswordEmail(email);
      setSent(true);
    } catch (error) {
      toast.error(error.error, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Redefinir senha | Unitok</title>
      </Head>

      <AuthContainter imageSrc="/images/reset-email-image.jpg">
        <Form onSubmit={handleSignIn}>
          {sent ? (
            <>
              <Heading>E-mail enviado!</Heading>
              <Text>
                O e-mail para redefinição de senha foi enviado para o
                endereço informado.
                <br />
                <br />
                Pode levar alguns minutos até aparecer em sua caixa de entrada.
              </Text>
              <ButtonPrimary
                type="button"
                onClick={() => push("/login")}
              >
                Voltar para o site
              </ButtonPrimary>
            </>
          ) : (
            <>
              <Heading>Redefinir senha</Heading>
              <Text>
                Informe o e-mail cadastrado para enviarmos um link para
                redefinição de senha.
              </Text>

              <Input
                id="email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                isWhiteMode
              />

              <ButtonsContainer>
                <ButtonPrimary type="submit">
                  Enviar
                </ButtonPrimary>
              </ButtonsContainer>
            </>
          )}
        </Form>
      </AuthContainter>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
