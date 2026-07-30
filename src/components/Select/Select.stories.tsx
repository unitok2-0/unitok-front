import { Meta, Story } from "@storybook/react/types-6-0";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select, { SelectProps } from ".";

export default {
  title: "Select",
  component: Select,
} as Meta<SelectProps>;

export const Default: Story<SelectProps> = (args) => (
  <Select
    options={[
      { label: "Apple", value: "apple" },
      { label: "Pine", value: "pine" },
    ]}
    label="Fruits"
    selectId="fruits"
    {...args}
  />
);

export const WithReactHookForm: Story<SelectProps> = (args) => {
  const { register, formState, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Pine", value: "pine" },
        ]}
        label="Fruits"
        selectId="fruits"
        reactHookFormRegisterReturn={register("fruits", {
          required: "Você deve selecionar um a fruta",
        })}
        errorMessage={formState.errors?.fruits?.message}
      />
      <button type="submit" style={{ marginTop: "4rem" }}>
        Submit
      </button>
    </form>
  );
};
