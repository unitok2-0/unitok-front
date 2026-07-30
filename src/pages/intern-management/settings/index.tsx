import { useRouter } from "next/router";
import Head from "next/head";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import PhoneInput from "components/PhoneInput";

import { Heading } from "components/Typography";
import DashboardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";

import * as S from "styles/pageStyles/intern-management/styles";
import ProfileImageDropzone from "components/ProfileImageDropzone";
import { withSSRAuth } from "utils/withSSRAuth";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";
import { changePasswordUser } from "services/user";
import { useState } from "react";
import { sendImageToS3 } from "services/uploadService";

const settingsFormSchema = yup.object({
  full_name: yup.string().required(),
  // phone: yup.string().required(),
  email: yup.string().required(),
  currentPassword: yup.string(),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não combinam"),
});

export default function AddAccount() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { register, handleSubmit, formState, resetField } = useForm({
    resolver: yupResolver(settingsFormSchema),
  });

  const [loadingAddImage, setLoadingAddImage] = useState(false);
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false);
  const [avatarImage, setAvatarImage] = useState("");

  if (!user) return null;

  async function handleUpdateProfile(data) {
    if (data.email !== user.email || data.full_name !== user.full_name) {
      try {
        toast.info("Atualizando informações");
        await updateUser({
          full_name: data.full_name,
          email: data.email,
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
  const saveImageUser = async (url: string) => {
    const form = {
      userImage: url,
    };
    const user = await updateUser(form);
  };

  async function uploadAvatarFile(file: any = {}) {
    try {
      setLoadingAddImage(true);
      const s3Response = await sendImageToS3(file);
      // setLoadingUploadImage(true);
      setAvatarImage(s3Response.Location);

      await saveImageUser(s3Response.Location);

      toast.success("Imagem salva com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      setLoadingAddImage(false);
    } catch (error) {
      toast.error("Falha ao tentar atualizar imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
      setLoadingAddImage(false);
    }
  }

  async function removeAvatarImage() {
    try {
      setLoadingRemoveImage(true);

      const defaultImage =
        "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png";
      setAvatarImage(defaultImage);
      await saveImageUser(defaultImage);

      toast.success("Imagem removida sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      setLoadingRemoveImage(false);
    } catch (error) {
      toast.error("Falha remover imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
      setLoadingRemoveImage(false);
    }
  }

  return (
    <>
      <Head>
        <title>Configurações | Unitok</title>
      </Head>
      <DashboardContainer title="Configurações">
        <div style={{ marginBottom: "5.75rem" }}>
          <ProfileImageDropzone
            onFileAdded={uploadAvatarFile}
            onRemove={removeAvatarImage}
            isAddLoading={loadingAddImage}
            isRemoveLoading={loadingRemoveImage}
            displayImageSrc={avatarImage || user?.userImage}
          />
        </div>
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
            <ButtonPrimary type="submit">Salvar alterações</ButtonPrimary>
            {/* <ButtonPrimary
              variant="secondary"
              type="button"
              style={{ marginTop: "1rem  " }}
              onClick={() => router.push("settings/add-admin")}
            >
              Adicionar novo admnistrador
            </ButtonPrimary>

            <ButtonPrimary
              variant="tertiary"
              type="button"
              style={{ marginTop: "2rem  " }}
            >
              Excluir conta
            </ButtonPrimary> */}
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
