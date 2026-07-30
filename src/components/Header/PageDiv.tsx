import { useRouter } from 'next/router'

import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import { FiUser } from 'react-icons/fi'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import CartDropdown from 'components/CartDropdown'
import { HeaderContent2, HeaderDiv } from './styles'

import UserIcon from '../../../public/assets/user-icon.svg'

interface PageDivProps {
  color: string
  oppenedBurguerMenu?: boolean
  setOppenedBurguerMenu?: () => void
}

export function PageDiv({
  color,
  oppenedBurguerMenu,
  setOppenedBurguerMenu,
}: PageDivProps) {
  const { push } = useRouter()

  return (
    <HeaderContent2>
      <ButtonPrimary
        className="go-to-cards-button"
        onClick={() => push('/cards/classictok-0')}
      >
        Escolha seu unitok
      </ButtonPrimary>

      <HeaderDiv>
        <span className="menu">
          <HiOutlineMenuAlt3
            onClick={setOppenedBurguerMenu}
            className="burguerMenuClass"
            style={{
              color,
            }}
          />
        </span>
        <span className="user-icon">
          <UserIcon
            onClick={() => push('/login')}
            css={{ stroke: color, width: 32, marginRight: '-12px' }}
          ></UserIcon>
        </span>
        <span className="cart-icon">
          <CartDropdown color={color} />
        </span>
      </HeaderDiv>
    </HeaderContent2>
  )
}
