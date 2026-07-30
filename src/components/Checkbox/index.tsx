import { Text } from 'components/Typography'
import { InputHTMLAttributes, useState } from 'react'
import { Theme } from 'styles/themes/light'
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs'

import * as S from './styles'
import { CSSProp } from 'styled-components'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode
  textColor?: keyof Theme['colors']
  textStyles?: CSSProp
  iconColor?: string;
}

export default function Checkbox(props: CheckboxProps) {
  const { onChange, children, textColor, textStyles, iconColor, ...inputProps } = props
  const [isChecked, setIsChecked] = useState(props.checked || false)

  return (
    <S.Wrapper>
      <S.InputDiv>
        <S.Input
          {...inputProps}
          type="checkbox"
          onChange={(event) => {
            setIsChecked(event.target.checked)
            onChange?.(event)
          }}
        />
        {isChecked ? <BsCheckCircleFill size={16} color={iconColor} /> : <BsCircle size={16} color={iconColor} />}
      </S.InputDiv>
      {textColor ? (
        <Text color={textColor} extendStyle={textStyles}>
          {children}
        </Text>
      ) : (
        <Text as="span" extendStyle={textStyles}>
          {children}
        </Text>
      )}
    </S.Wrapper>
  )
}
