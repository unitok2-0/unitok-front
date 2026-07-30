import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

import {
  DashboardSidebarButton,
  DashboardSidebarButtonProps,
} from "components/DashboardSidebarButton";
import { Heading, Text } from "components/Typography";

import useDisclosure from "hooks/useDisclosure";
import * as S from "./styles";
import { BsBell, BsQuestionCircle } from "react-icons/bs";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";
import { handleGetNotification } from "services/notification";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

export type DashboardHeaderProps = {
  logoLinkHref?: string;
  children: React.ReactNode;
  variant?: string;
  notificationModalHandleOpen?: () => void;
  links: (Pick<
    DashboardSidebarButtonProps,
    "href" | "hasChevronRightIcon" | "icon" | "isSelected" | "onClick"
  > & {
    label: string;
    isNew?: boolean;
    isDisabled?: boolean;
  })[];
};

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { handleToggle, isOpen } = useDisclosure();
  const { user, signOut } = useAuth();
  const router = useRouter()

  function onHandleOpenModalNotification() {
    if (user?.notifications.length >= 1) {
      props.notificationModalHandleOpen();
    } else {
      toast.error('Você não tem nenhuma notificação')
    }
  }

  //disabled platform notification temporarily
  const [notifications, setNotifications] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const notificationsData = await handleGetNotification({});
        setNotifications(notificationsData);

        // const onlyInviteNotifications = notificationsData.filter(e => e.notificationData?.typeNotification !== "LOCALIZATION")
        // setNotifications(onlyInviteNotifications);

      } catch (error) { }
    })()
  }, []);

  let dashboardOptions = props.links;

  return (
    <S.Wrapper className={`${isOpen ? "open" : ""}`}>
      <S.Head>
        <Link href={props.logoLinkHref || ""}>

          <img src="/assets/logo2.svg" alt="Unitok" />

        </Link>

        <S.HeadIcons>
          <S.Icon onClick={onHandleOpenModalNotification}>
            <BsBell size={19} />
            <S.NotificationsLength>
              {notifications?.length}
            </S.NotificationsLength>
          </S.Icon>

          <Link href="/profile/help" passHref legacyBehavior>
            <S.Icon>
              <BsQuestionCircle size={19} />
            </S.Icon>
          </Link>

          <S.Icon onClick={signOut}>
            <FiLogOut size={19} />
          </S.Icon>

          <S.HamburgerButton onClick={handleToggle}>
            {isOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </S.HamburgerButton>
        </S.HeadIcons>
      </S.Head>

      <S.Content className={`${isOpen ? "open" : ""}`}>
        {props.children}
        <nav className="orange-custom-scrollbar">
          {dashboardOptions.map((link) => (
            <>
              {!link.isDisabled &&
                <DashboardSidebarButton key={link.href || link.label} {...link}>
                  {link.label}
                  {
                    link.isNew && (
                      <label className="label">Novo</label>
                    )
                  }
                </DashboardSidebarButton>
              }
            </>
          ))}
        </nav>
        {props.variant === 'teams-admin' &&
          <S.ManageAccount onClick={() => router.push('/teams/my-subscription')}>
            <Text>Gerenciar minha assinatura</Text>
            <img src="/assets/Unitok_personalizados_cartao.png" alt="cartao personalizado" />
          </S.ManageAccount>
        }
      </S.Content>
    </S.Wrapper >
  );
}
