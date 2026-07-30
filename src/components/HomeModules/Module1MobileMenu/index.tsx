import { useRouter } from 'next/router'
import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import * as S from './styles'
import { Heading } from 'components/Typography'

const options = [
  {
    name: 'Início',
    link: '/#section-id-1',
  },
  {
    name: 'O que é?',
    link: '/#section-id-2',
  },
  {
    name: 'Funcionalidades',
    link: '/#section-id-3',
  },
  /*   {
    name: "Personalizado",
    link: '/personalizado'
  }, */
  {
    name: 'Dúvidas',
    link: '/#section-id-8',
  },
]

const image = {
  src: '/assets/oppenedBurguerLogo.svg',
  alt: 'Logo icon',
}

interface Module1MobileMenuProps {
  oppenedBurguerMenu?: boolean
  setOppenedBurguerMenu?: () => void
}

export function Module1MobileMenu({
  oppenedBurguerMenu,
  setOppenedBurguerMenu,
}: Module1MobileMenuProps) {
  const { push } = useRouter()

  function handleChangePage(link: string) {
    setOppenedBurguerMenu()
    push(link)
  }

  return (
    <S.OppenedBurguerMenu>
      <S.OppenedBurguerMenuHeader>
        <img src={image.src} alt={image.alt} />
        <ButtonPrimary
          variant="tertiary"
          colorScheme="white"
          onClick={setOppenedBurguerMenu}
        >
          Fechar
        </ButtonPrimary>
      </S.OppenedBurguerMenuHeader>

      <S.OppenedBurguerMenuOptionsArea>
        {options.map((option, i) => (
          <Heading
            key={i}
            font="titleMdLightMobile"
            color="white"
            onClick={() => handleChangePage(option.link)}
          >
            {option.name}
          </Heading>
        ))}
      </S.OppenedBurguerMenuOptionsArea>

      <ButtonPrimary
        fullWidth
        variant="secondary"
        colorScheme="white"
        onClick={() => push('cards/classictok-0')}
      >
        Escolha seu cartão
      </ButtonPrimary>
    </S.OppenedBurguerMenu>
  )
}
