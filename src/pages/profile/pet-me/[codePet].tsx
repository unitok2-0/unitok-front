
import { withSSRAuth } from "utils/withSSRAuth";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

import DashboardContainer from "containers/dashboard";
import Profile from "components/Profile";
import Head from "next/head";
import { ProfilePet } from "components/Pets/ProfilePet";
import { mapPet } from "domain/Pet";
import { getOnePetUser } from "services/pet";
import { Pet } from "contexts/PetContext";
import moment from "moment";

interface ProfilePetMeProps {
  pet: any
}

export default function ProfilePetMe({
  pet
}: ProfilePetMeProps) {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installPwa = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <>
      <Head>
        <title>Pet {pet?.name} | Unitok</title>
      </Head>
      <DashboardContainer variant="user-account" shouldDisablePadding>
        {user && <ProfilePet pet={pet} />}
      </DashboardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const codePet = ctx.params.codePet;

  const dataPet: Pet = await getOnePetUser({ ctx, profileCodePet: codePet });

  if (!dataPet) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }

  const pet = mapPet(dataPet);
  pet.sex === 'M' ? pet.sex = 'Macho' : pet.sex = 'Fêmea';
  pet.birth

  return {
    props: {
      pet
    },
  };
}, {
  redirectAdmin: true
});
