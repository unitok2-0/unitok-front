import { Meta, Story } from "@storybook/react/types-6-0";
import CartItem, { CartItemProps } from ".";

export default {
  title: "CartItem",
  component: CartItem,
  args: {
    formattedItemTotalPrice: "R$ 29,00",
    formattedUnitPrice: "R$ 29,00",
    onDeleteItemClick: () => alert("Item delet action"),
    onAddCustomNameClick: () => alert("Item add custom name action"),
    onEditCustomNamesClick: () => alert("Item edit custom names action"),
    variant: "classictok-0",
    cardName: "Classictok",
    defaultQuantity: 5,
  },
} as Meta<CartItemProps>;

export const Default: Story<CartItemProps> = (args) => (
  <CartItem customNames={[]} {...args} />
);

export const WithNames: Story<CartItemProps> = (args) => (
  <CartItem customNames={["John Doe", "Mark Zuck", "Carla Dantas"]} {...args} />
);

export const Static: Story<CartItemProps> = (args) => <CartItem {...args} />;

Static.args = {
  customArtOrLogoFileUrl: "https://artorlogo",
  customNames: ["Rafael"],
  shouldAllCustomNamesBeTheSame: true,
  shouldBeStatic: true,
};
