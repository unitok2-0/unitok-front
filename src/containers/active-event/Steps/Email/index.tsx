import Input from "../../../../components/Inputs/Input";
import PasswordInput from "../../../../components/Inputs/PasswordInput";
import React, { Dispatch, SetStateAction } from 'react';

import {
  Title,
  FormInputs,
  InputContainerEvents,
} from "../../styles";
import Checkbox from "components/Checkbox";
import { CheckboxStyles } from "./styles";
import { styleContainer } from '../../../../styles/pageStyles/conarh2022/expositor/register-expositor/styles';
import { css } from "styled-components";
import { Colors } from "styles/Colors";

type EmailProps = {
  register: any;
  errors: any;
  clearErrors: any;
  setConfirm_market: Dispatch<SetStateAction<boolean>>;
  setAuthorized:Dispatch<SetStateAction<boolean>>;
  setModalUserTermsIsOpen:Dispatch<SetStateAction<boolean>>;
  setModalUsePrivacyIsOpen:Dispatch<SetStateAction<boolean>>;
  confirm_market: boolean;
}

const Email: React.FC<EmailProps> = ({
  register,
  errors,
  clearErrors,
  setConfirm_market,
  setAuthorized,
  setModalUsePrivacyIsOpen,
  setModalUserTermsIsOpen,
  confirm_market
}) => {

  return (
    <FormInputs>
      <Title>Criar login</Title>
      <InputContainerEvents> 

        <Input
          label="Nome"
          id="name"
          type="text"
          name="name"
          {...register("name", { required: true })}
          errorMessage={errors.name?.message}
          onClick={() => clearErrors("name")}
          classNameContainer="fullWidth"
          autoFocus
        />
        <Input
          label="Sobrenome"
          id="lastname"
          type="text"
          name="lastname"
          {...register("lastname", { required: true })}
          errorMessage={errors.lastname?.message}
          onClick={() => clearErrors("lastname")}
          classNameContainer="fullWidth"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          {...register("email", { required: true })}
          errorMessage={errors.email?.message}
          onClick={() => clearErrors("email")}
          classNameContainer="fullWidth"
        />

        <PasswordInput
          classNameContainer="fullWidth input"
          label="Criar senha"
          name="password"
          id="password"
          {...register('password', { required: true })}
          errorMessage={errors?.password?.message}
          onClick={() => clearErrors('password')}
        />
        <PasswordInput
          classNameContainer="fullWidth input"
          label="Repetir senha"
          name="confirmPassword"
          id="confirmPassword"
          {...register('confirmPassword', { required: true })}
          errorMessage={errors?.confirmPassword?.message}
          onClick={() => clearErrors('confirmPassword')}
        />

        <Checkbox
          textStyles={CheckboxStyles}
          iconColor={"#01302F"}
          onChange={() => { setAuthorized(c => !c) }}
        >
          Li e concordo com os
          <span onClick={() => setModalUserTermsIsOpen(true)} style={{paddingLeft: '5px'}}>Termos de uso</span> e
          <span onClick={() => setModalUsePrivacyIsOpen(true)}> Política de Privacidade</span>
        </Checkbox>

        <Checkbox
          checked={confirm_market}
          textStyles={CheckboxStyles}
          iconColor={"#01302F"}
          onChange={() => { setConfirm_market(c => !c) }}
        >
          Autorizo receber comunicações do Unitok e seus parceiros
        </Checkbox>
      </InputContainerEvents>
    </FormInputs>
  )
}

export default Email;