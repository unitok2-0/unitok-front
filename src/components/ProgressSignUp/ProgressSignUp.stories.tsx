import { Meta, Story } from "@storybook/react/types-6-0";

import ProgressSignUp, { ProgressSignUpProps } from ".";

export default {
  title: "ProgressSignUp",
  component: ProgressSignUp,
  args: {
    choice: "ADDRESS",
  },
} as Meta<ProgressSignUpProps>;

export const Default: Story<ProgressSignUpProps> = (args) => (
  <ProgressSignUp {...args} />
);
