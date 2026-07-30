import ButtonPrimary from "components/Buttons/ButtonPrimary";
import MainModal, { MainModalProps } from "components/Modals/MainModal";
import { Heading, Text } from "components/Typography";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { copyToClipboard } from "utils/copy-to-clipboard";
import * as S from "./styles";

export type EnableCodeModalProps = MainModalProps & {
  code: string;
};

export default function EnableCodeModal(props: EnableCodeModalProps) {
  return (
    <MainModal {...props}>
      <S.Wrapper>
        <Heading as="h5" font="titleXs">
          Novo código de ativação
        </Heading>

        <S.CodeContainter>
          <Text as="span" font="bodyLg">
            {props.code}
          </Text>

          <ButtonPrimary
            onClick={() => {
              copyToClipboard(props.code);
              toast.success("Código copiado");
              props.closeModal();
            }}
            rightElement={<FiCopy />}
          >
            Copiar código
          </ButtonPrimary>
        </S.CodeContainter>
      </S.Wrapper>
    </MainModal>
  );
}
