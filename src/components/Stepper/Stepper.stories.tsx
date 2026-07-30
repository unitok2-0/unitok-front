import { Meta, Story } from "@storybook/react/types-6-0";
import { BsBag, BsPerson } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { Stepper, StepperProps } from ".";

export default {
  title: "Stepper",
  component: Stepper,
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
      push() {},
    },
  },
} as Meta<StepperProps>;

export const Default: Story<StepperProps> = (args) => {
  return (
    <Stepper
      activeIndex={0}
      links={[
        {
          label: "Sacola",
          href: "/checkout/cart",
          iconToShowOnMobile: <BsBag />,
        },
        {
          label: "Dados pessoais",
          href: "/checkout/data",
          iconToShowOnMobile: <BsPerson />,
        },
        {
          label: "Entrega",
          href: "/checkout/address",
          iconToShowOnMobile: <FiTruck />,
        },
        {
          label: "Pagamento",
          href: "/checkout/payment",
          iconToShowOnMobile: <BiDollar />,
        },
      ]}
      {...args}
    />
  );
};

Default.args = {
  activeIndex: 0,
  lastUnlockedIndex: 2,
};
