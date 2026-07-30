import { Meta, Story } from "@storybook/react/types-6-0";
import useDisclosure from "hooks/useDisclosure";
import {
  GenericDropdown,
  GenericDropdownButton,
  GenericDropdownHeader,
} from ".";

export default {
  title: "GenericDropdown",
  component: GenericDropdown,
  parameters: { backgrounds: { default: "light" } },
} as Meta;

export const Default: Story = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  return (
    <div style={{ width: "9rem" }}>
      <GenericDropdown
        header={
          <GenericDropdownHeader onClick={handleOpen}>
            Open me
          </GenericDropdownHeader>
        }
        shouldShowContent={isOpen}
        onClickOutside={handleClose}
      >
        <GenericDropdownButton>Button 1</GenericDropdownButton>
        <GenericDropdownButton>Button 2</GenericDropdownButton>
        <GenericDropdownButton selected>Button 3</GenericDropdownButton>
        <GenericDropdownButton>Button 1</GenericDropdownButton>
        <GenericDropdownButton>Button 2</GenericDropdownButton>
        <GenericDropdownButton>Button 3</GenericDropdownButton>
        <GenericDropdownButton>Button 1</GenericDropdownButton>
        <GenericDropdownButton>Button 2</GenericDropdownButton>
        <GenericDropdownButton>Button 3</GenericDropdownButton>
      </GenericDropdown>
    </div>
  );
};
