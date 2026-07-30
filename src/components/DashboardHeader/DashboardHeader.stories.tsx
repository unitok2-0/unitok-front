import { Meta, Story } from "@storybook/react/types-6-0";

import { BsGear } from "react-icons/bs";

import DashboardHeader from ".";

export default {
  title: "DashboardHeader",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: Story = () => (
  <DashboardHeader
    links={[
      {
        icon: <BsGear />,
        label: "Configurações",
        href: "intern-management/settings",
        isSelected: true,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Configurações",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Configurações",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Gestão de pagamentos",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Gestão de pagamentos",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Gestão de pagamentos",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
      {
        icon: <BsGear />,
        label: "Gestão de pagamentos",
        href: "intern-management/settings",
        isSelected: false,
        hasChevronRightIcon: true,
      },
    ]}
  >
    <p>Content</p>
  </DashboardHeader>
);
