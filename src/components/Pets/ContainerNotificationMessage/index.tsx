import { getImageUrl } from 'constants/functions';
import { handleUpdateViewNotification } from 'services/notification';
import { ModalResponseInviteTutorPet } from '../ModalResponseInviteTutorPet';
import { ModalResponseNotificationLocalizationPet } from '../ModalResponseNotificationLocalizationPet';

import * as S from './styles';
import useDisclosure from 'hooks/useDisclosure';
import { useEffect, useState } from 'react';

interface ContainerNotificationMessageProps {
  notificationId: string;
  userFullName: string;
  userImage: string;
  petImage: string;
  petFullName: string;
  petId: string;
  typeNotification: string;
  message?: string;
  notificationViewTrueOrFalse: boolean;
  notificationsView: any;
  notificationsNoView: any;
  setNotificationsView: any;
  setNotificationsNoView: any;
  invitationResponse: string;
  onUpdatedStateNotifications: () => void;
}

export function ContainerNotificationMessage({
  petFullName,
  petId,
  petImage,
  userFullName,
  userImage,
  notificationId,
  typeNotification,
  message,
  notificationViewTrueOrFalse,
  notificationsView,
  setNotificationsView,
  notificationsNoView,
  setNotificationsNoView,
  invitationResponse,
  onUpdatedStateNotifications
}: ContainerNotificationMessageProps) {

  const responseInviteTutorPetModal = useDisclosure();
  const responseNotificationLocalizationPet = useDisclosure();

  async function handleOpenModals() {
    if (typeNotification === 'INVITE') { responseInviteTutorPetModal.handleOpen(); } 
    else if (typeNotification === 'LOCALIZATION') { responseNotificationLocalizationPet.handleOpen(); }

    try {
      if(notificationViewTrueOrFalse === false) {
        await handleUpdateViewNotification({ notificationId });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <S.MainContainer notificationView={notificationViewTrueOrFalse}>

        {!notificationViewTrueOrFalse &&
          <S.CircleView>
          </S.CircleView>
        }


        <S.ImagePhoto>
          <img
            src={petImage ? getImageUrl(petImage) : '/assets/Unitok_simbolo.svg'}
            alt=""
          />
        </S.ImagePhoto>


        <S.MessagesContainer>
          <S.MessageBold>
            {typeNotification === 'INVITE' &&
              <>
                Convite de {petFullName}!
              </>
            }
            {typeNotification === 'LOCALIZATION' &&
              <>
                {petFullName} foi encontrado!
              </>
            }
          </S.MessageBold>
          <S.MessagePreview>
            {typeNotification === 'INVITE' &&
              <>
                Você foi convidado para ser...
              </>
            }
            {typeNotification === 'LOCALIZATION' &&
              <>
                Confira seu email...
              </>
            }
          </S.MessagePreview>
        </S.MessagesContainer>

        <S.OpenText onClick={handleOpenModals}>
          Abrir
        </S.OpenText>

      </S.MainContainer>

      {typeNotification === 'INVITE' &&
        <ModalResponseInviteTutorPet
          notificationId={notificationId}
          closeModal={responseInviteTutorPetModal.handleClose}
          modalIsOpen={responseInviteTutorPetModal.isOpen}
          petFullName={petFullName}
          petId={petId}
          petImage={petImage}
          userFullName={userFullName}
          userImage={userImage}
          invitationNotification={invitationResponse}

          notificationViewTrueOrFalse={notificationViewTrueOrFalse}
          
          notificationsView={notificationsView}
          setNotificationsView={setNotificationsView}

          notificationsNoView={notificationsNoView}
          setNotificationsNoView={setNotificationsNoView}
          onUpdatedStateNotifications={onUpdatedStateNotifications}
        />
      }

      {typeNotification === 'LOCALIZATION' &&
        <ModalResponseNotificationLocalizationPet
          closeModal={responseNotificationLocalizationPet.handleClose}
          modalIsOpen={responseNotificationLocalizationPet.isOpen}
          petImage={petImage}
          message={message}
          notificationId={notificationId}

          notificationViewTrueOrFalse={notificationViewTrueOrFalse}

          notificationsView={notificationsView}
          setNotificationsView={setNotificationsView}

          notificationsNoView={notificationsNoView}
          setNotificationsNoView={setNotificationsNoView}
        />
      }
    </>
  )
}