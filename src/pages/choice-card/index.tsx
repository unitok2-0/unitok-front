import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '../../components/Headers/HeaderInitial'
import { Main, Content, Form, ButtonStyle } from '../../styles/pageStyles/signup/card/styles';
import { InputPrimary } from '../../components/Inputs/InputPrimary';
import { InputMask } from '../../components/Inputs/InputMask';
import { InputPhone } from '../../components/Inputs/InputPhone';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import ProgressSignUp from '../../components/ProgressSignUp';
import { CirclePicker } from 'react-color';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const SignUpCardFormSchema = yup.object().shape({
  name: yup.string().required('Digite seu Nome').min(3),
  document: yup.string().required('Digite seu CPF ou CNPJ').min(11, 'Digite seu CPF ou CNPJ'),
  phone: yup.string().required('Digite seu telefone'),
  email: yup.string().required('Digite seu email').email('Email inválido'),
  password: yup.string().required('Digite sua senha'),
  confirmPassword: yup.string().required('Confirme sua senha')
    .oneOf([yup.ref('password'), null], 'Senha não é igual a de cima')
})

type SignUpCardFormData = {
  // email: string;
  // password: string;
}

const SignUpCard: React.FC = () => {

  const { register, handleSubmit, formState, clearErrors } = useForm({
    // resolver: yupResolver(SignUpCardFormSchema)
  })

  const { updateSignUpFormData, signUp } = useAuth()

  const { errors, isSubmitting } = formState

  const handleSignUpCard: SubmitHandler<SignUpCardFormData> = async (values) => {
    try {
      await updateSignUpFormData(values)
      await signUp()
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 4000
      });
    }

  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Main>
        <Header headerOnlyBack />
        <Content>
          <Form onSubmit={handleSubmit(handleSignUpCard)}>
            <ProgressSignUp choice="CART" />

            <h1>Cartão</h1>

            <div style={{ marginTop: 20 }}>
              <CirclePicker />
            </div>

            <ButtonPrimary
              textButton="FAZER PEDIDO"
              styleProp={ButtonStyle}
              loading={isSubmitting}
              type="submit"
            />
          </Form>
        </Content>
      </Main>
    </>
  )
}

export default SignUpCard;