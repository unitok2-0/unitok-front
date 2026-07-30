import TransformButton from 'components/Buttons/TransformeButton'
import Modal, { MainModalProps } from 'components/Modals/MainModal'
import { GrClose } from 'react-icons/gr'
import UnitokLogo from '../../../../public/assets/logo.svg'
import { Heading, Text } from '../../Typography'
import * as S from './styles'
import { Privacy } from '../PrivacityConaRH'

export type UsePrivacyConaRHModalProps = MainModalProps & {}

export default function UsePrivacyConaRHModal(props: UsePrivacyConaRHModalProps) {
  return (
    <Modal
      customStyles={{
        content: {
          outline: 'none',
          height: '100%',
          overflow: 'auto',
          minWidth: '100%',
        },
      }}
      modalIsOpen={props.modalIsOpen}
      closeModal={props.closeModal}
    >
      <S.UseTermsModalProps>
        <header>
          <UnitokLogo />
          <TransformButton onClick={props.closeModal}>
            <GrClose size={24}></GrClose>
          </TransformButton>
        </header>
        <Heading>Política de privacidade e proteção de dados</Heading>
        <Text css={{ marginBottom: '5rem' }}>
          <span>
            A Política de Privacidade do Unitok  (“Política”) foi criada para demonstrar o seu comprometimento com a privacidade e segurança de dados coletados dos clientes, pessoas ou usuários que fizerem uso de seus serviços através do site ou outros canais de comunicação.
          </span>
          <span>
            No Unitok, uma de nossas principais prioridades é a privacidade. Este documento de Política de Privacidade contém os tipos de informações que são coletadas e registradas por nós e como as usamos.
          </span>
          <span>
            Se você tiver perguntas adicionais ou precisar de mais informações
            sobre nossa Política de Privacidade, não hesite em nos contatar
            através do e-mail:{' '}
            <a href="mailto:contato@unitok.com">contato@unitok.com</a>.
          </span>
          <span>
            O Unitok precisa coletar e usar certos tipos de informações sobre as pessoas ou usuários do serviço que entram em contato, a fim de continuar nosso trabalho. Essas informações pessoais devem ser coletadas e tratadas, como apropriadamente se é coletado em papel, armazenado em um banco de dados de computador ou registrado em outro material e há salvaguardas para garantir isso.
          </span>
        </Text>
        <Privacy></Privacy>
      </S.UseTermsModalProps>
    </Modal>
  )
}
