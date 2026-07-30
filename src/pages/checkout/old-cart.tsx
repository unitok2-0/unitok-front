import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";

import Header from "../../components/Headers/HeaderInitial";
import ProgressSignUp from "../../components/ProgressSignUp";
import CheckoutCardList from "../../components/CheckoutCardList";
import SummaryPayment from "../../components/SummaryPayment";
import { InputPrimary } from '../../components/Inputs/InputPrimary';

import { 
  Main, 
  Content, 
  Section, 
  AddNewCardButton, 
  Aside, 
  ButtonStyle, 
  Footer, 
  VoucherInputStyled 
} from '../../styles/pageStyles/checkout/cart/styles';
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
  const [voucher, setVoucher] = useState('');

  const { cart, updateCardQuantity, removeCardFromCart, updateSignUpFormData, addVoucher } = useAuth();
  const cards = cart.cards ?? [];

  function handleUpdateCardQuantity(cardId: string, quantity: number) {
    console.log('Card quantity changed', cardId, quantity);
    updateCardQuantity(cardId, quantity);
  }

  function handleRemoveCard(cardId: string) {
    console.log('Card removed', cardId);
    removeCardFromCart(cardId);
  }

  function handleAddNewCard() {
    Router.push('/signup/card');
  }

  async function handleAdvanceButtonClick() {
    if(cards.length < 1)
      return alert('Adicione pelo menos um cartão ao seu carrinho');
    
      if(voucher) {
        try {
          await addVoucher(voucher);
        } catch(e) {
          toast.error('Voucher inválido');
          setVoucher('');
          return;
        }
      }

    Router.push('/checkout/data');
  }

  return (
    <>
      <Head>
        <title>Carrinho | Unitok</title>
      </Head>
      <Main>
        <Header headerOnlyBack />
        <Content>
          <Section>
            <ProgressSignUp choice="CART" />

            <h1>{cards.length ? `${cards.length} produto(s) no carrinho` : 'Nenhum produto adicionado ao carrinho'}</h1>

            {cards.length > 0 && (
              <CheckoutCardList 
                cards={cards}
                onCardQuantityChange={handleUpdateCardQuantity}
                onCardRemoved={handleRemoveCard}
              />
            )}

            {/* <AddNewCardButton
              onClick={handleAddNewCard}
            >
              <span>+</span>
              Adicionar mais produtos
            </AddNewCardButton> */}

            <Footer>
              <InputPrimary 
                titleInput="Voucher"
                placeholder="Voucher de desconto"
                type="voucher"
                name="voucher"
                onChange={(e) => setVoucher(e.target.value)}
                value={voucher}
                styleContainer={VoucherInputStyled}
                // {...register('voucher')}
                // error={errors.voucher}
                // onClick={() => clearErrors('voucher')}
              />

              <ButtonPrimary 
                textButton="AVANÇAR" 
                styleProp={ButtonStyle}
                onClick={handleAdvanceButtonClick}
              />
            </Footer>
          </Section>
          <Aside>
            <SummaryPayment />
          </Aside>
        </Content>
      </Main>
    </>
  )
}

export default Cart;