import TransformButton from 'components/Buttons/TransformeButton'
import Modal, { MainModalProps } from 'components/Modals/MainModal'
import { GrClose } from 'react-icons/gr'
import UnitokLogo from '../../../../public/assets/logo.svg'
import { Heading, Text } from '../../Typography'
import * as S from './styles'
import { UseTerms } from '../UseTermsConaRH'

export type UseTermsModalConaRHProps = MainModalProps & {}

export function UseTermsConaRHModal(props: UseTermsModalConaRHProps) {
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
          Termos e condições gerais de uso dos serviços do site www.unitok.com. Tais serviços são fornecidos pela Empresa de Responsabilidade Limitada UNITOK SISTEMAS LTDA, inscrita no CNPJ 45.340.462/0001-96, com sede na R Comendador Torlogo Dauntre, 74, sala 1207, Cambui, Campinas, SP, cep 13.025-270, com atos constitutivos averbados na Jucesp sob o NIRE 35235077380 de 11.09.2017 e 1ª alteração contratual averbada sob nº 246.522/21-5 de 17.06.2021 que é titular da propriedade intelectual sobre a tecnologias envolvidas, código-fonte de programa de computador, website, know how, marca, logotipos e insígnias, conteúdos, vídeos e demais elementos protegidos pelas Leis 9279/96, 9609/98 e 9610/98.
        </Text>
        <UseTerms></UseTerms>
      </S.UseTermsModalProps>
    </Modal>
  )
}
