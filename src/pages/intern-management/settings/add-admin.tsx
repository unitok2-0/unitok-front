// import PhoneInput from "components/PhoneInput";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { Header } from "components/Header";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { Heading } from "components/Typography";
import DashboardContainer from "containers/dashboard";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";

import * as S from "styles/pageStyles/intern-management/styles";
import { withSSRAuth } from "utils/withSSRAuth";

export default function AddAccount() {
  const [shouldShowSuccessMessage, setShouldShowSuccessMessage] = useState(
    false
  );

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Adicionar novo administrador | Unitok</title>
      </Head>
      <DashboardContainer title="Configurações">
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Implementar alteração de conta");
            setShouldShowSuccessMessage(true);
          }}
        >
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Novo admnistrador
            </Heading>
            <S.InputGrid>
              <S.InputRowGrid>
                <Input label="Nome" id="nome" />
                <Input label="Sobrenome" id="sobrenome" />
              </S.InputRowGrid>
              <Input label="Telefone" id="phone" />
              <Input label="Email" id="email" type="email" />
            </S.InputGrid>
          </div>
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Criar senha
            </Heading>
            <S.InputGrid>
              <PasswordInput label="Nova senha" id="password" />
              <PasswordInput
                label="Confirme a nova senha"
                id="password_confirmation"
              />
            </S.InputGrid>
          </div>

          <S.ButtonsContainer>
            <ButtonPrimary type="submit">Adicionar administrador</ButtonPrimary>
            <ButtonPrimary
              variant="secondary"
              type="button"
              onClick={() => router.push("/intern-management/settings")}
            >
              Cancelar e voltar
            </ButtonPrimary>
          </S.ButtonsContainer>
        </S.Form>

        {shouldShowSuccessMessage && (
          <S.SuccessAcountCreationMessage>
            <Header variant="logoOnly" position="static" />

            <div>
              <IoIosCheckmarkCircleOutline size={64} />
              <Heading font="titleMdLight" style={{ marginTop: "1.25rem" }}>
                Conta adicionada com <br /> sucesso!
              </Heading>

              <S.ButtonsContainer>
                <ButtonPrimary
                  onClick={() => router.push("/intern-management/settings")}
                >
                  Voltar para as configurações
                </ButtonPrimary>
                <ButtonPrimary
                  variant="secondary"
                  onClick={() => setShouldShowSuccessMessage(false)}
                >
                  Adicionar nova conta
                </ButtonPrimary>
              </S.ButtonsContainer>
            </div>
          </S.SuccessAcountCreationMessage>
        )}
      </DashboardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
