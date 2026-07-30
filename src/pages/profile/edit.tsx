import React, { useState } from "react";
import jwt_decode from 'jwt-decode';
import Head from "next/head";
import Select from 'react-select';
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiHelpCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import WindowedSelect from "react-windowed-select";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import { withSSRAuth } from "../../utils/withSSRAuth";
import { Heading, Text } from "components/Typography";
import DashbardContainer from "containers/dashboard";
import Input from "components/Inputs/Input";
import PickerColor from "components/PickerColor";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import ProfileImageDropzone from "components/ProfileImageDropzone";
import { useAuth } from "contexts/AuthContext";
import { ButtonsProps, UserProps } from "domain/User";
import { formProfileUserProps, getAllProfessions, getUser, verifyUniqueName } from "services/user";
import { formatUniqueName } from "constants/functions";
import useDisclosure from "hooks/useDisclosure";
import { ModalGifButtons } from "components/Modals/ModalGifButtons";
import { getTeamsGroup } from "services/teamsGroup";
import { TeamsGroupProps } from "domain/TeamsGroup";
import EditProfileList from "components/EditProfileList";

import * as S from "../../styles/pageStyles/profile/styles";

// const EditProfileList = dynamic(() => import("components/EditProfileList"), {
//   ssr: false,
// });

const editFormSchema = yup.object().shape({
  name: yup.string(),
  full_name: yup.string(),
  profession: yup.string(),
  enterpriseName: yup.string(),
  occupationArea: yup.string(),
  workPhone: yup.string(),
});

interface ProfileProps {
  user: UserProps;
  group?: TeamsGroupProps;
  admin?: UserProps;
  buttonsPattern?: ButtonsProps[];
  listProfessions: Array<{
    value: string;
    label: string;
  }>
}

export default function Profile({ user, admin, buttonsPattern, listProfessions, group }: ProfileProps) {
  const {
    updateUser,
    updateImageUser,
    setImageTemporary,
    imageTemporary,
  } = useAuth();

  const firstNameData = user?.full_name?.split(' ')

  const [avatarImage, setAvatarImage] = useState(user.userImage);
  const [uniqueName, setUniqueName] = useState(user.name);
  const [firstName, setFirstName] = useState(firstNameData ? firstNameData[0] : '');
  const [occupationArea, setOccupationArea] = useState<any>(user.occupationArea);
  const [workPhone, setWorkPhone] = useState(user.workPhone);
  const [enterpriseName, setEnterpriseName] = useState(user.enterpriseName);
  const [surname, setSurname] = useState(user.surname);
  const [profession, setProfession] = useState(user.profession);
  const [color, setColor] = useState(user.profileColor);
  const [loadingRemoveImage, setloadingRemoveImage] = useState(false);
  const [loadingAddImage, setloadingAddImage] = useState(false);

  const router = useRouter()

  const isTeamUser = !!user.administrator;

  const enabledButtons = isTeamUser && buttonsPattern && buttonsPattern
    .filter(btnPattern => btnPattern.hide === false)
    .map(btnPattern => btnPattern.name);

  const [socialButtons, setSocialButtons] = useState<ButtonsProps[]>(() => {
    if(isTeamUser && enabledButtons) {
      const filteredButtons = user.buttons?.filter(btn => enabledButtons.includes(btn.name));
      return filteredButtons;
    } else {
      return user.buttons;
    }
  });

  const modalGifButtons = useDisclosure();

  const saveImageUser = async (url: string) => {
    const form = {
      userImage: url,
    };

    await updateUser(form);
  };

  async function uploadAvatarFile(file: any, fileTemporary: any) {
    try {
      setloadingAddImage(true);
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("prefix", "files/");

      let imageTemporary = fileTemporary;

      updateImageUser(formData);

      if (imageTemporary) {
        setImageTemporary("imageTemporary");
        // setAvatarImage(imageTemporary);
      }

      setTimeout(() => {
        const message = imageTemporary
          ? "Imagem salva com sucesso!"
          : "Imagem enviada, em breve estara no seu perfil!";
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
        });

        setloadingAddImage(false);
      }, 300);
    } catch (error) {
      toast.error("Falha ao tentar atualizar imagem!", {
        position: "top-right",
        autoClose: 4000,
      });

    }
  }

  async function removeAvatarImage() {
    try {
      setloadingRemoveImage(true);

      const defaultImage = "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png";
      setAvatarImage(defaultImage);
      await saveImageUser(defaultImage);

      toast.success("Imagem removida sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      setloadingRemoveImage(false);
    } catch (error) {
      toast.error("Falha remover imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
      setloadingRemoveImage(false);
    }
  }

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    resolver: yupResolver(editFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleUpdate: SubmitHandler<formProfileUserProps> = async (values) => {
    const items = [...socialButtons];

    // const updatedButtons = items.map((data) => ({
    //   name: data.name,
    //   website_name: data.website_name,
    //   title: data.title,
    //   url: data.url,
    //   hide: data.hide,
    //   highlighted: data.highlighted,
    //   isDirectLink: data.isDirectLink,
    // }));

    const updatedButtons = items.map(({_id, ...data}) => ({...data}));

    const name = surname === undefined ? firstName : `${firstName} ${surname}`

    let objPropetys = {
      name: formatUniqueName(uniqueName),
      full_name: name,
      surname: surname,
      enterpriseName: enterpriseName,
      workPhone: workPhone,
      profession: profession,
      occupationArea: occupationArea,
      profileColor: color,
      buttons: updatedButtons,
    };

    try {
      await updateUser(objPropetys);
      router.push('/profile/me')
      toast.success("Informações atualizadas com sucesso!", {
        position: "top-right",
      });
    } catch (error) {
      if (objPropetys.full_name === "" || objPropetys.surname === "") {
        toast.error("Campo nome e sobrenome do usuário é obrigatório", {
          position: "top-right",
          autoClose: 5000,
        })
        console.log(`o surname eh: ${objPropetys.surname}`)
      } else {
        toast.error(error?.error || error, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  };

  const handleVerifyUniqueName = async () => {
    const nameFormated = formatUniqueName(uniqueName);
    setUniqueName(nameFormated);
    setValue("name", nameFormated);

    try {
      await verifyUniqueName(nameFormated);
    } catch (error) {
      toast.error("Nome único já utilizado no unitok. ", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  function setColorProps(hex: string) {
    setColor(hex);
  }

  const isEditProfileInfoBlocked = group?.blockEditProfile ? true : user?.blockEditProfile ? true : false
  return (
    <DashbardContainer variant="user-account">
      <Head>
        <title>Perfil | Unitok</title>
      </Head>

      <S.MainContainer>
        <Heading as="h1" font="titleMdLight" color="primary">
          Editar perfil
        </Heading>

        <S.Form onSubmit={(e) => { e.preventDefault() }}>
          <Input
            id="perfilEdit1"
            placeholder="Nome de usuário"
            value={uniqueName}
            style={{ paddingLeft: "0.2rem" }}
            disabled={isEditProfileInfoBlocked}
            leftElement={
              <Text
                as="span"
                color="secondary"
                style={{ marginRight: "-0.5rem" }}
              >
                {isTeamUser && admin ? `unitok.com/${admin.name}/` : 'unitok.com/'}
              </Text>
            }
            rightElement={
              <S.HelpCircle
                onMouseEnter={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <BiHelpCircle size={18} />
                <div>
                  <Text as="span" color="secondary">
                    Este é o link onde seu perfil ficará registrado para que as
                    pessoas consigam acessá-lo ao escanear seu QR Code ou
                    encostar o celular em seu Unitok.
                  </Text>
                </div>
              </S.HelpCircle>
            }
            {...register("name")}
            errorMessage={errors?.name?.message}
            onChange={(e) => setUniqueName(e.target.value)}
            onBlur={handleVerifyUniqueName}
          />
          
          {/* <div style={{ height: "1rem", marginTop: "0rem" }} /> */}

          <ProfileImageDropzone
            onFileAdded={uploadAvatarFile}
            onRemove={removeAvatarImage}
            displayImageSrc={avatarImage}
            isAddLoading={loadingAddImage}
            isRemoveLoading={loadingRemoveImage}
            shouldEditBanner={!isTeamUser}
            styleContainer={{ marginTop: "4rem" }}
          />

          <Input
            id="perfilEdit2"
            placeholder="Digite seu nome"
            value={firstName}
            {...register("full_name")}
            errorMessage={errors?.full_name?.message}
            onChange={(e) => setFirstName(e.target.value)}
            styleContainer={{ marginTop: "1rem" }}
            disabled={isEditProfileInfoBlocked}
          />

          <Input
            id="surname"
            placeholder="Digite seu sobrenome"
            value={surname}
            {...register("surname")}
            errorMessage={errors?.surname?.message}
            onChange={(e) => setSurname(e.target.value)}
            disabled={isEditProfileInfoBlocked}
          />

          {!isTeamUser && (
            <Input
              id="perfilEdit3"
              placeholder="Digite o nome da empresa (opcional)"
              value={enterpriseName}
              {...register("enterpriseName")}
              /* defaultValue={user?.enterpriseName} */
              errorMessage={errors?.enterpriseName?.message}
              onChange={(e) => setEnterpriseName(e.target.value)}
            />
          )}

          {!isTeamUser && (
            <Input
              id="perfilEdit4"
              type="tel"
              placeholder="Digite o seu número empresarial (opcional)"
              defaultValue={user?.phone}
              value={workPhone}
              {...register("workPhone")}
              errorMessage={errors?.workPhone?.message}
              onChange={(e) => setWorkPhone(e.target.value)}
              onPhoneChange={(phone) => setWorkPhone(phone)}
            />
          )}

          <S.SelectInputWrapper>
           <Input
              id="perfilEdit5"
              placeholder="Escolha sua área de atuação"
              value={occupationArea}
              {...register("occupationArea")}
              /* defaultValue={user?.occupationArea} */
              errorMessage={errors?.occupationArea?.message}
              onChange={(e) => setOccupationArea(e.target.value)}
            />
            {/* <Select 
              options={listProfessions}
              placeholder={occupationArea ? occupationArea : 'Escolha sua área de atuação'}
              onChange={(option) => setOccupationArea(option)}
              value={occupationArea}
              isDisabled={isEditProfileInfoBlocked}
              styles={{
                container: (base) => ({
                  ...base,
                  border: 'none',
                  outline: 'none',
                  borderBottom: '1px solid #01302F',
                  marginTop: '-16px',
                }),
                placeholder: (base) =>({
                  ...base,
                  padding: 0,
                  color: '#909692',
                  marginTop: '16px'
                }),
                control: (base, state) => ({
                  ...base,
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  outline: 'none'
                }),
                singleValue: (base) => ({
                  ...base,
                  padding: 0,
                  color: '#909692',
                  marginTop: '16px'
                }),
                input: (base) => ({
                  ...base,
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: 0,
                }),
                indicatorSeparator: (base) => ({
                  display: 'none'
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  background: isFocused ? '#FFF' : isSelected ? '#FFF' : 'none',
                  color: isSelected ? '#FF4C1C' : 'none',
                })
              }}
            /> */}

            {/* <WindowedSelect
              value={listProfessions.find(occ => occ.value === occupationArea)}
              placeholder="Escolha sua área de atuação"
              onChange={(option: any) => { setOccupationArea(option.value) }}
              options={listProfessions}
              windowThreshold={50}
              styles={{
                container: (base) => ({
                  ...base,
                  border: 'none',
                  outline: 'none',
                  borderBottom: '1px solid #01302F',
                }),
                control: (base, state) => ({
                  ...base,
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  outline: 'none'
                }),
                input: (base) => ({
                  ...base,
                  outline: 'none'
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: 0
                }),
                indicatorSeparator: (base) => ({
                  display: 'none'
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  background: isFocused ? '#FFF' : isSelected ? '#FFF' : 'none',
                  color: isSelected ? '#FF4C1C' : 'none',
                }),
              }}
            /> */}
            <div style={{
              fontSize: '0.688rem',
              fontWeight: 400,
              marginBottom: '-20px',
            }}>Esta informação não aparecerá no seu perfil</div>
          </S.SelectInputWrapper>

          {!isTeamUser && (
            <Input
              id="perfilEdit4"
              placeholder="Digite um cargo (opcional)"
              value={profession}
              {...register("profession")}
              errorMessage={errors?.profession?.message}
              onChange={(e) => setProfession(e.target.value)}
            />
          )}

          <S.IconsContainer>
            <Heading
              as="h2"
              font="titleSm"
              color="secondary"
              style={{
                lineHeight: '27px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              Botões do seu perfil

              <AiOutlineExclamationCircle
                style={{
                  cursor: 'pointer',
                  marginLeft: '12px'
                }}
                onClick={modalGifButtons.handleToggle}
                title="Como arrastar os botões"
              />

              <ModalGifButtons
                closeModal={modalGifButtons.handleClose}
                modalIsOpen={modalGifButtons.isOpen}
                afterOpenModal={modalGifButtons.handleOpen}
              />

            </Heading>

            <EditProfileList
              socialButtons={socialButtons}
              setButtons={setSocialButtons}
              getValuesUser={getValues}
              colorUser={color}
              buttonsToShow={enabledButtons}
            />
          </S.IconsContainer>

          {((!isTeamUser) || 
          (isTeamUser &&
           admin && 
           user.allowUsersUpdateProfileColor && 
           group.allowUsersUpdateProfileColor)) && 
           (
            <S.ColorContainer>
              <Heading
                // as='h1'
                font="titleSm"
                color="secondary"
              >
                Cor do perfil
              </Heading>

              {/* <PickerColor color={color} onChange={({ hex }) => setColor(hex)} /> */}
              <PickerColor color={color} setColor={setColorProps}></PickerColor>

              <S.ColorExample>
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
              </S.ColorExample>
            </S.ColorContainer>
          )}

          <ButtonPrimary
            type="submit"
            disabled={!!imageTemporary}
            loading={isSubmitting}
            style={{
              marginTop: 89,
              minWidth: "18.875rem",
            }}
            className="profileEditSubmitButton"
            onClick={handleSubmit(handleUpdate)}
          >
            Salvar alterações
          </ButtonPrimary>
        </S.Form>
      </S.MainContainer>
    </DashbardContainer>
  );
};

/* export default Profile; */

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['unitok.token'];
  const decoded = jwt_decode(token);
  const userId = decoded['_id'];


  const user: UserProps = await getUser(userId, ctx);
  let admin: UserProps | null = null;
  let group: TeamsGroupProps | null = null

  let buttonsPattern: ButtonsProps[] | null = null;

  if(user?.teamsGroup) {
     group = await getTeamsGroup(user.teamsGroup.groupId, ctx);

    if(group && group.buttons && group.buttons.length > 0)
      buttonsPattern = group.buttons;
  }

  if(user.administrator) {
    admin = await getUser(user.administrator, ctx);

    if(!buttonsPattern && admin && admin.buttons && admin.buttons.length > 0)
      buttonsPattern = admin.buttons;
  }

  const listProfessions = await getAllProfessions({ ctx });

  return {
    props: {
      user,
      admin,
      buttonsPattern,
      listProfessions,
      group
    },
  };
});
