import ButtonLink from "components/Buttons/ButtonLink";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { CloseButtonStyle, CloseButtonWithouIcon } from "./styles";


interface CloseButtonProps {
  closeModal: any;
  withIcon?: boolean;
  id?: string;
}

export function CloseButton({ closeModal, id, withIcon = false }: CloseButtonProps) {

  if (withIcon) {
    return (
      <ButtonPrimary id={id} styleProp={CloseButtonStyle} variant="tertiary" onClick={closeModal}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00128 1L17.0003 16.999" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.9988 1.00047L0.999799 16.9995" stroke="#FF4C1C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

      </ButtonPrimary>
    )
  } else {
    return (
      <ButtonLink styleProp={CloseButtonWithouIcon} variant="tertiary" onClick={closeModal}>
        Fechar
      </ButtonLink>
    )
  }
}