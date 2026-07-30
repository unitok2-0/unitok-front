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
  PowerdBy,
} from "./styles";

import Welcome from "./Steps/Welcome";
import LoginPhone from "./Steps/LoginPhone";
import CreatePassword from "./Steps/CreatePassword";
import EmailScreen from "./Steps/Email";
import PhoneActive from "./Steps/PhoneActive";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import {
  createUserAndActiveCard,
  createUserWithPetAndActive,
  sendTokenPhone,
  verifyPasswordQr,
  verifyTokenPhone,
  verifyUniqueName,
} from "../../services/user";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import PasswordQRActive from "./Steps/PasswordQRActive";
import UseTermsModal from "components/UseTermsModal";
import UsePrivacyModal from "components/UsePrivacyModal";
import router from "next/router";
import destroyAllCookies from "utils/conarh2022/destroyAllCookies";
import HaveAccount from "./Steps/HaveAccount";
import { ProductsTypes } from "pages/active/[codeId]";
import { parseCookies } from "nookies";
import Avatar from "components/Avatar";
import { getImageUrl } from "constants/functions";
import { UserProps } from "domain/User";

export type ActiveContainerProps = {
  imageSrc: string;
  codeId: string;
  withoutPasswordQr: boolean;
  deviceType?: ProductsTypes;
  // children: React.ReactNode;
  qrcode?: any;
  teamsUser?: UserProps;
};

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({});

const stepsArrayOriginal = [1, 2, 3, 4, 5];
const lastStep = 8;



export default function ActiveContainer({
  codeId,
  imageSrc,
  withoutPasswordQr,
  deviceType,
  qrcode,
  teamsUser
}: ActiveContainerProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAcceptedTerms, setUserAcceptedTerms] = useState(false);
  const [modalUserTermsIsOpen, setModalUserTermsIsOpen] = useState(false);
  const [modalUserPrivacyIsOpen, setModalUsePrivacyIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    const stepsToShow = [2, 4, 5, 6, 7];
    return stepsToShow.includes(step);
  };

  const nextPageAndVerifyEmail = async () => {
    try {
      setLoading(true);

      const values = getValues();
      const { email, name } = values;

      if (!name) {
        return setError("name", { message: "Nome inválido" })
      }

      const verify = await verifyUniqueName(name);
      if (verify.nameExists) {
        return setError("name", { message: "Nome único já utilizado" })
      }

      const emailWithoutSpace = email?.trim();

      if (!emailWithoutSpace)
        return setError("email", { message: "Email inválido" });

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
    } else if (step === 2) {
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

      const { password = "", email = "", paswordQR = "", name } = values;
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

      if (deviceType === ProductsTypes.PETS) {
        await createUserWithPetAndActive({
          phone: phoneNumber,
          password: formatPassword,
          email: email,
          unique_code: codeId,
          password_qr: paswordQR,
          name
        });
      } else {
        await createUserAndActiveCard({
          phone: phoneNumber,
          password: formatPassword,
          email: email,
          unique_code: codeId,
          password_qr: paswordQR,
          name
        });
      }

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

  useEffect(() => {
    const { "unitok.token": token } = parseCookies();

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);


  const url = teamsUser ? getImageUrl(teamsUser?.logoImage) : '/assets/default_logo.svg'
  console.log(url)

  return <>
    <Wrapper style={!showImage() || teamsUser ? { justifyContent: "center" } : {}} teamsUser={teamsUser}>
      {!teamsUser && <Header variant="logoOnly" whatColor="transp" widthLogo={"50px"} />}



      <UseTermsModal
        closeModal={closeUserTermsModal}
        modalIsOpen={modalUserTermsIsOpen}
      ></UseTermsModal>
      <UsePrivacyModal
        closeModal={closeUserPrivacyModal}
        modalIsOpen={modalUserPrivacyIsOpen}
      ></UsePrivacyModal>

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {showImage() && !teamsUser && (
        <Image id="rte" style={{ backgroundImage: `url("${imageSrc}")` }} />
      )}

      <Content
        teamsUser={teamsUser}
        style={!showImage() ? { height: "100vh" } : { minHeight: "55vh" }}
      >

        <ContentContainer>
          {step === 1 && <Welcome handleNextButton={handleNextButton} deviceType={deviceType} teamsUser={teamsUser} />}

          {step === 2 && (
            <PasswordQRActive
              teamsUser={teamsUser}
              register={register}
              clearErrors={clearErrors}
              errors={errors}
            />
          )}
          {step === 3 && (
            <HaveAccount
              handleNextButton={handleNextButton}
              isAuthenticated={isAuthenticated}
              codeId={codeId}
            />
          )}
          {step === 4 && (
            <LoginPhone
              teamsUser={teamsUser}
              onChangePhone={setPhoneNumber}
              control={control}
              // register={register}
              setValue={setValue}
              phoneNumber={phoneNumber}
            />
          )}

          {step === 5 && (
            <PhoneActive
              teamsUser={teamsUser}
              phoneNumber={phoneNumber}
              clearErrors={clearErrors}
              register={register}
              setValue={setValue}
              onPressActiveCard={handleVerifyTokenPhone}
            />
          )}

          {step === 6 && (
            <EmailScreen
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              setValue={setValue}
              teamsUser={teamsUser}
            />
          )}

          {(step === 7 || step === 8) && (
            <CreatePassword
              teamsUser={teamsUser}
              onChangePhone={setPhoneNumber}
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              setValue={setValue}
              setUserAcceptedTerms={setUserAcceptedTerms}
              userAcceptedTerms={userAcceptedTerms}
              closeUsePrivacyModal={closeUserPrivacyModal}
              closeUseTermsModal={closeUserTermsModal}
              step={step === 7 ? 1 : 2}
              deviceType={deviceType}
              qrcode={codeId}
            />
          )}
        </ContentContainer>

        {step !== 1 && (
          <Footer>
            {step < lastStep && step !== 1 && step !== 2 && step !== 3 && (
              <StepsContainer
                teamsUser={teamsUser}
              >
                {stepsArray.map((e) => {
                  let stepb = withoutPasswordQr ? step - 1 : step;
                  if (stepb === 0) stepb = 1;
                  return (
                    <li
                      key={`key-${e}`}
                      className={Math.trunc(stepb) === (e + 2) ? "selected" : ""}
                    ></li>
                  );
                })}
              </StepsContainer>
            )}

            {step !== 5 && Math.trunc(step) !== 7 && step !== 1 && step !== 3 && step < lastStep && (
              <ButtonPrimary
                variant="secondary"
                onClick={handleNextButton}
                loading={loading}
                style={{ width: "8.5625rem", marginLeft: 'auto', padding: "0" }}
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
                style={{ width: "8.5625rem", padding: "0" }}
              >
                Próximo
              </ButtonPrimary>
            )}

            {step === 7 && (
              <ButtonPrimary
                variant="primary"
                onClick={handleCreateUserAndActiveCard}
                loading={loading}
                style={{ width: "8.5625rem", padding: "0" }}
                disabled={!userAcceptedTerms}
              >
                Criar login
              </ButtonPrimary>
            )}

            {step === lastStep && deviceType !== "PETS" && (
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
        )}
      </Content>
      {
        teamsUser && (
          <PowerdBy>
            <Link href="/" passHref>

              <img
                src="/assets/powered-by-unitok.svg"
                alt="Powered by Unitok"
              />

            </Link>
          </PowerdBy>
        )
      }
    </Wrapper>

  </>;
}
