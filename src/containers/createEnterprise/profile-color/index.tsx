import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import ButtonLink from 'components/Buttons/ButtonLink';
import Link from 'next/link';
import Input from 'components/Inputs/Input';

import Wheel from '@uiw/react-color-wheel';
import { toast } from 'react-toastify';
import ProfileLogoDropzone from 'components/ProfileLogoDropzone';
import { createTeamsAdminUser } from 'services/user';

import * as S from './styles'
import * as G from '../styles'
import { sendImageToS3 } from 'services/uploadService';
import { getFileName } from 'constants/functions';
import { useAuth } from 'contexts/AuthContext';
import { useProfile } from 'contexts/ProfileContext';

interface ProfileColorProps {
  handleNextButton: () => void;
  handlePrevButton: () => void;
  setUserDesign: (data) => void;
  adminUserForms: any;
}

export default function ProfileColor({
  handleNextButton,
  handlePrevButton,
  adminUserForms
}: ProfileColorProps) {
  const [profileColor, setProfileColor] = useState("#00ff8c")
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false);
  const [logoImage, setLogoImage] = useState<any>();
  const [logoFile, setLogoFile] = useState<any>()
  const [loadingAddImage, setLoadingAddImage] = useState(false);

  const { signIn } = useAuth();
  const { updateProfile } = useProfile();

  useEffect(() => {
  }, [profileColor])

  async function uploadLogoFile(file: any) {
    try {
      setLoadingAddImage(true);
      setLogoImage(file.path)

      toast.success("Imagem salva com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      setLoadingAddImage(false);
    } catch (error) {
      console.log(error)
      toast.error("Falha ao tentar atualizar imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
      setLoadingAddImage(false);
    }
  }

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

  async function handleCreateTeamsAdm(event: FormEvent) {
    event.preventDefault();

    let data = undefined
    if (logoFile !== undefined) {
      const file = await readUploadFileAsText(logoFile)
      const uploadedData = await sendImageToS3(file)
      data = { profileColor, logoImage: uploadedData.Key }
    } else {
      const defaultLogo = "https://unitok.s3.sa-east-1.amazonaws.com/default-logo-gray.svg"
      data = { profileColor, logoImage: defaultLogo }
    }
    const adm = await Object.assign(adminUserForms, data)
    try {
      await createTeamsAdminUser(adm);

      await signIn({
        phone: adminUserForms.phone,
        password: adminUserForms.password,
      });

      updateProfile('TEAMS_ADMIN');

      Router.push('/teams/enterprise-profile');
    } catch (error) {
      console.log(error)
      error?.error
        ? toast.error(error?.error)
        : toast.error("Falha ao cadastrar!");
    }
  }

  async function removeLogoImage() {
    try {
      setLoadingRemoveImage(true);

      const defaultImage =
        "/assets/default_logo.svg";
      setLogoImage(defaultImage);
      setLogoFile(undefined)

      document.getElementById("logoImage").style.background = `url(${defaultImage}) no-repeat center`
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
  return (
    <G.Wrapper>

      <S.Form
        onSubmit={handleCreateTeamsAdm}
      >
        <G.Title margin="7rem auto 4.35rem">Defina os padrões de perfil da empresa</G.Title>
        <S.Flex>
          <S.OptionContainer>
            <S.Text>Escolha o logotipo</S.Text>
            <S.Flex>
              <S.ButtonsLogoContainer>
                <ProfileLogoDropzone
                  onFileAdded={uploadLogoFile}
                  onRemove={removeLogoImage}
                  isAddLoading={loadingAddImage}
                  isRemoveLoading={loadingRemoveImage}
                  displayImageSrc={logoImage}
                  onFileChanged={setLogoFile}
                />
              </S.ButtonsLogoContainer>
            </S.Flex>
          </S.OptionContainer>

          <S.OptionContainer>
            <S.Text>Escolha uma cor para o perfil</S.Text>
            <S.Flex>
              <Wheel
                style={{ cursor: 'pointer' }}
                width={115}
                height={115}
                color={profileColor}
                onChange={(profileColor) => {
                  setProfileColor(profileColor.hex);
                }}
              />
              <S.ColorExample>
                <div
                  style={{
                    width: 66,
                    height: 28,
                    borderRadius: "50%",
                    background: profileColor,
                    marginRight: 15,
                  }}
                />

                <Input
                  id="perfilColorEditor"
                  // label={color}
                  value={profileColor}
                  onChange={(e) => setProfileColor(e.target.value)}
                />
              </S.ColorExample>
            </S.Flex>
          </S.OptionContainer>
        </S.Flex>

        <G.FlexButtonContainer margin="7.125rem 0 0 0">
          <ButtonLink
            type="submit"
            style={{ padding: '0 4.5rem' }}
            variant='secondary'
            onClick={handlePrevButton}
          >
            Voltar
          </ButtonLink>

          <ButtonLink
            type="submit"
            style={{ padding: '0 3.5rem' }}
          // disabled={!!imageTemporary}
          // loading={isSubmitting}
          >
            Criar login
          </ButtonLink>
        </G.FlexButtonContainer>
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
