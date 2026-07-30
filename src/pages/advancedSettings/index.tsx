import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';

import { InputPrimary } from '../../components/Inputs/InputPrimary'
import {
  Main,
  Content,
  Form,
  ButtonStyle,
  ButtonStyleOutiline,
  InputStyle,
} from '../../styles/pageStyles/advancedSettings/styles'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'

import { useRouter } from 'next/router';
import { withSSRAuth } from '../../utils/withSSRAuth';
import HeaderProfile from '../../components/Headers/HeaderProfile';
import { changePasswordUser } from '../../services/user';

type advancedSettingsData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdvancedSettingFormSchema = yup.object().shape({
  currentPassword: yup.string().required('Digite sua senha atual'),
  newPassword: yup.string().required('Digite a senha nova'),
  confirmPassword: yup.string().required('Confirme sua senha nova')
    .oneOf([yup.ref('newPassword'), null], 'Senha não é igual a de cima')
})

export default function AdvancedSettings() {
  const { register, handleSubmit, formState, clearErrors } = useForm({
    resolver: yupResolver(AdvancedSettingFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleChangePassword: SubmitHandler<advancedSettingsData> = async (values) => {
    try {
      await changePasswordUser(values.currentPassword, values.newPassword)
      toast.success('Senha alterada!', {
        position: "top-right",
        autoClose: 4000
      });
    } catch (error) {
      toast.error(error.error, {
        position: "top-right",
        autoClose: 4000
      });
    }
  }

  return (
    <>
      <Head>
        <title>Unitok</title>
      </Head>

      <Main>
        <HeaderProfile />
        <Content>
          <Form onSubmit={handleSubmit(handleChangePassword)}>
            <h1>Configurações avançadas</h1>

            <InputPrimary
              titleInput="Alterar senha"
              placeholder="Senha atual"
              type="password"
              name="currentPassword"
              autoFocus={true}
              styleContainer={InputStyle}
              {...register('currentPassword')}
              error={errors.currentPassword}
              onClick={() => clearErrors('currentPassword')}
            />

            <InputPrimary
              placeholder="Nova senha"
              type="password"
              name="newPassword"
              styleContainer={InputStyle}
              {...register('newPassword')}
              error={errors.newPassword}
              onClick={() => clearErrors('newPassword')}
            />

            <InputPrimary
              placeholder="Confirme a nova senha"
              type="password"
              name="confirmPassword"
              styleContainer={InputStyle}
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              onClick={() => clearErrors('confirmPassword')}
            />


            <ButtonPrimary
              textButton="ALTERAR"
              styleProp={ButtonStyle}
              loading={isSubmitting}
              type="submit"
            />
          </Form>
          {/* 
          <ButtonPrimary
            textButton="Desativar conta"
            styleProp={ButtonStyleOutiline}
            type="button"
          />
          <ButtonPrimary
            textButton="Excluir conta"
            styleProp={ButtonStyleOutiline}
            type="button"
          /> */}
        </Content>
      </Main>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  return {
    props: {}
  }
})