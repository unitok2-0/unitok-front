import TransformButton from 'components/Buttons/TransformeButton'
import Modal, { MainModalProps } from 'components/Modals/MainModal'
import { GrClose } from 'react-icons/gr'
import { UseTerms } from 'components/UseTerms'
import UnitokLogo from '../../../public/assets/logo.svg'
import { Heading, Text } from '../../components/Typography'
import * as S from './styles'

export type UseTermsModalProps = MainModalProps & {}

export default function UseTermsModal(props: UseTermsModalProps) {
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
        <Heading>Termos e Condições de uso</Heading>
        <Text css={{ marginBottom: '5rem' }}>
          Termos e condições gerais de uso dos serviços do site www.unitok.com.
          Tais serviços são fornecidos pela Empresa de Responsabilidade Limitada
          ADBAT CONSULTORIA DE ESTRATÉGIA DIGITAL LTDA, inscrita no CNPJ
          28.612.816/0001-95, com sede na Av. Paulista, 1842, cj. 155, sala C,
          Torre Norte, Cerqueira Cesar, Bela Vista, São Paulo, SP, cep
          01310.945, com atos constitutivos averbados na Jucesp sob o NIRE
          35235077380 de 11.09.2017 e 1ª alteração contratual averbada sob nº
          246.522/21-5 de 17.06.2021 que é titular da propriedade intelectual
          sobre a tecnologias envolvidas, código-fonte de programa de
          computador, website, know how, marca, logotipos e insígnias,
          conteúdos, vídeos e demais elementos protegidos pelas Leis 9279/96,
          9609/98 e 9610/98.
        </Text>
        <UseTerms></UseTerms>
      </S.UseTermsModalProps>
    </Modal>
  )
}
