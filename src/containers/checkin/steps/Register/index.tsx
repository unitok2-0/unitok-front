import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import {
  CheckboxStyles,
  ContainerInput,
  ContainerPhoto,
  ContainerRegisterExpositor,
  GroupInputs,

} from "./styles";

import * as yup from "yup";
import Router from 'next/router'

import ButtonPrimary from "../../../../components/Buttons/ButtonPrimary";
import Input from "components/Inputs/Input";
import PasswordInput from "components/Inputs/PasswordInput";
import { Heading } from "components/Typography";
import Checkbox from "components/Checkbox";
import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { CurrentScreen } from "containers/checkin";
import { UseTermsConaRHModal } from "components/TermsConaRH/UseTermsConaRHModal";
import UsePrivacyConaRHModal from "components/TermsConaRH/UsePrivacyConaRHModal";
import { createVisitorUser } from "services/user";
import { FiArrowLeft } from "react-icons/fi";

const signInFormSchema = yup.object().shape({
  name: yup.string().required("Digite seu nome"),
  last_name: yup.string().required("Digite seu sobrenome"),
  profession: yup.string(),
  phone: yup.string().required("Digite seu telefone"),
  email: yup.string().email('E-mail inválido').required("Digite seu E-mail"),
  password: yup.string().required("Digite sua senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup.string().required("Confirme sua senha"),
});

interface RegisterVisitatsData {
  name: string;
  last_name: string;
  profession?: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept_marketing?: boolean;
}


interface RegisterProps {
  exhibitorCode?: string;
  setCurrentComponent: (screen: CurrentScreen) => void;
}
export function Register({ exhibitorCode, setCurrentComponent }: RegisterProps) {

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    clearErrors,
    getValues,
    setError
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors, isSubmitting } = formState;
  const [modalUserTermsIsOpen, setModalUserTermsIsOpen] = useState(false);
  const [modalUserPrivacyIsOpen, setModalUsePrivacyIsOpen] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [authorize, setAuthorize] = useState(true);

  const { signIn } = useAuth();
  const { push } = Router;

  const handleRegisterCongressman = async (data: RegisterVisitatsData) => {
    if (data.password !== data.confirmPassword) {
      return setError('confirmPassword', { message: "As senhas devem ser iguais" })
    }
    if( authorize ) {
      data.accept_marketing = true;
    }

    try {
      const user = await createVisitorUser(data);
      await signIn({ phone: user.phone, password: data.password })

      if (exhibitorCode != null) {
        push(`/checkin/${exhibitorCode}`);
      } else {
        setCurrentComponent(CurrentScreen.SUCCESS)
      }

    } catch (error) {
      toast.error(`Já existe um usuário cadastrado com este número`);
    }
  }

  function handleCloseUserTermsModal() {
    setModalUserTermsIsOpen(false)
  }
  function handleCloseUserPrivacyModal() {
    setModalUsePrivacyIsOpen(false)
  }

  return (
    <ContainerRegisterExpositor>

      <ContainerPhoto>
        <div className="containerDivision">
          <img src="/images/conarh2022/Unitok.svg" alt="" />
          <img src="/images/conarh2022/abrh.svg" alt="" />
        </div>
      </ContainerPhoto>

      <ContainerInput>
        <button className='arrow-back'>
          <FiArrowLeft onClick={() => setCurrentComponent(CurrentScreen.HAVE_ACCOUNT)}/>
        </button>
        <Heading>Criar Login</Heading>
        <GroupInputs>
          <Input
            autoFocus
            id="name"
            name="name"
            errorMessage={errors?.name?.message}
            onClick={() => clearErrors("name")}
            label="Nome"
            shouldMaintainLabelOnTop={!!getValues().name}
            {...register("name")}
          />

          <Input
            id="last_name"
            name="last_name"
            label="Sobrenome"
            errorMessage={errors?.last_name?.message}
            onClick={() => clearErrors("last_name")}
            shouldMaintainLabelOnTop={!!getValues().last_name}
            {...register("last_name")}
          />

          <Input
            id="profession"
            name="profession"
            label="Cargo ou função (opcional)"
            errorMessage={errors?.profession?.message}
            onClick={() => clearErrors("profession")}
            shouldMaintainLabelOnTop={!!getValues().role}
            {...register("profession")}
          />

          <Input
            type="tel"
            name="phone"
            id="phone"
            autoFocus={true}
            onPhoneChange={(phone) => setValue('phone', phone)}
            errorMessage={errors?.phone?.message}
            onClick={() => clearErrors("phone")}
            {...register("phone")}
          />

          <Input
            id="email"
            name="email"
            label="E-mail"
            errorMessage={errors?.email?.message}
            onClick={() => clearErrors("email")}
            shouldMaintainLabelOnTop={!!getValues().email}
            {...register("email")}
          />

          <PasswordInput
            name="password"
            id="password"
            label="Criar senha"
            errorMessage={errors?.password?.message}
            onClick={() => clearErrors("password")}
            shouldMaintainLabelOnTop={!!getValues().password}
            {...register("password")}
          />

          <PasswordInput
            name="confirmPassword"
            id="confirmPassword"
            label="Repetir senha"
            errorMessage={errors?.confirmPassword?.message}
            onClick={() => clearErrors("confirmPassword")}
            shouldMaintainLabelOnTop={!!getValues().confirmPassword}
            {...register("confirmPassword")}
          />

          <Checkbox
            checked={acceptTerms}
            textStyles={CheckboxStyles}
            iconColor={"#01302F"}
            onChange={() => { setAcceptTerms(!acceptTerms) }}
          >
            Li e concordo com os
            <span onClick={() => setModalUserTermsIsOpen(true)} style={{paddingLeft: '5px'}}>Termos de uso</span> e
            <span onClick={() => setModalUsePrivacyIsOpen(true)}> Política de Privacidade</span>
          </Checkbox>

          <Checkbox
            checked={authorize}
            textStyles={CheckboxStyles}
            iconColor={"#01302F"}
            onChange={() => { setAuthorize(!authorize) }}
          >
            Autorizo receber comunicações do Unitok e seus parceiros
          </Checkbox>


          <ButtonPrimary
            disabled={!acceptTerms}
            textButton="Criar Login"
            fullWidth
            className="buttonPrimary"
            onClick={handleSubmit(handleRegisterCongressman)}
            loading={isSubmitting}
            style={{ marginBottom: '30px' }}
          />

        </GroupInputs>
      </ContainerInput>

      <UseTermsConaRHModal modalIsOpen={modalUserTermsIsOpen} closeModal={handleCloseUserTermsModal} />
      <UsePrivacyConaRHModal modalIsOpen={modalUserPrivacyIsOpen} closeModal={handleCloseUserPrivacyModal} />
    </ContainerRegisterExpositor>
  )
}
