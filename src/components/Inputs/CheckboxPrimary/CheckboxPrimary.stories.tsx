import { Meta, Story } from "@storybook/react/types-6-0";
import CheckboxPrimary, { CheckboxPrimaryProps } from ".";

export default {
  title: "CheckboxPrimary",
  component: CheckboxPrimary,
  args: {
    label: "Checkbox",
  },
} as Meta<CheckboxPrimaryProps>;

export const Default: Story<CheckboxPrimaryProps> = (args) => (
  <CheckboxPrimary {...args} />
);
