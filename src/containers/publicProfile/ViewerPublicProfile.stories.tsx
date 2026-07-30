ViewerPublicProfile;
import { Meta, Story } from "@storybook/react/types-6-0";

import ViewerPublicProfile, { ViewerProfileProps } from "./ViewerPublicProfile";

export default {
  title: "ViewerPublicProfile",
  component: ViewerPublicProfile,
  args: {
    user: { _id: "", profileColor: "#FFBB55" },
  },
} as Meta<ViewerProfileProps>;

export const Default: Story<ViewerProfileProps> = (args) => (
  <ViewerPublicProfile {...args} />
);
