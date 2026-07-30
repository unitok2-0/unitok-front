import { Meta, Story } from "@storybook/react/types-6-0";
import CartDropdown from ".";

export default { title: "CartDropdown" } as Meta;

export const Default: Story = () => {
  return <CartDropdown />;
};

export const Header: Story = () => {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <b>hehe</b>
      <div>
        <CartDropdown />
      </div>
    </header>
  );
};
