import { Meta, Story } from "@storybook/react/types-6-0";
import { DashboardSidebar, DashboardSidebarProps } from "./index";

import { BiDollar } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { ImQrcode } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";

// const logout = '../../public/'

const infos = [
  {
    isSelected: true,
    text: "Gestão de contas",
    icon: <BsGear />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Gestão de pagamentos",
    icon: <BiDollar />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Adicionar conta",
    icon: <FiUserPlus />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "QR Codes",
    icon: <ImQrcode />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Códigos de ativação",
    icon: <BsGear />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Configurações",
    icon: <BsGear />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Analytics",
    icon: <BsGear />,
    hasChevronRightIcon: true,
  },
  {
    isSelected: false,
    text: "Fazer logout",
    icon: <CgLogOut />,
    hasChevronRightIcon: false,
  },
];

export default {
  title: "DashboardSidebar",
  component: DashboardSidebar,
} as Meta<DashboardSidebarProps>;

export const Default: Story<DashboardSidebarProps> = (args) => {
  return <DashboardSidebar {...args} />;
};

Default.args = {
  buttons: infos,
};
