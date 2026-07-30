import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import AuthContainter from "containers/auth";
import { Form, Heading, Text, ButtonsContainer } from "containers/auth/styles";
import Input from "components/Inputs/Input";

import { withSSRGuest } from "../../../utils/withSSRGuest";
import { sendFogotEmail } from "../../../services/exhibitor";
import { withSSRAuthLogged } from "utils/conarh2022/withSSRAuthLogged";
import AuthConarh from "containers/authConarh";

type SignInFormData = {
  email: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu email").email("Email inválido"),
});

export default function ResetEmail() {
  const { register, handleSubmit, formState, clearErrors } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { push } = useRouter();
  const [sent, setSent] = useState(false);
  const { errors, isSubmitting } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    try {
      await sendFogotEmail(values.email);
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

      <AuthConarh imageSrc="/images/conarh2022/Unitok_login_Conarh2.png">
        <Form onSubmit={handleSubmit(handleSignIn)}>
          {sent ? (
            <>
              <Heading>Email enviado!</Heading>
              <Text>
                O e-mail para redefinição de senha foi enviado para o endereço
                de e-mail informado.
                <br />
                <br />
                Pode levar alguns minutos até aparecer em sua caixa de entrada.
              </Text>
              <ButtonPrimary
                loading={isSubmitting}
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
                label="Email"
                type="email"
                name="email"
                autoFocus={true}
                {...register("email")}
                errorMessage={errors?.email?.message}
                onClick={() => clearErrors("email")}
              />

              <ButtonsContainer>
                <ButtonPrimary loading={isSubmitting} type="submit">
                  Enviar
                </ButtonPrimary>
              </ButtonsContainer>
            </>
          )}
        </Form>
      </AuthConarh>
    </>
  );
}

export const getServerSideProps = withSSRAuthLogged(async (context) => {
  return {
    props: {},
  };
});
