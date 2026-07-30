import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import useDisclosure from "hooks/useDisclosure";
import EditCustomCardNamesModal, { EditCustomCardNamesModalProps } from ".";

export default {
  title: "EditCustomCardNamesModal",
  component: EditCustomCardNamesModal,
  args: {
    cardVariant: "darktok-0",
  },
} as Meta<EditCustomCardNamesModalProps>;

export const Default: Story<EditCustomCardNamesModalProps> = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  return (
    <>
      <ButtonPrimary variant="tertiary" onClick={handleOpen}>
        Edit names
      </ButtonPrimary>
      <EditCustomCardNamesModal
        quantity={0}
        cardVariant="colortok-1"
        modalIsOpen={isOpen}
        closeModal={handleClose}
        customNames={["Luiz", "Alberto", "Gilberto"]}
        onSave={(state) => console.log(JSON.stringify(state, null, 2))}
      />
    </>
  );
};
