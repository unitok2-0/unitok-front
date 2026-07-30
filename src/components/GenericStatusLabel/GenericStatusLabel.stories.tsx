import { Meta, Story } from "@storybook/react/types-6-0";
import { BsClock, BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import GenericStatusLabel, { GenericStatusLabelProps } from ".";

export default {
  title: "GenericStatusLabel",
  component: GenericStatusLabel,
} as Meta<GenericStatusLabelProps>;

export const Default: Story<GenericStatusLabelProps> = (args) => (
  <GenericStatusLabel {...args} />
);

Default.args = {
  children: "Pago",
  icon: <BsFillCheckCircleFill />,
};

export const Pending: Story<GenericStatusLabelProps> = (args) => (
  <GenericStatusLabel {...args} />
);

Pending.args = {
  children: "Pendente",
  icon: <BsClock />,
};

export const Canceled: Story<GenericStatusLabelProps> = (args) => (
  <GenericStatusLabel {...args} />
);

Canceled.args = {
  children: "Cancelado",
  icon: <BsXCircleFill />,
};
