import Input from '../../../../components/Inputs/Input'
import PasswordInput from '../../../../components/Inputs/PasswordInput'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import CheckBox from '../../../../components/Checkbox'

import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import StepSucessActive from 'containers/active-pet/Steps/SuccessActive'

import { Title, FormInputs, Text } from '../../styles'
import * as S from './styles';

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
  deviceType?: string;
  qrcode?: string;
  teamsUser: any;
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
  deviceType,
  qrcode,
  teamsUser,
}) => {
  const themeContext = useContext(ThemeContext)
  // const isTeamsUser = teamsUser !== {} ? true : false
  const isTeamsUser = Object.keys(teamsUser ?? {}).length > 0 ? true : false

  console.log(deviceType);
  console.log(qrcode)

  return (
    <FormInputs teamsUser={teamsUser}>
      {step === 1 ? (
        <>
          <Title>Criar login</Title>

          <PasswordInput
            classNameContainer="fullWidth input"
            label="Senha"
            name="password"
            id="senha"
            {...register('password')}
            errorMessage={errors?.password?.message}
            onClick={() => clearErrors('password')}
            isWhiteMode={!isTeamsUser}
            autoFocus
          />

          {/*           <Input
            type="password"
            placeholder="Confirme a senha"
            classNameContainer="fullWidth input"
            id="confirmPassword"
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            onClick={() => clearErrors('confirmPassword')}
            isWhiteMode
          /> */}
          <S.CheckBoxWrapper teamsUser={teamsUser}>
            <CheckBox
              textColor={teamsUser ? "grayDarkest" : "white"}
              textStyles={['text-align: left;']}
              onChange={() => {
                setUserAcceptedTerms(!userAcceptedTerms)
              }}
            >
              Li e concordo com os{' '}
              <span className="link" onClick={closeUseTermsModal}>
                Termos de uso
              </span>{' '}
              e{' '}
              <span className="link" onClick={closeUsePrivacyModal}>
                Política de Privacidade
              </span>
            </CheckBox>
          </S.CheckBoxWrapper>
        </>
      ) : (
        <>

          {deviceType === "PETS" ? (
            <>
              <StepSucessActive
                onHandleComeBack={() => console.log('success')}
                qrcode={qrcode}
              />
            </>
          ) : (
            <S.CongratulationsArea>
              <IoIosCheckmarkCircleOutline
                size={56}
                style={{ marginBottom: '1.5rem' }}
                color={isTeamsUser ? teamsUser?.profileColor : themeContext.colors.primary}
              />
              <Title>Oba!</Title>
              <Title>Seu login está criado e o</Title>
              <Title>seu cartão está ativo.</Title>
              <Text>
                Agora seu perfil está pronto para ser editado e compartilhado!
              </Text>
            </S.CongratulationsArea>
          )}
        </>
      )}
    </FormInputs>
  )
}

export default CreatePassword
