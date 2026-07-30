import { useState } from "react";
import Head from "next/head";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Header } from "components/Header";

// import PhoneInput from "components/PhoneInput";
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

  return (
    <>
      <Head>
        <title>Adicionar conta | Unitok</title>
      </Head>
      <DashboardContainer title="Adicionar conta">
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Implementar adição de usuário");
            setShouldShowSuccessMessage(true);
          }}
        >
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Dados pessoais
            </Heading>
            <S.InputGrid>
              <S.InputRowGrid>
                <Input label="Nome" id="nome" />
                <Input label="Sobrenome" id="sobrenome" />
              </S.InputRowGrid>
              <Input label="CPF ou CNPJ" id="document" />
              <Input label="Telefone" id="phone" />
              <Input label="Email" id="email" type="email" />
            </S.InputGrid>
          </div>
          <div>
            <Heading font="titleSm" style={{ marginBottom: "2.5rem" }}>
              Criar senha
            </Heading>
            <S.InputGrid>
              <PasswordInput label="Digite uma senha" id="password" />
              <PasswordInput
                label="Confirme a nova senha"
                id="password_confirmation"
              />
            </S.InputGrid>
          </div>

          <ButtonPrimary type="submit">Adicionar conta conta</ButtonPrimary>
        </S.Form>

        {shouldShowSuccessMessage && (
          <S.SuccessAcountCreationMessage>
            <Header variant="logoOnly" position="static" />

            <div>
              <IoIosCheckmarkCircleOutline size={64} />
              <Heading font="titleMdLight" style={{ marginTop: "1.25rem" }}>
                Conta adicionada com <br /> sucesso!
              </Heading>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  gap: "1rem",
                  marginTop: "4.25rem",
                }}
              >
                <ButtonPrimary>Ver usuário completo</ButtonPrimary>
                <ButtonPrimary
                  variant="secondary"
                  onClick={() => setShouldShowSuccessMessage(false)}
                >
                  Adicionar nova conta
                </ButtonPrimary>
              </div>
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
}, {
  roles: ['ADMIN']
});
