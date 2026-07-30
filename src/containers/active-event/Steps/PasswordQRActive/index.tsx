import Input from "components/Inputs/Input";
import PhoneInput from "components/PhoneInput";
import React, { useEffect } from "react";

import { Title, Text } from "../../styles";

type PasswordQRActiveProps = {
  register: any;
  errors: any;
  clearErrors: any;
};

const PasswordQRActive: React.FC<PasswordQRActiveProps> = ({
  register,
  clearErrors,
  errors,
}) => {
  return (
    <>
      <Title>Código de ativação</Title>

      <Text>
        Informe o código informado no envelope para ativação do seu cartão:
      </Text>

      <Input
        label={"Código de ativação"}
        classNameContainer="fullWidth"
        type="number"
        id="paswordQR"
        name="paswordQR"
        {...register("paswordQR")}
        errorMessage={errors.paswordQR?.message}
        onClick={() => clearErrors("paswordQR")}
        max={6}
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
  );
};

export default PasswordQRActive;
