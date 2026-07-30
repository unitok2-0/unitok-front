import { Meta, Story } from "@storybook/react/types-6-0";
import { BsClock, BsFillCheckCircleFill } from "react-icons/bs";

import StatusLabel, { StatusLabelProps } from ".";

export default {
  title: "StatusLabel",
  component: StatusLabel,
} as Meta<StatusLabelProps>;

export const Default: Story<StatusLabelProps> = (args) => (
  <StatusLabel {...args} />
);

export const Custom: Story<StatusLabelProps> = (args) => (
  <StatusLabel {...args} />
);

Custom.args = {
  activeText: "Pago",
  inactiveText: "Pendente",
  activeLeftComponent: <BsFillCheckCircleFill />,
  inactiveLeftComponent: <BsClock />,
};
