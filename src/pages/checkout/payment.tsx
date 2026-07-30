import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { BsCreditCard } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useCart } from "contexts/CartContext";
import { useCheckout } from "contexts/CheckoutContext";
import CheckoutContainer from "containers/checkout";
import { CheckoutForm, InputInlineGrid } from "containers/checkout/styles";
import { Text, Heading } from "components/Typography";
import Radio from "components/Radio";
import Select from "components/Select";
import Input from "components/Inputs/Input";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import PixIcon from "../../../public/assets/pix.svg";
import { finishCheckout, incrementUseVoucher } from "services/payment";
import {
  mapContextToSaleData,
  mapContextToTransactionData,
} from "utils/map-context-to-payment-data";
import { generateCardHash } from "utils/pagarme";
import { toast } from "react-toastify";
// import { useRecaptcha } from "hooks/useRecaptcha";
import NextStepBox from "components/NextStepBox";

import * as S from "styles/pageStyles/checkout/payment/styles";
import WhatsappButton from "components/Buttons/WhatsappButton";

const CreditCardPaymentFormData = yup.object().shape({
  creditCardNumber: yup.string().required("Este campo é obrigatório"),
  creditCardVerificationValue: yup
    .string()
    .required("Este campo é obrigatório"),
  creditCardOwnerName: yup.string().required("Este campo é obrigatório"),
  creditCardExpirationDate: yup.string().required("Este campo é obrigatório"),
  installments: yup.string().required("Este campo é obrigatório"),
});

const UNSUCCESSFUL_PAYMENT_MESSAGE =
  "Não foi possível concluir o pagamento. Tente novamente.";
const RECAPTCHA_ERROR_MESSAGE = "Erro na verificação";

export default function PaymentPage() {
  const router = useRouter();
  // const { handleReCaptchaVerify } = useRecaptcha("CHECKOUT");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVoucher, setIsLoadingVoucher] = useState(false);

  const { selectedCards, cleanUpSelectedCardsStorage } = useCart();
  const {
    installmentOptions,
    setPaymentData,
    userPersonalData,
    addressData,
    paymentData,
    setPaymentMethod,
    voucher,
    discountedTotal,
    addVoucher,
    removeVoucher,
    selectedShipment
  } = useCheckout();

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(CreditCardPaymentFormData),
    defaultValues: {
      creditCardNumber: paymentData.creditCardMethodData?.number,
      creditCardVerificationValue:
        paymentData.creditCardMethodData?.verificationValue,
      creditCardOwnerName: paymentData.creditCardMethodData?.ownerName,
      creditCardExpirationDate:
        paymentData.creditCardMethodData?.expirationDate,
    } as any,
  });

  const [voucherText, setVoucherText] = useState("");
  const [shouldShowVoucherError, setShouldShowVoucherError] = useState(false);

  async function handleAddVoucher() {
    if (!voucherText) return;
    setIsLoadingVoucher(true);
    setShouldShowVoucherError(false);

    try {
      await addVoucher(voucherText);
    } catch (error) {
      setShouldShowVoucherError(true);
    } finally {
      setIsLoadingVoucher(false);
    }
  }

  async function returnSaleData() {
    return mapContextToSaleData({
      addressData,
      paymentData,
      selectedCards,
      userPersonalData,
    });
  }

  const commonTransactionData = mapContextToTransactionData({
    paymentData,
    voucher,
  });

  const isFullDiscount = voucher?.valid && voucher?.discountPercentage === 100;

  useEffect(() => {
    if (isFullDiscount) {
      setPaymentMethod("voucher");
    } else {
      setPaymentMethod("credit_card");
    }
  }, [isFullDiscount]);

  async function handleCreditCardPayment(data) {
    setIsLoading(true);

    // try {
    //   const recaptcha = await handleReCaptchaVerify();
    //   if (recaptcha?.status === "BAD") {
    //     toast.error(RECAPTCHA_ERROR_MESSAGE);
    //     setIsLoading(false);
    //     return;
    //   }
    // } catch {
    //   setIsLoading(false);
    //   return;
    // }

    setPaymentData((state) => ({
      ...state,
      creditCardMethodData: {
        number: data.creditCardNumber,
        verificationValue: data.creditCardVerificationValue,
        ownerName: data.creditCardOwnerName,
        ownerCPF: data.creditCardOwnerCPF,
        expirationDate: data.creditCardExpirationDate,
        installments: data.installments,
      },
    }));

    let cardHash: string;

    try {
      cardHash = await generateCardHash(
        data.creditCardNumber,
        data.creditCardOwnerName,
        data.creditCardExpirationDate,
        data.creditCardVerificationValue
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Verifique os dados inseridos.");
      return;
    }

    try {
      const shipmentInfos = {
        name: selectedShipment.name
      }
      const finishedCreditCardPayment = await finishCheckout<"credit_card">(
        { ...(await returnSaleData()), shipment_infos: shipmentInfos },
        {
          ...commonTransactionData,
          card_hash: cardHash,
        }
      );

      const saleId = finishedCreditCardPayment.sale.sale._id;
      /* if (voucher) {
        await incrementUseVoucher(voucher.voucherId)
      } */
      cleanUpSelectedCardsStorage();
      await router.push(`/checkout/success/${saleId}`);
    } catch (error) {
      console.log(error);
      toast.error(UNSUCCESSFUL_PAYMENT_MESSAGE);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  function handleFinishCheckout() {
    switch (paymentData.paymentMethod) {
      case "credit_card": {
        return handleSubmit(handleCreditCardPayment);
      }

      default:
      case "pix":
      case "voucher":
      case "boleto": {
        return async (event: FormEvent) => {
          event.preventDefault();
          setIsLoading(true);

          // try {
          //   const recaptcha = await handleReCaptchaVerify();
          //   if (recaptcha?.status === "BAD") {
          //     toast.error(RECAPTCHA_ERROR_MESSAGE);
          //     setIsLoading(false);
          //     return;
          //   }
          // } catch {
          //   setIsLoading(false);
          //   return;
          // }

          try {

            const shipmentInfos = {
              name: selectedShipment.name
            }

            const finishedPayment = await finishCheckout(
              { ...(await returnSaleData()), shipment_infos: shipmentInfos },
              commonTransactionData
            );
            const saleId = finishedPayment.sale.sale._id;
            /* if (voucher) {
              await incrementUseVoucher(voucher.voucherId)
            } */
            cleanUpSelectedCardsStorage();
            await router.push(`/checkout/success/${saleId}`);
          } catch (error) {
            console.log(error);

            toast.error(UNSUCCESSFUL_PAYMENT_MESSAGE);
          } finally {
            setIsLoading(false);
          }
          setIsLoading(false);
        };
      }
    }
  }

  return (
    <>
      <Head>
        <title>Pagamento | Unitok</title>
      </Head>
      <WhatsappButton />
      <CheckoutContainer>
        <CheckoutForm style={{ gap: "1rem" }} onSubmit={handleFinishCheckout()}>
          <Heading
            as="h1"
            color="primary"
            style={{ fontSize: "35px", fontWeight: 300, marginBottom: "2rem" }}
          >
            Pagamento
          </Heading>
          <Text>Adicione um cupom de desconto:</Text>
          <S.VoucherContainer>
            <Input
              id="voucher"
              label="Insira o código"
              onFocus={() => setShouldShowVoucherError(false)}
              shouldMaintainLabelOnTop={!!voucher?.voucherId}
              value={voucherText}
              onChange={(event) => setVoucherText(event.target.value)}
              errorMessage={shouldShowVoucherError ? "Código inválido" : ""}
              warningMessage={
                voucher?.voucherId && `Cupom ${voucher?.voucherId} adicionado`
              }
            />
            {!!voucher && (
              <ButtonPrimary
                type="button"
                onClick={removeVoucher}
                variant="secondary"
              >
                Remover
              </ButtonPrimary>
            )}
            {!voucher && (
              <ButtonPrimary
                type="button"
                onClick={handleAddVoucher}
                variant="secondary"
                loading={isLoadingVoucher}
              >
                Aplicar
              </ButtonPrimary>
            )}
          </S.VoucherContainer>

          <Text>Ecolha como deseja pagar: </Text>

          <S.PaymentMethodsGrid>
            <S.PaymentMethodContainer isDisabled={isFullDiscount}>
              <S.PaymentMethod>
                <Radio
                  disabled={isFullDiscount}
                  checked={
                    !isFullDiscount &&
                    paymentData.paymentMethod === "credit_card"
                  }
                  onChange={() => setPaymentMethod("credit_card")}
                >
                  Cartão de crédito
                </Radio>
                <BsCreditCard size={32} />
              </S.PaymentMethod>
              {!isFullDiscount && paymentData.paymentMethod === "credit_card" && (
                <S.PaymentMethodContent>
                  <Input
                    id="card_number"
                    label="Numero do cartão"
                    mask="9999 9999 9999 9999"
                    shouldMaintainLabelOnTop={
                      !!paymentData.creditCardMethodData?.number
                    }
                    {...register("creditCardNumber")}
                    errorMessage={formState.errors.creditCardNumber?.message}
                  />
                  <Input
                    id="card_owner_name"
                    label="Nome do titular"
                    shouldMaintainLabelOnTop={
                      !!paymentData.creditCardMethodData?.ownerName
                    }
                    {...register("creditCardOwnerName")}
                    errorMessage={formState.errors.creditCardOwnerName?.message}
                  />

                  <InputInlineGrid gridTemplateColumns="1fr 1fr">
                    <Input
                      id="expiration_date"
                      label="Data de vencimento"
                      mask="99/99"
                      shouldMaintainLabelOnTop={
                        !!paymentData.creditCardMethodData?.expirationDate
                      }
                      {...register("creditCardExpirationDate")}
                      errorMessage={
                        formState.errors.creditCardExpirationDate?.message
                      }
                    />
                    <Input
                      id="cvv"
                      mask="999"
                      label="Código de segurança"
                      shouldMaintainLabelOnTop={
                        !!paymentData.creditCardMethodData?.verificationValue
                      }
                      {...register("creditCardVerificationValue")}
                      errorMessage={
                        formState.errors.creditCardVerificationValue?.message
                      }
                    />
                  </InputInlineGrid>
                  <InputInlineGrid gridTemplateColumns="1fr 1fr">
                    <Select
                      selectId="installments"
                      label="Número de parcelas"
                      defaultSelectedOptionValue={installmentOptions[0].value}
                      options={installmentOptions}
                      reactHookFormRegisterReturn={register("installments")}
                      errorMessage={formState.errors.installments?.message}
                    />
                  </InputInlineGrid>
                </S.PaymentMethodContent>
              )}
            </S.PaymentMethodContainer>

            <S.PaymentMethodContainer isDisabled={isFullDiscount}>
              <S.PaymentMethod>
                <Radio
                  disabled={isFullDiscount}
                  checked={
                    !isFullDiscount && paymentData.paymentMethod === "boleto"
                  }
                  onChange={() => setPaymentMethod("boleto")}
                >
                  Boleto bancário
                </Radio>

                <FaBarcode size={32} />
              </S.PaymentMethod>

              {!isFullDiscount && paymentData.paymentMethod === "boleto" && (
                <S.PaymentMethodContent gap="1rem">
                  <Heading font="titleXs">Importante</Heading>
                  <ul
                    style={{
                      paddingLeft: "2rem",
                      display: "grid",
                      gap: "1.5rem",
                    }}
                  >
                    <Text as="li">
                      O boleto será exibido logo após a sua confirmação de
                      compra.
                    </Text>
                    <Text as="li">
                      O boleto expira após a data de vencimento. Se o pagamento
                      não for identificado após esse período, seu pedido será
                      cancelado, sendo necessário refazê-lo.
                    </Text>

                    <Text as="li">
                      O pedido é aprovado em até 2 dias úteis após a realização
                      do pagamento. O prazo para entrega do pedido, é contado a
                      partir da confirmação de pagamento.
                    </Text>
                  </ul>
                </S.PaymentMethodContent>
              )}
            </S.PaymentMethodContainer>

            <S.PaymentMethodContainer isDisabled={isFullDiscount}>
              <S.PaymentMethod>
                <Radio
                  disabled={isFullDiscount}
                  checked={
                    !isFullDiscount && paymentData.paymentMethod === "pix"
                  }
                  onChange={() => setPaymentMethod("pix")}
                >
                  Pix
                </Radio>
                <PixIcon />
              </S.PaymentMethod>
              {!isFullDiscount && paymentData.paymentMethod === "pix" && (
                <S.PaymentMethodContent gap="1rem">
                  <Heading font="titleXs">Importante</Heading>
                  <ul
                    style={{
                      paddingLeft: "2rem",
                      display: "grid",
                      gap: "1.5rem",
                    }}
                  >
                    <Text as="li">
                      A chave de pagamento Pix será exibida logo após finalizar
                      a sua compra.
                    </Text>
                    <Text as="li">
                      A chave do pagamento Pix expira em 15 minutos. Se o
                      pagamento não for identificado após esse período, seu
                      pedido será cancelado automaticamente, sendo necessário
                      refazê-lo.
                    </Text>
                  </ul>
                </S.PaymentMethodContent>
              )}
            </S.PaymentMethodContainer>

            {isFullDiscount && (
              <Text font="bodySm">
                *Devido ao valor do Cupom de Desconto aplicado, nenhuma forma de
                pagamento é necessária para finalização da compra.
              </Text>
            )}
          </S.PaymentMethodsGrid>

          <NextStepBox>
            <ButtonPrimary loading={isLoading} disabled={isLoading}>
              Finalizar compra
            </ButtonPrimary>
          </NextStepBox>
        </CheckoutForm>
      </CheckoutContainer>
    </>
  );
}
