import { Meta, Story } from "@storybook/react/types-6-0";
import useDisclosure from "hooks/useDisclosure";
import ShareProfileModal from ".";

export default {
  title: "ShareProfileModal",
  component: ShareProfileModal,
} as Meta;

export const Default: Story = () => {
  const { handleClose, handleOpen, isOpen } = useDisclosure(true);

  return (
    <ShareProfileModal
      modalIsOpen={isOpen}
      closeModal={handleClose}
    />
  );
};
