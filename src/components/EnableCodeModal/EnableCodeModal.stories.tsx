import { Meta, Story } from "@storybook/react/types-6-0";
import useDisclosure from "hooks/useDisclosure";
import EnableCodeModal, { EnableCodeModalProps } from ".";

export default {
  title: "EnableCodeModal",
  component: EnableCodeModal,
  args: {
    code: "0984504985",
  },
} as Meta<EnableCodeModalProps>;

export const Default: Story<EnableCodeModalProps> = (args) => {
  const { handleClose, handleOpen, isOpen } = useDisclosure();

  return (
    <div>
      <button onClick={handleOpen}>Gerar código</button>
      <EnableCodeModal
        {...args}
        modalIsOpen={isOpen}
        closeModal={handleClose}
      />
    </div>
  );
};
