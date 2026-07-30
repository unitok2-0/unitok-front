import { Meta, Story } from "@storybook/react/types-6-0";

import ViewerProfile from "./ViewerProfile";

export default {
  title: "ViewerProfile",
  component: ViewerProfile,
} as Meta;

export const Default: Story = (args) => <ViewerProfile {...args} />;
