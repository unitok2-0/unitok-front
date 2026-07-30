import { useEffect, useState } from "react";
import { BsTrash, BsUpload } from "react-icons/bs";

import Dropzone, {
  DropzoneFile,
  DropzoneProps,
} from "components/Dropzone/DropzoneComponent";
import { Text } from "components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

import * as S from "./styles";
import { CSSProp } from "styled-components";

export type FileDropzoneProps = Pick<DropzoneProps, "accept"> & {
  onFileChange: (file: null | DropzoneFile) => void;
  initialFile?: DropzoneFile;
  styleProp?: CSSProp;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const [file, setFile] = useState<DropzoneFile>(props.initialFile || null);

  function removeFile() {
    setFile(null);
  }

  useEffect(() => {
    props.onFileChange(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <Dropzone
      onFileAdded={setFile}
      accept={props.accept}
      afterDropableContainerElement={
        file && (
          <ul>
            <S.OriginalFileNameBox>
              <S.OriginalFileName>{file.originalFileName}</S.OriginalFileName>
              <ButtonPrimary
                variant="tertiary"
                title="Remover arquivo"
                onClick={removeFile}
              >
                <BsTrash />
              </ButtonPrimary>
            </S.OriginalFileNameBox>
          </ul>
        )
      }
    >
      <S.Wrapper>
        <Text as="span">
          Arraste o arquivo aqui ou
          <br />
          <S.UploadOrangeText>faça upload</S.UploadOrangeText>
          <S.UploadIcon>
            <BsUpload size={24} />
          </S.UploadIcon>
        </Text>
      </S.Wrapper>
    </Dropzone>
  );
}
