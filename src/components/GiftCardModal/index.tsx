import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import Link from 'next/link'
import { copyToClipboard } from "utils/copy-to-clipboard";
import * as S from "./styles";

export type VideoModalProps = MainModalProps;

export default function PromocodeModal(props: VideoModalProps) {
  return (
    <Modal
      customStyles={{ content: { background: "transparent", outline: "none" } }}
      modalIsOpen={props.modalIsOpen}
      closeModal={props.closeModal}
    >
      <S.Container>
        <button onClick={() => {
          props.closeModal()
        }}
          className="close_button"
        >
          Fechar
        </button>

        <img src="/assets/iconGift.svg" alt="" />

        <Heading>Você ganhou um cartão de <br /> visita digital Unitok!</Heading>
        <Text fontWeight="400">
          Mas corra porque a quantidade é <br /> limitada! Procure um de nossos <br /> <strong>promotores de camiseta laranja</strong> e <br /> garanta o seu.
        </Text>

        <div className="promocode_container">
          <ButtonPrimary
            styleProp={S.ButtonStyles}
            onClick={() => {
              props.closeModal()
            }}
          >
            Entendi
          </ButtonPrimary>
        </div>
      </S.Container>
    </Modal>
  );
}
