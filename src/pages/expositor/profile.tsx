import { useEffect } from "react";
import {
  ContainerInputPassword,
  FormEditProfileConarh
} from "../../styles/pageStyles/conarh2022/edit-profile/styles";

import * as yup from 'yup'

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import FooterConarh from "../../components/Conarh2022/FooterConarh";
import HeaderConarhTwo from "../../components/Conarh2022/HeaderConarhTwo";
import PasswordInput from "components/Inputs/PasswordInput";
import Input from "components/Inputs/Input";

import { GetServerSideProps } from "next";
import { withSSRAuthConarh } from "utils/conarh2022/withSSRAuthConarh";
import { useAuthConarh } from "contexts/AuthConarhContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateExhibitor } from "services/exhibitor";
import { toast } from "react-toastify";

const signInFormSchema = yup.object().shape({
  name: yup.string(),
  niche: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  password: yup.string(),
  company_name: yup.string(),
  confirmPassword: yup.string(),
});

export default function EditProfile() {
  const { user, handleUpdateExhibitor } = useAuthConarh();

  interface UpdateExhibitorData {
    name: string;
    niche: string;
    email: string;
    phone: string;
    company_name: string;
    password?: string;
    confirmPassword?: string;
  }

  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors, isSubmitting } = formState;


  async function handleUpdateExhibitorForm(values: UpdateExhibitorData) {
    const { email, name, niche, password, confirmPassword, phone, company_name } = values;

    if (!email) setError('email', { message: "Email obrigatório" })
    if (!name) setError('name', { message: "Nome obrigatório" })
    if (!niche) setError('niche', { message: "Nicho obrigatório" })
    if (!phone) setError('phone', { message: "Telefone obrigatório" })
    if (!company_name) setError('company_name', { message: "Nome da empresa obrigatório" })

    if (!email || !name || !niche || !phone) {
      return
    }

    if (password) {
      if (password.length < 6) {
        setError('password', { message: "A senha deve ter no mínimo 6 caracteres" })
      } else {
        if (password !== confirmPassword) {
          return setError('confirmPassword', { message: "As senhas devem ser iguais" })
        }
      }
    }

    try {
      const exhibitor = await updateExhibitor(values);
      handleUpdateExhibitor(exhibitor);
      toast.success("Perfil atualizado!", {
        position: "top-right",
        autoClose: 3000
      })
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }


  useEffect(() => {
    setValue('name', user?.name);
    setValue('niche', user?.niche);
    setValue('phone', user?.phone);
    setValue('email', user?.email);
    setValue('company_name', user?.company_name);
  }, [user])

  return (
    <>
      <HeaderConarhTwo />

      <FormEditProfileConarh onSubmit={handleSubmit(handleUpdateExhibitorForm)}>
        <div className="divisionOne">
          <Input
            id="company_name"
            placeholder="Nome da empresa"
            defaultValue={user?.company_name}
            name="company_name"
            {...register('company_name', { value: user?.company_name })}
            onClick={() => clearErrors("company_name")}
            errorMessage={errors?.company_name?.message}
          />
          <Input
            id="niche"
            placeholder="Nicho da empresa"
            defaultValue={user?.niche}
            name="niche"
            {...register('niche', { value: user?.niche })}
            errorMessage={errors?.niche?.message}
            onClick={() => clearErrors("niche")}
          />
          <Input
            id="name"
            placeholder="Nome do responsável para contato"
            defaultValue={user?.name}
            name="name"
            {...register('name', { value: user?.name })}
            onClick={() => clearErrors("company_name")}
            errorMessage={errors?.name?.message}
          />
          <Input
            type="tel"
            name="phone"
            id="phone"
            autoFocus={true}
            defaultValue={user?.phone}
            onPhoneChange={(phone) => setValue('phone', phone)}
            errorMessage={errors?.phone?.message}
            onClick={() => clearErrors("phone")}
            {...register("phone", { value: user?.phone })}
            classNameContainer="input-tel"
          />

          <Input
            id="email"
            placeholder="E-mail do responsável"
            defaultValue={user?.email}
            name="email"
            onClick={() => clearErrors("email")}
            {...register('email', { value: user?.email })}
            errorMessage={errors?.email?.message}
          />
        </div>

        <div className="divisionTwo">
          <div className="title">Alterar Senha</div>

          <ContainerInputPassword>
            <PasswordInput
              name="password"
              id="password"
              label="Criar senha"
              {...register('password')}
              onClick={() => clearErrors("password")}
              errorMessage={errors.password?.message}
            />
          </ContainerInputPassword>

          <ContainerInputPassword>
            <PasswordInput
              name="confirmPassword"
              id="confirmPassword"
              label="Repetir senha"
              {...register('confirmPassword')}
              onClick={() => clearErrors("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
            />
          </ContainerInputPassword>
        </div>

        <ButtonPrimary
          textButton="Salvar alterações"
          loading={isSubmitting}
          type="submit"
          styleProp={{
            maxWidth: '25.25rem',
            width: '100%',
            height: '2.5rem',
            fontSize: '0.938rem',
            marginTop: '6.25rem'
          }}
        />

      </FormEditProfileConarh>

      <FooterConarh activeFixed={false} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuthConarh(
  async (context) => {

    return {
      props: {}
    }
  }
) 