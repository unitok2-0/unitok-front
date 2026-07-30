import Modal, { Styles } from 'react-modal';
import { UserProps } from 'domain/User';
import { Heading, Text } from 'components/Typography';
import { getImageUrl } from 'constants/functions';
import { useEffect, useState } from 'react';
import { addPetInTutor } from 'services/pet';
import { useAuth } from 'contexts/AuthContext';
import { toast } from 'react-toastify';
import { handleDeleteNotification, handleUpdateResponseInvitationNotification, handleUpdateViewNotification } from 'services/notification';
import { AiOutlineClose } from 'react-icons/ai';
import { usePet } from 'contexts/PetContext';

import * as S from './styles';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import { mapPet } from 'domain/Pet';

interface ModalNotificationInviteTutorProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  userFullName: string;
  userImage: string;
  petImage: string;
  petFullName: string;
  petId: string;
  notificationId: string;
  notificationsView: any;
  notificationsNoView: any;
  setNotificationsView: any;
  setNotificationsNoView: any;
  notificationViewTrueOrFalse: boolean;
  invitationNotification: string;
  onUpdatedStateNotifications: () => void;
}

export function ModalResponseInviteTutorPet({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  petFullName,
  petId,
  petImage,
  userFullName,
  userImage,
  notificationId,
  notificationsNoView,
  notificationsView,
  setNotificationsNoView,
  setNotificationsView,
  notificationViewTrueOrFalse,
  invitationNotification,
  onUpdatedStateNotifications
}: ModalNotificationInviteTutorProps) {
  const [loadingButtonAccepted, setLoadingButtonAccepted] = useState(false);
  const [loadingButtonRefusal, setLoadingButtonRefusal] = useState(false);
  const [loadingDeleteNotification, setLoadingDeleteNotification] = useState(false);

  async function handleCloseModal() {
    if (!notificationViewTrueOrFalse) {
      try {
        const newArrayView = notificationsNoView.filter(notification => notification._id === notificationId);
        newArrayView[0].view = true;
        setNotificationsView([...notificationsView, ...newArrayView]);

        const newArrayNoView = notificationsNoView.filter(notification => notification._id !== notificationId);
        setNotificationsNoView(newArrayNoView)
      } catch (error) { } finally {
        closeModal();
      }
    } else {
      closeModal();
    }
  }

  const { user, setUser } = useAuth();

  const { myPets, setMyPets } = usePet();

  async function handleAcceptedInvite() {
    try {
      setLoadingButtonAccepted(true);
      const petData = await addPetInTutor({ tutorId: user?._id, petId: petId });

      const formatedPet = mapPet(petData);

      const newMyPets = [...myPets, formatedPet];
      setMyPets(newMyPets);

      await handleUpdateResponseInvitationNotification({
        notificationId,
        invitationResponse: 'ACCEPT'
      });

      onUpdatedStateNotifications();

      toast.success(`Parabéns você agora é tutor de ${petFullName}`);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingButtonAccepted(false);
      closeModal();
    }
  }

  async function handleRefusalInvite() {
    try {
      setLoadingButtonRefusal(true);

      await handleUpdateResponseInvitationNotification({
        notificationId,
        invitationResponse: 'REFUSAL',
      })

      onUpdatedStateNotifications();

      toast.success(`Você recusou a solicitação para ser tutor do pet ${petFullName}`);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingButtonRefusal(false);
      closeModal();
    }
  }

  async function handleDeleteNotifications() {
    setLoadingDeleteNotification(true)

    try {
      const userData = await handleDeleteNotification({ notificationId });
      setUser(userData);
      onUpdatedStateNotifications();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingDeleteNotification(false)
      closeModal();
    }
  }

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.CloseModal onClick={handleCloseModal}>
        <AiOutlineClose size={25} />
      </S.CloseModal>

      <S.MainModal>
        <Heading
          fontWeight='300'
          style={{
            textAlign: 'center',
            width: '100%',
            fontSize: '2.7rem',
            color: '#FF4C1C',
            marginBottom: '60px'
          }}
        >
          Convite
        </Heading>

        <S.ContainerImages>

          <S.ImagesPhoto>
            <img src={getImageUrl(userImage)} alt="" />
          </S.ImagesPhoto>

          <S.LogoUnitok>
            <img src="/assets/logo_unitok_red.svg" alt="" />
          </S.LogoUnitok>

          <S.ImagesPhoto>
            <img src={getImageUrl(petImage)} alt="" />
          </S.ImagesPhoto>

        </S.ContainerImages>

        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            fontSize: '1.1rem',
            marginTop: '40px'
          }}
        >
          {invitationNotification === 'ACCEPT' &&
            <>Você aceitou o convite para ser tutor do(a) <strong>{petFullName}</strong></>
          }

          {invitationNotification === 'REFUSAL' &&
            <>Você recusou o convite para ser tutor do(a) <strong>{petFullName}</strong></>
          }

          {!invitationNotification &&
            <> Você foi convidado para ser tutor do(a) <strong>{petFullName}</strong> por <strong>{userFullName}</strong></>
          }

        </Text>


        {!invitationNotification &&
          <>
            <ButtonPrimary
              textButton="Aceitar"
              style={{
                width: '100%',
                marginTop: '40px',
                height: '45px',
              }}
              loading={loadingButtonAccepted}
              onClick={handleAcceptedInvite}
            />

            <ButtonPrimary
              variant="secondary"
              textButton="Recusar"
              style={{
                width: '100%',
                marginTop: '10px',
                height: '45px',
              }}
              loading={loadingButtonRefusal}
              onClick={handleRefusalInvite}
            />
          </>
        }

        {invitationNotification === 'ACCEPT' &&
          <ButtonPrimary
            textButton="Apagar notificação"
            style={{
              width: '100%',
              marginTop: '40px',
              height: '45px',
            }}
            loading={loadingDeleteNotification}
            onClick={handleDeleteNotifications}
          />
        }

        {invitationNotification === 'REFUSAL' &&
          <ButtonPrimary
            textButton="Apagar notificação"
            style={{
              width: '100%',
              marginTop: '40px',
              height: '45px',
            }}
            loading={loadingDeleteNotification}
            onClick={handleDeleteNotifications}
          />
        }

      </S.MainModal>
    </Modal >
  )
}