import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import * as S from "../../../styles/pageStyles/profile/pets/styles";

import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Heading, Text } from "components/Typography";
import DashbardContainer from "containers/dashboard";
import Input from "components/Inputs/Input";
import { BiHelpCircle } from "react-icons/bi";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import ProfileImageDropzone from "components/ProfileImageDropzone";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  formProfileUserProps,
  getAllProfessions,
  verifyUniqueName,
} from "services/user";
import { formatUniqueName } from "constants/functions";
import { useRouter } from "next/router";
import SelectWithSearch from "components/SelectWithSearch";
import {
  listBreedsDogs,
  listBreedsCats,
  listBreedsHorses,
  listBreedsRabbits,
  listBreedsSwine,
  listBreedsPrimates,
  listColorsPet,
  listSexPet,
  listSpeciesPet,
} from "constants/listOptions";
import { PhotoPet } from "components/Pets/PhotoPet";
import { TutorPetContainer } from "components/Pets/TutorPetContainer";
import {
  addImagePetGallery,
  getOnePetUser,
  UpdatePet,
  verifyUniquePetName,
} from "services/pet";
import moment from "moment";
import ProfileImageDropzonePet from "components/Pets/ProfileImageDropzonePet";
import { Pet, usePet } from "contexts/PetContext";
import { mapPet } from "domain/Pet";
import GalleryPet from "components/Pets/GalleryPet";
import { ModalAddTutor } from "components/Pets/ModalAddTutor";
import useDisclosure from "hooks/useDisclosure";
import Router from "next/router";
import { parseCookies } from "nookies";
import jwtDecode from "jwt-decode";
import {
  handleGetNotification,
  handleGetNotificationByReceptor,
} from "services/notification";
import { TutorPetAwaitInvite } from "components/Pets/TutorPetAwaitInvite";
import  Select  from 'react-select'

const editFormSchema = yup.object().shape({});

export interface ITutor {
  full_name: string;
  surname: string;
  profession: string;
  userImage: string;
}

type fileProps = {
  uri: string;
  name: string;
  type: string;
  path?: string;
  size?: number;
  file?: File;
};

interface ProfilePetProps {
  petData: any;
}

export default function EditProfilePet({ petData }: ProfilePetProps) {
  const modalAddTutor = useDisclosure();

  const {
    pet,
    setPet,
    handleUpdateProfilePetImage,
    handleDeleteProfilePetImage,
    handleAddImagePetGallery,
  } = usePet();

  setPet(petData);

  const [petId, setPetId] = useState(pet?._id);
  const [avatarImage, setAvatarImage] = useState(pet?.avatarImage);
  const [fullName, setFullName] = useState(pet?.name);
  const [profileName, setProfileName] = useState(pet?.profileName);
  const [species, setSpecies] = useState(pet?.species);
  const [race, setRace] = useState<any>(pet?.race);
  const [sex, setSex] = useState(pet?.sex);
  const [petColor, setPetColor] = useState(pet?.color);
  const [petPhotos, setPetPhotos] = useState(pet?.gallery);
  const [tutors, setTutors] = useState(pet?.tutors);
  const [birthDate, setBirthDate] = useState(pet?.birth);
  const [observation, setObservation] = useState(pet?.observation);
  const [tutorsInviteAwait, setTutorsInviteAwait] = useState([]);

  const getNotificationByReceptor = async () => {
    const url = document.URL.split("/");
    const profileCodePet = url[url.length - 1];

    const response = await handleGetNotificationByReceptor({
      profileCodePet,
    });

    const listTutorsAwait = response.map((invite) => {
      if (!invite.notificationData.invitationResponse) {
        return {
          invite,
        };
      }
    });

    setTutorsInviteAwait(listTutorsAwait);
  };

  useEffect(() => {
    (async () => {
      await getNotificationByReceptor();
    })();
  }, []);

  const existPetName = "1px solid #E10101";
  const notExistPetName = "1px solid #2AC087";
  const [existVerifyPetName, setExistVerifyPetName] = useState("");

  const [loadingRemoveImage, setloadingRemoveImage] = useState(false);
  const [loadingAddImage, setloadingAddImage] = useState(false);
  const [activeRemoveImage, setActiveRemoveImage] = useState(false);

  const [inputType, setInputType] = useState<Boolean>(false);

  const defaultImage = "assets/icon_default_avatar_pet.png"; // URL DA IMG NA AWS
  const [isDefaultAvatarImg, setIsDefaultAvatarImg] = useState(
    avatarImage === defaultImage ? true : false
  );

  useEffect(() => {
    setPetId(pet?._id);
    setProfileName(pet?.profileName);
    setFullName(pet?.name);
    setSpecies(pet?.species);
    setRace(pet?.race);
    setSex(pet?.sex);
    setTutors(pet?.tutors);
    setPetColor(pet?.color);
    setBirthDate(pet?.birth);
    setObservation(pet?.observation);
    setAvatarImage(pet?.avatarImage);
    setPetPhotos(pet?.gallery);
  }, [pet]);

  /*   useEffect(() => {

      (async () => {
        const dataPet: Pet = await getOnePetUser({ profileCodePet: pet?.profileCode });
        const petMap = mapPet(dataPet);
        setPet(petMap);
      })()

    }, [pet?.tutors?.length]) */

  const saveImagePet = async (url: string) => {
    const form = {
      avatarImage: url,
    };

    const pet = await handleDeleteProfilePetImage({ form, petId });
    setPet(pet);
  };

  async function uploadAvatarFile(file: any, fileTemporary: any) {
    try {
      setloadingAddImage(true);
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("prefix", "files/");

      let imageTemporary = fileTemporary;

      await handleUpdateProfilePetImage({ formData, petId: petId });

      setloadingAddImage(false);

      setTimeout(() => {
        setIsDefaultAvatarImg(false);
        const message = imageTemporary
          ? "Imagem salva com sucesso!"
          : "Imagem enviada, em breve estara no seu perfil!";
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
        });
      }, 300);
    } catch (error) {
      toast.error("Falha ao tentar atualizar imagem!", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  }

  async function uploadPetImageGallery(file: any, fileTemporary: any) {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("prefix", "files/");

      /* let imageTemporary = fileTemrary; */

      const petResponse = await handleAddImagePetGallery({
        formData,
        petId: petId,
      });

      setPetPhotos(petResponse.gallery);

      toast.success("Imagem salva com sucesso!");
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

      const defaultImage = "assets/icon_default_avatar_pet.png"; // URL DA IMG NA AWS
      setAvatarImage(defaultImage);
      await saveImagePet(defaultImage);

      setActiveRemoveImage(true);
      setIsDefaultAvatarImg(true);
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
    if (isDefaultAvatarImg) {
      toast.error("Foto de perfil do pet é obrigatória", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    if (
      profileName === "" ||
      typeof profileName === "undefined" ||
      profileName === null ||
      fullName === "" ||
      typeof fullName === "undefined" ||
      fullName === null ||
      species === "" ||
      typeof species === "undefined" ||
      species === null ||
      sex === "" ||
      typeof sex === "undefined" ||
      sex === null ||
      petColor === "" ||
      typeof petColor === "undefined" ||
      petColor === null
    ) {
      toast.error("Há campos obrigatórios não preenchidos", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      let objPropetys = {
        petId: pet?._id,
        name: fullName,
        profileName: profileName,
        species: species,
        race: race.value,
        sex: sex,
        color: petColor,
        birth: birthDate,
        tutors: tutors,
        observation: observation,
        avatarImage: avatarImage,
      };

      await UpdatePet(objPropetys);
      toast.success("Informações atualizadas com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      });

      /* await updateUser(objPropetys);
      toast.success("Informações atualizadas com sucesso!", {
        position: "top-right",
        autoClose: 4000,
      }); */

      /* if (typeof user.profileCode === 'object') {
        router.push(`/${user.profileCode[0] || name}`);
      } else {
        router.push(`/${user.profileCode || name}`);
      } */

      Router.push("/profile/mypets");
    } catch (error) {
      toast.error(error?.error || error, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const handleVerifyUniqueName = async () => {
    const nameFormated = formatUniqueName(profileName);
    setProfileName(nameFormated);
    setValue("profileName", nameFormated);

    try {
      const response = await verifyUniquePetName(nameFormated, pet?._id);
      if (response.nameExists) throw Error;
      setExistVerifyPetName(notExistPetName);
    } catch (error) {
      setExistVerifyPetName(existPetName);
      toast.error("Nome único já utilizado no unitok. ", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  interface IOptions {
    value: string;
    label: string  | number;
  }

  function handleBreedBySpecie(): IOptions[] {
    switch (species) {
      case "Caninos":
        break;
      default:
        return listBreedsPrimates;
    }
  }

  const [listBreeds, setListBreeds] = useState<IOptions[]>(listBreedsDogs);

  useEffect(() => {
    switch (species) {
      case "Caninos":
        setListBreeds(listBreedsDogs);
        break;
      case "Coelhos":
        setListBreeds(listBreedsRabbits);
        break;
      case "Equinos":
        setListBreeds(listBreedsHorses);
        break;
      case "Felinos":
        setListBreeds(listBreedsCats);
        break;
      case "Primatas":
        setListBreeds(listBreedsPrimates);
        break;
      case "Suínos":
        setListBreeds(listBreedsSwine);
        break;
      default:
        setListBreeds(listBreedsDogs);
    }
  }, [species]);

  return (
    <>
      <DashbardContainer variant="user-account">
        <Head>
          <title>Perfil Pet | Unitok</title>
        </Head>

        <S.MainContainer>
          <Heading as="h1" font="titleMdLight" color="primary">
            Perfil Pet
          </Heading>

          <S.Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <ProfileImageDropzonePet
              pet={pet}
              onFileAdded={uploadAvatarFile}
              onRemove={removeAvatarImage}
              displayImageSrc={avatarImage}
              isAddLoading={loadingAddImage}
              isRemoveLoading={loadingRemoveImage}
              activeRemoveImage={activeRemoveImage}
            />

            <div style={{ marginTop: "0" }}>
              <Text style={{ fontWeight: "500", marginBottom: "5px" }}>
                unitok.com/pet/
              </Text>
              <Input
                id="perfilEdit1"
                placeholder="Digite um nome de usuário"
                value={profileName}
                style={{
                  paddingLeft: "0.2rem",
                  color:
                    (existVerifyPetName === existPetName && "#E10101") ||
                    (existVerifyPetName === notExistPetName && "#2AC087"),
                }}
                styleContainer={{
                  borderBottom: existVerifyPetName,
                }}
                bottomElement={
                  existVerifyPetName === existPetName && (
                    <div
                      style={{
                        color: "#E10101",
                        fontSize: "0.8rem",
                        fontWeight: "400",
                      }}
                    >
                      Nome já ocupado, favor escolher outro
                    </div>
                  )
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
                        Este é o link onde o perfil do seu pet ficará registrado para que as pessoas consigam acessar os dados dele ao escanear o QR Code ou encostar o celular no pingente Unitok.
                      </Text>
                    </div>
                  </S.HelpCircle>
                }
                {...register("profileName")}
                errorMessage={errors?.profileName?.message}
                onChange={(e) => setProfileName(e.target.value)}
                onBlur={handleVerifyUniqueName}
              />
            </div>

            <Heading
              as="h3"
              font="titleSm"
              color="secondary"
              style={{
                lineHeight: "27px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              Informações gerais
            </Heading>

            <Input
              id="full_name"
              placeholder="Digite o nome do seu pet"
              value={fullName}
              {...register("full_name")}
              errorMessage={errors?.full_name?.message}
              onChange={(e) => setFullName(e.target.value)}
            />

            <SelectWithSearch
              instanceId="pet-species"
              value={species}
              setValue={setSpecies}
              options={listSpeciesPet}
              placeholder="Selecione a espécie"
            />

            {/* <SelectWithSearch
              value={race}
              setValue={setRace}
              options={listBreeds}
              placeholder="Selecione a raça"
            /> */}

            <Select
              instanceId="pet-race"
              options={listBreeds}
              placeholder={race ? race : 'Selecione a raça'}
              onChange={(option) => setRace(option)}
              value={race}
              styles={{
                container: (base) => ({
                  ...base,
                  border: 'none',
                  outline: 'none',
                  borderBottom: '1px solid #01302F',
                  marginTop: '3rem',
                }),
                placeholder: (base) =>({
                  ...base,
                  padding: 0,
                  color: '#909692',
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
            />

            <SelectWithSearch
              instanceId="pet-sex"
              value={sex}
              setValue={setSex}
              options={listSexPet}
              placeholder="Selecione o sexo"
            />

            <SelectWithSearch
              instanceId="pet-color"
              value={petColor}
              setValue={setPetColor}
              options={listColorsPet}
              placeholder="Selecione a cor"
            />

            <Input
              style={{ marginTop: "1rem" }}
              type="text"
              id="birthDate"
              placeholder="Idade (opcional)"
              value={birthDate}
              {...register("birthDate")}
              errorMessage={errors?.birthDate?.message}
              onChange={(e) => setBirthDate(e.target.value)}
            />

            <Input
              style={{ marginTop: "1rem" }}
              id="observation"
              placeholder="Digite uma observação (opcional)"
              value={observation}
              {...register("observation")}
              errorMessage={errors?.observation?.message}
              onChange={(e) => setObservation(e.target.value)}
            />

            <Heading
              as="h3"
              font="titleSm"
              color="secondary"
              style={{
                lineHeight: "27px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              Galeria
            </Heading>

            <GalleryPet
              petPhotos={petPhotos}
              setPetPhotos={setPetPhotos}
              onFileAdded={uploadPetImageGallery}
            />

            <Heading
              as="h3"
              font="titleSm"
              color="secondary"
              style={{
                lineHeight: "27px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              Tutor
            </Heading>

            <S.AddTutor style={{ marginBottom: "4rem" }}>
              <ButtonPrimary
                type="button"
                style={{ minWidth: "18.875rem" }}
                onClick={modalAddTutor.handleOpen}
              >
                Adicionar tutor
              </ButtonPrimary>
            </S.AddTutor>

            {tutors?.map((tutor: any, index: number) => (
              <TutorPetContainer
                setTutors={setTutors}
                tutor={tutor}
                key={index}
                isModalSos={false}
              />
            ))}

            {tutorsInviteAwait?.map((data, index) => {
              if (typeof data !== "undefined") {
                return <TutorPetAwaitInvite invite={data.invite} key={index} />;
              }
            })}

            <ButtonPrimary
              type="submit"
              loading={isSubmitting}
              style={{
                marginTop: 100,
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

      <ModalAddTutor
        closeModal={modalAddTutor.handleClose}
        modalIsOpen={modalAddTutor.isOpen}
        onHandleSetTutorsAwait={getNotificationByReceptor}
        pet={pet}
        setTutors={setTutors}
      />
    </>
  );
}

type IUserAuthenticated = {
  _id: string;
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const codePet = ctx.params.codePet;

  const { ["unitok.token"]: token } = parseCookies(ctx);
  const userAuthenticatedId: IUserAuthenticated = jwtDecode(token);

  const dataPet: Pet = await getOnePetUser({ ctx, profileCodePet: codePet });

  if (dataPet.userId !== userAuthenticatedId?._id) {
    return {
      redirect: {
        destination: "/profile/mypets",
        permanent: false,
      },
    };
  }

  if (!dataPet) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const pet = mapPet(dataPet);
  pet.birth = typeof pet?.birth === "undefined" ? "" : pet.birth;

  return {
    props: {
      petData: pet,
    },
  };
});
