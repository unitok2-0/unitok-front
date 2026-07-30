import { ProfilePet } from "components/Pets/ProfilePet";
import { getOnePet } from "services/pet";
import { Pet } from "contexts/PetContext";
import { mapPet } from "domain/Pet";

import Head from "next/head";
import moment from "moment";

interface PetProps {
  pet: Pet;
}

export default function PagePet({
  pet
}: PetProps) {
  return (
    <>
      <Head>
        <title>{pet.name} | Unitok </title>
      </Head>
      <ProfilePet
        pet={pet}
      />
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const { codeId } = ctx.params;

  if (!codeId) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
    };
  }

  const petData = await getOnePet({ ctx, profileCodePet: codeId });

  if (!petData) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
    };
  }

  const pet = mapPet(petData)
  pet.sex === 'M' ? pet.sex = 'Macho' : pet.sex = 'Fêmea';

  return {
    props: {
      pet
    }
  }

}
