import React, { forwardRef, InputHTMLAttributes, ForwardRefRenderFunction, ReactElement, useState } from 'react';
import { FieldError, UseFormReturn } from 'react-hook-form';
import { CSSProp } from 'styled-components';
import { Container, Input, Content } from './styles';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  titleInput?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  error?: FieldError | { message: string },
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
  setValue: UseFormReturn["setValue"],
  actionOnChangeValue?: (quantity: number) => void,
}

const InputNumberBase: ForwardRefRenderFunction<HTMLInputElement, InputNumberProps> = (
  {
    titleInput,
    styleContainer,
    name,
    styleInput,
    isLoading,
    value = 0,
    setValue,
    actionOnChangeValue,
    error,
    leftComponent,
    rightComponent,
    ...rest
  },
  ref
) => {
  const [valueNumber, setValueNumber] = useState(value)

  const lessValue = () => {
    const number = Number(valueNumber)
    if (number - 1 === 0) return
    setValue(name, String(number - 1))
    setValueNumber(String(number - 1))
    actionOnChangeValue(number - 1)
  }

  const moreValue = () => {
    const number = Number(valueNumber)
    setValue(name, String(number + 1))
    setValueNumber(String(number + 1))
    actionOnChangeValue(number + 1)
  }

  return (
    <Container styleContainer={styleContainer}>

      <Content>
        {leftComponent}
        <button
          className="less"
          onClick={() => lessValue()}
          type="button"
        >-</button>
        <Input
          ref={ref}
          name={name}
          styleInput={styleInput}
          error={!!error?.message}
          value={valueNumber}
          {...rest}
        />
        <button
          className="more"
          type="button"
          onClick={() => moreValue()}
        >+</button>
        {rightComponent}
      </Content>
      {!!error?.message && <p>{error.message}</p>}
    </Container>
  )
}

export const InputNumber = forwardRef(InputNumberBase)