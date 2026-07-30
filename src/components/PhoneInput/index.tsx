import { UseFormSetValue, Control, Controller } from "react-hook-form";
import Input, { InputProps } from "components/Inputs/Input";
import { useEffect } from "react";

export type PhoneInputProps = InputProps & {
  setValue: UseFormSetValue<any>;
  control: Control;
};

export default function PhoneInput(props: PhoneInputProps) {
  const { control, setValue, ...inputProps } = props;

  useEffect(() => {
    setValue(props.id, props.defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, props.defaultValue]);

  return (
    <Controller
      name={props.id}
      control={control}
      render={() => (
        <Input
          {...inputProps}
          type="tel"
          onPhoneChange={(phone) => setValue(props.id, phone)}
        />
      )}
    />
  );
}
