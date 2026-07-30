import React, { useState } from 'react';
import { ActiveLink } from '../../ActiveLink';
import { useRouter } from 'next/router'
import { FaBars } from 'react-icons/fa'
import ButtonPrimary from '../../Buttons/ButtonPrimary';
import TransformeButton from '../../Buttons/TransformeButton';
import Drawer from '../../Drawer';
import LogoAdbat from '../../../../public/assets/logo_adbat.svg';
import {
  HeaderContainer,
  HeaderContent,
  TextButtonStyle,
  Containers,
  NavResponsive,
  ContentDrawer,
  NavDesktop,
  linkButtonStyle
} from './styles';
import { CSSProp } from 'styled-components';
import { useAuth } from '../../../contexts/AuthContext';

import { useTheme } from 'styled-components';
import lightOrDark from '../../../utils/lightOrDark';
import { UserProps } from '../../../domain/User';

interface HeaderProps {
  styleContentHeader?: CSSProp
}

const HeaderProfile: React.FC<HeaderProps> = ({ styleContentHeader }) => {
  const [visibleMenuState, setVisibleMenuState] = useState(false);

  const { push, back, pathname } = useRouter()
  const { signOut, user = {} as UserProps } = useAuth()
  const { colors } = useTheme()
  const { card } = user

  const colorLogo = lightOrDark(colors.profileColor) === "dark" ? '#fff' : colors.profileColor

  const handleLogout = () => signOut()

  const isHome = pathname === '/home'
  const isProfile = pathname === '/profile'

  return (
    <>
      <Drawer setVisible={setVisibleMenuState} visible={visibleMenuState}>
        {
          (
            <ContentDrawer>
              {
                user?.id && !card?.isActivated &&
                <ActiveLink
                  textLink="Ativar cartão"
                  styleText={linkButtonStyle}
                  href="/activeCard"
                />
              }

              {
                isHome &&
                (
                  <ActiveLink
                    textLink="Editar perfil"
                    styleText={TextButtonStyle}
                    href="/profile"
                  />
                )
              }

              {
                isProfile &&
                (
                  <ActiveLink
                    textLink="Configurações avançadas"
                    styleText={linkButtonStyle}
                    href="/advancedSettings"
                  />
                )
              }

              {
                isHome &&
                (
                  <ActiveLink
                    textLink="Sair"
                    styleText={linkButtonStyle}
                    href="/login"
                    isButton
                    onClickButton={() => handleLogout()}
                  />
                )
              }

              {
                !isHome &&
                (
                  <ActiveLink
                    textLink="Voltar"
                    styleText={linkButtonStyle}
                    href="/"
                    isButton
                    onClickButton={() => back()}
                  />
                )
              }
            </ContentDrawer>
          )
        }
      </Drawer>

      <HeaderContainer>
        <HeaderContent styleContentHeader={styleContentHeader}>
          <Containers>
            <TransformeButton onClick={() => push('/home')}>
              <LogoAdbat style={{ width: '10rem', transition: 'all 0.5s ease-in-out' }} fill={colorLogo} />
            </TransformeButton>
          </Containers>

          <Containers>
            <NavDesktop>
              {
                user?.id && !card?.isActivated &&
                <ActiveLink
                  textLink="Ativar cartão"
                  styleText={linkButtonStyle}
                  href="/activeCard"
                />
              }

              {
                !isHome &&
                (
                  <ActiveLink
                    textLink="Voltar"
                    styleText={linkButtonStyle}
                    href="../"
                    isButton
                    onClickButton={() => back()}
                  />
                )
              }

              {
                isProfile &&
                (
                  <ActiveLink
                    textLink="Configurações avançadas"
                    styleText={linkButtonStyle}
                    href="/advancedSettings"
                  />
                )
              }

              {
                isHome &&
                (
                  <ActiveLink
                    textLink="Editar perfil"
                    styleText={TextButtonStyle}
                    href="/profile"
                  />
                )
              }

              {
                isHome &&
                (
                  <ActiveLink
                    textLink="Sair"
                    styleText={linkButtonStyle}
                    href="/"
                    isButton
                    onClickButton={() => handleLogout()}
                  />
                )
              }
            </NavDesktop>
            <NavResponsive>
              <TransformeButton onClick={() => setVisibleMenuState(true)}>
                <FaBars color="#fff" size={24} />
              </TransformeButton>
            </NavResponsive>
          </Containers>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}

export default HeaderProfile;
