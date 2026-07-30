import { Meta, Story } from "@storybook/react/types-6-0";
import useDisclosure from "hooks/useDisclosure";
import ProfileModal, { ProfileModalProps } from ".";

export default {
  title: "ProfileModal",
  component: ProfileModal,
} as Meta<ProfileModalProps>;

export const Default: Story = () => {
  const { handleClose, handleOpen, isOpen } = useDisclosure();

  return (
    <div>
      <button onClick={handleOpen}>OpenModal</button>
      <ProfileModal
        codeId="UNI348DC4"
        modalIsOpen={isOpen}
        closeModal={handleClose}
      />
    </div>
  );
};
