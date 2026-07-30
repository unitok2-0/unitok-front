import { Meta, Story } from "@storybook/react/types-6-0";
import useDisclosure from "hooks/useDisclosure";
import ConfirmationModal from ".";

export default { title: "ConfirmationModal" } as Meta;

export const Default: Story = () => {
  const { isOpen, handleOpen, handleClose } = useDisclosure();

  return (
    <div>
      <button onClick={handleOpen}>OpenModal</button>

      <ConfirmationModal
        title="Confirm?"
        modalIsOpen={isOpen}
        closeModal={handleClose}
        onCancelClick={handleClose}
        onConfirmClick={handleClose}
      >
        <div style={{ minWidth: "20rem" }}>Hehe</div>
      </ConfirmationModal>
    </div>
  );
};
