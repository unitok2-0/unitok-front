import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Router from 'next/router'

import { SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "components/Inputs/PasswordInput";
import Input from "components/Inputs/Input";
import ButtonLink from "components/Buttons/ButtonLink";

import * as S from "./styles";
import * as G from '../styles'
import { useState } from "react";

interface AdmUserProps {
  phone: string;
  email: string;
  enterpriseName: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpProps {
  setAdminUser: (data: AdmUserProps) => void;
  handleNextButton: () => void;
}

const signUpFormSchema = yup.object().shape({
  phone: yup.string().required("Telefone é obrigatório").min(8, 'Telefone inválido'),
  email: yup.string().email("Formato de e-mail inválido").required("campo e-mail é obrigatório"),
  password: yup.string().required("Digite sua senha").min(6, 'A senha deve ter no mínimo 6 digitos.'),
  passwordConfirmation: yup.string()
    .test('passwords-match', 'As senhas precisam ser iguais', function (value) {
      return this.parent.password === value
    })
});

export default function SignUp({
  setAdminUser,
  handleNextButton
}: SignUpProps) {
  const { register, handleSubmit, formState, clearErrors, setValue, getValues } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<AdmUserProps> = async (data: AdmUserProps) => {
    const newUser = {
      phone: data.phone,
      email: data.email,
      enterpriseName: data.enterpriseName,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    }
    setAdminUser(newUser)
    handleNextButton()
  }

  return (
    <G.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <G.Title margin="0 0 0.625rem 0">Criar login</G.Title>

        <Input
          style={{minWidth: "25rem"}}
          type="tel"
          name="phone"
          id="phone"
          autoFocus={true}
          {...register("phone")}
          onPhoneChange={(phone) => setValue('phone', phone)}
          errorMessage={errors?.phone?.message}
          onClick={() => clearErrors("phone")}
        />

        <Input
          placeholder="E-mail do responsável"
          notErrorWarning={true}
          name="email"
          id="email"
          autoFocus={true}
          {...register("email")}
          onPhoneChange={(email) => setValue('email', email)}
          errorMessage={errors?.email?.message}
          onClick={() => clearErrors("email")}
        />

        <Input
          placeholder="Nome da empresa"
          name="enterpriseName"
          id="enterpriseName"
          autoFocus={true}
          {...register("enterpriseName")}
          onPhoneChange={(enterpriseName) => setValue('enterpriseName', enterpriseName)}
          errorMessage={errors?.enterpriseName?.message}
          onClick={() => clearErrors("enterpriseName")}
        />

        <S.PasswordInput>
          <PasswordInput
            placeholder="Criar senha"
            notErrorWarning={true}
            name="password"
            id="password"
            {...register("password")}
            errorMessage={errors?.password?.message}
            onClick={() => clearErrors("password")}
          />
        </S.PasswordInput>


        <S.PasswordInput>
          <PasswordInput
            placeholder="Confirmar senha"
            notErrorWarning={true}
            name="passwordConfirmation"
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
            errorMessage={errors?.passwordConfirmation?.message}
            onClick={() => clearErrors("passwordConfirmation")}
          />
        </S.PasswordInput>

        <ButtonLink
          style={{ padding: '0 3.5rem' }}
          textButton="Criar login"
          loading={isSubmitting}
          type="submit"
        />
      </S.Form>
      <G.Footer>
        <Link href="/" passHref>

          <img
            src="/assets/powered-by-unitok.svg"
            alt="Powered by Unitok"
          />

        </Link>
      </G.Footer>
    </G.Wrapper>
  );
}
