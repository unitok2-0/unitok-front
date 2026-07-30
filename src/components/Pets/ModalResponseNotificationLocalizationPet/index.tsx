import Modal, { Styles } from 'react-modal';
import { Heading, Text } from 'components/Typography';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { handleDeleteNotification } from 'services/notification';
import { useAuth } from 'contexts/AuthContext';
import { toast } from 'react-toastify';
import { getImageUrl } from 'constants/functions';

import * as S from './styles';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';

interface ModalNotificationInviteTutorProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  message: string;
  notificationId: string;
  petImage: string;
  notificationsView: any;
  notificationsNoView: any;
  setNotificationsView: any;
  setNotificationsNoView: any;
  notificationViewTrueOrFalse: boolean;
}

export function ModalResponseNotificationLocalizationPet({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  message,
  notificationId,
  petImage,
  notificationViewTrueOrFalse,
  notificationsNoView,
  notificationsView,
  setNotificationsNoView,
  setNotificationsView
}: ModalNotificationInviteTutorProps) {

  const [loadingDeleteNotification, setLoadingDeleteNotification] = useState(false);
  const { setUser } = useAuth();

  async function handleCloseModal() {
    if (notificationViewTrueOrFalse === false) {
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

  async function deleteNotification () {
    setLoadingDeleteNotification(true);

    try {
      const userData = await handleDeleteNotification({ notificationId });
      setUser(userData);
      toast.success('Notificação deletada!')
    } catch (error) {
      toast.error(error)
    } finally {
      setLoadingDeleteNotification(false);
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
          fontWeight='500'
          style={{
            textAlign: 'center',
            width: '100%',
            fontSize: '1.5rem',
            color: '#FF4C1C',
            marginBottom: '60px',
          }}
        >
          Seu pet foi encontrado!
        </Heading>

        <S.PhotoPet petImage={getImageUrl(petImage)}>
          {/* <img src={getImageUrl(petImage)} alt="Foto de Pet" /> */}
        </S.PhotoPet>

        <Text
          style={{
            textAlign: 'left',
            width: '100%',
            fontSize: '1.1rem',
            marginTop: '40px'
          }}
        >
          {message}
        </Text>

        <Text
          style={{
            textAlign: 'left',
            width: '100%',
            fontSize: '1.1rem',
            marginTop: '40px'
          }}
        >
          Verifique todas as caixas de entradas do seu e-mail e também a aba de SPAM.
        </Text>

        <ButtonPrimary
          textButton="Apagar notificação"
          style={{
            width: '100%',
            marginTop: '40px'
          }}
          loading={loadingDeleteNotification}
          onClick={deleteNotification}
        />

      </S.MainModal>
    </Modal>
  )
}