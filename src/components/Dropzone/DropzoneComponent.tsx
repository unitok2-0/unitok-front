import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getFileName } from "../../constants/functions";
import { Container } from "./styles";

export interface DropzoneFile {
  uri: string | ArrayBuffer;
  name: string;
  type: string;
  originalFileName: string;
}

export interface DropzoneProps {
  onFileAdded: (file: any, fileTemporary?: any) => void;
  accept: string | "image/*";
  prefix?: string;
  maxFiles?: number | undefined;
  afterDropableContainerElement?: React.ReactNode;
  children?: React.ReactNode;
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const { onFileAdded, maxFiles } = props;

  const readUploadFileAsText = (file) => {
    const reader = new FileReader();
    return new Promise<DropzoneFile>((resolve, reject) => {

      window.URL.revokeObjectURL(file.preview);
      reader.onload = () => {
        const uri = reader.result;
        const name = props.prefix
          ? `files/${props.prefix}/${getFileName(file.name)}`
          : `files/${getFileName(file.name)}`;
        resolve({ uri, name, type: file.type, originalFileName: file.name });
      };
      reader.onabort = () => alert("Leitura do arquivo cancelada");
      reader.onerror = () => {
        reader.abort();
        reject(alert("Problem parsing input file."));
      };
      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async ([acceptedFiles]) => {
      const file = await readUploadFileAsText(acceptedFiles);
      onFileAdded(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onFileAdded]
  );

  const valuesDropzone = useMemo(() => {
    const settings = {
      onDrop,
      accept: props.accept,
    } as any;

    if (maxFiles) settings.maxFiles = maxFiles;
    return settings;
  }, [maxFiles, onDrop, props.accept]);

  const { getRootProps, getInputProps } = useDropzone(valuesDropzone);

  return (
    <div>
      <Container {...getRootProps()}>
        <input {...getInputProps()} accept={props.accept} />
        {props.children}
      </Container>
      {props.afterDropableContainerElement}
    </div>
  );
};

export default Dropzone;
