import { Meta, Story } from "@storybook/react/types-6-0";
import QuantityInput, { QuantityInputProps } from ".";

export default {
  title: "QuantityInput",
  component: QuantityInput,
} as Meta<QuantityInputProps>;

export const Default: Story<QuantityInputProps> = (args) => {
  return <QuantityInput {...args} />;
};

Default.args = {
  min: 0,
  max: 10,
};
