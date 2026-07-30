import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import Link from "next/link";

import { Header } from "../../components/Header";
import {
  Content,
  ContentContainer,
  Image,
  Footer,
  Wrapper,
  StepsContainer,
  Title,
  ButtonBack,
} from "./styles";


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
import UseTermsModal from "components/UseTermsModal";
import UsePrivacyModal from "components/UsePrivacyModal";
import router, { Router } from "next/router";
import destroyAllCookies from "utils/conarh2022/destroyAllCookies";
import StepSucessActive from "./Steps/SuccessActive";
import { createPet } from "services/pet";
import Welcome from "../active/Steps/Welcome";
import PasswordQRActive from "../active/Steps/PasswordQRActive";
import ScreenshootQRCODE from "components/ScreenShotQRCODE";

export type ActiveContainerProps = {
  imageSrc: string;
  codeId: string;
  withoutPasswordQr: boolean;
  onHandleComeBack: () => void;
};

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({});

const stepsArrayOriginal = [1, 2, 3, 4, 5];
const lastStep = 8;

export default function ActivePetContainer({
  codeId,
  imageSrc,
  onHandleComeBack,
  withoutPasswordQr,
}: ActiveContainerProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAcceptedTerms, setUserAcceptedTerms] = useState(false);
  const [modalUserTermsIsOpen, setModalUserTermsIsOpen] = useState(false);
  const [modalUserPrivacyIsOpen, setModalUsePrivacyIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [QRCODE, setQRCODE] = useState("");

  const { push } = router;
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

  const paswordQRView = watch("paswordQR") as string;

  useEffect(() => {
    if (paswordQRView && paswordQRView.length >= 6) {
      setValue("paswordQR", paswordQRView.slice(0, 6));
    }
  }, [paswordQRView, setValue]);

  const showImage = () => {
    const stepsToShow = [3, 5, 6, 7];
    return stepsToShow.includes(step);
  };

  const nextPageAndVerifyEmail = async () => {
    try {
      setLoading(true);

      const values = getValues();
      const { email } = values;

      const emailWithoutSpace = email?.trim();

      if (!emailWithoutSpace)
        return setError("email", { message: "Email inválido" });
      const existEmail = await emailIsValidate(emailWithoutSpace);

      if (existEmail) {
        toast.error("Email já utilizado no sistema!");
        return false;
      }

      return true;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNextButton = async () => {

    if (step === 1 && withoutPasswordQr) {
      return setStep((current) => {
        return current + 2;
      });
    } else if (step === 3) {
      const sent = await handleValidatyPasswordQr();
      if (!sent) return;
    } else if (step === 4) {
      const sent = await handleSendSMSCode();
      if (!sent) return;
    } else if (step === 6) {
      const verify = await nextPageAndVerifyEmail();
      if (!verify) return;
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
      const response = await verifyPasswordQr(QRCODE.replace('https://unitok.com/', ''), Number(paswordQR));

      setLoading(false);

      if (response && response.passwordIsValid) {
        await handleActivePet(QRCODE);
        return true;
      }

      toast.warning("Código de ativação inválido!");
    } catch (error) {
      toast.warning("Código de ativação inválido!");
      setLoading(false);
    }
  };

  async function handleActivePet(qrcode: string) {
    try {
      await createPet({ qrcode });
    } catch (error) {
      toast.warning(error)
    }
  }

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

      const { password = "", email = "", paswordQR = "" } = values;
      //const formatConfirmPassword = confirmPassword?.trim()
      const formatPassword = password?.trim();


      if (!password || password?.length < 6) {
        setLoading(false);
        if (formatPassword?.length < 6) {
          return setError("password", { message: "Senha menor que 6 dígitos" });
        }
        return setError("password", { message: "Digite uma senha válida" });
      } else if (!email) {
        setLoading(false);
        toast.error("Email inválido")
        setError("email", { message: "Email inválido" });
        return;
      }

      // toast.success('Criado')
      await createUserAndActiveCard({
        phone: phoneNumber,
        password: formatPassword,
        email: email,
        unique_code: codeId,
        password_qr: paswordQR,
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
      <Header variant="logoOnly" whatColor="transp" widthLogo={"50px"} />
      <ButtonBack onClick={onHandleComeBack}>Voltar</ButtonBack>

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
          {/* @ts-ignore */}
          {step === 1 && <Welcome handleNextButton={handleNextButton} variant="TAG" />}

          {step === 2 &&
            <ScreenshootQRCODE
              setQRCODE={setQRCODE}
              setStep={setStep}
            />
          }

          {step === 3 && (
            <PasswordQRActive
              register={register}
              clearErrors={clearErrors}
              errors={errors}
            />
          )}

          {step === 4 && (
            <StepSucessActive
              qrcode={QRCODE}
              onHandleComeBack={onHandleComeBack}
            />
          )}
        </ContentContainer>

        <Footer>
          {step < lastStep && step !== 1 && step !== 2 && step !== 3 && step !== 4 && (
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

          {step !== 5 && Math.trunc(step) !== 7 && step !== 1 && step !== 2 && step !== 4 && step < lastStep && (
            <ButtonPrimary
              variant="primary"
              onClick={handleNextButton}
              loading={loading}
              style={{ maxWidth: "8.5rem", marginLeft: 'auto' }}
            >
              Próximo
            </ButtonPrimary>
          )}

          {step === 5 && (
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

          {step === 7 && (
            <ButtonPrimary
              variant="primary"
              onClick={handleCreateUserAndActiveCard}
              loading={loading}
              style={{ minWidth: "9.5rem" }}
              disabled={!userAcceptedTerms}
            >
              Criar login
            </ButtonPrimary>
          )}

          {step === lastStep && (
            <Link href="/profile/edit" passHref legacyBehavior>
              <ButtonPrimary
                fullWidth
                variant="primary"
              // onClick={handleNextButton}
              >
                Editar meu perfil
              </ButtonPrimary>
            </Link>
          )}
        </Footer>
      </Content>
    </Wrapper>
  );
}
