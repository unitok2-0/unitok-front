import { Meta, Story } from "@storybook/react/types-6-0";
import { InputPhoneProps, InputPhone } from ".";

export default {
  title: "InputPhone",
  component: InputPhone,
  args: {
    name: "InputNumberStory",
  },
} as Meta<InputPhoneProps>;

export const Default: Story<InputPhoneProps> = (args) => (
  <InputPhone {...args} />
);
