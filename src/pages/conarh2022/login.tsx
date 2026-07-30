import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import UnitokLogo from '../../../public/assets/UnitokLogo.svg';
import ABRHLogo from '../../../public/assets/ABRH-Brasil-logo.svg';
import Link from "next/link";
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthConarh } from "contexts/AuthConarhContext";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { withSSRAuthLogged } from "utils/conarh2022/withSSRAuthLogged";

import {
  ContainerInput,
  ContainerLoginConarh,
  ContainerPhoto,
  DescriptionInput,
  GroupInputs,
  TitleInput
} from "../../styles/pageStyles/conarh2022/login/styles";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu e-mail cadastrado"),
  password: yup.string().required("Digite sua senha"),
});

export default function LoginConarh() {
  const { signInConarh } = useAuthConarh();
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleSignIn = async (data) => {
    try {
      await signInConarh(data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ContainerLoginConarh>
      <ContainerPhoto>
        <div className="containerDivision">
          <UnitokLogo />
          <ABRHLogo />
        </div>
      </ContainerPhoto>

      <ContainerInput>
        <TitleInput>Fazer login</TitleInput>
        <DescriptionInput>Informe seu e-mail e senha cadastrados para <br /> acessar o seu perfil.</DescriptionInput>
        <GroupInputs>

          <Input
            autoFocus
            id="email"
            name="email"
            type="text"
            placeholder="E-mail"
            errorMessage={errors?.email?.message}
            onClick={() => clearErrors("password")}
            shouldMaintainLabelOnTop={!!getValues().email}
            {...register("email")}
          />
          <PasswordInput
            autoFocus
            name="password"
            id="password"
            placeholder="Senha"
            errorMessage={errors?.password?.message}
            onClick={() => clearErrors("password")}
            shouldMaintainLabelOnTop={!!getValues().password}
            {...register("password")}
          />

          <div className="buttonPosition">
            <ButtonPrimary
              textButton="Entrar"
              styleProp={{
                maxWidth: '8rem',
                width: '100%',
                fontSize: '0.938rem',
                height: '2.5rem',
                border: '1px solid #FF4C1C',
              }}
              className="buttonPrimary"
              onClick={handleSubmit(handleSignIn)}
              loading={isSubmitting}
            />
            <Link href="/expositor/reset/email" passHref className="forgotYourPassword">
              Esqueceu a senha?
            </Link>
          </div>
        </GroupInputs>
      </ContainerInput>
    </ContainerLoginConarh>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuthLogged(
  async (context) => {

    return {
      props: {}
    }
  }
) 