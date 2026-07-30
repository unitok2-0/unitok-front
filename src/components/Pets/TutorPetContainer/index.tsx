import { getImageUrl } from 'constants/functions';
import { useState } from 'react';
import { ModalTutorPet } from '../ModalTutorPet';
import Router from 'next/router';
import Link from 'next/link'

import * as S from './styles';
import { useAuth } from 'contexts/AuthContext';

interface TutorPetContainerProps {
  tutor: any;
  isModalSos: boolean;
  setTutors?: any;
}

// console.log(tutor.)

export function TutorPetContainer({
  setTutors,
  tutor,
  isModalSos,
}: TutorPetContainerProps) {

  const [modalTutorPetIsOpen, setModalTutorPetIsOpen] = useState(false);
  const { user } = useAuth();

  function isHaveNameInTutor() {

    if (typeof tutor?.tutorId?.surname !== 'undefined') {
      return `${tutor?.tutorId?.full_name} ${tutor?.tutorId?.surname}`;
    } else if(tutor?.tutorId?.full_name) {
      return tutor?.tutorId?.full_name;
    } else {
      if (user?._id === tutor?.tutorId?._id)
        return 'Você';
      else if (!user?._id || !tutor?.tutorId?.full_name) 
        return 'Tutor sem nome';
    }

  }

  const isEditPetRoute = Router.pathname === '/profile/pet-edit/[codePet]'
  const isOwner = user?._id === tutor?.tutorId?._id

  return (
    <S.Container isModalSos={isModalSos} isOwner={isOwner} isEditPetRoute={isEditPetRoute}>
      <S.ImgContainer
        onClick={() => {
          Router.push(`/${tutor?.tutorId?.name}`);
          console.dir(tutor?.tutorId)
        }}
        img_src={getImageUrl(tutor?.tutorId?.userImage)}
      />
      <S.Name
        onClick={() => {
          Router.push(`/${tutor?.tutorId?.name}`);
          console.dir(tutor?.tutorId)
        }}
      >
        <strong>{isHaveNameInTutor()}</strong>
        <p>{tutor?.tutorId?.profession}</p>
      </S.Name>

      {
        !isModalSos && isOwner &&
        <Link href="/profile/edit">Editar perfil</Link>
      }

      {!isModalSos &&
        <S.ButtonOpenModal>
          <img
            src="/assets/iconOpenStand.svg"
            alt=""
            style={{
              cursor: 'pointer',
            }}
            onClick={() => setModalTutorPetIsOpen(true)}
          />

          {modalTutorPetIsOpen &&
            <ModalTutorPet
              setTutors={setTutors}
              tutor={tutor}
              setIsMenuOpen={setModalTutorPetIsOpen}
            />
          }
        </S.ButtonOpenModal>
      }

      {isModalSos &&
        <S.ButtonOpenPerfil onClick={() => Router.push(`/${tutor?.tutorId?.name || tutor?.tutorId?.profile[0]}`)}>
          Ver perfil
        </S.ButtonOpenPerfil>
      }

    </S.Container>
  )
}
