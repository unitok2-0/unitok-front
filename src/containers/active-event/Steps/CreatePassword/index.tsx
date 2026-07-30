import Input from '../../../../components/Inputs/Input'
import PasswordInput from '../../../../components/Inputs/PasswordInput'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import CheckBox from '../../../../components/Checkbox'

import styled from 'styled-components'

const CheckBoxWrapper = styled.span`
  margin-top: 2rem;

  .link {
    color: #ff4c1c;
    text-decoration: underline;
  }
`

import { Title, FormInputs, Text } from '../../styles'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

type CreatePasswordProps = {
  onChangePhone: (phone: string) => void
  setValue: any
  register: any
  errors: any
  clearErrors: any
  step: number
  setUserAcceptedTerms: any
  userAcceptedTerms: boolean
  closeUseTermsModal: () => void
  closeUsePrivacyModal: () => void
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  onChangePhone,
  register,
  errors,
  clearErrors,
  setValue,
  step,
  setUserAcceptedTerms,
  userAcceptedTerms,
  closeUseTermsModal,
  closeUsePrivacyModal,
}) => {
  const themeContext = useContext(ThemeContext)

  return (
    <FormInputs>
      <IoIosCheckmarkCircleOutline
        size={56}
        style={{ marginBottom: '1.5rem' }}
        color={themeContext.colors.primary}
      />
      <Title>Oba!</Title>
      <Title>Seu login está criado e o seu cartão está ativo.</Title>
      <Text>
        Agora seu perfil está pronto para ser editado e compartilhado!
      </Text>

    </FormInputs>
  )
}

export default CreatePassword
