import { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import ModalQRCODE, { ModalQRCODEProps } from ".";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

export default {
  title: "ModalQRCODE",
  component: ModalQRCODE,
} as Meta<ModalQRCODEProps>;

export const Default: Story<ModalQRCODEProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ButtonPrimary
        onClick={() => setIsModalOpen(true)}
        textButton="Open Modal"
      ></ButtonPrimary>
      <ModalQRCODE
        modalIsOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        afterOpenModal={() => {}}
        {...args}
      />
    </>
  );
};

Default.args = {
  valueQRCODE: "Any Value",
};
