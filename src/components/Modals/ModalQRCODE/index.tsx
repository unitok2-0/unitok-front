import React, { CSSProperties } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import MainModal from '../MainModal'
import { Content } from './styles'
import { ReactElement } from 'react'
import { Heading, Text } from 'components/Typography'
import TransformeButton from 'components/Buttons/TransformeButton'

export interface ModalQRCODEProps {
  modalIsOpen: boolean
  valueQRCODE: string
  afterOpenModal?: () => void
  closeModal: () => void
  topElement?: ReactElement
  bottomElement?: ReactElement
}

interface StylesProps {
  content: CSSProperties
  overlay: CSSProperties
}

// const styles: StylesProps = {
//   content: {
//     maxWidth: 340,
//     padding: 20,
//     paddingTop: 0,
//     paddingBottom: 0,
//     margin: "auto auto",
//     height: 340,
//     alignItems: "center",
//     justifyContent: "center",
//     display: "flex",
//     borderRadius: 8,
//     boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
//   },
//   overlay: { zIndex: 1000, backgroundColor: "rgba(0,0,0,.4)" },
// };

const ModalQRCODE: React.FC<ModalQRCODEProps> = ({
  modalIsOpen,
  valueQRCODE,
  afterOpenModal,
  closeModal,
  topElement,
  bottomElement,
}) => {

  return (
    <MainModal
      modalIsOpen={modalIsOpen}
      afterOpenModal={afterOpenModal}
      closeModal={closeModal}
    >
      <Content>
        {topElement}
        <div>
          <TransformeButton onClick={closeModal} style={{ fontWeight: '400' }}>Fechar</TransformeButton>
          <Heading font="titleXs" color="primary">
            QR Code
          </Heading>
          <Text>Modo offline</Text>
        </div>
        <QRCodeCanvas
          value={valueQRCODE || ''}
          size={200}
          level="M"
          fgColor="#2E3436"
          imageSettings={{
            src: "/assets/Unitok_qrcode.svg",
            height: 45,
            width: 45,
            excavate: true,
          }}
        />
        {bottomElement}
        <Text style={{ textAlign: 'center' }}>
          Esse QR Code permite que seus contatos sejam salvos direto na agenda
          do celular de quem o escanear, sem precisar de internet.{' '}
        </Text>
      </Content>
    </MainModal>
  )
}
export default ModalQRCODE
