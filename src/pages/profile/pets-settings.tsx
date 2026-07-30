import Head from "next/head";
import * as yup from "yup";

import { useForm } from "react-hook-form";

import { Heading } from "components/Typography";
import DashboardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";

import { withSSRAuth } from "utils/withSSRAuth";
import { useAuth } from "contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { updatePetProfileImage, updateProfileUser } from "services/user";

import * as S from "styles/pageStyles/intern-management/styles";
import ProfileImageDropzone from "components/ProfileImageDropzone";
import { useEffect, useState } from "react";

type ProfileData = {
  petProfileName: string;
}

const settingsFormSchema = yup.object({
  petProfileName: yup.string().required('Campo obrigatório')
});

export default function ProfileSettings() {
  const { user } = useAuth();
  
  const [avatarImage, setAvatarImage] = useState('/assets/icon_profile_pet.svg');

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(settingsFormSchema),
  });

  const { isSubmitting } = formState

  useEffect(() => {    
    if(user?.petProfileImage)
      setAvatarImage(user.petProfileImage)
  }, [user?.petProfileImage])  

  if (!user) 
    return null;

  async function handleUpdateProfile(data: ProfileData) {
    if (!data.petProfileName)
      return;

    try {
      await updateProfileUser({ petProfileName: data.petProfileName });  
      toast.success("Atualizado com sucesso");
    } catch {
      toast.error("Erro ao atualizar informações");
    }
  }

  async function uploadAvatarFile(file: any) {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("prefix", "files/pets/");

      updatePetProfileImage(formData);
    } catch (error) {
      toast.error("Falha ao tentar atualizar imagem!");
    }
  }

  async function removeAvatarImage() {
    try {
      await updateProfileUser({ petProfileImage: 'https://unitok.s3.sa-east-1.amazonaws.com/icon_profile_pet.svg' })
      setAvatarImage('https://unitok.s3.sa-east-1.amazonaws.com/icon_profile_pet.svg');
    } catch(e) {
      console.error('Erro ao excluir a image', e);
      toast.error('Erro ao excluir imagem');
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
              Dados do perfil Pets
            </Heading>

            <ProfileImageDropzone
              onFileAdded={uploadAvatarFile}
              onRemove={removeAvatarImage}
              displayImageSrc={avatarImage}
              prefix="pets-profile"
              shouldEditBanner={false}
              styleContainer={{ marginTop: "4rem" }}
            />

            <S.InputGrid>
              <Input
                placeholder="Digite o nome do perfil"
                id="petProfileName"
                errorMessage={formState.errors.petProfileName?.message}
                defaultValue={user?.petProfileName}
                {...register("petProfileName", { value: user?.petProfileName })}
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
  return { props: {} };
});
