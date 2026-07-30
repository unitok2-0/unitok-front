import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonWithIcon, { ButtonWithIconProp } from ".";
import { MdVerifiedUser } from "react-icons/md";

export default {
  title: "ButtonWithIcon",
  component: ButtonWithIcon,
  args: {
    textButton: "Button",
  },
} as Meta<ButtonWithIconProp>;

export const Default: Story<ButtonWithIconProp> = (args) => (
  <ButtonWithIcon {...args} Icon={MdVerifiedUser} />
);
