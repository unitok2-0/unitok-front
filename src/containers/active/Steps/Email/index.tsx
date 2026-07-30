import Input from "../../../../components/Inputs/Input";
import PasswordInput from "../../../../components/Inputs/PasswordInput";
import React, { useContext, useState } from 'react';
import { ThemeContext } from "styled-components";

import {
  Title,
  FormInputs,
  Text,
} from "../../styles";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";
import { HelpCircle, InputsWrapper } from "./styles";
import { formatUniqueName } from "constants/functions";
import { verifyUniqueName } from "services/user";
import { toast } from "react-toastify";

type EmailProps = {
  register: any;
  errors: any;
  clearErrors: any;
  setValue: any;
  teamsUser?: any;
}

const Email: React.FC<EmailProps> = ({
  register,
  errors,
  clearErrors,
  setValue,
  teamsUser
}) => {
  const themeContext = useContext(ThemeContext);

  const [name, setName] = useState('')
  // const isTeamsUser = teamsUser !== {} ? true : false
  const isTeamsUser = Object.keys(teamsUser ?? {}).length > 0 ? true : false

  return (
    <FormInputs teamsUser={teamsUser}>
      <>
        <Title>Criar login</Title>
        <Text>
          Informe um e-mail para receber notificações importantes sobre sua conta:
        </Text>
        <InputsWrapper>
          <Input
            id="perfilEdit1"
            placeholder="Nome de usuário"
            classNameContainer="input-name-container"
            style={{ paddingLeft: "0.2rem" }}
            isWhiteMode={!isTeamsUser}
            leftElement={
              <Text
                as="span"
                color="secondary"
                style={{ marginRight: "-0.5rem", marginBottom: 0 }}
              >
                unitok.com/
              </Text>
            }
            rightElement={
              <HelpCircle
                onMouseEnter={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <BiHelpCircle size={18} color={teamsUser ? "#383D3B" : "#fff"}/>
                <div>
                  <Text as="span" color="secondary">
                    Este é o link onde seu perfil ficará registrado para que as
                    pessoas consigam acessá-lo ao escanear seu QR Code ou
                    encostar o celular em seu Unitok.
                  </Text>
                </div>
              </HelpCircle>
            }
            {...register("name")}
            errorMessage={errors?.name?.message}
            onChange={(e) => setName(formatUniqueName(e.target.value))}
            value={name}
            onClick={() => clearErrors("name")}
          />
        </InputsWrapper>
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          {...register("email")}
          errorMessage={errors.email?.message}
          onClick={() => clearErrors("email")}
          isWhiteMode={!isTeamsUser}
          classNameContainer="fullWidth"
        />

      </>
    </FormInputs>
  )
}

export default Email;
