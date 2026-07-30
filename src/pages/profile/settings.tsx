import Head from "next/head";
import * as yup from "yup";

import { useForm } from "react-hook-form";

import { Heading } from "components/Typography";
import DashboardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";

import { withSSRAuth } from "utils/withSSRAuth";
import { useAuth } from "contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { changePasswordUser } from "services/user";

import * as S from "styles/pageStyles/intern-management/styles";

const settingsFormSchema = yup.object({
  full_name: yup.string().required(),
  // phone: yup.string().required(),
  email: yup.string().required(),
  currentPassword: yup.string(),
  surname: yup.string(),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não combinam"),
});

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const { register, handleSubmit, formState, resetField } = useForm({
    resolver: yupResolver(settingsFormSchema),
  });

  const { isSubmitting } = formState

  if (!user) return null;

  async function handleUpdateProfile(data) {

    if (data.email !== user.email || data.full_name !== user.full_name || data.surname !== user.surname) {
      try {
        toast.info("Atualizando informações");
        await updateUser({
          full_name: data.full_name,
          email: data.email,
          surname: data.surname
        });

        toast.success("Atualizado com sucesso");
      } catch {
        toast.error("Erro ao atualizar informações");
      }
    }

    if (data.currentPassword && data.password) {
      if (data.currentPassword === data.password) {
        toast.error("Senhas nova e atual são as mesmas");
        return;
      }

      try {
        toast.info("Alterando senha");
        await changePasswordUser(data.currentPassword, data.password);
        resetField("currentPassword");
        resetField("password");
        resetField("passwordConfirmation");
        toast.success("Senha alterada com sucesso");
      } catch {
        toast.error("Erro ao alterar senha");
      }
    }
  }

  return (
    <>
      <Head>
        <title>Configurações | Unitok</title>
      </Head>
      <DashboardContainer variant="user-account" title="Configurações">
        <S.Form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Dados pessoais
            </Heading>
            <S.InputGrid>
              <Input
                label="Nome"
                id="nome"
                shouldMaintainLabelOnTop={!!user?.full_name}
                errorMessage={formState.errors.full_name?.message}
                defaultValue={user?.full_name}
                {...register("full_name", { value: user?.full_name })}
              />
              <Input
                label="Sobrenome"
                id="surname"
                shouldMaintainLabelOnTop={!!user?.surname}
                errorMessage={formState.errors.surname?.message}
                defaultValue={user?.surname}
                {...register("surname", { value: user?.surname })}
              />

              {/* Phone should not be present in v1 */}
              {/* <PhoneInput
                label="Telefone"
                shouldMaintainLabelOnTop
                id="phone"
                onFocus={() => clearErrors("phone")}
                defaultValue={user?.phone}
                errorMessage={formState.errors.phone?.message}
                control={control}
                setValue={setValue}
              /> */}
              <Input
                label="Email"
                id="email"
                type="email"
                shouldMaintainLabelOnTop={!!user?.email}
                errorMessage={formState.errors.email?.message}
                defaultValue={user?.email}
                {...register("email", { value: user?.email })}
              />
            </S.InputGrid>
          </div>
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Alterar senha
            </Heading>
            <S.InputGrid>
              <PasswordInput
                label="Senha atual"
                id="currentPassword"
                errorMessage={formState.errors.currentPassword?.message}
                {...register("currentPassword")}
              />
              <PasswordInput
                label="Nova senha"
                id="password"
                errorMessage={formState.errors.password?.message}
                {...register("password")}
              />
              <PasswordInput
                label="Confirme a nova senha"
                id="password_confirmation"
                errorMessage={formState.errors.passwordConfirmation?.message}
                {...register("passwordConfirmation")}
              />
            </S.InputGrid>
          </div>

          <div>
            <ButtonPrimary loading={isSubmitting} type="submit">Salvar alterações</ButtonPrimary>
          </div>
        </S.Form>
      </DashboardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
