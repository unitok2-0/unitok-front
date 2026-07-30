import { Meta, Story } from "@storybook/react/types-6-0";
import CheckoutContainer from ".";

export default {
  title: "CheckoutContainer",
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/checkout/data",
      query: {},
      push() {},
    },
  },
} as Meta;

export const Default: Story = () => {
  return <CheckoutContainer>Page based content</CheckoutContainer>;
};

export const WithoutCheckoutSummary: Story = () => {
  return (
    <CheckoutContainer shouldHideCheckoutSummary>
      Page based content
    </CheckoutContainer>
  );
};
