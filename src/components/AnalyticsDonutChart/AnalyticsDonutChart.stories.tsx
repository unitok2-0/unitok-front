import { Meta, Story } from "@storybook/react/types-6-0";
import AnalyticsDonutChart, { AnalyticsDonutChartProps } from ".";

export default {
  title: "AnalyticsDonutChart",
  component: AnalyticsDonutChart,
  args: {
    buttons: [
      { clicks: 2, name: "INSTAGRAM" },
      { clicks: 5, name: "EMAIL" },
      { clicks: 1, name: "LINKEDIN" },
      { clicks: 12, name: "FACEBOOK" },
      { clicks: 1, name: "LIGAR" },
      { clicks: 1, name: "TWITTER" },
    ],
  },
} as Meta<AnalyticsDonutChartProps>;

export const Default: Story<AnalyticsDonutChartProps> = (args) => (
  <AnalyticsDonutChart {...args} />
);
