import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import Link from 'next/link'
import { copyToClipboard } from "utils/copy-to-clipboard";
import * as S from "./styles";

export type VideoModalProps = MainModalProps & {
  promocode: string;
  discount_value: number;
};

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

        <img src="/assets/promocode.svg" alt="" />

        <Heading>Cupom de desconto Unitok</Heading>
        <Text fontWeight="500">
          Utilize o código promocional abaixo e garanta {props.discount_value}% de desconto na compra do seu cartão Unitok.
        </Text>

        <div className="promocode_container">
          <Text>{props.promocode}</Text>
          <Link passHref href="/cards/classictok-0" legacyBehavior>
            <ButtonPrimary
              as="a"
              styleProp={S.ButtonStyles}
              onClick={() => {
                copyToClipboard(props.promocode);
              }}
            >
              Copiar e ir para o site
            </ButtonPrimary>
          </Link>
        </div>
      </S.Container>
    </Modal>
  );
}
