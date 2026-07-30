import { CloseButton } from 'components/CloseButton';
import { FiExternalLink, FiEye, FiStar } from 'react-icons/fi';
import Modal, { Styles } from 'react-modal';

import * as S from './styles';

export interface MainModalProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
}

export function ModalGifButtons({
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
      style={customStyles}
      className="Modal"
      overlayClassName="Overlay"
    >
      <CloseButton closeModal={closeModal}/>
      <S.Container>
        <p>
          Adicione quantos botões quiser. Você pode alterar a ordem (segure e arraste), ocultá-los <FiEye size={20} /> e/ou
          destacá-los <FiStar size={20} /> no seu perfil ou deixar como link direto <FiExternalLink size={20} />
        </p>
          <S.VideoModalContent>
            <video width="100%" height="100%" controls> 
              <source src="/assets/gifButtons.mp4" type={"video/mp4"} />
            </video>
          </S.VideoModalContent>
      </S.Container>
    </Modal>
  )
}