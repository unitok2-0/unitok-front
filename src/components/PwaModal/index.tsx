import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { Heading, Text } from "../Typography/index";
import * as S from "./styles";

export type VideoModalProps = MainModalProps & {};

export default function PwaModal(props: VideoModalProps) {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {


    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  function handleSetCookie() {
    setCookie(null, "dontHaveInterestPWA", "0", { path: '/', maxAge: 60 * 60, });
  }


  if (!supportsPWA) {
    return null;
  }

  return (
    <Modal
      customStyles={{ content: { background: "transparent", outline: "none" } }}
      modalIsOpen={props.modalIsOpen}
      closeModal={props.closeModal}
    >
      <S.Container>
        <button
          onClick={() => {
            props.closeModal();
          }}
          className="close_button"
        >
          Fechar
        </button>

        <div>
          <img
            src="/assets/rounded_logo.png"
            alt="Ícone laranja com três listras brancas curvadas empilhadas"
          />
        </div>
        <div>
          <Heading font="titleSm">Adicionar Unitok à tela inicial</Heading>
          <Text>
            Acesse o seu Unitok de forma rápido e fácil adicionando nosso app à
            sua tela inicial.
          </Text>
        </div>

        <div className="buttons-container">
          <ButtonPrimary fullWidth onClick={onClick}>
            Adicionar
          </ButtonPrimary>
          <ButtonPrimary variant="tertiary" onClick={() => {
            props.closeModal()
            handleSetCookie()
          }}>
            Não tenho interesse
          </ButtonPrimary>
        </div>
      </S.Container>
    </Modal>
  );
}
