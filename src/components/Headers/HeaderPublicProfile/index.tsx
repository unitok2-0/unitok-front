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
  Containers,
} from './styles';
import { CSSProp } from 'styled-components';
import { useAuth } from '../../../contexts/AuthContext';

import { useTheme } from 'styled-components';
import lightOrDark from '../../../utils/lightOrDark';
import { Colors } from '../../../styles/Colors';

interface HeaderProps {
  styleContentHeader?: CSSProp,
  profileColor?: string;
}

const HeaderPublicProfile: React.FC<HeaderProps> = ({
  styleContentHeader,
  profileColor = Colors.primary,
}) => {

  const { push } = useRouter()

  const colorLogo = lightOrDark(profileColor) === "dark" ? '#fff' : profileColor

  return (
    <>
      <HeaderContainer>
        <HeaderContent styleContentHeader={styleContentHeader}>
          <Containers>
            <TransformeButton onClick={() => push('/home')}>
              <LogoAdbat style={{ transition: 'all 0.5s ease-in-out' }} fill={colorLogo} />
            </TransformeButton>
          </Containers>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}

export default HeaderPublicProfile;
