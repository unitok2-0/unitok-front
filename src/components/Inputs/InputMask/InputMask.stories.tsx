import { Meta, Story } from "@storybook/react/types-6-0";
import { InputMaskProps, InputMask } from ".";

export default {
  title: "InputMask",
  component: InputMask,
  args: {
    mask: "99999-999",
    placeholder: "99999-999",
  },
} as Meta<InputMaskProps>;

export const Default: Story<InputMaskProps> = (args) => <InputMask {...args} />;
