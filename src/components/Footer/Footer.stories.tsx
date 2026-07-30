import { Meta, Story } from "@storybook/react/types-6-0";
import { Footer, FooterProps } from "./index";

export default {
  title: 'Footer',
  component: Footer
} as Meta<FooterProps>;

export const Default: Story<FooterProps> = (args) => {
  return <Footer {...args} />;
}