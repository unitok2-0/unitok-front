import { Meta, Story } from "@storybook/react/types-6-0";
import { AccordionList } from ".";

const items = [
  {
    title: "Como, quando e quantas vezes eu posso editar meu perfil?",
    content: `le funciona sem a necessidade de um aplicativo, por leitura de QR
    Code e em qualquer celular iPhone ou Android que possui a
    tecnologia de pagamento por aproximação (NFC). Ao encostar seu
    cartão no celular ou escanear o QR Code, aparecerá uma notificação
    com um link. Ao clicar nesse link, você será redirecionado para o
    perfil que está vinculado ao cartão.`,
  },
  {
    title: "Como, quando?",
    content: `Sasa lele`,
  },
];

export default {
  title: "AccordionList",
  component: AccordionList,
} as Meta;

export const Default: Story = () => <AccordionList items={items} />;
