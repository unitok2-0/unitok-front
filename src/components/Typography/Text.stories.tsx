import { Meta, Story } from "@storybook/react/types-6-0";
import { Text } from ".";

export default {
  title: "Text",
  component: Text,
} as Meta;

export const Default: Story = () => <Text>bodyMd</Text>;

export const Sizes: Story = () => (
  <>
    <Text font="bodyLg">bodyLg</Text>
    <Text>bodyMd</Text>
    <Text font="bodySm">bodySm</Text>
  </>
);

export const Colors: Story = () => (
  <>
    <Text font="bodyLg" color="gray">
      gray
    </Text>
    <Text color="primary">primary</Text>
    <Text color="success" font="bodySm">
      success
    </Text>
  </>
);

export const TextTags: Story = () => (
  <>
    <Text font="bodyLg" color="gray" as="span">
      span
    </Text>
    <Text color="primary" as="strong">
      strong
    </Text>
    <Text color="success" font="bodySm">
      p
    </Text>
  </>
);
