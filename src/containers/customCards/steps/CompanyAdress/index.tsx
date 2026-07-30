import Input from 'components/Inputs/Input'
import { InputPhone } from 'components/Inputs/InputPhone';
import PhoneInput from 'components/PhoneInput';
import { Heading } from 'components/Typography'
import { useState } from 'react';
import { getLocationForCep } from 'services/cep';

import { Container } from './styles'


interface CompanyAdressProps {
  register: any;
  clearErrors: any;
  errors: any;
  control: any;
  setValue: any;
  getValues: any;
}

export function CompanyAdress({ clearErrors, errors, register, getValues, control, setValue }: CompanyAdressProps) {

  const [shouldMaintainLabelOnTop, setShouldMaintainLabelOnTop] = useState(false)

  async function onGetLocationCep(cep: string) {
    try {
      const { city, district, state, street } = await getLocationForCep({
        cep,
      })
      setValue('city', city)
      setValue('district', district)
      setValue('state', state)
      setValue('address', street)
      setShouldMaintainLabelOnTop(true)
    } catch { }
  }

  return (
    <Container>
      <Input
        id="CEP"
        label="CEP"
        name="CEP"
        shouldMaintainLabelOnTop={getValues()?.CEP}
        errorMessage={errors.CEP?.message}
        {...register('CEP')}
        onClick={() => clearErrors('CEP')}
        mask="99999-999"
        onChange={(e) => {
          const cep = e.target.value.replace(/\D/g, '')
          if (cep.length === 8) {
            try {
              onGetLocationCep(cep)
            } catch (error) {
              console.log('Error when getting geolocation')
            }
          }
        }}
      />
      <div className="grid">
        <Input
          id="state"
          name='state'
          label='Estado'
          shouldMaintainLabelOnTop={getValues()?.state || shouldMaintainLabelOnTop}
          errorMessage={errors.state?.message}
          onClick={() => clearErrors('state')}
          {...register('state')}
          style={{ textTransform: 'uppercase' }}
          maxLength={2}
        />

        <Input
          name='city'
          id='city'
          label='Cidade'
          shouldMaintainLabelOnTop={getValues()?.city || shouldMaintainLabelOnTop}
          errorMessage={errors?.city?.message}
          onClick={() => clearErrors('city')}
          {...register('city')}
        />

      </div>
      <Input
        name='district'
        id='district'
        label='Bairro'
        shouldMaintainLabelOnTop={getValues()?.district || shouldMaintainLabelOnTop}
        errorMessage={errors?.district?.message}
        onClick={() => clearErrors('district')}
        {...register('district')}
      />
      <Input
        name='address'
        id='address'
        label='Endereço'
        shouldMaintainLabelOnTop={getValues()?.address || shouldMaintainLabelOnTop}
        errorMessage={errors?.address?.message}
        onClick={() => clearErrors('address')}
        {...register('address')}
      />
      <div className="grid">
        <Input
          name='number'
          id='number'
          label='Número'
          type="number"
          shouldMaintainLabelOnTop={getValues()?.number}
          errorMessage={errors?.number?.message}
          onClick={() => clearErrors('number')}
          {...register('number')}
        />
        <Input
          name='complement'
          id='complement'
          label='Complemento'
          shouldMaintainLabelOnTop={getValues()?.complement}
          errorMessage={errors?.complement?.message}
          onClick={() => clearErrors('complement')}
          {...register('complement')}
        />
      </div>
    </Container>
  );
}