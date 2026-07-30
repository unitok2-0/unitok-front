import { Heading, Text } from 'components/Typography'
import * as S from './styles'
import { homeIcons } from '../../../pages/index-old'

export function Module3() {
  return (
    <S.ThirdScreen id={'section-id-3'}>
      <Heading className="PrincipalH2" font="titleLg" color="primary">
        único
      </Heading>
      <Text className="PrincipalP" font="bodyLg" color="white">
        Apenas um cartão. Para sempre.
      </Text>
      <S.ThirdTextDiv>
        <div>
          <Heading font="titleMdLight" color="white">
            100%
          </Heading>
          <Text font="bodyMd" color="white">
            Eco-friendly
          </Text>
        </div>
        <div>
          <Heading font="titleMdLight" color="white">
            0
          </Heading>
          <Text font="bodyMd" color="white">
            Desperdício
          </Text>
        </div>
        <div>
          <Heading font="titleMdLight" color="white">
            100%
          </Heading>
          <Text font="bodyMd" color="white">
            Dados customizáveis
          </Text>
        </div>
      </S.ThirdTextDiv>
      <img
        className="bracoCartao"
        src={homeIcons.unitokCartaoPrincipal1WithoutName}
        alt=""
      />
    </S.ThirdScreen>
  )
}
