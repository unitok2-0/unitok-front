import {
  ButtonsContainer,
  ButtonStyles,
  Container,
  StepAndTitle,
} from "./styles";
import { Text } from "../../components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { useState } from "react";
import { CardsAmount } from "./steps/cardsAmount";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CompanyInfos } from "./steps/CompanyInfos";
import { CompanyAdress } from "./steps/CompanyAdress";
import { cnpjIsValid } from "utils/document-validations";
import { Success } from "./steps/Success";
import { sendCustomCardsBudget } from "services/forms";
import { toast } from "react-toastify";

const StepsTitles = [
  "Cartões Unitok",
  "Dados da empresa",
  "Endereço da empresa",
];

interface CustomCardsFormData {
  amount: number;
  corporate_name: string;
  document: string;
  segment: string;
  name: string;
  phone: string;
  email: string;
  CEP: string;
  state: string;
  city: string;
  district: string;
  address: string;
  number: string;
  complement: string;
}

export function CustomCard() {
  const [step, setStep] = useState(1);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const CustomCardsDataSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Insira um número válido")
      .positive("Insira um número válido")
      .min(4, "O valor mínimo é de 4 cartões"),
    corporate_name: yup.string(),
    document: yup.string(),
    segment: yup.string(),
    name: yup.string(),
    phone: yup.string(),
    email: yup.string().email("Insira um e-mail válido"),
    CEP: yup.string(),
    state: yup.string(),
    city: yup.string(),
    district: yup.string(),
    address: yup.string(),
    number: yup.number().typeError("Informe um número válido"),
    complement: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    setError,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(CustomCardsDataSchema),
  });

  const { errors } = formState;

  const handleSubmitForm = async (values: CustomCardsFormData) => {
    const {
      corporate_name,
      document,
      segment,
      name,
      phone,
      email,
      CEP,
      address,
      amount,
      city,
      district,
      number,
      state,
    } = values;

    if (step === 1) {
      if (!amount) {
        return setError("amount", { message: "Campo obrigatório" });
      }
      if (!corporate_name) {
        return setError("corporate_name", { message: "Campo obrigatório" })
      }
      if (!name) {
        return setError("name", { message: "Campo obrigatório" })
      }

      if (!phone || phone.length !== 13) {
        return setError("phone", { message: "Campo obrigatório" });
      }

      if (!email) {
        return setError("email", { message: "Campo obrigatório" })
      }

      try {
        setIsSubmiting(true);
        await sendCustomCardsBudget(values);
        setStep(2);
        setIsSubmiting(false);
      } catch {
        toast.error("Erro ao enviar formulário");
        setIsSubmiting(false);
      }
    }

    // if (step === 2) {
    //   let formatedDocument = document;
    //   formatedDocument = formatedDocument
    //     .replaceAll(".", "")
    //     .replaceAll("/", "")
    //     .replace("-", "")
    //     .replaceAll("_", "");
    //   if (!corporate_name)
    //     setError("corporate_name", { message: "Campo obrigatório" });
    //   if (cnpjIsValid(formatedDocument) || formatedDocument.length !== 14)
    //     setError("document", { message: "Insira um CNPJ válido" });
    //   if (!segment) setError("segment", { message: "Campo obrigatório" });
    //   if (!name) setError("name", { message: "Campo obrigatório" });
    //   if (!phone || phone.length !== 13)
    //     setError("phone", { message: "Insira um número de telefone válido" });
    //   if (!email) setError("email", { message: "Campo obrigatório" });

    //   if (
    //     !corporate_name ||
    //     formatedDocument.length !== 14 ||
    //     !segment ||
    //     !name ||
    //     phone.length !== 13 ||
    //     !email
    //   ) {
    //     return;
    //   }
    //   setStep(step + 1);
    // }

    // if (step === 3) {
    //   const cep = CEP.replace(/\D/g, "");
    //   if (cep.length !== 8)
    //     setError("CEP", { message: "Insira um CEP válido" });
    //   if (!state || state.length !== 2)
    //     setError("state", { message: "Insira a sigla do estado" });
    //   if (!city) setError("city", { message: "Campo obrigatório" });
    //   if (!number) setError("number", { message: "Campo obrigatório" });
    //   if (!district) setError("district", { message: "Campo obrigatório" });
    //   if (!address) setError("address", { message: "Campo obrigatório" });
    //   if (!number) setError("number", { message: "Campo obrigatório" });

    //   if (
    //     cep.length !== 8 ||
    //     !district ||
    //     !address ||
    //     !number ||
    //     !city ||
    //     !state
    //   ) {
    //     return;
    //   }

    //   try {
    //     setIsSubmiting(true);
    //     const response = await sendCustomCardsBudget(values);
    //     setStep(4);
    //     setIsSubmiting(false);
    //   } catch {
    //     toast.error("Erro ao enviar formulário");
    //   }
    // }
  };

  return (
    <Container
      onSubmit={handleSubmit(handleSubmitForm)}
      isSucessPage={step === 4}
    >
      {step < 4 && (
        <StepAndTitle>
          {/* <Text color='primary' fontWeight='500'>Passo {step} / 3</Text> */}
          <Text fontWeight="400">{StepsTitles[step - 1]}</Text>
          <div className="divider"></div>
        </StepAndTitle>
      )}
      <div className="inputsContainer">
        {step == 1 && (
          <CardsAmount
            getValues={getValues}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
            setValue={setValue}
          />
        )}

        {/* {step === 2 && (
          <CompanyInfos
            getValues={getValues}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
          />
        )}

        {step === 3 && (
          <CompanyAdress
            getValues={getValues}
            clearErrors={clearErrors}
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
          />
        )} */}

        {step === 2 && <Success />}
      </div>

      <ButtonsContainer>
        {/* {step > 1 && step < 4 && (
          <ButtonPrimary
            styleProp={ButtonStyles}
            variant="secondary"
            type="button"
            onClick={() => {
              setStep(step - 1);
            }}
          >
            Voltar
          </ButtonPrimary>
        )} */}
        {step === 1 && (
          <ButtonPrimary
            styleProp={ButtonStyles}
            type="submit"
            loading={isSubmiting}
          >
            Concluir pedido
          </ButtonPrimary>
        )}
      </ButtonsContainer>
    </Container>
  );
}
