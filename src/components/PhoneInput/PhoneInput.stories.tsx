import { Meta, Story } from "@storybook/react/types-6-0";
import { useForm } from "react-hook-form";
import PhoneInput from ".";

export default {
  title: "PhoneInput",
  component: PhoneInput,
} as Meta;

export const WithReactHookForm: Story = () => {
  const { control, setValue, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <PhoneInput
        id="phone"
        label="Telefone"
        setValue={setValue}
        control={control}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
