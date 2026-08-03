import { PetMenu } from 'components/PetMenu';
import { useAuth } from 'contexts/AuthContext';
import { Pet } from 'contexts/PetContext';
import { resolveImageUrl } from 'constants/functions';
import Router from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';

import * as S from './styles';

interface CardPetProps {
  pet: Pet;
  pets: Pet[];
  setPets: Dispatch<SetStateAction<Pet[]>>
}

export default function CardPet({
  pet,
  pets,
  setPets
}: CardPetProps) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <S.ContainerRelative>
    <S.Container onClick={() => Router.push(`/profile/pet-me/${pet.profileCode}`)}>

      <S.ImgContainer
        img_src={resolveImageUrl(pet?.avatarImage, '/assets/icon_default_avatar_pet.png')}
      />

      <S.Name>
        <strong>
          {pet?.name}
          {pet?.userId !== user?._id &&
            <S.ParentComponent>Parente</S.ParentComponent>
          }
        </strong>
        <p>{pet?.race}</p>

      </S.Name>
    </S.Container>
    <S.ButtonOpenModal>
        <img
          src="/assets/iconOpenStand.svg"
          alt=""
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && (
          <PetMenu
            setIsMenuOpen={setIsMenuOpen}
            pets={pets}
            pet={pet}
            setPets={setPets}
          />
        )}
      </S.ButtonOpenModal>
    </S.ContainerRelative>
  )
}
