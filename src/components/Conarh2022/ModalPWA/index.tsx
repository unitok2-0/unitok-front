import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { MainModalProps } from "components/Modals/MainModal";
import VideoModal from "components/VideoModal";
import videos from "constants/videos";
import useDisclosure from "hooks/useDisclosure";
import { useEffect, useState } from "react";
import { NewModalPWA } from "styles/pageStyles/conarh2022/landing-page/styles";

export type ModalPWAprops = MainModalProps & {};

function ModalPWA(props: ModalPWAprops) {
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string>(
    videos.pwaTutorial
  );
  const videoModal = useDisclosure();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
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
  // if (!supportsPWA) {
  //   return null;
  // }

  if (!supportsPWA) {
    return null;
  }
  return (
    props.modalIsOpen && (
      <NewModalPWA>
        <div className="modal-content">
          <h2>Adicionar Unitok à tela inicial</h2>

          <div className="thumbVideo">
            <img
              className="thumb"
              src="/images/conarh2022/thumbnail_video_modal.png"
              alt=""
            />
            <button
              onClick={() => {
                videoModal.handleOpen();
              }}
            >
              <img src="/assets/play-icon.svg" alt="" />
            </button>
          </div>

          <p>
            Acesse o seu Unitok de forma rápido e fácil adicionando nosso app à
            sua tela inicial.
          </p>

          <ButtonPrimary
            textButton="Adicionar"
            styleProp={{
              width: "100%",
              fontSize: "0.938rem",
              height: "2.5rem",
              border: "1px solid #FF4C1C",
            }}
            className="buttonPrimary"
            onClick={onClick}
          />

          <button className="closeModal" onClick={props.closeModal}>
            Não tenho interesse
          </button>

          <VideoModal
            videoSrc={selectedVideoSrc}
            modalIsOpen={videoModal.isOpen}
            closeModal={videoModal.handleClose}
          />
        </div>
      </NewModalPWA>
    )
  );
}

export { ModalPWA };
