import { Meta, Story } from "@storybook/react/types-6-0";
import EditableFlipCard, { EditableFlipCardProps } from ".";

export default {
  title: "EditableFlipCard",
  component: EditableFlipCard,
  args: {
    cardVariant: "darktok-0",
  },
} as Meta<EditableFlipCardProps>;

export const Default: Story<EditableFlipCardProps> = (args) => (
  <div style={{ width: "40%" }}>
    <EditableFlipCard {...args} />
  </div>
);

export const WithController: Story<EditableFlipCardProps> = (args) => (
  <div style={{ width: "40%" }}>
    <EditableFlipCard {...args} />
  </div>
);

WithController.args = {
  shouldShowFlipController: true,
};

export const WithCustomName: Story<EditableFlipCardProps> = (args) => (
  <div style={{ width: "40%" }}>
    <EditableFlipCard {...args} />
  </div>
);

WithCustomName.args = {
  name: "John Doe",
};
