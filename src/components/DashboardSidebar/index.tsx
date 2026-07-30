import {
  Container,
  UserContainer,
  UserImage,
  UserInfos,
  UserName,
  UserStatus
} from './styles'

import { HeaderLogo } from 'components/Header/HeaderLogo'
import { DashboardSidebarButton, DashboardSidebarButtonProps } from 'components/DashboardSidebarButton'

export interface DashboardSidebarProps {
  buttons: DashboardSidebarButtonProps[];
}

export function DashboardSidebar({ buttons }: DashboardSidebarProps) {
  // const image = user?.image || "https://unitok.s3.sa-east-1.amazonaws.com/avatar-default.png"

  return (
    <Container>
      
      <HeaderLogo />

      <UserContainer>

        {/* <UserImage
          src={image}
        />

        <UserInfos>
          <UserName>{user?.name}</UserName>
          <UserStatus>{user?.status}</UserStatus>
        </UserInfos> */}

      </UserContainer>

      {buttons?.map((button, index) => (
        <DashboardSidebarButton key={index}
          isSelected={button.isSelected}
          icon={button.icon}
          hasChevronRightIcon={button.hasChevronRightIcon}
        >
          {button.children}
          
        </DashboardSidebarButton>
      ))}

      
    </Container>
  )
}