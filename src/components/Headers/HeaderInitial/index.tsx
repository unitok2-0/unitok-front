import React, { useEffect, useState } from 'react';
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
  ButtonStyle
} from './styles';

interface HeaderProps {
  headerOnlyBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ headerOnlyBack }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [HeightDimensions, setHeightDimensions] = useState(720);
  const [visibleMenuState, setVisibleMenuState] = useState(false);

  const { asPath, push, query = {}, back } = useRouter()

  const isInLogin = asPath === '/login'

  useEffect(() => {
    const { to = 0 } = query
    const goTo = Number(to)
    scrollTo(goTo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = () => {
    const position = window?.pageYOffset;
    setScrollPosition(position);
  };

  const scrollTo = (position: number) => {
    window?.scroll({ top: position, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    const { innerHeight: height } = window;
    setHeightDimensions(height)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const comparation = (smaller: number, bigger: number) => {
    if (isInLogin) return false
    if (scrollPosition < smaller && scrollPosition >= bigger) return true
    return false
  }

  const handleGoToPage = (value: number) => {
    setVisibleMenuState(false)
    push(`/?to=${value}`)
    scrollTo(value)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Containers>
          <TransformeButton onClick={() => push('/')}>
            <LogoAdbat style={{ width: '9rem' }} />
          </TransformeButton>
        </Containers>

        <Containers>
          <NavDesktop>
            {
              !headerOnlyBack &&
              <>
                <ActiveLink
                  isActiveProp={comparation(HeightDimensions, 0)}
                  textLink="Inicio"
                  styleText={TextButtonStyle}
                  href="/"
                  isButton
                  onClickButton={() => handleGoToPage(0)}
                />
                <ActiveLink
                  isActiveProp={comparation(HeightDimensions * 2, HeightDimensions)}
                  textLink="Como funciona"
                  styleText={TextButtonStyle}
                  href="/"
                  isButton
                  onClickButton={() => handleGoToPage(HeightDimensions)}
                />

                <ActiveLink
                  textLink="Fazer login"
                  styleText={ButtonStyle}
                  href="/login"
                />
              </>
            }

            {
              headerOnlyBack &&
              <ActiveLink
                textLink="Voltar"
                styleText={TextButtonStyle}
                href="/"
                isButton
                onClickButton={() => back()}
              />
            }
          </NavDesktop>

          <NavResponsive>
            {
              headerOnlyBack ?
                <ActiveLink
                  textLink="Voltar"
                  styleText={TextButtonStyle}
                  href="/"
                  isButton
                  onClickButton={() => back()}
                />
                :
                <TransformeButton onClick={() => setVisibleMenuState(true)}>
                  <FaBars color="#fff" size={24} />
                </TransformeButton>
            }

            <Drawer setVisible={setVisibleMenuState} visible={visibleMenuState}>
              {
                (
                  <ContentDrawer>
                    {
                      !headerOnlyBack &&
                      <>
                        <ActiveLink
                          isActiveProp={comparation(HeightDimensions, 0)}
                          textLink="Inicio"
                          styleText={TextButtonStyle}
                          href="/"
                          isButton
                          onClickButton={() => handleGoToPage(0)}
                        />
                        <ActiveLink
                          isActiveProp={comparation(HeightDimensions * 2, HeightDimensions)}
                          textLink="Como funciona"
                          styleText={TextButtonStyle}
                          href="/"
                          isButton
                          onClickButton={() => handleGoToPage(HeightDimensions)}
                        />

                        <ActiveLink
                          textLink="Fazer login"
                          styleText={TextButtonStyle}
                          href="/login"
                        />

                      </>
                    }

                    {
                      headerOnlyBack &&
                      <ActiveLink
                        textLink="Voltar"
                        styleText={TextButtonStyle}
                        href="/"
                        isButton
                        onClickButton={() => back()}
                      />
                    }
                  </ContentDrawer>
                )
              }
            </Drawer>
          </NavResponsive>
        </Containers>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header;


// import { SignInButton } from '../SignInButton';
// import styles from './styles.module.scss';