import { Meta, Story } from "@storybook/react/types-6-0";
import CardLink, { CardLinkProps } from ".";

export default {
  title: "CardLink",
  component: CardLink,
  parameters: {
    backgrounds: {
      default: "grayLight",
      values: [{ name: "grayLight", value: "#EFF2F2" }],
    },
  },
  args: {
    cardVariant: "colortok-0",
  },
} as Meta<CardLinkProps>;

export const Default: Story<CardLinkProps> = (args) => <CardLink {...args} />;
