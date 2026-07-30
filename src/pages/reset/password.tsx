import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import AuthContainer from "containers/auth";
import {
  Heading,
  InputContainer,
  ButtonsContainer,
  Form,
  Text,
} from "containers/auth/styles";
import PasswordInput from "components/Inputs/PasswordInput";

import { passwordReset } from "../../services/auth";

type SignInFormData = {
  password: string;
};

interface ResetPasswordProps {
  token: string;
}

const signInFormSchema = yup.object().shape({
  password: yup.string().required("Digite sua senha"),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password"), null], "Senha não é igual a de cima"),
});

export default function ResetPassword<ResetPasswordProps>({ token }) {
  const { register, handleSubmit, formState, clearErrors } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { push } = useRouter();
  const [changed, setChanged] = useState(false);
  const { errors, isSubmitting } = formState;

  const updatePassword: SubmitHandler<SignInFormData> = async (values) => {
    try {
      await passwordReset(values.password, token);
      setChanged(true);
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
        <title>Alterar Senha | Unitok</title>
      </Head>

      <AuthContainer imageSrc="/images/reset-password-image.jpg">
        <Form onSubmit={handleSubmit(updatePassword)}>
          {changed ? (
            <>
              <Heading>Senha alterada!</Heading>
              <Text>Vamos logar com email e com nova senha...</Text>
              <ButtonPrimary
                loading={isSubmitting}
                type="button"
                onClick={() => push("/login")}
              >
                Vamos lá
              </ButtonPrimary>
            </>
          ) : (
            <>
              <Heading>Redefinir Senha</Heading>

              <InputContainer>
                <PasswordInput
                  isWhiteMode
                  label="Nova senha"
                  name="password"
                  id="password"
                  {...register("password")}
                  errorMessage={errors?.password?.message}
                  onClick={() => clearErrors("password")}
                />

                <PasswordInput
                  isWhiteMode
                  label="Repetir nova senha"
                  name="confirmPassword"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  errorMessage={errors?.confirmPassword?.message}
                  onFocus={() => clearErrors("confirmPassword")}
                />
              </InputContainer>

              <ButtonsContainer>
                <ButtonPrimary loading={isSubmitting} type="submit" style={{ minWidth: '11.25rem' }}>
                  Alterar senha
                </ButtonPrimary>
              </ButtonsContainer>
            </>
          )}
        </Form>
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = async ({
  query,
  res,
}: GetServerSidePropsContext) => {
  const { token } = query;

  if (!token) {
    return {
      redirect: {
        permanent: true,
        destination: `/reset/sms`,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};
