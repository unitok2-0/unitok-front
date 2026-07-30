import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import Link from "next/link";

import { HeaderEvent } from "../../components/Headers/HeaderEvent";
import {
  Content,
  ContentContainer,
  Image,
  Footer,
  Wrapper,
  StepsContainer,
} from "./styles";

import Welcome from "./Steps/Welcome";
import LoginPhone from "./Steps/LoginPhone";
import CreatePassword from "./Steps/CreatePassword";
import EmailScreen from "./Steps/Email";
import PhoneActive from "./Steps/PhoneActive";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import {
  createUserAndActiveCard,
  sendTokenPhone,
  verifyPasswordQr,
  verifyTokenPhone,
} from "../../services/user";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { emailIsValidate } from "services/auth";
import PasswordQRActive from "./Steps/PasswordQRActive";
import UseTermsModal from "components/UseTermsModal";
import UsePrivacyModal from "components/UsePrivacyModal";
import router from "next/router";
import destroyAllCookies from "utils/conarh2022/destroyAllCookies";

export type ActiveContainerProps = {
  imageSrc: string;
  codeId: string;
  withoutPasswordQr: boolean;
  // children: React.ReactNode;
};

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({});

const stepsArrayOriginal = [1, 2, 3, 4, 5];
const lastStep = 5;

export default function ActiveContainer({
  codeId,
  imageSrc,
  withoutPasswordQr,
}: ActiveContainerProps) {

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAcceptedTerms, setUserAcceptedTerms] = useState(false);
  const [modalUserTermsIsOpen, setModalUserTermsIsOpen] = useState(false);
  const [modalUserPrivacyIsOpen, setModalUsePrivacyIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [confirm_market, setConfirm_market] = useState(true);

  function closeUserTermsModal() {
    setModalUserTermsIsOpen(!modalUserTermsIsOpen);
  }
  function closeUserPrivacyModal() {
    setModalUsePrivacyIsOpen(!modalUserPrivacyIsOpen);
  }

  const stepsArray = useMemo(() => {
    const clone = stepsArrayOriginal.slice();

    if (withoutPasswordQr) {
      clone.pop();
    }

    return clone;
  }, [withoutPasswordQr]);

  const {
    register,
    getValues,
    formState,
    clearErrors,
    control,
    setValue,
    setError,
    watch,
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();
  const { errors } = formState;
  const { push } = router;
  const paswordQRView = watch("paswordQR") as string;

  useEffect(() => {
    if (paswordQRView && paswordQRView.length >= 6) {
      setValue("paswordQR", paswordQRView.slice(0, 6));
    }
  }, [paswordQRView, setValue]);

  const showImage = () => {
    const stepsToShow = [2, 3, 4, 5, 6];
    return stepsToShow.includes(step);
  };


  const handleNextButton = async () => {
    if (step === 1 && withoutPasswordQr) {
      return setStep((current) => {
        return current + 2;
      });
    } else if (step === 2) {
      const sent = await handleValidatyPasswordQr();
      if (!sent) return;
    } else if (step === 3) {
      const sent = await handleSendSMSCode();
      if (!sent) return;
    }

    setStep((current) => {
      return current + 1;
    });
  };

  const handleValidatyPasswordQr = async () => {
    try {
      setLoading(true);
      const values = getValues();
      const { paswordQR } = values as { paswordQR: string };

      if (paswordQR?.length < 6) {
        setLoading(false);
        toast.warning("Digite o código de ativação");
        return false;
      }

      const response = await verifyPasswordQr(codeId, Number(paswordQR));

      setLoading(false);

      if (response && response.passwordIsValid) {
        return true;
      }

      toast.warning("Código de ativação inválido!");
    } catch (error) {
      toast.warning("Código de ativação inválido!");
      setLoading(false);
    }
  };

  const handleSendSMSCode = async () => {
    try {
      setLoading(true);

      if (phoneNumber?.length < 8) {
        setLoading(false);
        toast.warning("Digite seu número de telefone");
        return false;
      }

      const response = await sendTokenPhone(phoneNumber, undefined, codeId);

      if (response.UserWasAGuesAndWasUpdated) {
        await destroyAllCookies()
        toast.success("Seu cartão foi ativado com sucesso");
        push('/login')
        return
      }
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);

      if (error?.status === 422) {
        toast.warning("Você já gerou um token para esse telefone.");
        return true;
      } else {
        toast.warning(error?.error);
      }
    }
  };

  const handleVerifyTokenPhone = async () => {
    try {
      setLoading(true);
      const values = getValues();
      const keys = Object.keys(values);
      const token = keys.reduce((result, at) => {
        if (at.includes("code")) {
          result += values[at];
        }
        return result;
      }, "");

      if (!token || !Number(token) || token.length !== 5) {
        setLoading(false);
        return toast.error("Token inválido!");
      }

      await verifyTokenPhone(phoneNumber, token);
      handleNextButton();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const values = getValues();
      Object.keys(values).map((key) => {
        setValue(key, "");
      });

      document.getElementById("code1")?.focus();
      toast.error(error?.error);
    }
  };

  const handleCreateUserAndActiveCard = async () => {
    try {
      setLoading(true);

      const values = getValues();
      const { password = "", email = "", paswordQR = "", confirmPassword, name, lastname } = values;
      //const formatConfirmPassword = confirmPassword?.trim()
      const formatPassword = password?.trim();
      const formatConfirmPassword = confirmPassword?.trim();
      const emailWithoutSpace = email?.trim();

      if (!name) {
        setLoading(false);
        return setError("name", { message: "Nome obrigatório" });
      }

      if (!lastname) {
        setLoading(false);
        return setError("lastname", { message: "Sobrenome obrigatório" });
      }

      if (!password || password?.length < 6) {
        setLoading(false);
        if (formatPassword?.length < 6) {
          return setError("password", { message: "Senha menor que 6 dígitos" });
        }

        return setError("password", { message: "Digite uma senha válida" });
      } else if (!emailWithoutSpace) {
        setLoading(false);
        return setError("email", { message: "Email inválido" });
      }

      if (formatPassword !== formatConfirmPassword) {
        setLoading(false);
        return setError("confirmPassword", { message: "As senhas devem ser iguais" })
      }

      // toast.success('Criado')
      await createUserAndActiveCard({
        phone: phoneNumber,
        password: formatPassword,
        email: emailWithoutSpace,
        unique_code: codeId,
        password_qr: paswordQR,
        name,
        lastname
      });

      await signIn({
        phone: phoneNumber,
        password: formatPassword,
      });

      setLoading(false);
      handleNextButton();
    } catch (error) {
      setLoading(false);
      error?.error
        ? toast.error(error?.error)
        : toast.error("Falha ao cadastrar!");
    }
  };

  return (
    <Wrapper style={!showImage() ? { justifyContent: "center" } : {}}>
      <HeaderEvent whiteIcons={showImage()} />


      <UseTermsModal
        closeModal={closeUserTermsModal}
        modalIsOpen={modalUserTermsIsOpen}
      ></UseTermsModal>
      <UsePrivacyModal
        closeModal={closeUserPrivacyModal}
        modalIsOpen={modalUserPrivacyIsOpen}
      ></UsePrivacyModal>

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {showImage() && (
        <Image id="rte" style={{ backgroundImage: `url("${imageSrc}")` }} />
      )}

      <Content
        style={!showImage() ? { height: "100vh" } : { minHeight: "55vh" }}
      >
        <ContentContainer>
          {step === 1 && <Welcome />}

          {step === 2 && (
            <PasswordQRActive
              register={register}
              clearErrors={clearErrors}
              errors={errors}
            />
          )}

          {step === 3 && (
            <LoginPhone
              onChangePhone={setPhoneNumber}
              control={control}
              // register={register}
              setValue={setValue}
              phoneNumber={phoneNumber}
            />
          )}

          {step === 4 && (
            <PhoneActive
              phoneNumber={phoneNumber}
              clearErrors={clearErrors}
              register={register}
              setValue={setValue}
              onPressActiveCard={handleVerifyTokenPhone}
            />
          )}

          {step === 5 && (
            <EmailScreen
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              setAuthorized={setAuthorized}
              setConfirm_market={setConfirm_market}
              setModalUsePrivacyIsOpen={setModalUsePrivacyIsOpen}
              setModalUserTermsIsOpen={setModalUserTermsIsOpen}
              confirm_market={confirm_market}
            />
          )}
          {(step === 6 || step === 7) && (
            <CreatePassword
              onChangePhone={setPhoneNumber}
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              setValue={setValue}
              setUserAcceptedTerms={setUserAcceptedTerms}
              userAcceptedTerms={userAcceptedTerms}
              closeUsePrivacyModal={closeUserPrivacyModal}
              closeUseTermsModal={closeUserTermsModal}
              step={2}
            />
          )}
        </ContentContainer>

        <Footer>
          {step < lastStep && (
            <StepsContainer>
              {stepsArray.map((e) => {
                let stepb = withoutPasswordQr ? step - 1 : step;
                if (stepb === 0) stepb = 1;
                return (
                  <li
                    key={`key-${e}`}
                    className={Math.trunc(stepb) === e ? "selected" : ""}
                  ></li>
                );
              })}
            </StepsContainer>
          )}

          {step !== 4 && Math.trunc(step) !== 5 && step < lastStep && (
            <ButtonPrimary
              variant="secondary"
              onClick={handleNextButton}
              loading={loading}
              style={{ minWidth: "8.5rem" }}
            >
              Próximo
            </ButtonPrimary>
          )}

          {step === 4 && (
            <ButtonPrimary
              id="activeCardButton"
              variant="primary"
              onClick={handleVerifyTokenPhone}
              loading={loading}
              style={{ minWidth: "10.8rem" }}
            >
              Próximo
            </ButtonPrimary>
          )}

          {step === 5 && (
            <ButtonPrimary
              variant="primary"
              onClick={handleCreateUserAndActiveCard}
              loading={loading}
              style={{ minWidth: "9.5rem" }}
              disabled={!authorized}
            >
              Criar login
            </ButtonPrimary>
          )}
          {step === 6 && (
            <ButtonPrimary
              as="a"
              variant="primary"
              href="/profile/me"
              style={{ minWidth: "100%" }}
            >
              Ver perfil
            </ButtonPrimary>
          )}
        </Footer>
      </Content>
    </Wrapper>
  );
}
