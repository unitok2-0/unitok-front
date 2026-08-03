import Head from "next/head";
import * as yup from "yup";

import { useForm } from "react-hook-form";

import PhoneInput from "components/PhoneInput";

import { Heading } from "components/Typography";
import DashboardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";

import * as S from "styles/pageStyles/intern-management/styles";
import { withSSRAuth } from "utils/withSSRAuth";
import { useAuth } from "contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { changePasswordUser } from "services/user";
import { FormEvent, useEffect, useState } from "react";
import ProfileLogoDropzone from "components/ProfileLogoDropzone";
import { getFileName } from "constants/functions";
import { sendImageToS3 } from "services/uploadService";
import { useRouter } from "next/router";

const settingsFormSchema = yup.object({
  enterpriseName: yup.string().required("Nome da empresa está vazio"),
  phone: yup.string().required(("Número de celular está vazio")),
  email: yup.string().required(("Email está vazio")),
  currentPassword: yup.string(),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não combinam"),
});

export default function ProfileSettings() {
  const [loadingAddImage, setLoadingAddImage] = useState(false);
  const [avatarImage, setAvatarImage] = useState<any>();
  const [avatarFile, setAvatarFile] = useState<any>()
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false);
  const [isDefaultAvatarImage, setIsDefaultAvatarImage] = useState(false)

  const { user, updateUser, updateImageUser } = useAuth();

  const { register, handleSubmit, formState, resetField } = useForm({
    resolver: yupResolver(settingsFormSchema),
  });

  const router = useRouter()
  const defaultAvatar = "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png";


  if (!user) return null;

  const readUploadFileAsText = (file: File) => {
    const reader = new FileReader();
    return new Promise<any>((resolve, reject) => {

      // window.URL.revokeObjectURL(file.preview);
      reader.onload = () => {
        const uri = reader.result;
        const name = `files/${getFileName(file.name)}`
        resolve({ uri, name, type: file.type, originalFileName: file.name });
      };
      reader.onabort = () => alert("Leitura do arquivo cancelada");
      reader.onerror = () => {
        reader.abort();
        reject(alert("Problem parsing input file."));
      };
      reader.readAsDataURL(file);
    });
  };

  async function removeAvatarImage() {
    try {
      setLoadingRemoveImage(true);

      setIsDefaultAvatarImage(true)
      setAvatarImage(defaultAvatar)
      await updateUser({ userImage: defaultAvatar })
      setAvatarFile(undefined)

      document.getElementById("logoImage").style.background = `url(${defaultAvatar}) no-repeat center`
      document.getElementById("logoImage").style.backgroundSize = "cover"

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

  async function uploadAvatarFile(file: any) {
    try {
      setLoadingAddImage(true);
      setAvatarImage(file.path)

      const formData = new FormData();
      formData.append("picture", file);
      formData.append("prefix", "files/");

      await updateImageUser(formData);

      toast.success("Imagem salva com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.log(error)
      toast.error("Falha ao tentar atualizar imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoadingAddImage(false);
    }
  }

  const handleUpdateProfile = async (data) => {
    try {
      let newAccoutData = {
        enterpriseName: data.enterpriseName,
        phone: data.phone,
        email: data.email,
      }

      await updateUser(newAccoutData);

      toast.success("Atualizado com sucesso");
      router.push("/teams/enterprise-profile")
    } catch {
      toast.error("Erro ao atualizar informações");
    }

    if (data.currentPassword && data.password) {
      if (data.currentPassword === data.password) {
        toast.error("Senhas nova e atual são as mesmas");
        return;
      }

      try {
        await changePasswordUser(data.currentPassword, data.password);
        resetField("currentPassword");
        resetField("password");
        resetField("passwordConfirmation");
        toast.success("Senha alterada com sucesso");
      } catch {
        toast.error("Erro ao alterar senha, revise o campo de senha atual");
      }
    }
  }

  return (
    <>
      <Head>
        <title>Configurações | Unitok</title>
      </Head>
      <DashboardContainer variant="teams-admin" title="Configurações">

        <Heading font="titleSm" extendStyle={"margin-bottom: 1rem"} >
          Foto de perfil
        </Heading>
        <div style={{ width: "10rem", marginBottom: "3.5rem" }}>
          <ProfileLogoDropzone
            isAvatarImg={true}
            onFileAdded={uploadAvatarFile}
            onRemove={removeAvatarImage}
            isAddLoading={loadingAddImage}
            isRemoveLoading={loadingRemoveImage}
            displayImageSrc={avatarImage}
            onFileChanged={setAvatarFile}
          />
        </div>
        <S.Form onSubmit={handleSubmit(handleUpdateProfile)}>
          <Heading font="titleSm" style={{ marginBottom: "-2.5rem" }}>
            Dados de login
          </Heading>
          <S.InputGrid>
            <Input
              id="enterpriseName"
              shouldMaintainLabelOnTop={!!user?.enterpriseName}
              errorMessage={formState.errors.enterpriseName?.message}
              defaultValue={user?.enterpriseName}
              {...register("enterpriseName", { value: user?.enterpriseName })}
              style={{ color: "#4F4F4F" }}
            />
            <Input
              type="tel"
              id="phone"
              shouldMaintainLabelOnTop={!!user?.phone}
              errorMessage={formState.errors.phone?.message}
              defaultValue={user?.phone}
              {...register("phone", { value: user?.phone })}
              style={{ color: "#4F4F4F" }}
            />

            <Input
              id="email"
              type="email"
              shouldMaintainLabelOnTop={!!user?.email}
              errorMessage={formState.errors.email?.message}
              defaultValue={user?.email}
              {...register("email", { value: user?.email })}
              style={{ color: "#4F4F4F" }}
            />

            <Heading font="titleSm" style={{ marginTop: "2.5rem" }}>
              Alterar senha
            </Heading>

            <PasswordInput
              label="Senha atual"
              id="currentPassword"
              errorMessage={formState.errors.currentPassword?.message}
              {...register("currentPassword")}
              style={{ color: "#4F4F4F" }}
            />
            <PasswordInput
              label="Nova senha"
              id="password"
              errorMessage={formState.errors.password?.message}
              {...register("password")}
              style={{ color: "#4F4F4F" }}
            />
            <PasswordInput
              label="Confirme a nova senha"
              id="password_confirmation"
              errorMessage={formState.errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
              style={{ color: "#4F4F4F" }}
            />
          </S.InputGrid>

          <ButtonPrimary
            type="submit"
            styleProp={"width: 20rem"}
          >
            Salvar alterações
          </ButtonPrimary>

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
