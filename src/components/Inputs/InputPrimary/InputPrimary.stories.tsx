import { Meta, Story } from "@storybook/react/types-6-0";
import { InputPrimaryProps, InputPrimary } from ".";

export default {
  title: "InputPrimary",
  component: InputPrimary,
  args: {
    name: "InputNumberStory",
  },
} as Meta<InputPrimaryProps>;

export const Default: Story<InputPrimaryProps> = (args) => (
  <InputPrimary {...args} />
);
