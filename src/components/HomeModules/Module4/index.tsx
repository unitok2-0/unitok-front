import { Heading, Text } from 'components/Typography'
import * as S from './styles'
import { homeIcons } from '../../../pages/index-old'

export function Module4() {
  return (
    <S.FourthScreen id={'section-id-4'}>
      <Heading font="titleLg" color="primary">
        fácil
      </Heading>
      <Text font="bodyMd" color="secondary">
        Compartilhe os seus dados de contato com quantas pessoas quiser. E
        quando não quiser mais compartilhar, basta bloquear
        <img src={homeIcons.padlock} alt="Padlock" />.
      </Text>
    </S.FourthScreen>
  )
}
