import { Meta, Story } from "@storybook/react/types-6-0";
import { DashboardSidebarButton, DashboardSidebarButtonProps } from "./index";
import { BsGear } from "react-icons/bs";

export default {
  title: "DashboardSidebarButton",
  component: DashboardSidebarButton,
} as Meta<DashboardSidebarButtonProps>;

export const Default: Story<DashboardSidebarButtonProps> = (args) => {
  return <DashboardSidebarButton {...args} />;
};

Default.args = {
  icon: <BsGear />,
  children: "Configurações",
};

export const AsButton: Story<DashboardSidebarButtonProps> = (args) => {
  return <DashboardSidebarButton {...args} />;
};

AsButton.args = {
  icon: <BsGear />,
  children: "Configurações",
  onClick: () => alert("As button"),
};
