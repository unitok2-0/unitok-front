import { Heading, Text } from "components/Typography";
import Modal, { Styles } from "react-modal";
import { UserProps } from "domain/User";
import { useEffect, useState } from "react";
import { handleGetNotification } from "services/notification";
import { ContainerNotificationMessage } from "../ContainerNotificationMessage";

import * as S from "./styles";
import { AiOutlineClose } from "react-icons/ai";

interface ModalNotificationInviteTutorProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  user: UserProps;
}

export function ModalNotificationInviteTutor({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  user,
}: ModalNotificationInviteTutorProps) {
  const [notifications, setNotifications] = useState<any>();
  const [notificationsView, setNotificationsView] = useState<any>();
  const [notificationsNoView, setNotificationsNoView] = useState<any>();

  useEffect(() => {
    if (user?.notifications?.length === 0) {
      closeModal();
    }
  }, [user?.notifications?.length]);

  async function updatedAllNotificationsState() {
    try {
      let arrayView = [];
      let arrayNoView = [];

      const notificationsData = await handleGetNotification({});

      setNotifications(notificationsData);

      //disabled platform notification temporarily
      /* const onlyInviteNotifications = notificationsData.filter(e => e.notificationData?.typeNotification !== "LOCALIZATION") */
      for await (let notification of notificationsData) {
        if (notification.view) {
          arrayView.push(notification);
        } else {
          console.log(notification);
          arrayNoView.push(notification);
        }
      }

      setNotificationsView(arrayView);
      setNotificationsNoView(arrayNoView);
    } catch (error) {}
  }

  useEffect(() => {
    (async () => {
      updatedAllNotificationsState();
    })();
  }, []);

  useEffect(() => {
    if (user?.notifications?.length !== notifications?.length) {
      (async () => {
        updatedAllNotificationsState();
      })();
    }
  }, [user?.notifications?.length]);

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.MainModal>
        <S.CloseModal onClick={closeModal}>
          <AiOutlineClose size={25} />
        </S.CloseModal>

        <Heading
          fontWeight="300"
          style={{
            textAlign: "left",
            width: "100%",
            fontSize: "2.188rem",
            color: "#FF4C1C",
            marginBottom: "60px",
          }}
        >
          Notificações
        </Heading>

        <Heading
          fontWeight="500"
          style={{
            textAlign: "left",
            width: "100%",
            fontSize: "1.25rem",
            color: "#01302F",
            marginBottom: "16px",
            lineHeight: "40px",
          }}
        >
          Não lidas
        </Heading>

        {notificationsNoView?.length !== 0 ? (
          <S.ContainerOverFlow>
            {notificationsNoView?.map((notification) => (
              <ContainerNotificationMessage
                key={notification?._id}
                notificationId={notification?._id}
                petFullName={notification?.notificationData?.referenceId?.name}
                petId={notification?.notificationData?.referenceId?._id}
                petImage={
                  notification?.notificationData?.referenceId?.avatarImage
                }
                userFullName={notification?.sender?.senderUser?.full_name}
                userImage={notification?.sender?.senderUser?.userImage}
                typeNotification={
                  notification?.notificationData?.typeNotification
                }
                message={notification?.notificationData?.message}
                invitationResponse={
                  notification?.notificationData?.invitationResponse
                }
                notificationViewTrueOrFalse={notification?.view}
                notificationsView={notificationsView}
                setNotificationsView={setNotificationsView}
                notificationsNoView={notificationsNoView}
                setNotificationsNoView={setNotificationsNoView}
                onUpdatedStateNotifications={updatedAllNotificationsState}
              />
            ))}
          </S.ContainerOverFlow>
        ) : (
          <p
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "0.625rem",
              color: "#01302F",
              lineHeight: "40px",
            }}
          >
            Você ainda não tem notificações.
          </p>
        )}

        <Heading
          fontWeight="500"
          style={{
            textAlign: "left",
            width: "100%",
            fontSize: "1.25rem",
            color: "#01302F",
            marginTop: "60px",
            lineHeight: "40px",
          }}
        >
          Lidas
        </Heading>

        {notificationsView?.length !== 0 ? (
          <S.ContainerOverFlow>
            {notificationsView?.map((notification) => (
              <ContainerNotificationMessage
                key={notification?._id}
                notificationId={notification?._id}
                petFullName={notification?.notificationData?.referenceId?.name}
                petId={notification?.notificationData?.referenceId?._id}
                petImage={
                  notification?.notificationData?.referenceId?.avatarImage
                }
                userFullName={notification?.sender?.senderUser?.full_name}
                userImage={notification?.sender?.senderUser?.userImage}
                typeNotification={
                  notification?.notificationData?.typeNotification
                }
                message={notification?.notificationData?.message}
                invitationResponse={
                  notification?.notificationData?.invitationResponse
                }
                notificationViewTrueOrFalse={notification?.view}
                notificationsView={notificationsView}
                setNotificationsView={setNotificationsView}
                notificationsNoView={notificationsView}
                setNotificationsNoView={setNotificationsView}
                onUpdatedStateNotifications={updatedAllNotificationsState}
              />
            ))}
          </S.ContainerOverFlow>
        ) : (
          <p
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "0.625rem",
              color: "#01302F",
              lineHeight: "40px",
            }}
          >
            Você ainda não tem notificações.
          </p>
        )}
      </S.MainModal>
    </Modal>
  );
}
