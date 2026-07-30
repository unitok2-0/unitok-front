import { useRouter } from 'next/router'
import { BsBag, BsPerson } from 'react-icons/bs'
import { FiTruck } from 'react-icons/fi'
import { BiDollar } from 'react-icons/bi'
import { useCheckout } from 'contexts/CheckoutContext'

import { HeaderLogo } from './HeaderLogo'
import { Stepper } from '../Stepper'
import { PageDiv } from './PageDiv'
import { LogoAndCartOnly } from './LogoAndCartOnly'
import { Colors } from 'styles/Colors'
import { Pageheader } from './PageHeader'
import { HeaderContainer, HeaderContent, HeaderContainerProps } from './styles'
import { HeaderLogoHome } from './HeaderLogoHome'

export interface HeaderTextColorProps {
  color: string
}

export interface HeaderHomeProps extends HeaderContainerProps {
  whatColor?: 'colorful' | 'transp'
  variant?: 'page' | 'stepper' | 'logoAndCartOnly' | 'logoOnly'
  heightLogo?: string
  widthLogo?: string
  whatPage?: number
  oppenedBurguerMenu?: boolean
  setOppenedBurguerMenu?: () => void
}

const CHECKOUT_STEPPER_LINKS = [
  {
    label: 'Sacola',
    href: '/checkout/cart',
    iconToShowOnMobile: <BsBag />,
  },
  {
    label: 'Dados pessoais',
    href: '/checkout/data',
    iconToShowOnMobile: <BsPerson />,
  },
  {
    label: 'Entrega',
    href: '/checkout/address',
    iconToShowOnMobile: <FiTruck />,
  },
  {
    label: 'Pagamento',
    href: '/checkout/payment',
    iconToShowOnMobile: <BiDollar />,
  },
]

export function HeaderHome(props: HeaderHomeProps) {
  const {
    whatColor = 'transp',
    variant = 'page',
    heightLogo,
    widthLogo,
    whatPage,
    ...headerProps
  } = props
  const { checkoutStep } = useCheckout()

  const router = useRouter()

  function handleChangeColor() {
    if (whatColor === 'colorful') return Colors.white
    if (whatColor === 'transp') return Colors.primaryGreen
  }

  return (
    <HeaderContainer {...headerProps}>
      {variant === 'logoOnly' ? (
        <HeaderContent>
          <HeaderLogoHome heightLogo={heightLogo} widthLogo={widthLogo} />
        </HeaderContent>
      ) : (
        <>
          <HeaderContent>
            <HeaderLogoHome heightLogo={heightLogo} widthLogo={widthLogo} />
            {variant === 'page' && (
              <Pageheader pageIndex={whatPage} color={handleChangeColor()} />
            )}
          </HeaderContent>
          {variant === 'page' && (
            <PageDiv
              color={handleChangeColor()}
              setOppenedBurguerMenu={props.setOppenedBurguerMenu}
            />
          )}
          {variant === 'logoAndCartOnly' && (
            <LogoAndCartOnly color={handleChangeColor()} />
          )}
          {variant === 'stepper' && (
            <Stepper
              lastUnlockedIndex={checkoutStep}
              activeIndex={CHECKOUT_STEPPER_LINKS.findIndex(
                (link) => link.href === router?.asPath
              )}
              links={CHECKOUT_STEPPER_LINKS}
            />
          )}
        </>
      )}
    </HeaderContainer>
  )
}
