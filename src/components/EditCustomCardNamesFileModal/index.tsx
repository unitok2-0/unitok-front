import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Checkbox from "components/Checkbox";
import { DropzoneFile } from "components/Dropzone/DropzoneComponent";
import FileDropzone from "components/FileDropzone";
import Modal, { MainModalProps } from "components/Modals/MainModal";
import { Heading } from "components/Typography";
import { useEffect, useState } from "react";

import * as S from "./styles";

export type EditCustomCardNamesFilesModalProps = MainModalProps & {
  customNamesFile: DropzoneFile | null;
  onSave: (file: DropzoneFile | null) => void;
};

export default function EditCustomCardNamesFilesModal(
  props: EditCustomCardNamesFilesModalProps
) {
  const [custonNamesFile, setCustomNamesFile] = useState(props.customNamesFile);
  const [shouldAddCustomName, setShouldAddCustomName] = useState(true);

  useEffect(() => {
    if (!shouldAddCustomName) setCustomNamesFile(null);
  }, [shouldAddCustomName]);

  return (
    <Modal {...props}>
      <S.Wrapper>
        <Heading font="titleXs">Nomes</Heading>

        <Checkbox
          checked={shouldAddCustomName}
          onChange={() => setShouldAddCustomName((state) => !state)}
        >
          Adicionar nome
        </Checkbox>

        {shouldAddCustomName && (
          <FileDropzone
            accept=".xls"
            onFileChange={setCustomNamesFile}
            initialFile={props.customNamesFile}
          />
        )}

        <ButtonPrimary
          onClick={() => {
            props.onSave(custonNamesFile);
            props.closeModal();
          }}
        >
          Salvar
        </ButtonPrimary>
      </S.Wrapper>
    </Modal>
  );
}
