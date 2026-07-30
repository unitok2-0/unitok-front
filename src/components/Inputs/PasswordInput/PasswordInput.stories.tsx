import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import PasswordInput from ".";
import { InputProps } from "../Input";

export default {
  title: "PasswordInput",
  component: PasswordInput,
  args: {
    label: "Senha",
  },
} as Meta<InputProps>;

export const Default: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <PasswordInput
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};
