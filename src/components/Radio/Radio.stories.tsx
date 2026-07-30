import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";
import Radio from ".";

export default {
  title: "Radio",
  component: Radio,
} as Meta;

export const Default: Story = () => {
  const [value, setValue] = useState("Abacaxi");

  return (
    <>
      <Radio checked={value === "Abacaxi"} onChange={() => setValue("Abacaxi")}>
        Abacaxi
      </Radio>
      <Radio checked={value === "Mamão"} onChange={() => setValue("Mamão")}>
        Mamão
      </Radio>
      <Radio checked={value === "Caju"} onChange={() => setValue("Caju")}>
        Caju
      </Radio>
    </>
  );
};
