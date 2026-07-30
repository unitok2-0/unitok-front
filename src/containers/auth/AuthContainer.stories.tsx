import { Meta, Story } from "@storybook/react/types-6-0";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";
import AuthContainer from ".";

export default {
  title: "AuthContainer",
  component: AuthContainer,
} as Meta;

export const Default: Story = () => (
  <AuthContainer imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F458313%2Fgettyimages-man-holding-credit-card.jpg&f=1&nofb=1">
    <form style={{ width: "100%" }}>
      <h1>Fazer login</h1>
      <p>Informe seu acesso</p>
      <div>
        {/* <Input id="email" label="Email" isWhiteMode /> */}
        <PasswordInput id="password" label="Senha" value="hehehe" isWhiteMode />
      </div>
    </form>
  </AuthContainer>
);
