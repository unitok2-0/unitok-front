import { useRouter } from 'next/router'
import { Text } from 'components/Typography'
import { HeaderTextColorProps } from '.'
import { HeaderSection } from './styles'

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

interface PageHeaderProps extends HeaderTextColorProps {
  pageIndex?: number
}

export function Pageheader({ color, pageIndex = 0 }: PageHeaderProps) {
  const { push } = useRouter()

  return (
    <HeaderSection style={{ color }}>
      {options.map((option, index) =>
        pageIndex === index ? (
          <Text
            key={index}
            font="bodyMd"
            style={{ color, position: 'relative' }}
            onClick={() => push(option.link)}
          >
            {option.name}
            <span className="redDot" />
          </Text>
        ) : (
          <Text
            key={index}
            font="bodyMd"
            style={{ color }}
            onClick={() => push(option.link)}
          >
            {option.name}
          </Text>
        )
      )}
    </HeaderSection>
  )
}
