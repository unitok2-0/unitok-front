import { useEffect } from "react";
import Head from "next/head";
import { FormEvent, useMemo, useState } from "react";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

import { createUser } from "../../services/payment";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from '../../utils/formatter';
import { generateCardHash } from "../../utils/pagarme";

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import Header from "../../components/Headers/HeaderInitial";
import CheckboxPrimary from "../../components/Inputs/CheckboxPrimary";
import { InputMask } from "../../components/Inputs/InputMask";
import { InputPrimary } from "../../components/Inputs/InputPrimary";
import ProgressSignUp from "../../components/ProgressSignUp";
import SummaryPayment from "../../components/SummaryPayment";

import { 
  Main, 
  Container,
  Content,
  Form, 
  PaymentOptions, 
  InLine, 
  InputStyle, 
  ButtonStyle, 
  Aside, 
  InstallmentsSelect
} from '../../styles/pageStyles/checkout/payment/styles';

interface PaymentFormData {
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCvv: string;
  installments: string;
}

const PaymentFormSchema = yup.object().shape({
  cardNumber: yup.string().required('Digite o número do cartão de crédito'),
  cardHolderName: yup.string().required('Digite o nome do titular'),
  cardExpirationDate: yup.string().required('Digite o vencimento do cartão').length(5, 'Data de vencimento inválida'),
  cardCvv: yup.string().required('Digite o CVV')
})

const Payment: React.FC = () => {
  const [paymentMethodChoiced, setPaymentMethodChoiced] = useState('credit_card');

  const { register, handleSubmit, formState, clearErrors } = useForm({
    resolver: yupResolver(PaymentFormSchema)
  });

  const { errors, isSubmitting } = formState;
  
  const { push } = useRouter();
  const { cart, getFormattedCheckoutData } = useAuth();
  const { cards, voucher } = cart;

  useEffect(() => {
    if(voucher?.discountPercentage === 100) {
      const checkoutData = getFormattedCheckoutData();
      checkoutData['payment_method'] = 'boleto';

      createUser(checkoutData).then(response => {
        console.log('Response', response);
        push('/checkout/success');

      }).catch((error) => {
        console.log('Erro na requisicao', error);
        toast.error('Erro na requisição. Por favor, verifique os valores inseridos.');
      })
    }
  }, [getFormattedCheckoutData, push, voucher]);

  const installmentsOptions = useMemo(() => {
    const installmentsAvailable = 3;
    const amount = cards.reduce((total, card) => total + (card.unitPrice * card.quantity), 0);

    const options = [];
    for(let count = 1; count <= installmentsAvailable; count++) {
      const installmentValueFormatted = formatPrice(Math.floor(amount / count));
      options.push(
        <option value={count} key={count}>
          {count === 1 
            ? `${installmentValueFormatted} à vista`
            : `${count} x ${installmentValueFormatted} sem juros`
          }
        </option>
      )
    }

    return options;
  }, [cards]);

  const handleCreditCardPaymentFormSubmit: SubmitHandler<PaymentFormData> = async (values) => {
    const checkoutData = getFormattedCheckoutData();
    checkoutData['payment_method'] = 'credit_card';

    try {
      const cardHash = await generateCardHash(
        values.cardNumber, 
        values.cardHolderName, 
        values.cardExpirationDate, 
        values.cardCvv
      );
      checkoutData['card_hash'] = cardHash;      
    } catch(error) {
      alert('Verifique os dados inseridos.')
      return;
    }

    checkoutData['installments'] = values.installments;
    console.log('Credit Card Checout data', checkoutData);

    try {
      const response = await createUser(checkoutData);
      console.log('Response', response);

      push('/checkout/success');
    } catch(e) {
      console.log('Erro na requisicao', e);
      toast.error('Erro na requisição. Por favor, verifique os valores inseridos.');
    }
  }

  const handleBoletoPaymentFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const checkoutData = getFormattedCheckoutData();
    checkoutData['payment_method'] = 'boleto';

    console.log('Boleto Checout data', checkoutData);

    try {
      const data = await createUser(checkoutData);
      console.log('Response', data);
      
      push({
        pathname: '/checkout/success',
        query: {
          boleto_url: data.boleto_url,
          boleto_barcode: data.boleto_barcode
        }
      });
    } catch(e) {
      console.log('Erro na requisicao', e);
      toast.error('Erro na requisição. Por favor, verifique os valores inseridos.');
    }
  }

  return (
    <>
      <Head>
        <title>Pagamento | Unitok</title>
      </Head>
      <Main>
        <Header headerOnlyBack />
        <Container>
          <Content>
            <ProgressSignUp choice="PAYMENT" />

            <h1>Pagamento</h1>

            <h2>Escolha a forma de pagamento</h2>
            
            <PaymentOptions>
              <CheckboxPrimary 
                label="Boleto bancário" 
                checked={paymentMethodChoiced === 'boleto'}
                onClick={() => setPaymentMethodChoiced('boleto')}
              />
              <CheckboxPrimary 
                label="Cartão de crédito" 
                checked={paymentMethodChoiced === 'credit_card'}
                onClick={() => setPaymentMethodChoiced('credit_card')}
              />
            </PaymentOptions>

            {paymentMethodChoiced === 'credit_card' && (
              <Form onSubmit={handleSubmit(handleCreditCardPaymentFormSubmit)}>
                <>
                  <InputMask
                    titleInput="Número do cartão"
                    mask={'9999 9999 9999 9999'}
                    placeholder='---- ---- ---- ----'
                    name='cardNumber'
                    autoFocus={true}
                    styleContainer={InputStyle}
                    error={errors.cardNumber}
                    onClick={() => clearErrors('cardNumber')}
                    {...register('cardNumber')}
                  />

                  <InputPrimary
                    titleInput="Nome do titular"
                    placeholder='Digite aqui o nome como no cartão'
                    name='cardHolderName'
                    autoFocus={false}
                    styleContainer={InputStyle}
                    error={errors.cardHolderName}
                    {...register('cardHolderName')}
                    onClick={() => clearErrors('cardHolderName')}
                  />

                  <InLine>
                    <InputMask
                      titleInput="Vencimento"
                      mask={'99/99'}
                      placeholder='MM/AA'
                      name='cardExpirationDate'
                      autoFocus={false}
                      styleContainer={InputStyle}
                      error={errors.cardExpirationDate}
                      {...register('cardExpirationDate')}
                      onClick={() => clearErrors('cardExpirationDate')}
                    />

                    <InputPrimary
                      titleInput="CVV"
                      placeholder='Digite aqui o CVV'
                      name='cardCvv'
                      autoFocus={false}
                      styleContainer={InputStyle}
                      error={errors.cardCvv}
                      {...register('cardCvv')}
                      onClick={() => clearErrors('cardCvv')}
                    />
                  </InLine>

                  <InstallmentsSelect>
                    <label htmlFor="installments">
                      Número de parcelas
                    </label>
                    <select {...register('installments')} defaultValue="1">
                      {installmentsOptions}
                    </select>
                  </InstallmentsSelect>
                </>
                <ButtonPrimary
                  textButton="AVANÇAR"
                  styleProp={ButtonStyle}
                  type="submit"
                  loading={isSubmitting}
                />
              </Form>
            )}

            {paymentMethodChoiced === 'boleto' && (
              <Form onSubmit={handleBoletoPaymentFormSubmit}>
                <ButtonPrimary
                  textButton="AVANÇAR"
                  styleProp={ButtonStyle}
                  type="submit"
                />
              </Form>
            )}
          </Content>
          <Aside>
            <SummaryPayment />
          </Aside>
        </Container>
      </Main>
    </>
  )
}

export default Payment;