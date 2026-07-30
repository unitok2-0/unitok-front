import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { InputPrimary } from "../../../components/Inputs/InputPrimary";

import {
  ContainerRegisterExpositor,
  ContainerPhoto,
  FormContainer,
  RegisterForm,
  GroupInput,
  ButtonsContainer
} from "../../../styles/pageStyles/conarh2022/expositor/register-expositor/styles";

import { useAuthConarh } from '../../../contexts/AuthConarhContext'

import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getPublicProfileUser } from "services/user";
import Input from '../../../components/Inputs/Input'
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "components/Inputs/PasswordInput";
import { Heading } from "components/Typography";
import PhoneInput from "components/PhoneInput";
import { createExhibitor } from "services/exhibitor";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


interface RegisterExhibitorProps {
  qrcodeId: string;
}

export default function RegisterExhibitor({ qrcodeId }: RegisterExhibitorProps) {
  type registerDataSchema = {
    name: string;
    company_name: string;
    niche: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const RegisterDataSchema = yup.object().shape({
    company_name: yup.string().required('Nome da empresa obrigátório'),
    name: yup.string().required('Nome do expositor obrigátório'),
    niche: yup.string().required('Nicho obrigatório'),
    phone: yup.string().required('Telefone obrigatório'),
    email: yup.string().required('Email obrigatório'),
    password: yup.string(),
    confirmPassword: yup.string()
  })
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    setError,
    control,
    setValue
  } = useForm({
    resolver: yupResolver(RegisterDataSchema)
  })

  const { signInConarh } = useAuthConarh()

  //const { signInCongressman } = useAuthConarh()
  const [step, setStep] = useState(1);

  const { push } = useRouter();

  function handleSetPreviusPage() {
    setStep(1)
  }

  function handleSetNextPage() {
    setStep(2)
  }


  const { errors, isSubmitting } = formState;

  const handleSubmitInfos: SubmitHandler<registerDataSchema> = async (values) => {

    if (step === 1) {
      return handleSetNextPage()
    }
    if (step === 2) {

      const { password, confirmPassword, email, name, niche, phone, company_name } = values;

      if (!password) {
        return setError("password", { message: "Insira uma senha." })

      }
      if (password && password.length < 6) {
        return setError("password", { message: "A senha deve ter no mínimo 6 caracteres." })
      }

      if (password != confirmPassword) {
        return setError("confirmPassword", { message: "As senhas devem ser iguais." })
      }
      try {
        const exhibitor = await createExhibitor({
          password,
          email,
          name,
          company_name,
          niche,
          phone,
          qrcodeId
        })
        await signInConarh({ email: exhibitor.email, password });
        push('/expositor/dashboard');
        toast.success("Expositor cadastrado!");
      } catch (err) {
        const { error } = err
        toast.error(error)
      }
    }
  }

  return (
    <ContainerRegisterExpositor>
      <ContainerPhoto>
        <div className="logos">
          <a href="">
            <img src="/assets/UnitokLogo.svg" alt="ABRH Brasil Logo" />
          </a>
          <a href="">
            <img src="/assets/abrh_logo_white.svg" alt="ABRH Brasil Logo" />
          </a>
        </div>
      </ContainerPhoto >
      <FormContainer onSubmit={handleSubmit(handleSubmitInfos)}>
        <RegisterForm>
          <Heading>Criar Login</Heading>
          <GroupInput>
            {step === 1 && (
              <>
                <Input
                  autoFocus
                  id="company_name"
                  name="company_name"
                  label="Nome da empresa"
                  shouldMaintainLabelOnTop={!!getValues().company_name}
                  errorMessage={errors.company_name?.message}
                  onClick={() => clearErrors('company_name')}
                  {...register('company_name')}
                />
                <Input
                  name="niche"
                  id="niche"
                  label="Nicho da empresa"
                  shouldMaintainLabelOnTop={!!getValues().niche}
                  errorMessage={errors.niche?.message}
                  onClick={() => clearErrors('niche')}
                  {...register('niche')}
                />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Nome do responsável"
                  shouldMaintainLabelOnTop={!!getValues().name}
                  {...register('name')}
                  errorMessage={errors.name?.message}
                  onClick={() => clearErrors('name')}
                ></Input>
                <PhoneInput
                  label="Celular do responsável"
                  id="phone"
                  name="phone"
                  shouldMaintainLabelOnTop={!!getValues().phone}
                  errorMessage={errors.phone?.message}
                  onClick={() => clearErrors('phone')}
                  defaultValue={getValues().phone}
                  control={control}
                  setValue={setValue}
                  classNameContainer="input-phone"

                />
                <Input
                  name="email"
                  id="email"
                  label="E-mail do responsável"
                  shouldMaintainLabelOnTop={!!getValues().email}
                  errorMessage={errors.email?.message}
                  onClick={() => clearErrors('email')}
                  {...register('email')}
                />
              </>
            )}
            {step === 2 && (
              <>
                <PasswordInput
                  autoFocus
                  label="Senha"
                  name="password"
                  id="password"
                  errorMessage={errors?.password?.message}
                  onClick={() => clearErrors("password")}
                  shouldMaintainLabelOnTop={!!getValues().password}
                  {...register("password")}
                />

                <PasswordInput
                  label="Confirmar senha"
                  name="confirmPassword"
                  id="confirmPassword"
                  errorMessage={errors?.confirmPassword?.message}
                  onClick={() => clearErrors("confirmPassword")}
                  shouldMaintainLabelOnTop={!!getValues().confirmPassword}
                  {...register("confirmPassword")}
                />
              </>
            )}
          </GroupInput>

          <ButtonsContainer>
            {step === 1 ? (
              <ButtonPrimary
                type="submit"
                textButton="Próximo"
                className="next"
              />
            ) : (
              <>
                <button className="back-button" type="button" onClick={handleSetPreviusPage}>Voltar</button>
                <ButtonPrimary
                  textButton="Criar login"
                  loading={isSubmitting}
                  type="submit"
                />
              </>
            )}
          </ButtonsContainer>

        </RegisterForm>
      </FormContainer>

    </ContainerRegisterExpositor>
  )
}


export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { codeId } = query;

  switch (codeId) {
    case 'UNIE1D3D0': //UNI548CA8
      return {
        redirect: {
          permanent: false,
          destination: `/UNI45E4C4`, // UNIB6CFDC
        },
      };
      break;

    case 'UNICB6781':
      return {
        redirect: {
          permanent: false,
          destination: `/UNI206024`,
        },
      };
      break;

    case 'UNI62774B':
      return {
        redirect: {
          permanent: false,
          destination: `/UNI27862F`,
        },
      };
      break;

    case 'UNI7C6409':
      return {
        redirect: {
          permanent: false,
          destination: `/UNI03692C`,
        },
      };
      break;

    default:
  }

  const data = await getPublicProfileUser(codeId);

  const { isActive, tokenExists, exhibitorId } = data;

  if (!tokenExists) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
    };
  }

  if (exhibitorId) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`
      }
    }
  }

  return {
    props: {
      qrcodeId: String(codeId)
    }
  }
}
