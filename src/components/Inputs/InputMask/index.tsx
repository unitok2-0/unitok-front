import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import { Props as PropsInputMask, ReactInputMask } from 'react-input-mask';
import { CSSProp } from 'styled-components';
import { Container, InLineInput, Input, Title, } from './styles';
import SkeletonInput from '../../Skeleton/SkeletonInput';

export interface InputMaskProps extends PropsInputMask {
  isLoading?: boolean;
  titleInput?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  error?: any,
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
}

const InputMaskBase: ForwardRefRenderFunction<ReactInputMask, InputMaskProps> = (
  {
    titleInput,
    styleContainer,
    styleInput,
    error,
    isLoading,
    leftComponent,
    rightComponent,
    ...rest
  },
  ref
) => {
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
              <Input
                styleinput={styleInput}
                error={error}
                {...rest}
              />
          }

          {rightComponent}
        </InLineInput>
      }

      {!!error && <p>{error.message}</p>}
    </Container>
  )
}

export const InputMask = forwardRef(InputMaskBase)