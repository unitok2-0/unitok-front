import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Router from "next/router";
import { Title, Text } from "../../styles";
interface StepSucessActiveProps {
  onHandleComeBack: any;
  qrcode: string;
}

export default function StepSucessActive({
  onHandleComeBack,
  qrcode
}: StepSucessActiveProps) {
  return (
    <>

      <div
        style={{
          maxWidth: '80px',
        }}
      >
        <img
          src="/assets/icon_check_circle_red.svg"
          alt=""
          style={{width: '100%'}}
        />
      </div>


      <Title style={{ marginTop: '3rem' }}>Oba!</Title>

      <Title>Seu pingente foi ativado.</Title>

      <Text>
        Agora o perfil do seu pet está pronto <br /> para ser editado e compartilhado!
      </Text>

      <ButtonPrimary
        onClick={() => {
          Router.push(`/profile/pet-edit/${qrcode.replace('https://unitok.com/', '')}`);
          onHandleComeBack();
        }}
        textButton="Editar o perfil do pet"
      />
    </>
  )
}
