import { AccordionList } from "components/AccordionList";

const questionsAndAnswers = [
  {
    title: "Como o Unitok funciona?",
    content: `Ele funciona sem a necessidade de um aplicativo, por leitura de QR Code e em qualquer celular iPhone ou Android que possui a tecnologia de pagamento por aproximação (NFC). Ao encostar seu cartão no celular ou escanear o QR Code, aparecerá uma notificação com um link. Ao clicar nesse link, você será redirecionado para o perfil que está vinculado ao cartão.`,
  },
  {
    title: "Como, quando e quantas vezes eu posso editar meu perfil?",
    content: `Sempre que quiser, quantas vezes for necessário e instantaneamente! Você pode alterar sua foto, mudar a cor do seu perfil e adicionar diversas informações de contato que precisar em poucos minutos. Basta criar um login no momento que receber o seu cartão e acessar a sua conta online pelo nosso site ou encostando seu cartão no seu celular.`,
  },
  {
    title: "Como faço para compartilhar meu perfil online?",
    content: `Existem 2 formas diferentes para compartilhar o seu perfil de forma digital: pelos botão “Compartilhar” ou copiando a URL do seu perfil (unitok.com/SeuNomedeUsuario) e colocando-o onde deseja divulgar: na bio do Instagram, por mensagem no WhatsApp, no sobre do Facebook, etc.`,
  },
  {
    title:
      "Como faço para compartilhar meu perfil caso a pessoa esteja sem internet?",
    content: `Quando a pessoa com a qual você vai compartilhar está sem internet, encoste o cartão em seu próprio celular e clique no botão “QR Code” que aparece no perfil para que ele/ela escaneie o código que aparece na sua tela e consiga salvar seus contatos diretamente na agenda dele/dela.`,
  },
  {
    title: "Consigo fazer um cartão com a minha marca?",
    content: `Sim! Em nossa seção de personalizados você consegue escolher com qual modelo prefere seguir para deixar o seu Unitok com a cara da sua empresa. Você pode enviar apenas o seu logo e nós aplicamos por aqui em uma das 3 cores de cartão que preferir (preto, branco ou cinza) ou ainda, se quiser, você também pode fazer uma arte completamente personalizada com o auxílio do nosso gabarito para deixá-lo ainda mais único.`,
  },
  {
    title: "O que consigo colocar no perfil Unitok?",
    content: `Você pode incluir todos os links que precisar dentro do seu cartão Unitok: e-mail, telefone, site, whatsapp, perfis do instagram, tiktok, facebook, youtube, twitch e muito mais. Ele é bem versátil e atende a qualquer necessidade que tiver.`,
  },
];

export default function HelpQAList() {
  return <AccordionList items={questionsAndAnswers} />;
}
