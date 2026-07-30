import { ForwardedRef, forwardRef, ForwardRefRenderFunction, useCallback, useState } from "react";
import Input, { InputProps } from "../Input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ReactInputMask from "react-input-mask";

const PasswordInput: ForwardRefRenderFunction<
  HTMLInputElement | ReactInputMask,
  InputProps
> = (props: InputProps, ref) => {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const showPassword = useCallback(() => {
    setShouldShowPassword(true);
  }, []);

  const hidePassword = useCallback(() => {
    setShouldShowPassword(false);
  }, []);

  return (
    <Input
      {...props}
      ref={ref as ForwardedRef<HTMLInputElement>}
      type={shouldShowPassword ? "text" : "password"}
      rightElement={
        shouldShowPassword ? (
          <AiOutlineEyeInvisible
            size={20}
            role="button"
            aria-label="Esconder senha"
            title="Esconder senha"
            onClick={hidePassword}
            style={{ cursor: "pointer" }}

            color={!props.isWhiteMode ? '#01302F' : '#FFF'}
          />
        ) : (
          <AiOutlineEye
            size={20}
            role="button"
            aria-label="Mostrar senha"
            title="Mostrar senha"
            onClick={showPassword}
            style={{ cursor: "pointer" }}
            color={!props.isWhiteMode ? '#01302F' : '#FFF'}
          />
        )
      }
    />
  );
}

export default forwardRef(PasswordInput);