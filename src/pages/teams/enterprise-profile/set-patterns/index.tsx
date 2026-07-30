import Head from "next/head";
import styled from 'styled-components'
import { Colors } from 'styles/Colors';
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RiInformationLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "components/Inputs/Input";
import DashbardContainer from "containers/dashboard";
import { Heading, Text } from "components/Typography";
import { ProfileBanner } from "components/ProfileBanner";
import ProfileLogoDropzone from "components/ProfileLogoDropzone";
import { ManageButtonsTeams } from "components/ManageButtonsTeams";
import PickerColor from "components/PickerColor";

import { formatUniqueName, getFileName } from "constants/functions";
import { updateProfileUser, verifyUniqueName } from "services/user";
import { teamsIconsPatterns } from "utils/IconsPatterns";

import ButtonLink from "components/Buttons/ButtonLink";
import { ToggleSwitch } from "components/Buttons/ButtonToggle";
import { useAuth } from "contexts/AuthContext";
import { sendImageToS3 } from "services/uploadService";
import { useRouter } from "next/router";
import { TeamsGroupProps } from "domain/TeamsGroup";
import { getTeamsGroups, updateTeamsGroup } from "services/teamsGroup";

export const Wrapper = styled.div`
  margin-bottom: 15rem;
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    margin-top: 4px;
  }
`

export const Form = styled.form`
  > * + * {
    margin-top: 2.875rem;
  }

  @media (max-width: 1119px) {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  @media (max-width: 540px) {
    width: 100%;

    .profileEditSubmitButton {
      width: 100%;
      height: 40px;
    }
  }
`;

export const HelpCircle = styled.span`
  position: relative;
  cursor: pointer;
  div{
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateY(100%);
    background: ${Colors.white};
    color: ${Colors.primaryGreen};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.9rem;
    padding: 1.2rem;
    text-align: left;
    z-index: 100;
    min-width: 320px;
    display: none;

    img {
      width: 100%;
      height: 100%;
      margin-top: 1rem;
    }
  }
  &.active div{
    display: block;
  }

  @media (max-width: 400px){
    div{
      min-width: 280px;
    }
  }
`;

export const ButtonsLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 1rem;
`

export const ColorExample = styled.div`
  width: 100%;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
`;


interface GroupInfo {
  id: string;
  label: string;
  isGroup: boolean;
}

const editFormSchema = yup.object().shape({
  name: yup.string(),
  full_name: yup.string(),
  // profession: yup.string(),
  // enterpriseName: yup.string(),
  // occupationArea: yup.string(),
  // workPhone: yup.string(),
});

const defaultButtonsInfo = teamsIconsPatterns
  .map(btnInfo => ({ hide: false, name: btnInfo.value, icon: btnInfo.icon, url: '', label: btnInfo.name }))

export default function SetPatterns() {
  const { updateUser, user } = useAuth();
  const [groups, setGroups] = useState<TeamsGroupProps[]>([]);
  const [name, setName] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false);
  const [logoImage, setLogoImage] = useState<any>();
  const [logoFile, setLogoFile] = useState<any>()
  const [isDefaultLogoImage, setIsDefaultLogoImage] = useState(false)
  const [loadingAddImage, setLoadingAddImage] = useState(false);
  const [color, setColor] = useState<string>("#007A78")
  const [allowUserChangeColor, setAllowUserChangeColor] = useState(true)
  const [blockUserSendContacts, setBlockUserSendContacts] = useState(true)
  const [blockUserSaveContact, setBlockUserSaveContact] = useState(true)
  const [blockEditProfileInfo, setBlockEditProfileInfo] = useState(true)
  const [socialButtons, setSocialButtons] = useState(defaultButtonsInfo)
  const [buttonsPartternUpdated, setButtonsPartternUpdated] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<GroupInfo[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!user?._id)
      return;

    setName(user?.name)
    setEnterpriseName(user?.enterpriseName)
    // setAllowUserChangeColor(user.allowUsersUpdateProfileColor);
    // setAllowContactUserBeSaved(user.blockSendContacts);
    // setBlockUserSaveContact(user.blockSaveContact);
    setColor(user.profileColor);

    getTeamsGroups({ administratorId: user._id })
      .then(res => setGroups(res.payload))
      .catch(e => console.error('Erro ao consultar grupos', e))
  }, [user]);

  const handleSelectedGroupsChanged = useCallback((selectedGroups: GroupInfo[]) => {
    setSelectedGroups(selectedGroups);

    let buttonsPattern = [];

    if (selectedGroups.length === 0 || selectedGroups.length > 1) {
      buttonsPattern = defaultButtonsInfo;
    } else {
      const selectedGroup = selectedGroups[0];

      if (selectedGroup.id === "ALL_USERS" || selectedGroup.id === "ALL_WITHOUT_GROUP") {
        buttonsPattern = user?.buttons.length > 0 ? user.buttons : defaultButtonsInfo;
      } else {
        const groupData = groups.find(group => group._id === selectedGroup.id);
        if (groupData && groupData.buttons?.length > 0) {
          buttonsPattern = groupData.buttons
        } else {
          buttonsPattern = defaultButtonsInfo;
        }
      }
    }

    const updatedSocialButtons = defaultButtonsInfo
      .map(buttonInfo => {
        let userButtonInfo = buttonsPattern.find(button => button.name === buttonInfo.name);

        if (!userButtonInfo) {
          userButtonInfo = {
            hide: false,
            name: buttonInfo.name,
            url: '',
            highlighted: false,
            isDirectLink: false
          }
        }

        return {
          ...userButtonInfo,
          icon: buttonInfo.icon,
          label: buttonInfo.label
        }
      })

    setSocialButtons(updatedSocialButtons);
  }, [groups, user?.buttons])

  useEffect(() => {
    if (router.query && router.query.id && router.query.label)
      handleSelectedGroupsChanged([{ id: String(router.query.id), label: String(router.query.label), isGroup: true }])
  }, [handleSelectedGroupsChanged, router.query])

  const defaultLogoImage = "https://unitok.s3.sa-east-1.amazonaws.com/default-logo-gray.svg";

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleVerifyUniqueName = async () => {
    const nameFormated = formatUniqueName(name);
    setName(nameFormated);
    setValue("name", nameFormated);

    try {
      const data = await verifyUniqueName(nameFormated);
      if (data.nameExists) throw Error

    } catch (error) {
      toast.error("Nome único já utilizado no unitok. ", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

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

  async function uploadLogoFile(file: any) {
    try {
      setLoadingAddImage(true);
      setLogoImage(file.path)

      const fileAsText = await readUploadFileAsText(file)
      const uploadedData = await sendImageToS3(fileAsText)

      await updateUser({ logoImage: uploadedData.Key });

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

  async function removeLogoImage() {
    try {
      setLoadingRemoveImage(true);

      setIsDefaultLogoImage(true)
      setLogoImage(defaultLogoImage)
      await updateUser({ logoImage: defaultLogoImage })
      setLogoFile(undefined)

      document.getElementById("logoImage").style.background = `url(${defaultLogoImage}) no-repeat center`
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

  const handleUpdate = async () => {
    try {
      let newUserData = {
        name,
        enterpriseName,
        profileColor: color,
      }

      await updateUser(newUserData);
      
      if (buttonsPartternUpdated) {
        updateButtonsPatterns();
      }

      toast.success("Informações atualizadas com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      router.back()
    } catch (error) {
      toast.error(error);
      console.log(error)
    }
  }

  useEffect(() => {
    if(!buttonsPartternUpdated)
      setButtonsPartternUpdated(true)
  }, [blockUserSendContacts, blockUserSaveContact, allowUserChangeColor])

  async function updateButtonsPatterns() {
    let selectedGroupsIds = selectedGroups.map(group => group.id);
    if (selectedGroupsIds.includes('ALL_USERS')) {
      await updateProfileUser({ 
        buttons: socialButtons,
        blockSaveContact: !blockUserSaveContact,
        blockSendContacts: !blockUserSendContacts,
        blockEditProfile: !blockEditProfileInfo,
        allowUsersUpdateProfileColor: allowUserChangeColor
       });

      selectedGroupsIds = groups.map(group => group._id);
    }

    if (selectedGroupsIds.includes('ALL_WITHOUT_GROUP')) {
      await updateProfileUser({
        buttons: socialButtons,
        blockSaveContact: !blockUserSaveContact,
        blockSendContacts: !blockUserSendContacts,
        blockEditProfile: !blockEditProfileInfo,
        allowUsersUpdateProfileColor: allowUserChangeColor
       });

      selectedGroupsIds = selectedGroupsIds.filter(groupId => groupId !== 'ALL_WITHOUT_GROUP');
    }

    for (const groupId of selectedGroupsIds) {
      await updateTeamsGroup(groupId, { 
        buttons: socialButtons,
        blockSaveContact: !blockUserSaveContact,
        blockSendContacts: !blockUserSendContacts,
        blockEditProfile: !blockEditProfileInfo,
        allowUsersUpdateProfileColor: allowUserChangeColor
       });
    }
  }

  return (
    <>
      <Head>
        <title>Definir padrões | Unitok</title>
      </Head>
      <DashbardContainer variant="teams-admin" title="Definir padrões">
        <Wrapper>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              id="name"
              placeholder="Nome de usuário"
              value={name}
              style={{ paddingLeft: "0.2rem" }}
              leftElement={
                <Text
                  as="span"
                  color="secondary"
                  style={{ marginRight: "-0.5rem" }}
                >
                  unitok.com/
                </Text>
              }
              rightElement={
                <HelpCircle
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.toggle("active");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.toggle("active");
                  }}
                >
                  <RiInformationLine size={18} />
                  <div>
                    <Text as="span" color="secondary">
                      Este é o link onde seu perfil ficará registrado para que as
                      pessoas consigam acessá-lo ao escanear seu QR Code ou
                      encostar o celular em seu Unitok.
                    </Text>
                  </div>
                </HelpCircle>
              }
              {...register("name")}
              errorMessage={errors?.name?.message}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleVerifyUniqueName}
            />

            <Input
              id="enterpriseName"
              placeholder="Nome da empresa"
              value={enterpriseName}
              {...register("full_name")}
              errorMessage={errors?.enterpriseName?.message}
              onChange={(e) => setEnterpriseName(e.target.value)}
            />

            <Flex>
              <Heading>Banner</Heading>
              <HelpCircle
                onMouseEnter={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <RiInformationLine size={18} />
                <div>
                  <Text as="span" color="secondary">
                    A foto escolhida para o banner, ficará visível em todos os perfis <br /> dos usuários da empresa. Exemplo:
                  </Text>
                  <img src="/assets/banner_example.png" alt="banner example"></img>
                </div>
              </HelpCircle>
            </Flex>

            <ProfileBanner />

            <Flex style={{ marginTop: "5rem" }}>
              <Heading>Logotipo</Heading>
              <HelpCircle
                onMouseEnter={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <RiInformationLine size={18} />
                <div>
                  <Text as="span" color="secondary">
                    A logo escolhida ficará visível em todos os perfis dos usuários da empresa. Exemplo:
                  </Text>
                  <img src="/assets/logo_example.png" alt="banner example"></img>
                </div>
              </HelpCircle>
            </Flex>
            <ButtonsLogoContainer>
              <ProfileLogoDropzone
                onFileAdded={uploadLogoFile}
                onRemove={removeLogoImage}
                isAddLoading={loadingAddImage}
                isRemoveLoading={loadingRemoveImage}
                displayImageSrc={logoImage}
                onFileChanged={setLogoFile}
              />
            </ButtonsLogoContainer>

            <ManageButtonsTeams
              groupsChecked={selectedGroups}
              showOnlyButtons={false}
              socialButtons={socialButtons}
              onSocialButtonsChanged={(buttons) => {
              setSocialButtons(buttons)
              setButtonsPartternUpdated(true)
              }}
              blockUserSendContacts={blockUserSendContacts}
              onBlockUserSendContacts={setBlockUserSendContacts}
              blockUserSaveContact={blockUserSaveContact}
              onBlockUserSaveContact={setBlockUserSaveContact}
              onSelectedGroupsChanged={handleSelectedGroupsChanged}
              blockEditProfileInfo={blockEditProfileInfo}
              onBLockEditProfileInfo={setBlockEditProfileInfo}
              groups={groups}
            />

            <Heading>Cor do perfil</Heading>
            <Flex>
              <ToggleSwitch
                switchValue={allowUserChangeColor}
                onChangeValue={setAllowUserChangeColor}
                label="switchColorToggle"
              />
              <Text>Permitir que o usuário altere a cor do perfil</Text>
            </Flex>

            <PickerColor color={color} setColor={setColor} />

            <ColorExample>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: color,
                  marginRight: 15,
                }}
              />

              <Input
                id="perfilColorEditor"
                // label={color}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </ColorExample>

            <ButtonLink
              type="submit"
              onClick={handleSubmit(handleUpdate)}
              textButton="Salvar"
              styleProp={"width: 20rem"}
            />
          </Form>
        </Wrapper>
      </DashbardContainer>
    </>
  )
}
