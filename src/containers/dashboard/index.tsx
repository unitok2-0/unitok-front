import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdPeopleOutline, MdOutlineAttachMoney } from "react-icons/md";
import { FiUserPlus, FiLock, FiUsers } from "react-icons/fi";
import { AiOutlineQrcode, AiOutlineSetting } from "react-icons/ai";
import { BiBarChart, BiUser } from "react-icons/bi";
import { RiContactsBook2Line, RiLogoutBoxLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsBell, BsQuestionCircle } from "react-icons/bs";
import { IoMdPeople } from 'react-icons/io'
import { TiContacts } from 'react-icons/ti'
import { updateUserProfileStatus } from "services/user";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { MdPets } from 'react-icons/md';
import { Heading, Text } from "components/Typography";
import { ModalPWA } from "components/Conarh2022/ModalPWA";
import { IoPawOutline } from "react-icons/io5";
import { ModalNotificationInviteTutor } from "components/Pets/ModalNotificationInviteTutor";

import PetIcon from "/public/assets/Icon_pet.svg";
import UnitokIcon from "/public/assets/UnitokIcon.svg";
import ConfirmationModal from "components/ConfirmationModal";
import useDisclosure from "hooks/useDisclosure";
import StatusLabel from "components/StatusLabel";
import DashboardHeader from "components/DashboardHeader";
import * as S from "./styles";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { handleGetNotification } from "services/notification";
import ButtonLink from "components/Buttons/ButtonLink";
import { getImageUrl } from "constants/functions";
import { ModalTeamsUserAccounts } from "components/Modals/ModalTeamsUserAccounts";
import { useProfile } from "contexts/ProfileContext";

export type DashbardContainerProps = S.ContentProps & {
  children: React.ReactNode;
  title?: string;
  variant?: "intern-management" | "user-account" | "teams-admin";
};

const internManagementLinks = [
  {
    icon: <MdPeopleOutline size={20} />,
    label: "Gestão de contas",
    href: "/intern-management/accounts",
    hasChevronRightIcon: true,
  },
  {
    icon: <MdOutlineAttachMoney size={20} />,
    label: "Gestão de pagamentos",
    href: "/intern-management/payments",
    hasChevronRightIcon: true,
  },
  // {
  //   icon: <FiUserPlus size={20} />,
  //   label: "Adicionar conta",
  //   href: "/intern-management/add-account",
  //   hasChevronRightIcon: true,
  // },
  {
    icon: <AiOutlineQrcode size={20} />,
    label: "QR Codes",
    href: "/intern-management/qrcodes",
    hasChevronRightIcon: true,
  },
  {
    icon: <AiOutlineSetting size={20} />,
    label: "Configurações",
    href: "/intern-management/settings",
    hasChevronRightIcon: true,
  },
  // {
  //   icon: <BiBarChart size={20} />,
  //   label: "Analytics",
  //   href: "/intern-management/analytics",
  //   hasChevronRightIcon: true,
  // },
  {
    icon: <RiLogoutBoxLine size={20} />,
    label: "Fazer logout",
  },
];

const userAccountLinks = [
  {
    icon: <BiUser size={20} />,
    label: "Ver meu perfil público",
    href: "/profile/me",
    hasChevronRightIcon: true,
  },
  {
    icon: <FaRegEdit size={20} />,
    label: "Editar perfil",
    href: "/profile/edit",
    hasChevronRightIcon: true,
  },
  {
    icon: <TiContacts size={20} />,
    label: "Contatos compartilhados comigo",
    href: "/profile/contacts",
    hasChevronRightIcon: true,
    isNew: true
  },
  {
    icon: <BiBarChart size={20} />,
    label: "Relatório",
    href: "/profile/analytics",
    hasChevronRightIcon: true,
  },
  {
    icon: <UnitokIcon size={20} />,
    label: "Meus dispositivos Unitok",
    href: "/profile/mydevices",
    hasChevronRightIcon: true,
    isNew: true
  },
  {
    icon: <IoPawOutline size={20} />,
    label: "Meus Pets",
    href: "/profile/mypets",
    hasChevronRightIcon: true,
  },
  {
    icon: <AiOutlineSetting size={20} />,
    label: "Configurações",
    href: "/profile/settings",
    hasChevronRightIcon: true,
  }
];

const petsAccountLinks = [
  {
    icon: <UnitokIcon size={20} />,
    label: "Meus dispositivos Unitok",
    href: "/profile/mydevices",
    hasChevronRightIcon: true,
    isNew: true
  },
  {
    icon: <IoPawOutline size={20} />,
    label: "Meus Pets",
    href: "/profile/mypets",
    hasChevronRightIcon: true,
  },
  {
    icon: <AiOutlineSetting size={20} />,
    label: "Configurações",
    href: "/profile/pets-settings",
    hasChevronRightIcon: true,
  }
];

const teamsAdminLinks = [
  {
    icon: <FiUsers size={20} />,
    label: "Usuários",
    href: "/teams/enterprise-profile",
    hasChevronRightIcon: true,
  },
  {
    icon: <BiBarChart size={20} />,
    label: "Relatório",
    href: "/teams/reports",
    hasChevronRightIcon: true,
  },
  {
    icon: <TiContacts size={20} />,
    label: "Leads",
    href: "/teams/leads",
    hasChevronRightIcon: true,
  },
  {
    icon: <AiOutlineSetting size={20} />,
    label: "Configurações",
    href: "/teams/adm-settings",
    hasChevronRightIcon: true,
  }
];

export default function DashbardContainer(props: DashbardContainerProps) {
  const { variant } = props;
  const router = useRouter();
  
  const { user, signOut, setUser, updateUser } = useAuth();
  const { profile } = useProfile();

  const confirmationModal = useDisclosure();
  const notificationModal = useDisclosure();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [modalPwaIsOpen, setModalPwaIsOpen] = useState(false);
  const [modalUserAccountsIsOpen, setModalUserAccountsIsOpen] = useState(false)

  const userName = user?.full_name ?? user?.enterpriseName;
  const userFirstName = userName?.split(" ")[0];

  const isInternManagement = variant === "intern-management";

  let dashboardLinks: any[] = userAccountLinks;

  if(profile === "ADMIN")
    dashboardLinks = internManagementLinks
  if(profile === "TEAMS_ADMIN")
    dashboardLinks = teamsAdminLinks
  else if(profile === "PETS")
    dashboardLinks = petsAccountLinks

  async function handleUpdateUserProfileStatus() {
    setIsUpdatingStatus(true);

    try {
      if (user?.status === "ACTIVE") {
        const user = await updateUserProfileStatus("INACTIVE");
        setUser(user);
      } else if (user?.status === "INACTIVE") {
        const user = await updateUserProfileStatus("ACTIVE");
        setUser(user);
      }
    } catch {
      toast.error("Erro ao bloquear/desbloquear");
    }
    setIsUpdatingStatus(false);
    confirmationModal.handleClose();
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ APAGAR ISSO QUANDO FOR INTEGRAR
  // TODO
  useEffect(() => {
    let math = Math.round(Math.random() * 100)
    if (math > 50) {
      setModalPwaIsOpen(true)
    }
  }, [])

  function handleOpenModalNotification() {

    if (user?.notifications.length >= 1) {
      notificationModal.handleOpen();
    } else {
      toast.error('Você não tem nenhuma notificação')
    }
  }

  const [disabledButtonMenu, setDisabledButtonMenu] = useState<boolean>(false);

  useEffect(() => {
    if (window.screen.width < 1120) {
      setDisabledButtonMenu(true);
    } else {
      setDisabledButtonMenu(false);
    }
  }, [])

  //disabled platform notification temporarily
  const [notifications, setNotifications] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const notificationsData = await handleGetNotification({});
        setNotifications(notificationsData);

        /* const onlyInviteNotifications = notificationsData.filter(e => e.notificationData?.typeNotification !== "LOCALIZATION")
        setNotifications(onlyInviteNotifications); */

      } catch (error) { }
    })()
  }, []);

  return (
    <>
      <ConfirmationModal
        title="Você tem certeza que deseja bloquear o seu Unitok?"
        onCancelClick={confirmationModal.handleClose}
        onConfirmClick={handleUpdateUserProfileStatus}
        modalIsOpen={confirmationModal.isOpen}
        confirmButtonText="Bloquear cartão"
        closeModal={confirmationModal.handleClose}
        isConfirmLoading={isUpdatingStatus}
      >
        Ao bloquear o seu cartão, suas informações ficarão inacessíveis até que
        o desbloqueie novamente.
      </ConfirmationModal>

      <ModalNotificationInviteTutor
        closeModal={notificationModal.handleClose}
        modalIsOpen={notificationModal.isOpen}
        user={user}
      />

      <S.Wrapper>
        <DashboardHeader
          variant={variant}
          notificationModalHandleOpen={notificationModal.handleOpen}
          logoLinkHref="/"
          links={dashboardLinks.map((link) => {
            return {
              ...link,
              isSelected: router.asPath.startsWith(link.href),
            };
          })}
        >
          {isInternManagement || teamsAdminLinks ? (
            <S.InternManagamentHeaderContent>
              {
                variant === 'teams-admin' ? (
                  <img
                    src={getImageUrl(user?.logoImage)}
                    alt={user?.enterpriseName}
                    title={user?.enterpriseName}
                  />
                ) : (
                  <img
                    src={getImageUrl(user?.userImage)}
                    alt={user?.full_name}
                    title={user?.full_name}
                  />
                )
              }
              <div>
                <Heading
                  as="h3"
                  font="titleXs"
                >
                  {profile === "TEAMS_ADMIN" ? user?.enterpriseName : userFirstName}
                </Heading>

                {teamsAdminLinks ?
                  <ButtonLink
                    variant="tertiary"
                    onClick={() => setModalUserAccountsIsOpen(true)}
                  >
                    Trocar de perfil
                  </ButtonLink> :
                  <Text font="bodySm">{user?.profession}</Text>}
              </div>

            </S.InternManagamentHeaderContent>
          ) : (
            <S.UserAccountHeaderContent>
              <Heading>Olá, {userFirstName}!</Heading>
              <Text font="bodySm">Status do seu Unitok: </Text>
              <StatusLabel font="bodySm" isActive={user?.status === "ACTIVE"} />

              {user?.status === "ACTIVE" ? (
                <ButtonPrimary
                  variant="tertiary"
                  rightElement={<FiLock />}
                  onClick={confirmationModal.handleOpen}
                >
                  Bloquear temporariamente
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  variant="tertiary"
                  rightElement={<FiLock />}
                  onClick={handleUpdateUserProfileStatus}
                  loading={isUpdatingStatus}
                >
                  Desbloquear cartão
                </ButtonPrimary>
              )}
            </S.UserAccountHeaderContent>
          )}

        </DashboardHeader>
        <S.Content shouldDisablePadding={props.shouldDisablePadding}>
          {props.title && (
            <Heading as="h1" font="titleMd" fontWeight="300" color="primary">
              {props.title}
            </Heading>
          )}
          {props.children}
        </S.Content>

        {
          modalUserAccountsIsOpen &&
          <ModalTeamsUserAccounts
            user={user}
            setIsMenuOpen={setModalUserAccountsIsOpen}
          />
        }

      </S.Wrapper>
    </>
  );
}
