import { Meta, Story } from "@storybook/react/types-6-0";
import PulseLoader, { PulseLoaderProps } from ".";

export default {
  title: "PulseLoader",
  component: PulseLoader,
  parameters: {
    backgrounds: { default: "dark" },
  },
} as Meta<PulseLoaderProps>;

export const Default: Story<PulseLoaderProps> = (args) => (
  <PulseLoader {...args} />
);
