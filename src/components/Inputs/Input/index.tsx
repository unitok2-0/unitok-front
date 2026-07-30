import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Props as InputMaskProps, ReactInputMask } from "react-input-mask";
import { Control, UseFormSetValue, Controller } from "react-hook-form";

import * as S from "./styles";
import { Colors } from "styles/Colors";

export type PhoneInputProps = {
  onPhoneChange?: (phone: string) => void;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  PhoneInputProps & {
    id: string;
    label?: string;
    errorMessage?: any;
    warningMessage?: string;
    isWhiteMode?: boolean;
    leftElement?: React.ReactElement;
    rightElement?: React.ReactElement;
    bottomElement?: React.ReactElement;
    mask?: InputMaskProps["mask"];
    styleContainer?: any;
    /** Takes control of the label behavior */
    shouldMaintainLabelOnTop?: boolean;
    classNameContainer?: string;
    notErrorWarning?: boolean;
  };

/** If you want to use the phone input, pass the following props: `type="tel"`, `control` and `setValue` from React Hook Form */
const Input: ForwardRefRenderFunction<
  HTMLInputElement | ReactInputMask,
  InputProps
> = (props: InputProps, ref) => {
  const {
    errorMessage,
    warningMessage,
    isWhiteMode,
    leftElement,
    rightElement,
    onChange,
    classNameContainer,
    styleContainer,
    bottomElement,
    notErrorWarning,
    ...inputProps
  } = props;

  const [shouldMaintainLabelOnTop, setShouldMaintainLabelOnTop] = useState(
    props.type === "tel" || false
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      //@ts-ignore
      const value = event.target.value;
      setShouldMaintainLabelOnTop(!!value);
      onChange?.(event);
    },
    [onChange]
  );

  return (
    <>
      <S.Wrapper
        shouldMaintainLabelOnTop={
          !!props.value ||
          shouldMaintainLabelOnTop ||
          props.shouldMaintainLabelOnTop
        }
        disabled={props.disabled}
        hasError={!!props.errorMessage}
        isWhiteMode={isWhiteMode}
        className={classNameContainer}
        style={styleContainer}
      >
        {leftElement && leftElement}
        {props.label && <S.Label htmlFor={props.id}>{props.label}</S.Label>}
        {Boolean(props.mask) ? (
          <S.MaskInput
            mask={props.mask}
            // @ts-ignore
            // maskChar="0"
            ref={ref as ForwardedRef<ReactInputMask>}
            onChange={handleChange}
            {...inputProps}
          />
        ) : props.type === "tel" ? (
          <S.PhoneInput
            country=""
            specialLabel=""
            inputStyle={{
              border: "none",
              padding: "0 0 0 3.75rem",
              background: "transparent",
              width: "100%",
              borderColor: "transparent",
              boxShadow: "none",
              color: isWhiteMode ? Colors.white : undefined,
            }}
            inputProps={{ placeholder: "+55 (99) 999999999" }}
            value={props.defaultValue}
            {...(inputProps as any)}
            onChange={props.onPhoneChange}
          />
        ) : (
          <S.Input
            ref={ref as ForwardedRef<HTMLInputElement>}
            onChange={handleChange}
            {...inputProps}
          />
        )}
        {(errorMessage || warningMessage) && (
          <>
            {!notErrorWarning && <RiErrorWarningLine size={16} />}
            <S.Message isError={!!errorMessage} isWhiteMode={isWhiteMode}>
              {errorMessage || warningMessage}
            </S.Message>
          </>
        )}
        {rightElement && rightElement}
      </S.Wrapper>
      {bottomElement && bottomElement}
    </>
  );
};

export default forwardRef(Input);
