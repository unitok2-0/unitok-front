import { Meta, Story } from "@storybook/react/types-6-0";
import WhatsappButton, { WhatsappButtonProp } from ".";

export default {
  title: "TransformeButton",
  component: WhatsappButton,
  args: {
    textButton: "Button",
  },
} as Meta<WhatsappButtonProp>;

export const Default: Story<WhatsappButtonProp> = (args) => (
  <WhatsappButton {...args} />
);
