import React, { CSSProperties } from 'react';
import MainModal from '../MainModal';
import { CloseButtonStyles, Content } from './styles';
import ButtonPrimary from 'components/Buttons/ButtonPrimary';
import TransformButton from 'components/Buttons/TransformeButton'
import { Colors } from 'styles/Colors';
import { IoMdClose } from 'react-icons/io';

export interface ModalPerfilEditorProps {
  children?: React.ReactNode,
  modalIsOpen: boolean,
  afterOpenModal?: () => void,
  closeModal: () => void,
  hasReturn?: boolean,
}

interface StylesProps {
  content: CSSProperties;
  overlay: CSSProperties;
}

const styles: StylesProps = {
  content: {
    minWidth: 360,
    maxWidth: 360,
    padding: 40,
    margin: 'auto auto',
    height:  '100vh',
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 10,
  },
  overlay: { zIndex: 1000, backgroundColor: 'rgba(0,0,0,.4)', padding: '0rem 0rem 0rem 0rem' }
}

const ModalPerfilEditor: React.FC<ModalPerfilEditorProps> = ({
  children,
  modalIsOpen,
  afterOpenModal,
  closeModal,
}) => {
 
  return (
    <MainModal
      modalIsOpen={modalIsOpen}
      afterOpenModal={afterOpenModal}
      closeModal={closeModal}
      customStyles={styles}
    >
      {/* <ButtonPrimary
        variant="tertiary"
        className='modalProfileClose'
        onClick={closeModal}
        styleProp={CloseButtonStyles}
      >
        Fechar
      </ButtonPrimary> */}
      
      <Content>
      <TransformButton onClick={closeModal}  styleProp={CloseButtonStyles} className='modalProfileClose'>
          <IoMdClose size={28} color={Colors.orange}></IoMdClose>
        </TransformButton>
        {children}
      </Content>
    </MainModal>
  )
}
export default ModalPerfilEditor
