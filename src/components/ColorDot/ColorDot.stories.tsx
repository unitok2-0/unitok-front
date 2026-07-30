import { Meta, Story } from "@storybook/react/types-6-0";
import ColorDot, { ColorDotProps } from ".";

export default {
  title: "ColorDot",
  component: ColorDot,
  args: {
    colors: ["#565656", "#151516"],
  },
} as Meta<ColorDotProps>;

export const Default: Story<ColorDotProps> = (args) => <ColorDot {...args} />;

export const Active: Story<ColorDotProps> = (args) => <ColorDot {...args} />;

Active.args = {
  isActive: true,
};
