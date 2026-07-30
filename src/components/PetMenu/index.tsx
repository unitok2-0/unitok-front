import Router from 'next/router';

import { CloseButton } from 'components/CloseButton';
import { Pet } from 'contexts/PetContext';
import { Dispatch, SetStateAction } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { DeletePet, deleteTutorInPet } from 'services/pet';
import { Container } from './styles'
import { MdPets } from 'react-icons/md';
import { useAuth } from 'contexts/AuthContext';
import { IoPawOutline } from "react-icons/io5";
import { DeleteDevice } from 'services/user';

import * as S from './styles'

interface PetMenuProps {
  setIsMenuOpen: (value: boolean) => void;
  pet: Pet;
  pets: Pet[];
  setPets: Dispatch<SetStateAction<Pet[]>>;
}

export function PetMenu({
  pet,
  pets,
  setIsMenuOpen,
  setPets
}: PetMenuProps) {

  const { user } = useAuth();

  async function verifyUserIsMainTutor() {
    if (pet?.userId !== user?._id)
      await handleRemoveTutorInPet();
    else
      await handleDeletePet();
  }

  async function handleDeletePet() {
    try {
      // await DeletePet({ petId: pet._id })
      await DeleteDevice({ qrcode_id: pet.profileCode });
      const filteredPets = pets.filter(petsData => petsData._id !== pet._id);
      setPets(filteredPets)
      setIsMenuOpen(false)
      toast.success('Pet deletado com sucesso!');
    } catch (error) {
      toast.error(error)
    }
  }

  async function handleRemoveTutorInPet() {
    try {
      await deleteTutorInPet({ petId: pet._id });
      const filteredPets = pets.filter(petsData => petsData._id !== pet._id);
      setPets(filteredPets)
      setIsMenuOpen(false)
      toast.success(`Você se removeu como tutor do pet ${pet?.name}`);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
      <Container>

        {pet?.userId === user?._id &&
          <button
            onClick={() => Router.push(`pet-edit/${pet.profileCode}`)}
          >
            <div className='icon'>
              <FiEdit size={18} />
            </div>
            <p>Editar</p>
          </button>
        }


        <button
          onClick={() => Router.push(`pet-me/${pet.profileCode}`)}
        >
          <div className='icon'>
            <IoPawOutline size={18} />
          </div>
          <p>Ver perfil público</p>
        </button>


        <button
          onClick={verifyUserIsMainTutor}
        >
          <div className='icon'>
            <IoMdClose size={20} />
          </div>
          <p>{pet?.userId !== user?._id ? 'Abandonar cargo de tutor' : 'Remover'}</p>
        </button>

      </Container>
    </>
  )
}
