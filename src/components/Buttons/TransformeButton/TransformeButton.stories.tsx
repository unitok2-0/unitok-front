import { Meta, Story } from "@storybook/react/types-6-0";
import TransformeButton, { ButtonPrimaryProp } from ".";

export default {
  title: "TransformeButton",
  component: TransformeButton,
  args: {
    textButton: "Button",
  },
} as Meta<ButtonPrimaryProp>;

export const Default: Story<ButtonPrimaryProp> = (args) => (
  <TransformeButton {...args} />
);
