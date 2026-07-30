import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading } from "components/Typography";

import * as S from "./styles";

export type ConfirmationModalProps = Pick<
  MainModalProps,
  "modalIsOpen" | "closeModal"
> & {
  title: string;
  children: React.ReactNode;
  onCancelClick(): void;
  onConfirmClick(): void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  isConfirmLoading?: boolean;
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal modalIsOpen={props.modalIsOpen} closeModal={props.closeModal}>
      <S.Wrapper>
        <Heading font="titleXs">{props.title}</Heading>
        {props.children}

        <div>
          <ButtonPrimary variant="secondary" onClick={props.onCancelClick}>
            {props.cancelButtonText || "Cancelar"}
          </ButtonPrimary>
          <ButtonPrimary
            onClick={props.onConfirmClick}
            loading={props.isConfirmLoading}
          >
            {props.confirmButtonText || "Confirmar"}
          </ButtonPrimary>
        </div>
      </S.Wrapper>
    </Modal>
  );
}
