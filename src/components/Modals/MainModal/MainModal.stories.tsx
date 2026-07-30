import { useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import MainModal, { MainModalProps } from ".";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

import "./styles.css";

export default {
  title: "MainModal",
  component: MainModal,
} as Meta<MainModalProps>;

export const Default: Story<MainModalProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ButtonPrimary
        onClick={() => setIsModalOpen(true)}
        textButton="Open Modal"
      ></ButtonPrimary>
      <MainModal
        modalIsOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        afterOpenModal={() => {}}
        customStyles={{}}
      >
        <div style={{ padding: "1rem" }}>Content </div>
      </MainModal>
    </>
  );
};
