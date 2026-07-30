import DashbardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import CardPet from "components/Pets/CardPet";
import ActivePetContainer from "containers/active-pet";
import * as S from '../../styles/pageStyles/profile/pets/styles';

import Head from "next/head";

import { Heading, Text } from "components/Typography";
import { useEffect, useState, useCallback } from "react";
import { MainContainer } from "styles/pageStyles/profile/styles";
import { FiShoppingBag } from "react-icons/fi";
import { withSSRAuth } from "utils/withSSRAuth";
import { getMyPets } from "services/pet";
import { Pet, usePet } from "contexts/PetContext";
import { getImageUrl } from "constants/functions";
import { useAuth } from "contexts/AuthContext";
import { InternalActivateDeviceContainer } from "containers/internal-active-device";

export default function MyPets() {
  const [initActivePet, setInitActivePet] = useState(false);

  const { myPets, setMyPets } = usePet();

  const updatePetsList = useCallback(async () => {
    const listMypets: Pet[] = await getMyPets({});

    const myPetsData = Array.isArray(listMypets) ? listMypets.map(pet => {
      return {
        _id: pet._id || null,
        name: pet.name || 'Pet',
        avatarImage: getImageUrl(pet.avatarImage) || null,
        bannerImage: getImageUrl(pet.bannerImage) || null,
        profileCode: pet.profileCode || null,
        profileName: pet.profileName || null,
        species: pet.species || null,
        race: pet.race || null,
        sex: pet.sex || null,
        color: pet.color || null,
        birth: pet.birth || null,
        observation: pet.observation || null,
        gallery: pet.gallery || null,
        tutors: pet.tutors || null,
        userId: pet.userId || null,
      }
    }) : [];

    setMyPets(myPetsData);
  }, [setMyPets]);

  function onHandleComeBack() {
    setInitActivePet(false);
    updatePetsList();
  }

  useEffect(() => {
    updatePetsList();
  }, [setMyPets, updatePetsList])

  if(initActivePet) {
    return (
      <>
        <Head>
          <title>Meus pets | Adicionar pingente</title>
        </Head>
        <InternalActivateDeviceContainer
          deviceType="PETS"
          onCloseActivationRequest={() => setInitActivePet(false)}
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Meus Pets | Unitok</title>
      </Head>


      <DashbardContainer variant="user-account">
        <MainContainer>

          <Heading as="h1" font="titleMdLight" color="primary">
            Perfil Pet
          </Heading>

          {myPets.length < 1 && (
            <Text
              fontWeight="500"
              style={{ textAlign: 'center' }}
            >
              Você ainda não possui nenhum pingente de Pet.
            </Text>
          )}

          <S.ButtonsWrapper>
            <ButtonPrimary onClick={() => setInitActivePet(true)}>
              Adicionar novo pingente
            </ButtonPrimary>
            <ButtonPrimary
              as="a"
              href="https://api.whatsapp.com/send?phone=5508004550800"
              target="_blank"
              styleProp={{
                marginTop: '1.8rem',
                color: '#01302F'
              }}
              variant="tertiary"
              rightElement={<FiShoppingBag />}
            >
              Adquirir novo pingente
            </ButtonPrimary>
          </S.ButtonsWrapper>

          {myPets?.length >= 1 &&
            <>
              <Heading style={{ marginBottom: '2.5rem' }}>Meus Pets</Heading>
              {myPets?.map((pet: Pet, index: number) => (
                <CardPet
                  key={index}
                  pet={pet}
                  pets={myPets}
                  setPets={setMyPets}
                />
              ))}
            </>
          }

        </MainContainer>
      </DashbardContainer>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
