import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useCheckout } from 'contexts/CheckoutContext'

import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import CheckoutContainer from 'containers/checkout'
import Input from '../../components/Inputs/Input'
import PhoneInput from 'components/PhoneInput'
import NextStepBox from 'components/NextStepBox'
import { Heading } from 'components/Typography'
import { cnpjIsValid, cpfIsValid } from 'utils/document-validations'

import * as S from 'containers/checkout/styles'
import WhatsappButton from 'components/Buttons/WhatsappButton'

const SignUpDataFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Digite seu nome')
    .min(3)
    .test({
      test: (value) => {
        if (value) {
          let regex = /\d/g
          return !regex.test(value)
        }
      },
      message: 'Apenas letras',
    }),
  surname: yup
    .string()
    .required('Digite seu sobrenome')
    .min(3)
    .test({
      test: (value) => {
        if (value) {
          let regex = /\d/g
          return !regex.test(value)
        }
      },
      message: 'Apenas letras',
    }),
  document: yup
    .string()
    .required('Informe seu CNPJ ou CPF')
    .matches(/^(\d+)$/g, 'Somente números')
    .test({
      test: (value) => {
        if (value) {
          if (value.length === 11) {
            return cpfIsValid(value)
          } else if (value.length === 14) {
            return cnpjIsValid(value)
          }
        }
        return false
      },
      message: 'Documento inválido',
    }),
  phone: yup
    .string()
    .required('Digite seu telefone')
    .min(13, 'Digite seu telefone'),
  email: yup.string().required('Digite seu email').email('Email inválido'),
})

type SignUpDataFormData = {
  email: string
  birthday: string
  name: string
  surname: string
  document: string
  phone: string
}

const CheckoutData: React.FC = () => {
  const {
    unlockNextCheckoutStep,
    setUserPersonalData,
    userPersonalData,
    discountedTotal,
  } = useCheckout()
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(SignUpDataFormSchema),
  })

  const router = useRouter()
  const { errors } = formState

  const handleSignUpData: SubmitHandler<SignUpDataFormData> = async (
    values
  ) => {
    setUserPersonalData(values)
    unlockNextCheckoutStep(1)
    router.push('/checkout/address')
  }

  const document = watch('document')

  useEffect(() => {
    setValue('document', document?.replace(/\D+/g, ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document])

  return (
    <>
      <Head>
        <title>Dados | Unitok</title>
      </Head>
      <WhatsappButton />
      <CheckoutContainer>
        <S.CheckoutForm onSubmit={handleSubmit(handleSignUpData)}>
          <Heading
            as="h1"
            color="primary"
            style={{ fontSize: '35px', fontWeight: 300 }}
          >
            Dados pessoais
          </Heading>
          <S.InputInlineGrid gridTemplateColumns="1fr 1fr">
            <Input
              id="name"
              label="Nome"
              type="text"
              name="name"
              shouldMaintainLabelOnTop={!!userPersonalData.name}
              autoFocus={true}
              {...register('name')}
              errorMessage={errors.name?.message}
              onClick={() => clearErrors('name')}
            />
            <Input
              id="surname"
              label="Sobrenome"
              type="text"
              name="surname"
              shouldMaintainLabelOnTop={!!userPersonalData.surname}
              {...register('surname')}
              errorMessage={errors.surname?.message}
              onClick={() => clearErrors('surname')}
            />
          </S.InputInlineGrid>

          <Input
            label="CPF ou CNPJ"
            id="document"
            name="document"
            errorMessage={errors.document?.message}
            shouldMaintainLabelOnTop={!!userPersonalData.document}
            {...register('document')}
            onClick={() => clearErrors('document')}
            maxLength={14}
          />

          <PhoneInput
            label="Celular"
            id="phone"
            name="phone"
            defaultValue={userPersonalData.phone}
            errorMessage={errors.phone?.message}
            onClick={() => clearErrors('phone')}
            control={control}
            setValue={setValue}
          />

          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            {...register('email')}
            shouldMaintainLabelOnTop={!!userPersonalData.email}
            errorMessage={errors.email?.message}
            onClick={() => clearErrors('email')}
          />

          <NextStepBox>
            <ButtonPrimary type="submit" style={{ justifySelf: 'end' }}>
              Continuar para entrega
            </ButtonPrimary>
          </NextStepBox>
        </S.CheckoutForm>
      </CheckoutContainer>
    </>
  )
}

export default CheckoutData
