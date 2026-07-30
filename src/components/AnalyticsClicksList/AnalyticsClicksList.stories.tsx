import { Meta, Story } from "@storybook/react/types-6-0";
import AnalyticsClicksList, { AnalyticsClicksListProps } from ".";

export default {
  title: "AnalyticsClicksList",
  component: AnalyticsClicksList,
  args: {
    buttons: [
      { clicks: 2, name: "INSTAGRAM" },
      { clicks: 5, name: "EMAIL" },
      { clicks: 1, name: "LINKEDIN" },
      { clicks: 1, name: "FACEBOOK" },
      { clicks: 1, name: "LIGAR" },
      { clicks: 1, name: "TWITTER" },
    ],
  },
} as Meta<AnalyticsClicksListProps>;

export const Default: Story<AnalyticsClicksListProps> = (args) => {
  return <AnalyticsClicksList {...args} />;
};
