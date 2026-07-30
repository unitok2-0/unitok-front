import React from 'react'
import Modal, { Styles } from 'react-modal'

export interface MainModalProps {
  modalIsOpen: boolean
  afterOpenModal?: () => void
  closeModal: () => void
  customStyles?: Styles;
  children?: any;
}

const MainModal: React.FC<MainModalProps> = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  customStyles,
  children,
}) => {
  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <>
        {children}
      </>
    </Modal>
  )
}

export default MainModal
