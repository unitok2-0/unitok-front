import Router from "next/router";
import { useAuth } from "contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import {
  ContainerInput,
  ContainerLoginConarh,
  ContainerPhoto,
  GroupInputs,
  TextForgotYourPassword
} from "./styles";
import * as yup from "yup";

import ButtonPrimary from "../../../../components/Buttons/ButtonPrimary";
import Input from '../../../../components/Inputs/Input'
import PasswordInput from '../../../../components/Inputs/PasswordInput'
import { Heading } from "components/Typography";
import { CurrentScreen } from "containers/checkin";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const signInFormSchema = yup.object().shape({
  phone: yup.string().required("Digite seu telefone cadastrado"),
  password: yup.string().required("Digite sua senha"),
});


interface LoginCongressmanProps {
  exhibitorCode?: string;
  setCurrentComponent: (screen: CurrentScreen) => void;
}

export function LoginConarh({ exhibitorCode, setCurrentComponent }: LoginCongressmanProps) {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState,
    getValues,
    resetField
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const { signIn, user } = useAuth();
  const handleSignInCongressman = async (data) => {
    try {
      await signIn(data);

      if (exhibitorCode !== null)
        Router.push(`/checkin/${exhibitorCode}`);
      else if (user.roles.includes('VISITOR')) {
        setCurrentComponent(CurrentScreen.SUCCESS)
      } else {
        Router.push('/profile/me');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ContainerLoginConarh>
      <ContainerPhoto>
        <div className="containerDivision">
          <img src="/images/conarh2022/Unitok.svg" alt="" />
          <img src="/images/conarh2022/abrh.svg" alt="" />
        </div>
      </ContainerPhoto>
      
      <ContainerInput>
        <button className='arrow-back'>
          <FiArrowLeft onClick={() => {
            resetField("phone")
            resetField("password")
            setCurrentComponent(CurrentScreen.FIRST_SCREEN)
          }}/>
        </button>
        <Heading>Login</Heading>
        <GroupInputs>
          <Input
            type="tel"
            name="phone"
            id="phone"
            autoFocus={true}
            {...register("phone")}
            onPhoneChange={(phone) => setValue('phone', phone)}
            errorMessage={errors?.phone?.message}
            onClick={() => clearErrors("phone")}
            className="marginInput"
            style={{paddingTop:"0.4rem", paddingBottom:"0.4rem" }}
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
            classNameContainer="passwordInput"
            className="diz"
            style={{paddingTop:"0.4rem", paddingBottom:"0.4rem" }}
          />

          <ButtonPrimary
            textButton="Entrar"
            fullWidth
            onClick={handleSubmit(handleSignInCongressman)}
            loading={isSubmitting}
            style={{ marginBottom: '30px' }}
          />

        <Link href="/reset/sms" passHref legacyBehavior>
          <TextForgotYourPassword>
            Esqueceu sua senha?
          </TextForgotYourPassword>
        </Link>
        </GroupInputs>
      </ContainerInput>
    </ContainerLoginConarh>
  );
}

