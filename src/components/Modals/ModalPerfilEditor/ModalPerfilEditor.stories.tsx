import { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import ModalPerfilEditor, { ModalPerfilEditorProps } from ".";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

export default {
  title: "ModalPerfilEditor",
  component: ModalPerfilEditor,
} as Meta<ModalPerfilEditorProps>;

export const Default: Story<ModalPerfilEditorProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ButtonPrimary
        onClick={() => setIsModalOpen(true)}
        textButton="Open Modal"
      ></ButtonPrimary>
      <ModalPerfilEditor
        modalIsOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        afterOpenModal={() => {}}
        {...args}
      />
    </>
  );
};

Default.args = {
  // valueQRCODE: "Any Value",
};
