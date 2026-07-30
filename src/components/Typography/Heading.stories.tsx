import { Meta, Story } from "@storybook/react/types-6-0";
import { Heading } from ".";

export default {
  title: "Heading",
  component: Heading,
} as Meta;

export const Default: Story = () => <Heading>titleSm</Heading>;

export const Sizes: Story = () => (
  <>
    <Heading font="titleLg">titleLg</Heading>
    <Heading font="titleMd">titleMd</Heading>
    <Heading>titleSm</Heading>
    <Heading font="titleXs">titleXs</Heading>
  </>
);

export const Colors: Story = () => (
  <>
    <Heading font="titleXs">secondary</Heading>
    <Heading font="titleLg" color="gray">
      gray
    </Heading>
    <Heading font="titleMd" color="primary">
      primary
    </Heading>
    <Heading color="success">success</Heading>
  </>
);

export const HeadingTags: Story = () => (
  <>
    <Heading font="titleLg" color="gray">
      h2
    </Heading>
    <Heading font="titleMd" color="primary" as="h4">
      h4
    </Heading>
    <Heading font="titleXs" as="h5">
      h5
    </Heading>
    <Heading color="success" as="h3">
      h3
    </Heading>
  </>
);
