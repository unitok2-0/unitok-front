import { Meta, Story } from "@storybook/react/types-6-0";
import { InputNumberProps, InputNumber } from ".";

export default {
  title: "InputNumber",
  component: InputNumber,
  args: {},
} as Meta<InputNumberProps>;

export const Default: Story<InputNumberProps> = (args) => (
  <InputNumber {...args} />
);
