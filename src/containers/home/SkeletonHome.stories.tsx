import { Meta, Story } from "@storybook/react/types-6-0";

import SkeletonHome from "./SkeletonHome";

export default {
  title: "SkeletonHome",
  component: SkeletonHome,
} as Meta;

export const Default: Story = (args) => <SkeletonHome {...args} />;
