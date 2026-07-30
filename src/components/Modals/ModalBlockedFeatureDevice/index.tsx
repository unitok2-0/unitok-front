import Modal, { Styles } from 'react-modal';

import * as S from './styles';

export interface MainModalProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
}

export function ModalBlockedFeatureDevice({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  customStyles,
}: MainModalProps) {

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        content: {
          position: 'absolute',
          textAlign: 'center',
          top: '5rem'
        }
      }}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.Container>
        <p>
          Se a câmera não está ativada, você precisará habilitar nas configurações do seu aparelho.
        </p>
      </S.Container>
    </Modal>
  )
}