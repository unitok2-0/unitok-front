import { Meta, Story } from "@storybook/react/types-6-0";
import SpinnerLoader, { SpinnerLoaderProps } from ".";

export default {
  title: "SpinnerLoader",
  component: SpinnerLoader,
  parameters: {
    backgrounds: { default: "dark" },
  },
} as Meta<SpinnerLoaderProps>;

export const Default: Story<SpinnerLoaderProps> = (args) => (
  <SpinnerLoader {...args} />
);
