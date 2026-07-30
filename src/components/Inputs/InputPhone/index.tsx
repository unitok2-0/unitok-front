import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError, Controller, Control, SetFieldValue, UseFormSetValue, UseFormReturn } from 'react-hook-form';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneInputProps } from "react-phone-input-2";

import { CSSProp } from 'styled-components';
import { Container, InLineInput, Title } from './styles';
import { Colors } from '../../../styles/Colors';
import SkeletonInput from '../../Skeleton/SkeletonInput';

export interface InputPhoneProps extends PhoneInputProps {
  titleInput?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  error?: FieldError,
  name: string,
  defaultValue?: string,
  isLoading?: boolean,
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
  control: Control,
  setValue: UseFormReturn["setValue"];
}

const InputPhoneBase: ForwardRefRenderFunction<HTMLInputElement, InputPhoneProps> = (
  {
    titleInput,
    styleContainer,
    styleInput,
    error,
    name,
    isLoading,
    leftComponent,
    rightComponent,
    control,
    setValue,
    ...rest
  },
  ref
) => {

  const styleAdd = !!error?.message ? { borderColor: Colors.danger } : {}

  return (
    <Container styleContainer={styleContainer}>
      {!!titleInput && <Title>{titleInput}</Title>}
      {
        <InLineInput>
          {leftComponent}

          {
            isLoading ?
              <SkeletonInput />
              :
              <Controller
                render={() => (
                  <PhoneInput
                    {...rest}
                    placeholder="Número de telefone"
                    inputStyle={{
                      borderRadius: "10px",
                      borderColor: Colors.gray300,
                      paddingTop: '11px',
                      paddingBottom: '11px',
                      paddingLeft: '54px',
                      width: '100%',
                      ...styleAdd
                    }}
                    inputProps={{
                      name: name,
                    }}
                    specialLabel=""
                    country="br"
                    onChange={(value) => setValue(name, value)}
                  />
                )}
                {...rest}
                name={name}
                control={control}
              />
          }

          {rightComponent}
        </InLineInput>
      }

      {!!error && <p>{error.message}</p>}
    </Container>
  )
}

export const InputPhone = forwardRef(InputPhoneBase)