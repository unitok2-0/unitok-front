import { CloseButton } from "components/CloseButton";
import { PlayVideoPet } from "../PlayVideoPet";
import Modal, { Styles } from 'react-modal';

import * as S from './styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ModalAddTutorProps {
  modalIsOpen: boolean;
  afterOpenModal?: () => void;
  closeModal: () => void;
  customStyles?: Styles;
  allPhotos: any;
  currentPhoto: any;
}

export function ModalPhotoPet({
  closeModal,
  modalIsOpen,
  afterOpenModal,
  customStyles,
  allPhotos,
  currentPhoto
}: ModalAddTutorProps) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: currentPhoto,
  };

  return (
    <Modal
      ariaHideApp={modalIsOpen}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: 'fixed',
          width: '101vw',
          height: '100vh',
          padding: '0',
          margin: '0'
        },
        content: {
          background: 'transparent',
          borderRadius: '0',
        }
      }}
      className="Modal"
      overlayClassName="Overlay"
    >
      <S.MainModal style={{ borderRadius: 0 }}>
        <CloseButton closeModal={() => closeModal()} />
        <S.StyledSlider {...settings}>
          {
            allPhotos.map((photo) => {

              return (
                <PlayVideoPet 
                  photo={photo}
                />
              )
            })
          }

        </S.StyledSlider>
      </S.MainModal>
    </Modal>
  )

}
