import Modal, { MainModalProps } from "components/Modals/MainModal";

import * as S from "./styles";
import ClipLoader from 'react-spinners/ClipLoader';

export type SelectBannerModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};



export default function LoadingModal(props: SelectBannerModalProps) {

  return (
    <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal} >
      <S.Wrapper>
        <ClipLoader />
      </S.Wrapper>
    </Modal>
  );
}
