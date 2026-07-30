import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Checkbox from "components/Checkbox";
import { DropzoneFile } from "components/Dropzone/DropzoneComponent";
import FileDropzone from "components/FileDropzone";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading } from "components/Typography";
import { useEffect, useState } from "react";

import * as S from "./styles";

export type EditCustomArtOrLogoFileModalProps = MainModalProps & {
  customArtOrLogoFile: DropzoneFile | null;
  type: "art" | "logo";
  onSave: (file: DropzoneFile | null) => void;
};

export default function EditCustomArtOrLogoFileModal(
  props: EditCustomArtOrLogoFileModalProps
) {
  const [custonArtOrLogoFile, setCustomArtOrLogoFile] = useState(
    props.customArtOrLogoFile
  );

  const accept = props.type === "art" ? ".pdf" : ".pdf,.tiff,.eps,.png";

  return (
    <Modal {...props}>
      <S.Wrapper>
        <Heading font="titleXs">Logotipo ou arte</Heading>

        <FileDropzone
          accept={accept}
          onFileChange={setCustomArtOrLogoFile}
          initialFile={props.customArtOrLogoFile}
        />

        <ButtonPrimary
          disabled={!custonArtOrLogoFile}
          onClick={() => {
            if (!custonArtOrLogoFile) return;

            props.onSave(custonArtOrLogoFile);
            props.closeModal();
          }}
        >
          Salvar
        </ButtonPrimary>
      </S.Wrapper>
    </Modal>
  );
}
