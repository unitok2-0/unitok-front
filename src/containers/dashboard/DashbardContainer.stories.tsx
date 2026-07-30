import { Meta, Story } from "@storybook/react/types-6-0";
import DashbardContainer, { DashbardContainerProps } from ".";

export default {
  title: "DashbardContainer",
} as Meta<DashbardContainerProps>;

export const Default: Story<DashbardContainerProps> = (args) => (
  <DashbardContainer title="Gestão de contas" {...args}>
    Conteúdo da página
  </DashbardContainer>
);

export const UserAccount: Story<DashbardContainerProps> = (args) => (
  <DashbardContainer title="Conta do usuário" {...args}>
    Conteúdo da página
  </DashbardContainer>
);

UserAccount.args = {
  variant: "user-account",
};
