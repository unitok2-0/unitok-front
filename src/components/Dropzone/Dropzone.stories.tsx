import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import Dropzone, { DropzoneFile, DropzoneProps } from "./DropzoneComponent";

export default {
  title: "Dropzone",
  component: Dropzone,
} as Meta<DropzoneProps>;

export const Default: Story<DropzoneProps> = () => {
  const [file, setFile] = useState<DropzoneFile>(null);

  return (
    <Dropzone
      prefix="card-custom-names"
      accept="image/*"
      onFileAdded={(file) => {
        console.log(file);
        setFile(file);
      }}
      afterDropableContainerElement={
        file && (
          <div>
            <a>{file.originalFileName}</a>
          </div>
        )
      }
    >
      <p>This is clickable</p>
    </Dropzone>
  );
};
