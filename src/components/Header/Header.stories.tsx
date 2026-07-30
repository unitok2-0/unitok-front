import { Meta, Story } from "@storybook/react/types-6-0";
import { Header, HeaderProps } from "./index";

export default {
  title: "Header",
  component: Header,
} as Meta<HeaderProps>;

export const Default: Story<HeaderProps> = (args) => {
  return <Header {...args} />;
};

Default.args = {
  variant: 'stepper',
  whatColor: 'transp'
}
