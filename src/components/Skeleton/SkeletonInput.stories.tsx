import { Meta, Story } from "@storybook/react/types-6-0";

import SkeletonInput from "./SkeletonInput";

export default {
  title: "SkeletonInput",
  component: SkeletonInput,
} as Meta;

export const Default: Story = (args) => <SkeletonInput {...args} />;
