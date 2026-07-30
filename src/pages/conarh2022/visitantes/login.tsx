import { useAuth } from "contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { withSSRAuthLogged } from "utils/conarh2022/withSSRAuthLogged";
import { parseCookies } from "nookies";

import {
  ContainerInput,
  ContainerLoginConarh,
  ContainerPhoto,
  GroupInputs,
  TitleInput,
  DescriptionInput,
} from "styles/pageStyles/conarh2022/congresmann/login/styles";

import * as yup from "yup";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import UnitokLogo from "../../../../public/assets/UnitokLogo.svg";
import ABRHLogo from "../../../../public/assets/ABRH-Brasil-logo.svg";
import Input from "components/Inputs/Input";
import Router from "next/router";
import PasswordInput from "components/Inputs/PasswordInput";
import Link from "next/link";

const signInFormSchema = yup.object().shape({
  phone: yup.string().required("Digite seu telefone cadastrado"),
  password: yup.string().required("Digite sua senha"),
});

interface LoginCongressmanProps {
  exhibitorCode: string;
}

export default function LoginCongressman({
  exhibitorCode,
}: LoginCongressmanProps) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState,
    getValues,
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const { signIn } = useAuth();
  const handleSignInCongressman = async (data) => {
    try {
      await signIn(data);

      if (exhibitorCode !== null) Router.push(`/checkin/${exhibitorCode}`);
      else Router.push("/checkin/");
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
        <TitleInput>Login</TitleInput>

        <GroupInputs>
          <Input
            type="tel"
            name="phone"
            id="phone"
            autoFocus={true}
            {...register("phone")}
            onPhoneChange={(phone) => setValue("phone", phone)}
            errorMessage={errors?.phone?.message}
            onClick={() => clearErrors("phone")}
            className="marginInput"
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
                maxWidth: "8rem",
                width: "100%",
                fontSize: "0.938rem",
                height: "2.5rem",
                border: "1px solid #FF4C1C",
              }}
              className="buttonPrimary"
              onClick={handleSubmit(handleSignInCongressman)}
              loading={isSubmitting}
            />

            <Link href="/reset/email" passHref className="forgotYourPassword">
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
    const { standCodeId: codeId } = parseCookies(context);

    const code = codeId ? codeId : null;

    return {
      props: {
        exhibitorCode: code,
      },
    };
  }
);
