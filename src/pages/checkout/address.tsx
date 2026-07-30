import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Text } from "components/Typography";
import { AddressData, ShipmentType, useCheckout } from 'contexts/CheckoutContext'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
// import { useAuth } from "../../contexts/AuthContext";
import { getLocationForCep } from '../../services/cep'
import Input from 'components/Inputs/Input'
import CheckoutContainer from 'containers/checkout'
import { Heading } from 'components/Typography'
import * as S from 'containers/checkout/styles'
import NextStepBox from 'components/NextStepBox'
import WhatsappButton from 'components/Buttons/WhatsappButton'
import Radio from 'components/Radio'
import { calculateShipment } from 'services/melhorenvio'
import { useCart } from 'contexts/CartContext'
import { SetShipmentePriceWithouDiscount } from 'utils/format-shipment'

const SignUpAddressFormSchema = yup.object().shape({
  CEP: yup.string().required('Digite seu CEP').min(8, 'Digite seu CEP'),
  city: yup.string().required('Digite sua cidade'),
  state: yup
    .string()
    .required('Digite seu estado')
    .max(2, 'Por favor insira a sigla'),
  street: yup.string().required('Digite sua rua'),
  district: yup.string().required('Digite seu bairro'),
  number: yup.string().required('Digite o número'),
  complement: yup.string(),
})

type SignUpAddressFormData = AddressData

const CheckoutAddress: React.FC = () => {
  const [shouldMaintainLabelOnTop, setShouldMaintainLabelOnTop] = useState(
    false
  )

  const {
    unlockNextCheckoutStep,
    setAddressData,
    addressData,
    discountedTotal,
    setShipments,
    shipments,
    selectedShipment,
    setSelectedShipment
  } = useCheckout()
  const {
    register,
    handleSubmit,
    formState,
    clearErrors,
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(SignUpAddressFormSchema),
    defaultValues: { ...addressData },
  })
  const { selectedCards } = useCart()
  const router = useRouter()
  const { errors } = formState

  const handleSignUpAddress: SubmitHandler<SignUpAddressFormData> = (
    values
  ) => {
    // updateSignUpFormData(values);
    unlockNextCheckoutStep(2)
    setAddressData(values)
    router.push('/checkout/payment')
  }

  async function onGetLocationCep(cep: string) {
    try {
      const { city, district, state, street } = await getLocationForCep({
        cep,
      })
      setValue('city', city)
      setValue('district', district)
      setValue('state', state)
      setValue('street', street)
      setShouldMaintainLabelOnTop(true)
      setFocus('number')
    } catch { }
  }

  function getQuantity(): number {
    let quantity = 0
    selectedCards.forEach(card => {
      quantity += card.quantity;
    });
    return quantity;
  }

  async function getShipmentsPrices(cep: string) {

    const defaultShipment: ShipmentType = {
      company: {
        name: 'Unitok'
      },
      custom_price: "0",
      delivery_time: 20,
      name: "DEFAULT",
      discount: '0'
    }

    try {
      const data = await calculateShipment({
        to: cep,
        quantity: getQuantity()
      })
      const defaultShipment: ShipmentType = {
        company: {
          name: 'Unitok'
        },
        custom_price: "0",
        delivery_time: 20,
        realPrice: '0',
        name: "DEFAULT",
        discount: '0'
      }
      const formatedShipments = data.map(shipmentType => {
        return SetShipmentePriceWithouDiscount(shipmentType)
      })

      setShipments([...formatedShipments as ShipmentType[], defaultShipment]);
    } catch (error) {
      setShipments([defaultShipment]);
    }
  }

  function getShipmentInfosByName(type: string) {

    if (type === "DEFAULT") {
      return {
        company: {
          name: 'Unitok'
        },
        custom_price: "0",
        realPrice: '0',
        delivery_time: 20,
        name: "DEFAULT"
      } as ShipmentType
    } else {

      const shipmentType = shipments.find((shipment => shipment.name === type))
      if (shipmentType) {
        const info = SetShipmentePriceWithouDiscount(shipmentType);
        return info;

      } else {
        return undefined
      }
    }
  }

  return <>
    <Head>
      <title>Endereço | Unitok</title>
    </Head>
    <WhatsappButton />
    <CheckoutContainer>
      <S.CheckoutForm onSubmit={handleSubmit(handleSignUpAddress)}>
        <Heading
          as="h1"
          color="primary"
          style={{ fontSize: '35px', fontWeight: 300 }}
        >
          Entrega
        </Heading>
        <S.InputInlineGrid>
          <Input
            id="CEP"
            label="CEP"
            name="CEP"
            shouldMaintainLabelOnTop={!!addressData.CEP}
            errorMessage={errors.CEP?.message}
            {...register('CEP')}
            onClick={() => clearErrors('CEP')}
            mask="99999-999"
            onChange={(e) => {
              const cep = e.target.value.replace(/\D/g, '')
              if (cep.length === 8) {
                try {
                  onGetLocationCep(cep)
                  getShipmentsPrices(cep)
                } catch (error) {
                  console.log('Error when getting geolocation')
                }
              }
            }}
          />
        </S.InputInlineGrid>

        <S.InputInlineGrid>
          <Input
            shouldMaintainLabelOnTop={
              !!addressData.state || shouldMaintainLabelOnTop
            }
            id="state"
            label="Estado"
            name="state"
            errorMessage={errors.state?.message}
            {...register('state')}
            onClick={() => clearErrors('state')}
          />

          <Input
            shouldMaintainLabelOnTop={
              !!addressData.city || shouldMaintainLabelOnTop
            }
            id="city"
            label="Cidade"
            name="city"
            autoFocus={false}
            errorMessage={errors.city?.message}
            {...register('city')}
            onClick={() => clearErrors('city')}
          />
        </S.InputInlineGrid>

        <Input
          shouldMaintainLabelOnTop={
            !!addressData.district || shouldMaintainLabelOnTop
          }
          id="district"
          label="Bairro"
          name="district"
          errorMessage={errors.district?.message}
          {...register('district')}
          onClick={() => clearErrors('district')}
        />

        <Input
          shouldMaintainLabelOnTop={
            !!addressData.street || shouldMaintainLabelOnTop
          }
          id="street"
          label="Endereço"
          name="street"
          errorMessage={errors.street?.message}
          {...register('street')}
          onClick={() => clearErrors('street')}
        />

        <S.InputInlineGrid>
          <Input
            id="numero"
            label="Número"
            name="number"
            shouldMaintainLabelOnTop={!!addressData.number}
            errorMessage={errors.number?.message}
            {...register('number')}
            onClick={() => clearErrors('number')}
          />

          <Input
            id="complement"
            label="Complemento (opcional)"
            name="complement"
            shouldMaintainLabelOnTop={!!addressData.complement}
            {...register('complement')}
          />
        </S.InputInlineGrid>

        <Heading
          style={{ marginBottom: '0' }}
        >
          Escolha um tipo de frete
        </Heading>
        <S.SelectShipmentsContainer>
          <S.ShipmentBox>
            <S.InputRadioBox>
              <Radio
                value="DEFAULT"
                checked={selectedShipment.name === "DEFAULT"}
                onChange={() => {
                  setSelectedShipment(getShipmentInfosByName("DEFAULT"))
                }}

              >
                <p className='shipment-type'>Padrão</p>
              </Radio>
              <Text className='shipment-description'>Até 20 dias úteis*, sem possibilidade de rastreio</Text>
            </S.InputRadioBox>
            <Text className='shipment-price' style={{ fontWeight: '500' }}>Grátis</Text>
          </S.ShipmentBox>
          <S.ShipmentBox>
            <S.InputRadioBox>
              <Radio
                disabled={!getShipmentInfosByName("SEDEX") || !!getShipmentInfosByName("SEDEX")?.error}
                value="SEDEX" checked={selectedShipment.name === "SEDEX"}
                onChange={() => {
                  setSelectedShipment(getShipmentInfosByName("SEDEX"))
                }}
              >
                <p className='shipment-type'>Sedex</p>
              </Radio>
              <Text className='shipment-description'>Até {!!getShipmentInfosByName("SEDEX") && !getShipmentInfosByName("SEDEX").error ? getShipmentInfosByName("SEDEX").delivery_time : '--'} dias úteis*</Text>
            </S.InputRadioBox>
            <Text className='shipment-price' style={{ fontWeight: '500' }}>R$ {!!getShipmentInfosByName("SEDEX") && !getShipmentInfosByName("SEDEX").error ? getShipmentInfosByName("SEDEX").realPrice : '--'}</Text>
          </S.ShipmentBox>
          {/*             <S.ShipmentBox>
            <S.InputRadioBox>
              <Radio
                disabled={!getShipmentInfosByName("PAC") || !!getShipmentInfosByName("PAC")?.error}
                value="PAC" checked={selectedShipment.name === "PAC"}
                onChange={() => {
                  setSelectedShipment(getShipmentInfosByName("PAC"))
                }}
              >
                <p className='shipment-type'>PAC</p>
              </Radio>
              <Text className='shipment-description'>Até {!!getShipmentInfosByName("PAC") && !getShipmentInfosByName("PAC").error ? getShipmentInfosByName("PAC").delivery_time : '--'} dias úteis*</Text>
            </S.InputRadioBox>
            <Text className='shipment-price' style={{ fontWeight: '500' }}> R$ {!!getShipmentInfosByName("PAC") && !getShipmentInfosByName("PAC").error ? getShipmentInfosByName("PAC").realPrice : '--'}</Text>
          </S.ShipmentBox> */}

          <Text style={{ marginTop: "1.563rem" }}>*O prazo para entrega começa a ser contado a partir da aprovação do pagamento.</Text>
        </S.SelectShipmentsContainer>

        <NextStepBox>
          <ButtonPrimary type="submit" style={{ justifySelf: 'end' }}>
            Continuar pagamento
          </ButtonPrimary>
        </NextStepBox>
      </S.CheckoutForm>
    </CheckoutContainer>
  </>;
}

export default CheckoutAddress
