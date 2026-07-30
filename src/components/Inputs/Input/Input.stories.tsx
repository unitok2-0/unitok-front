import { useEffect, useState } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Input, { InputProps } from ".";

export default {
  title: "Input",
  component: Input,
  args: {
    label: "Label",
  },
} as Meta<InputProps>;

export const Default: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};
export const WithWhiteMode: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      isWhiteMode
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};

WithWhiteMode.parameters = {
  backgrounds: { default: "dark" },
};

export const Disabled: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};

Disabled.args = {
  disabled: true,
};

export const WithError: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};

WithError.args = {
  errorMessage: "error text",
};

export const WithWarning: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};

WithWarning.args = {
  warningMessage: "Warning text",
};

export const WithMask: Story<InputProps> = (args) => {
  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <Input {...args} label="Expiration date" mask="99/99" />
      <Input {...args} label="Cep" mask="99999-999" />
    </div>
  );
};

export const PhoneInput: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <Input
      {...args}
      type="tel"
      label="Telefone"
      value={value}
      onPhoneChange={(phone) => {
        setValue(phone);
      }}
    />
  );
};
