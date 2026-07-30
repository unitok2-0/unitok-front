import { Meta, Story } from "@storybook/react/types-6-0";
import ClicksAnalytics, { ClicksAnalyticsProps } from ".";

export default {
  title: "ClicksAnalytics",
  component: ClicksAnalytics,
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
} as Meta<ClicksAnalyticsProps>;

export const Default: Story<ClicksAnalyticsProps> = (args) => {
  return <ClicksAnalytics {...args} />;
};
