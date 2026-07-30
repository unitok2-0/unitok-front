import Modal, { MainModalProps } from "components/Modals/MainModal";
import * as S from "./styles";

export type VideoModalProps = MainModalProps & {
  videoSrc: string;
  videoType?: string;
};

export default function VideoModal(props: VideoModalProps) {
  return (
    <Modal
      customStyles={{ content: { background: "transparent", outline: "none" } }}
      modalIsOpen={props.modalIsOpen}
      closeModal={props.closeModal}
    >
      <S.ButtonClose onClick={props.closeModal}>Fechar</S.ButtonClose>
      <S.VideoModalContent>
        <video width="1080" height="720" controls autoPlay>
          <source src={props.videoSrc} type={props.videoType || "video/mp4"} />
        </video>
      </S.VideoModalContent>
    </Modal>
  );
}
