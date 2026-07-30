import { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { DropzoneFile } from "components/Dropzone/DropzoneComponent";
import useDisclosure from "hooks/useDisclosure";
import EditCustomArtOrLogoFileModal, {
  EditCustomArtOrLogoFileModalProps,
} from ".";

export default {
  title: "EditCustomArtOrLogoFileModal",
  component: EditCustomArtOrLogoFileModal,
  args: {
    cardVariant: "darktok-0",
  },
} as Meta<EditCustomArtOrLogoFileModalProps>;

export const Default: Story<EditCustomArtOrLogoFileModalProps> = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const [
    custonArtOrLogoFile,
    setCustomArtOrLogoFile,
  ] = useState<DropzoneFile | null>(null);

  return (
    <>
      <ButtonPrimary variant="tertiary" onClick={handleOpen}>
        Edit logo or art
      </ButtonPrimary>
      <EditCustomArtOrLogoFileModal
        type="art"
        customArtOrLogoFile={custonArtOrLogoFile}
        onSave={setCustomArtOrLogoFile}
        modalIsOpen={isOpen}
        closeModal={handleClose}
      />
    </>
  );
};
