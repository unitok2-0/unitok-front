import { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { DropzoneFile } from "components/Dropzone/DropzoneComponent";
import useDisclosure from "hooks/useDisclosure";
import EditCustomCardNamesFilesModal, {
  EditCustomCardNamesFilesModalProps,
} from ".";

export default {
  title: "EditCustomCardNamesFilesModal",
  component: EditCustomCardNamesFilesModal,
  args: {
    cardVariant: "darktok-0",
  },
} as Meta<EditCustomCardNamesFilesModalProps>;

export const Default: Story<EditCustomCardNamesFilesModalProps> = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const [custonNamesFile, setCustomNamesFile] = useState<DropzoneFile | null>(
    null
  );

  return (
    <>
      <ButtonPrimary variant="tertiary" onClick={handleOpen}>
        Edit names
      </ButtonPrimary>
      <EditCustomCardNamesFilesModal
        customNamesFile={custonNamesFile}
        onSave={setCustomNamesFile}
        modalIsOpen={isOpen}
        closeModal={handleClose}
      />
    </>
  );
};
