import { CloseButton } from 'components/CloseButton';
import { AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { Container } from './styles';
import { ModalButtonsPet } from '../ModalButtonsPet';
import { CheckboxSwitch } from 'components/CheckboxSwitch';

import useDisclosure from 'hooks/useDisclosure';
import { useEffect, useState } from 'react';
import { usePet } from 'contexts/PetContext';
import { deleteTutorInPet, deleteTutorInPetKickout } from 'services/pet';
import { toast } from 'react-toastify';
import { mapPet } from 'domain/Pet';

import * as S from './styles'

interface ContactMenuProps {
  tutor: any;
  setIsMenuOpen: (value: boolean) => void;
  setTutors: any;
}

export function ModalTutorPet({ setIsMenuOpen, tutor, setTutors }: ContactMenuProps) {
  const [showPetInProfile, setShowPetInProfile] = useState(tutor?.isOwner);

  const { pet, setPet } = usePet();

  const modalButtonsPet = useDisclosure();

  async function onHandleDeleteTutorInPet() {
    try {
      const petData = await deleteTutorInPetKickout({
        petId: pet?._id,
        tutorId: tutor?.tutorId?._id
      })

      const petFormated = mapPet(petData);

      setTutors(petFormated?.tutors)
      setPet(petFormated);
      toast.success('Tutor removido com sucesso!');
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <S.Backdrop onClick={() => setIsMenuOpen(false)}></S.Backdrop>
      
      <Container>

        <button>
          <div className='icon'>
            <AiOutlineUser size={20} />
          </div>
          <p>Mostrar no perfil do pet</p>
          <div>
            <CheckboxSwitch
              tutor={tutor}
              setTutors={setTutors}
              isChecked={showPetInProfile}
              setChecked={setShowPetInProfile}
            />
          </div>
        </button>

        <button
          onClick={() => modalButtonsPet.handleOpen()}
        >
          <div className='icon'>
            <img src="/assets/icon_notify.svg" alt="Ícone de Notificação" />
          </div>
          <p>Como ser notificado</p>
          <div>
            <IoIosArrowForward size={20} />
          </div>
        </button>

        {tutor?.tutorId?._id !== pet?.userId &&
          <button
            onClick={onHandleDeleteTutorInPet}
          >
            <div className='icon'>
              <IoMdClose size={20} />
            </div>
            <p>Remover</p>
          </button>
        }


        <ModalButtonsPet
          tutor={tutor}
          setTutors={setTutors}
          closeModal={modalButtonsPet.handleClose}
          modalIsOpen={modalButtonsPet.isOpen}
        />
      </Container>
    </>
  )
}
