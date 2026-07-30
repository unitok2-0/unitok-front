import Input from "components/Inputs/Input";
import PhoneInput from "components/PhoneInput";
import React, { useEffect } from 'react';

import {
  Title,
  Text,
} from "../../styles";

type LoginPhoneProps = {
  onChangePhone: (phone: string) => void;
  setValue: any;
  control: any;
  phoneNumber: string;
}

const LoginPhone: React.FC<LoginPhoneProps> = ({
  onChangePhone,
  setValue,
  phoneNumber
}) => {

  return (
    <>
      <Title>Criar login</Title>

      <Text>
        Informe o número de celular que gostaria de utilizar como login da sua conta:
      </Text>

      <Input
        label={phoneNumber?.length > 0 ? '' : "Número de celular"}
        classNameContainer="fullWidth"
        type="tel"
        name="phone"
        id="phone"
        autoFocus={true}
        defaultValue=""
        onPhoneChange={(phone) => onChangePhone(phone)}
      />
      {/* <PhoneInput
        label="Celular"
        id="phone"
        // errorMessage={errors.phone?.message}
        // onFocus={() => clearErrors("phone")}
        control={control}
        setValue={setValue}
      /> */}
    </>
  )
}

export default LoginPhone;